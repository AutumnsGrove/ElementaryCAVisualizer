/**
 * CA Worker Manager
 * Manages Web Worker for parallel CA computation with Promise-based API
 *
 * Features:
 * - Promise-based async API for all operations
 * - Message ID system for request/response matching
 * - Transferable objects for efficient data transfer
 * - Comprehensive error handling and propagation
 * - Graceful worker termination
 *
 * @author Claude (Sonnet 4.5)
 * @date 2025-10-21
 */

class CAWorkerManager {
  /**
   * Create a new CA Worker Manager
   */
  constructor() {
    this.worker = null;
    this.messageHandlers = new Map();
    this.nextMessageId = 0;
    this.currentGeneration = 0;
    this.isInitialized = false;
  }

  /**
   * Initialize the worker and CA engine
   *
   * @param {number} rule - ECA rule number (0-255)
   * @param {number} width - Grid width in cells
   * @param {number} height - Grid height in cells
   * @returns {Promise<void>}
   */
  async init(rule, width, height) {
    // Create worker
    this.worker = new Worker('src/workers/ca-worker.js');

    // Set up message routing
    this.worker.addEventListener('message', (event) => {
      this._handleMessage(event);
    });

    // Set up error handling
    this.worker.addEventListener('error', (event) => {
      console.error('Worker error:', event);
      this._handleError(event);
    });

    // Initialize CA engine in worker
    await this._sendMessage({
      type: 'init',
      rule,
      width,
      height
    });

    this.isInitialized = true;
  }

  /**
   * Compute N generations/steps
   *
   * @param {number} steps - Number of generations to compute (default: 1)
   * @returns {Promise<{state: Uint8Array, generation: number}>} Updated state and generation number
   */
  async step(steps = 1) {
    if (!this.isInitialized) {
      throw new Error('Worker not initialized. Call init() first.');
    }

    const response = await this._sendMessage({
      type: 'step',
      steps
    });

    this.currentGeneration = response.generation;
    return response;
  }

  /**
   * Set initial condition pattern
   *
   * @param {string|Uint8Array} pattern - Pattern type ('single', 'random') or custom Uint8Array
   * @param {Object} options - Additional options (e.g., density for random pattern)
   * @returns {Promise<{state: Uint8Array, generation: number}>} Updated state and generation number
   */
  async setInitialCondition(pattern, options = {}) {
    if (!this.isInitialized) {
      throw new Error('Worker not initialized. Call init() first.');
    }

    const response = await this._sendMessage({
      type: 'setInitialCondition',
      pattern,
      options
    });

    this.currentGeneration = response.generation;
    return response;
  }

  /**
   * Change the active CA rule
   *
   * @param {number} rule - New rule number (0-255)
   * @returns {Promise<{rule: number}>} Confirmation with new rule
   */
  async setRule(rule) {
    if (!this.isInitialized) {
      throw new Error('Worker not initialized. Call init() first.');
    }

    return await this._sendMessage({
      type: 'setRule',
      rule
    });
  }

  /**
   * Reset the CA with optional new rule
   *
   * @param {number} [newRule] - New rule number (0-255), or keep current rule if undefined
   * @returns {Promise<{state: Uint8Array, generation: number}>} Reset state and generation number
   */
  async reset(newRule) {
    if (!this.isInitialized) {
      throw new Error('Worker not initialized. Call init() first.');
    }

    const response = await this._sendMessage({
      type: 'reset',
      newRule
    });

    this.currentGeneration = response.generation;
    return response;
  }

  /**
   * Get current CA state
   *
   * @returns {Promise<{state: Uint8Array, generation: number}>} Current state and generation number
   */
  async getState() {
    if (!this.isInitialized) {
      throw new Error('Worker not initialized. Call init() first.');
    }

    const response = await this._sendMessage({
      type: 'getState'
    });

    this.currentGeneration = response.generation;
    return response;
  }

  /**
   * Get current generation number (cached)
   *
   * @returns {number} Current generation count
   */
  getGeneration() {
    return this.currentGeneration;
  }

  /**
   * Terminate the worker and clean up resources
   */
  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }

    // Reject all pending promises
    for (const [id, handler] of this.messageHandlers) {
      handler.reject(new Error('Worker terminated'));
    }

    this.messageHandlers.clear();
    this.isInitialized = false;
  }

  /**
   * Send message to worker and return promise for response
   *
   * @param {Object} message - Message data to send
   * @returns {Promise<Object>} Promise that resolves with worker response
   * @private
   */
  _sendMessage(message) {
    return new Promise((resolve, reject) => {
      const id = this.nextMessageId++;

      // Store handler for this message
      this.messageHandlers.set(id, { resolve, reject });

      // Send message with ID
      this.worker.postMessage({ ...message, id });

      // Set timeout for response (30 seconds)
      setTimeout(() => {
        if (this.messageHandlers.has(id)) {
          this.messageHandlers.delete(id);
          reject(new Error(`Worker timeout: No response for message type '${message.type}'`));
        }
      }, 30000);
    });
  }

  /**
   * Handle incoming messages from worker
   *
   * @param {MessageEvent} event - Message event from worker
   * @private
   */
  _handleMessage(event) {
    const { type, id } = event.data;

    // Get handler for this message ID
    const handler = this.messageHandlers.get(id);

    if (!handler) {
      console.warn('Received message with unknown ID:', id);
      return;
    }

    // Remove handler from map
    this.messageHandlers.delete(id);

    // Handle different message types
    if (type === 'error') {
      handler.reject(new Error(event.data.message));
    } else {
      handler.resolve(event.data);
    }
  }

  /**
   * Handle worker errors
   *
   * @param {ErrorEvent} event - Error event from worker
   * @private
   */
  _handleError(event) {
    // Reject all pending promises with worker error
    for (const [id, handler] of this.messageHandlers) {
      handler.reject(new Error(`Worker error: ${event.message || 'Unknown error'}`));
    }

    this.messageHandlers.clear();
  }

  /**
   * Check if worker is initialized and ready
   *
   * @returns {boolean} True if worker is initialized
   */
  isReady() {
    return this.isInitialized;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CAWorkerManager };
}
