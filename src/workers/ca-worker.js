/**
 * Web Worker for Elementary Cellular Automata Computation
 * Runs CA generation in parallel, offloading computation from main thread
 *
 * Message Protocol:
 * Main → Worker:
 *   { type: 'init', rule: 30, width: 800, height: 600 }
 *   { type: 'step', steps: 1 }
 *   { type: 'setInitialCondition', pattern: 'single', options: {} }
 *   { type: 'setRule', rule: 90 }
 *   { type: 'reset', newRule: 110 }
 *   { type: 'getState' }
 *
 * Worker → Main:
 *   { type: 'ready' }
 *   { type: 'state', state: Uint8Array, generation: 42 }
 *   { type: 'error', message: 'Error description' }
 *
 * @author Claude (Sonnet 4.5)
 * @date 2025-10-21
 */

// ============================================================================
// INLINED CA ENGINE CODE (from ca-engine.js)
// ============================================================================

/**
 * Helper function to compute the next cell state based on ECA rule
 *
 * @param {number} left - Left neighbor state (0 or 1)
 * @param {number} center - Center cell state (0 or 1)
 * @param {number} right - Right neighbor state (0 or 1)
 * @param {number} rule - ECA rule number (0-255)
 * @returns {number} Next cell state (0 or 1)
 */
function computeRule(left, center, right, rule) {
  // Convert 3-bit neighborhood to index (0-7)
  const index = (left << 2) | (center << 1) | right;

  // Extract bit from rule number
  return (rule >> index) & 1;
}

/**
 * Elementary Cellular Automata Engine
 *
 * Features:
 * - All 256 ECA rules with precomputed lookup table
 * - Toroidal wrapping for infinite grid simulation
 * - Center-outward infinite generation
 * - Circular buffer for generation history
 * - Optimized Uint8Array for efficient memory usage
 */
class CAEngine {
  /**
   * Create a new CA engine
   *
   * @param {number} rule - ECA rule number (0-255)
   * @param {number} width - Grid width (number of cells)
   * @param {number} height - Grid height (number of generations to track)
   */
  constructor(rule, width, height) {
    this.rule = rule;
    this.width = width;
    this.height = height;

    // Current generation index (for circular buffer)
    this.currentGeneration = 0;

    // State buffer: 2D array stored as 1D Uint8Array for efficiency
    // Layout: [row0_col0, row0_col1, ..., row1_col0, row1_col1, ...]
    this.state = new Uint8Array(width * height);

    // Working buffers for computation
    this.currentRow = new Uint8Array(width);
    this.nextRow = new Uint8Array(width);

    // Precompute lookup table for current rule (performance optimization)
    this.ruleLookup = new Uint8Array(8);
    this._buildRuleLookup();

    // Initialize with default pattern
    this.setInitialCondition('single');
  }

  /**
   * Build lookup table for current rule
   * Maps 3-bit neighborhood (0-7) to next state (0 or 1)
   * @private
   */
  _buildRuleLookup() {
    for (let i = 0; i < 8; i++) {
      this.ruleLookup[i] = (this.rule >> i) & 1;
    }
  }

  /**
   * Get cell state at specific position with toroidal wrapping
   *
   * @param {Uint8Array} buffer - Buffer to read from
   * @param {number} x - X coordinate
   * @returns {number} Cell state (0 or 1)
   * @private
   */
  _getCell(buffer, x) {
    // Toroidal wrapping: wrap around edges
    const wrappedX = ((x % this.width) + this.width) % this.width;
    return buffer[wrappedX];
  }

  /**
   * Set cell state at specific position
   *
   * @param {Uint8Array} buffer - Buffer to write to
   * @param {number} x - X coordinate
   * @param {number} value - Cell state (0 or 1)
   * @private
   */
  _setCell(buffer, x, value) {
    buffer[x] = value;
  }

