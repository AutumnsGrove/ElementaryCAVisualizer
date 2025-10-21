/**
 * PerformanceMonitor - Real-time FPS and performance monitoring
 *
 * Tracks frame rate, frame time, and displays a cyberpunk-styled overlay
 * with color-coded performance indicators.
 *
 * @author Claude (Sonnet 4.5)
 * @version 1.0.0
 */

class PerformanceMonitor {
    /**
     * Initialize the performance monitoring system
     */
    constructor() {
        // Frame tracking
        this.frameCount = 0;
        this.lastFrameTime = 0;
        this.currentFPS = 60;
        this.currentFrameTime = 0;

        // Statistics (circular buffer for efficiency)
        this.maxHistorySize = 60;
        this.frameTimeHistory = new Array(this.maxHistorySize).fill(16.67);
        this.historyIndex = 0;

        // Min/Max tracking
        this.minFPS = 60;
        this.maxFPS = 60;

        // Display settings
        this.visible = true;
        this.x = 10; // Position from top-left (will adjust for canvas size)
        this.y = 10;
        this.width = 200;
        this.height = 100;
        this.padding = 10;

        // Cyberpunk color scheme
        this.colors = {
            excellent: '#00ff00',  // Green (>= 55 FPS)
            good: '#ffff00',        // Yellow (>= 30 FPS)
            poor: '#ff0066',        // Pink/Red (< 30 FPS)
            bg: 'rgba(10, 10, 20, 0.85)',
            text: '#00ffff',        // Cyan
            accent: '#ff00ff'       // Magenta
        };

        // Pre-calculate thresholds
        this.FPS_EXCELLENT = 55;
        this.FPS_GOOD = 30;
    }

    /**
     * Update performance metrics (call once per frame)
     * Uses high-resolution timing for accurate measurements
     */
    update() {
        const currentTime = performance.now();

        // Calculate frame time
        if (this.lastFrameTime > 0) {
            this.currentFrameTime = currentTime - this.lastFrameTime;

            // Calculate FPS from frame time
            this.currentFPS = 1000 / this.currentFrameTime;

            // Update circular buffer
            this.frameTimeHistory[this.historyIndex] = this.currentFrameTime;
            this.historyIndex = (this.historyIndex + 1) % this.maxHistorySize;

            // Update min/max
            this.minFPS = Math.min(this.minFPS, this.currentFPS);
            this.maxFPS = Math.max(this.maxFPS, this.currentFPS);
        }

        this.lastFrameTime = currentTime;
        this.frameCount++;
    }

    /**
     * Render the performance overlay to the canvas
     * @param {p5} p - p5.js instance
     */
    render(p) {
        if (!this.visible) return;

        // Save current drawing state
        p.push();

        // Switch to 2D mode for overlay (if in WEBGL mode)
        p.resetMatrix();

        // Calculate position (top-right corner)
        const posX = p.width / 2 - this.width - this.x;
        const posY = -p.height / 2 + this.y;

        // Draw semi-transparent background
        p.fill(this.colors.bg);
        p.noStroke();
        p.rect(posX, posY, this.width, this.height);

        // Determine FPS color
        const fpsColor = this._getFPSColor(this.currentFPS);

        // Draw FPS (large, color-coded)
        p.fill(fpsColor);
        p.textAlign(p.LEFT, p.TOP);
        p.textSize(28);
        p.text(`${Math.round(this.currentFPS)} FPS`, posX + this.padding, posY + this.padding);

        // Draw average FPS (smaller text)
        const avgFPS = this.getAverageFPS();
        p.fill(this.colors.text);
        p.textSize(14);
        p.text(`Avg: ${Math.round(avgFPS)} FPS`, posX + this.padding, posY + this.padding + 32);

        // Draw frame time
        p.text(`Frame: ${this.currentFrameTime.toFixed(2)} ms`, posX + this.padding, posY + this.padding + 50);

        // Draw min/max stats
        p.textSize(11);
        p.fill(this.colors.accent);
        p.text(
            `Min: ${Math.round(this.minFPS)} | Max: ${Math.round(this.maxFPS)}`,
            posX + this.padding,
            posY + this.padding + 70
        );

        // Optional: Draw mini frame time graph (last 60 frames)
        this._drawFrameGraph(p, posX, posY);

        // Restore drawing state
        p.pop();
    }

    /**
     * Draw a mini frame time graph
     * @param {p5} p - p5.js instance
     * @param {number} posX - X position of overlay
     * @param {number} posY - Y position of overlay
     * @private
     */
    _drawFrameGraph(p, posX, posY) {
        const graphHeight = 20;
        const graphY = posY + this.height - graphHeight - 5;
        const graphWidth = this.width - this.padding * 2;
        const barWidth = graphWidth / this.maxHistorySize;

        // Find max frame time for scaling
        const maxFrameTime = Math.max(...this.frameTimeHistory, 33.33); // At least 30 FPS range

        p.noStroke();

        // Draw bars for each frame
        for (let i = 0; i < this.maxHistorySize; i++) {
            const idx = (this.historyIndex + i) % this.maxHistorySize;
            const frameTime = this.frameTimeHistory[idx];
            const barHeight = (frameTime / maxFrameTime) * graphHeight;
            const x = posX + this.padding + i * barWidth;

            // Color code based on frame time
            const fps = 1000 / frameTime;
            const barColor = this._getFPSColor(fps);

            p.fill(barColor);
            p.rect(x, graphY + graphHeight - barHeight, barWidth - 1, barHeight);
        }
    }

    /**
     * Get color based on FPS performance
     * @param {number} fps - Current FPS value
     * @returns {string} - Color hex code
     * @private
     */
    _getFPSColor(fps) {
        if (fps >= this.FPS_EXCELLENT) return this.colors.excellent;
        if (fps >= this.FPS_GOOD) return this.colors.good;
        return this.colors.poor;
    }

    /**
     * Get current FPS
     * @returns {number} - Current frames per second
     */
    getFPS() {
        return this.currentFPS;
    }

    /**
     * Get average FPS over last N frames
     * @returns {number} - Average frames per second
     */
    getAverageFPS() {
        const sum = this.frameTimeHistory.reduce((acc, ft) => acc + ft, 0);
        const avgFrameTime = sum / this.maxHistorySize;
        return 1000 / avgFrameTime;
    }

    /**
     * Get last frame duration in milliseconds
     * @returns {number} - Frame time in ms
     */
    getFrameTime() {
        return this.currentFrameTime;
    }

    /**
     * Reset performance statistics
     */
    reset() {
        this.frameCount = 0;
        this.minFPS = this.currentFPS;
        this.maxFPS = this.currentFPS;
        this.frameTimeHistory.fill(16.67);
        this.historyIndex = 0;
        console.log('Performance monitor reset');
    }

    /**
     * Show or hide the performance overlay
     * @param {boolean} visible - Whether to display the overlay
     */
    setVisible(visible) {
        this.visible = visible;
    }

    /**
     * Toggle visibility
     */
    toggle() {
        this.visible = !this.visible;
    }

    /**
     * Get performance report as object
     * @returns {object} - Performance metrics
     */
    getReport() {
        return {
            currentFPS: Math.round(this.currentFPS),
            averageFPS: Math.round(this.getAverageFPS()),
            frameTime: this.currentFrameTime.toFixed(2),
            minFPS: Math.round(this.minFPS),
            maxFPS: Math.round(this.maxFPS),
            frameCount: this.frameCount
        };
    }
}
