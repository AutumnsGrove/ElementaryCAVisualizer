/**
 * Elementary CA Visualizer - Control Manager
 *
 * Manages UI controls, state synchronization, and user interactions
 *
 * @author Claude (Sonnet 4.5)
 * @version 1.0.0
 */

// ============================================================================
// CONTROL MANAGER CLASS
// ============================================================================

class ControlManager {
    /**
     * Initialize control manager with default state
     */
    constructor() {
        this.state = {
            rule: 30,
            isPaused: false,
            speed: 1.0,
            palette: 'synthwave'
        };

        this.callbacks = {
            onRuleChange: null,
            onPlayPause: null,
            onReset: null,
            onSpeedChange: null,
            onPaletteChange: null
        };

        // Debounce timers
        this.debounceTimers = {};
    }

    /**
     * Set up UI elements and inject into DOM
     */
    setupUI() {
        const controlsHTML = `
            <div id="controls-panel" class="controls-cyberpunk">
                <div class="control-group">
                    <label for="rule-input">Rule (0-255):</label>
                    <input type="number" id="rule-input" min="0" max="255" value="${this.state.rule}">
                </div>
                <div class="control-group">
                    <button id="play-pause-btn">${this.state.isPaused ? '▶ Play' : '⏸ Pause'}</button>
                    <button id="reset-btn">🔄 Reset</button>
                </div>
                <div class="control-group">
                    <label for="speed-slider">Speed:</label>
                    <input type="range" id="speed-slider" min="0.1" max="10" step="0.1" value="${this.state.speed}">
                    <span id="speed-value">${this.state.speed.toFixed(1)}x</span>
                </div>
                <div class="control-group">
                    <label for="palette-select">Palette:</label>
                    <select id="palette-select">
                        <option value="synthwave" ${this.state.palette === 'synthwave' ? 'selected' : ''}>Synthwave</option>
                        <option value="vaporwave" ${this.state.palette === 'vaporwave' ? 'selected' : ''}>Vaporwave</option>
                    </select>
                </div>
            </div>

            <style>
                .controls-cyberpunk {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.85);
                    border: 2px solid #00ffff;
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
                    font-family: 'Courier New', monospace;
                    color: #00ffff;
                    z-index: 1000;
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }

                .control-group {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .controls-cyberpunk label {
                    font-size: 14px;
                    color: #00ffff;
                }

                .controls-cyberpunk input[type="number"],
                .controls-cyberpunk select {
                    background: rgba(255, 0, 255, 0.1);
                    border: 1px solid #ff00ff;
                    border-radius: 5px;
                    color: #00ffff;
                    padding: 5px 10px;
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                }

                .controls-cyberpunk input[type="range"] {
                    width: 120px;
                    accent-color: #ff00ff;
                }

                .controls-cyberpunk button {
                    background: rgba(255, 0, 255, 0.2);
                    border: 1px solid #ff00ff;
                    border-radius: 5px;
                    color: #00ffff;
                    padding: 8px 16px;
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .controls-cyberpunk button:hover {
                    background: rgba(255, 0, 255, 0.4);
                    box-shadow: 0 0 10px rgba(255, 0, 255, 0.6);
                }

                .controls-cyberpunk #speed-value {
                    min-width: 40px;
                    text-align: right;
                    font-weight: bold;
                }
            </style>
        `;

        // Inject into DOM
        const container = document.getElementById('canvas-container') || document.body;
        container.insertAdjacentHTML('beforeend', controlsHTML);

        // Attach event listeners
        this._attachEventListeners();
    }

    /**
     * Attach event listeners to controls
     * @private
     */
    _attachEventListeners() {
        // Rule input with debounce
        const ruleInput = document.getElementById('rule-input');
        if (ruleInput) {
            ruleInput.addEventListener('input', (e) => {
                const value = parseInt(e.target.value, 10);
                if (value >= 0 && value <= 255) {
                    this._debounce('rule', () => {
                        this.state.rule = value;
                        if (this.callbacks.onRuleChange) {
                            this.callbacks.onRuleChange(value);
                        }
                    }, 500);
                }
            });
        }

        // Play/Pause button
        const playPauseBtn = document.getElementById('play-pause-btn');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                this.state.isPaused = !this.state.isPaused;
                playPauseBtn.innerHTML = this.state.isPaused ? '▶ Play' : '⏸ Pause';
                if (this.callbacks.onPlayPause) {
                    this.callbacks.onPlayPause(this.state.isPaused);
                }
            });
        }

        // Reset button
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (this.callbacks.onReset) {
                    this.callbacks.onReset();
                }
            });
        }

        // Speed slider with debounce
        const speedSlider = document.getElementById('speed-slider');
        const speedValue = document.getElementById('speed-value');
        if (speedSlider && speedValue) {
            speedSlider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                speedValue.textContent = `${value.toFixed(1)}x`;
                this._debounce('speed', () => {
                    this.state.speed = value;
                    if (this.callbacks.onSpeedChange) {
                        this.callbacks.onSpeedChange(value);
                    }
                }, 300);
            });
        }

        // Palette selector
        const paletteSelect = document.getElementById('palette-select');
        if (paletteSelect) {
            paletteSelect.addEventListener('change', (e) => {
                this.state.palette = e.target.value;
                if (this.callbacks.onPaletteChange) {
                    this.callbacks.onPaletteChange(e.target.value);
                }
            });
        }
    }

    /**
     * Debounce utility to prevent excessive callback triggers
     * @param {string} key - Unique key for this debounce timer
     * @param {Function} callback - Function to call after delay
     * @param {number} delay - Delay in milliseconds
     * @private
     */
    _debounce(key, callback, delay) {
        clearTimeout(this.debounceTimers[key]);
        this.debounceTimers[key] = setTimeout(callback, delay);
    }

    /**
     * Update UI elements to reflect current state
     */
    updateUI() {
        const ruleInput = document.getElementById('rule-input');
        if (ruleInput) ruleInput.value = this.state.rule;

        const playPauseBtn = document.getElementById('play-pause-btn');
        if (playPauseBtn) {
            playPauseBtn.innerHTML = this.state.isPaused ? '▶ Play' : '⏸ Pause';
        }

        const speedSlider = document.getElementById('speed-slider');
        const speedValue = document.getElementById('speed-value');
        if (speedSlider) speedSlider.value = this.state.speed;
        if (speedValue) speedValue.textContent = `${this.state.speed.toFixed(1)}x`;

        const paletteSelect = document.getElementById('palette-select');
        if (paletteSelect) paletteSelect.value = this.state.palette;
    }

    /**
     * Get current control state
     * @returns {Object} Current state object
     */
    getState() {
        return { ...this.state };
    }

    /**
     * Set control state and update UI
     * @param {Object} newState - State object with values to update
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.updateUI();
    }

    /**
     * Register callback functions for control events
     * @param {Object} callbacks - Object containing callback functions
     */
    setCallbacks(callbacks) {
        this.callbacks = { ...this.callbacks, ...callbacks };
    }
}

// ============================================================================
// BROWSER GLOBAL EXPORT
// ============================================================================

if (typeof window !== 'undefined') {
    window.ControlManager = ControlManager;
}