  /**
   * Compute next generation using current rule
   * Updates the state buffer with new generation
   */
  step() {
    // Get current row from circular buffer
    const currentRowIndex = this.currentGeneration % this.height;
    const currentRowOffset = currentRowIndex * this.width;

    // Copy current row to working buffer
    for (let i = 0; i < this.width; i++) {
      this.currentRow[i] = this.state[currentRowOffset + i];
    }

    // Compute next generation
    for (let x = 0; x < this.width; x++) {
      const left = this._getCell(this.currentRow, x - 1);
      const center = this._getCell(this.currentRow, x);
      const right = this._getCell(this.currentRow, x + 1);

      // Use lookup table for fast rule application
      const neighborhood = (left << 2) | (center << 1) | right;
      this.nextRow[x] = this.ruleLookup[neighborhood];
    }

    // Update circular buffer with new generation
    this.currentGeneration++;
    const nextRowIndex = this.currentGeneration % this.height;
    const nextRowOffset = nextRowIndex * this.width;

    // Copy next row to state buffer
    for (let i = 0; i < this.width; i++) {
      this.state[nextRowOffset + i] = this.nextRow[i];
    }
  }

  /**
   * Get current state buffer
   *
   * @returns {Uint8Array} Current state buffer (read-only reference)
   */
  getState() {
    return this.state;
  }

  /**
   * Get current generation number
   *
   * @returns {number} Current generation count
   */
  getGeneration() {
    return this.currentGeneration;
  }

  /**
   * Set initial condition for the CA
   *
   * @param {string|Uint8Array} pattern - Pattern type or custom initial state
   *   - "single": Single alive cell in center
   *   - "random": Random noise
   *   - Uint8Array: Custom pattern (must be width long)
   * @param {Object} options - Additional options
   * @param {number} options.density - Density for random pattern (0.0-1.0, default 0.5)
   */
  setInitialCondition(pattern, options = {}) {
    const { density = 0.5 } = options;

    // Clear entire state buffer
    this.state.fill(0);

    // Reset generation counter
    this.currentGeneration = 0;

    // Set initial row (row 0)
    const initialRow = new Uint8Array(this.width);

    if (pattern === 'single') {
      // Single alive cell in the center
      const centerX = Math.floor(this.width / 2);
      initialRow[centerX] = 1;

    } else if (pattern === 'random') {
      // Random noise with specified density
      for (let x = 0; x < this.width; x++) {
        initialRow[x] = Math.random() < density ? 1 : 0;
      }

    } else if (pattern instanceof Uint8Array) {
      // Custom pattern
      if (pattern.length !== this.width) {
        console.warn(`Custom pattern length (${pattern.length}) does not match width (${this.width}). Truncating or padding.`);
      }

      const copyLength = Math.min(pattern.length, this.width);
      for (let i = 0; i < copyLength; i++) {
        initialRow[i] = pattern[i];
      }

    } else {
      console.warn(`Unknown pattern type: ${pattern}. Using single cell.`);
      const centerX = Math.floor(this.width / 2);
      initialRow[centerX] = 1;
    }

    // Copy initial row to state buffer (row 0)
    for (let i = 0; i < this.width; i++) {
      this.state[i] = initialRow[i];
    }

    // Copy to current row buffer for next step
    for (let i = 0; i < this.width; i++) {
      this.currentRow[i] = initialRow[i];
    }
  }

  /**
   * Reset the CA with optional new rule
   *
   * @param {number} [newRule] - New rule number (0-255), or keep current rule if undefined
   */
  reset(newRule) {
    if (newRule !== undefined) {
      this.setRule(newRule);
    }

    // Reset to initial condition (single cell by default)
    this.setInitialCondition('single');
  }

  /**
   * Change the active rule
   *
   * @param {number} rule - New rule number (0-255)
   */
  setRule(rule) {
    if (rule < 0 || rule > 255) {
      console.warn(`Invalid rule number: ${rule}. Must be 0-255. Clamping.`);
      rule = Math.max(0, Math.min(255, rule));
    }

    this.rule = rule;
    this._buildRuleLookup();
  }

  /**
   * Get current rule number
   *
   * @returns {number} Current rule (0-255)
   */
  getRule() {
    return this.rule;
  }

  /**
   * Generate multiple generations at once
   * Useful for initial population of the grid
   *
   * @param {number} steps - Number of generations to compute
   */
  generate(steps) {
    for (let i = 0; i < steps; i++) {
      this.step();
    }
  }
}

// ============================================================================
// WORKER MESSAGE HANDLING
// ============================================================================

let engine = null;

/**
 * Main message handler for worker
 */
self.addEventListener('message', (event) => {
  const { type, id } = event.data;

  try {
    switch (type) {
      case 'init':
        handleInit(event.data, id);
        break;

      case 'step':
        handleStep(event.data, id);
        break;

      case 'setInitialCondition':
        handleSetInitialCondition(event.data, id);
        break;

      case 'setRule':
        handleSetRule(event.data, id);
        break;

      case 'reset':
        handleReset(event.data, id);
        break;

      case 'getState':
        handleGetState(event.data, id);
        break;

      default:
        sendError(`Unknown message type: ${type}`, id);
    }
  } catch (error) {
    sendError(`Worker error: ${error.message}`, id);
  }
});

/**
 * Initialize the CA engine
 */
function handleInit(data, id) {
  const { rule, width, height } = data;

  if (rule === undefined || width === undefined || height === undefined) {
    sendError('Missing required parameters: rule, width, height', id);
    return;
  }

  engine = new CAEngine(rule, width, height);

  self.postMessage({
    type: 'ready',
    id,
    generation: engine.getGeneration()
  });
}

/**
 * Compute N steps/generations
 */
function handleStep(data, id) {
  if (!engine) {
    sendError('Engine not initialized. Call init first.', id);
    return;
  }

  const steps = data.steps || 1;

  // Compute multiple steps efficiently in worker
  engine.generate(steps);

  // Send state back to main thread using transferable objects
  const state = engine.getState();
  const stateCopy = new Uint8Array(state); // Create copy for transfer

  self.postMessage({
    type: 'state',
    id,
    state: stateCopy,
    generation: engine.getGeneration()
  }, [stateCopy.buffer]); // Transfer ownership of buffer
}

/**
 * Set initial condition pattern
 */
function handleSetInitialCondition(data, id) {
  if (!engine) {
    sendError('Engine not initialized. Call init first.', id);
    return;
  }

  const { pattern, options } = data;

  engine.setInitialCondition(pattern, options || {});

  // Send updated state
  const state = engine.getState();
  const stateCopy = new Uint8Array(state);

  self.postMessage({
    type: 'state',
    id,
    state: stateCopy,
    generation: engine.getGeneration()
  }, [stateCopy.buffer]);
}

/**
 * Change active rule
 */
function handleSetRule(data, id) {
  if (!engine) {
    sendError('Engine not initialized. Call init first.', id);
    return;
  }

  const { rule } = data;

  if (rule === undefined) {
    sendError('Missing required parameter: rule', id);
    return;
  }

  engine.setRule(rule);

  self.postMessage({
    type: 'ruleChanged',
    id,
    rule: engine.getRule()
  });
}

/**
 * Reset CA with optional new rule
 */
function handleReset(data, id) {
  if (!engine) {
    sendError('Engine not initialized. Call init first.', id);
    return;
  }

  const { newRule } = data;

  engine.reset(newRule);

  // Send updated state
  const state = engine.getState();
  const stateCopy = new Uint8Array(state);

  self.postMessage({
    type: 'state',
    id,
    state: stateCopy,
    generation: engine.getGeneration()
  }, [stateCopy.buffer]);
}

/**
 * Get current state
 */
function handleGetState(data, id) {
  if (!engine) {
    sendError('Engine not initialized. Call init first.', id);
    return;
  }

  // Send state using transferable objects
  const state = engine.getState();
  const stateCopy = new Uint8Array(state);

  self.postMessage({
    type: 'state',
    id,
    state: stateCopy,
    generation: engine.getGeneration()
  }, [stateCopy.buffer]);
}

/**
 * Send error message to main thread
 */
function sendError(message, id) {
  self.postMessage({
    type: 'error',
    id,
    message
  });
}

// Worker is ready
console.log('CA Worker initialized');
