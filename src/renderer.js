/**
 * Elementary CA Visualizer - Renderer Module
 *
 * Implements WebGL-based rendering system for cellular automata visualization.
 * Features:
 * - 1:1 pixel-perfect CA-to-canvas mapping
 * - Responsive canvas sizing (90vw × 70vh)
 * - Efficient pixel buffer updates
 * - Basic shader infrastructure for future effects
 *
 * @author Claude (Sonnet 4.5)
 * @version 1.0.0
 */

// ============================================================================
// BASIC SHADERS (for future Phase 3 effects)
// ============================================================================

/**
 * Vertex shader (passthrough)
 * Transforms vertices and passes texture coordinates to fragment shader
 */
const VERTEX_SHADER = `
precision highp float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
    vTexCoord = aTexCoord;
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    gl_Position = positionVec4;
}
`;

/**
 * Fragment shader (basic color mapping)
 * Maps CA cell states to colors using palette uniforms
 */
const FRAGMENT_SHADER = `
precision highp float;

varying vec2 vTexCoord;

uniform sampler2D uTexture;
uniform vec3 uAliveColor;
uniform vec3 uDeadColor;
uniform float uTime;

void main() {
    vec4 texColor = texture2D(uTexture, vTexCoord);

    // Simple binary mapping: grayscale value determines alive/dead
    float cellState = texColor.r;
    vec3 color = mix(uDeadColor, uAliveColor, cellState);

    gl_FragColor = vec4(color, 1.0);
}
`;

// ============================================================================
// RENDERER CLASS
// ============================================================================

/**
 * Renderer class for CA visualization
 * Handles WebGL initialization, canvas management, and pixel-perfect rendering
 */
class Renderer {
    /**
     * Create a new Renderer instance
     * @param {p5} p - p5.js instance (passed from main sketch)
     */
    constructor(p) {
        this.p = p;

        // Canvas dimensions (will be set in setup)
        this.canvasWidth = 0;
        this.canvasHeight = 0;

        // Graphics buffers
        this.graphics = null;        // Off-screen graphics buffer for CA rendering
        this.shader = null;          // Custom shader (for future use)

        // Pixel buffer for direct pixel manipulation
        this.pixelBuffer = null;

        // Pre-calculated color values (RGBA format)
        this.aliveColorRGBA = [255, 0, 255, 255];  // Hot pink default
        this.deadColorRGBA = [10, 10, 10, 255];    // Near-black default

        // Performance tracking
        this.lastRenderTime = 0;

        console.log('[Renderer] Initialized');
    }

    /**
     * Set up renderer with canvas dimensions and WebGL resources
     * Must be called after p5.js setup() completes
     */
    setup() {
        // Calculate responsive canvas dimensions
        const dims = this.calculateCanvasDimensions();
        this.canvasWidth = dims.width;
        this.canvasHeight = dims.height;

        // Create off-screen graphics buffer for CA rendering
        // Using P2D mode for efficient pixel manipulation
        this.graphics = this.p.createGraphics(this.canvasWidth, this.canvasHeight);

        // Initialize pixel buffer (4 bytes per pixel: RGBA)
        const pixelCount = this.canvasWidth * this.canvasHeight;
        this.pixelBuffer = new Uint8ClampedArray(pixelCount * 4);

        // Pre-fill with dead color (background)
        for (let i = 0; i < pixelCount; i++) {
            const idx = i * 4;
            this.pixelBuffer[idx] = this.deadColorRGBA[0];     // R
            this.pixelBuffer[idx + 1] = this.deadColorRGBA[1]; // G
            this.pixelBuffer[idx + 2] = this.deadColorRGBA[2]; // B
            this.pixelBuffer[idx + 3] = this.deadColorRGBA[3]; // A
        }

        // TODO: Initialize shader (Phase 3)
        // this.shader = this.p.createShader(VERTEX_SHADER, FRAGMENT_SHADER);

        console.log(`[Renderer] Setup complete: ${this.canvasWidth}x${this.canvasHeight}`);
    }

    /**
     * Calculate responsive canvas dimensions
     * Target: 90vw × 70vh (as per spec)
     *
     * @returns {Object} { width: number, height: number }
     */
    calculateCanvasDimensions() {
        const containerWidth = this.p.windowWidth * 0.9;  // 90vw
        const containerHeight = this.p.windowHeight * 0.7; // 70vh

        // Round to nearest pixel for crisp rendering
        return {
            width: Math.floor(containerWidth),
            height: Math.floor(containerHeight)
        };
    }

    /**
     * Get current canvas dimensions
     * @returns {Object} { width: number, height: number }
     */
    getCanvasDimensions() {
        return {
            width: this.canvasWidth,
            height: this.canvasHeight
        };
    }

    /**
     * Update color palette for alive/dead cells
     * @param {Object} palette - Color palette { alive: string, dead: string }
     */
    setPalette(palette) {
        // Convert hex colors to RGBA arrays
        this.aliveColorRGBA = this.hexToRGBA(palette.alive || '#FF00FF');
        this.deadColorRGBA = this.hexToRGBA(palette.dead || '#0A0A0A');

        console.log(`[Renderer] Palette updated: alive=${palette.alive}, dead=${palette.dead}`);
    }

    /**
     * Convert hex color string to RGBA array
     * @param {string} hex - Hex color (e.g., '#FF00FF' or '#F0F')
     * @returns {Array<number>} [r, g, b, a] in range [0, 255]
     */
    hexToRGBA(hex) {
        // Remove # if present
        hex = hex.replace('#', '');

        // Handle shorthand hex (#F0F -> #FF00FF)
        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
        }

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return [r, g, b, 255];
    }

    /**
     * Render CA state to canvas
     * Uses 1:1 pixel mapping: each cell becomes exactly one pixel
     *
     * @param {Uint8Array} caState - CA cell states (0 = dead, 1 = alive)
     * @param {number} gridWidth - CA grid width
     * @param {number} gridHeight - CA grid height
     * @param {Object} palette - Optional color palette override
     */
    render(caState, gridWidth, gridHeight, palette = null) {
        const startTime = performance.now();

        // Update palette if provided
        if (palette) {
            this.setPalette(palette);
        }

        // Update pixel buffer from CA state
        this.updatePixelBuffer(caState, gridWidth, gridHeight);

        // Transfer pixel buffer to graphics buffer
        this.graphics.loadPixels();
        this.graphics.pixels.set(this.pixelBuffer);
        this.graphics.updatePixels();

        // Draw graphics buffer to main canvas
        // In WEBGL mode, need to use image() and adjust coordinates
        this.p.push();
        this.p.imageMode(this.p.CENTER);
        this.p.image(this.graphics, 0, 0);
        this.p.pop();

        // Track render time
        this.lastRenderTime = performance.now() - startTime;
    }

    /**
     * Update pixel buffer from CA state
     * Maps CA grid to canvas with 1:1 pixel correspondence
     *
     * @param {Uint8Array} caState - CA cell states
     * @param {number} gridWidth - CA grid width
     * @param {number} gridHeight - CA grid height
     */
    updatePixelBuffer(caState, gridWidth, gridHeight) {
        // Calculate scaling factors if grid doesn't match canvas exactly
        const scaleX = this.canvasWidth / gridWidth;
        const scaleY = this.canvasHeight / gridHeight;

        // For 1:1 mapping, we expect scaleX ≈ 1 and scaleY ≈ 1
        // If grid is larger than canvas, we'll need to sample
        // If grid is smaller, we'll need to scale up

        for (let y = 0; y < this.canvasHeight; y++) {
            for (let x = 0; x < this.canvasWidth; x++) {
                // Map canvas pixel to CA grid cell
                const gridX = Math.floor(x / scaleX);
                const gridY = Math.floor(y / scaleY);

                // Get CA cell state (with bounds checking)
                const caIndex = gridY * gridWidth + gridX;
                const cellState = (caIndex < caState.length) ? caState[caIndex] : 0;

                // Choose color based on cell state
                const color = cellState === 1 ? this.aliveColorRGBA : this.deadColorRGBA;

                // Write to pixel buffer
                const pixelIndex = (y * this.canvasWidth + x) * 4;
                this.pixelBuffer[pixelIndex] = color[0];     // R
                this.pixelBuffer[pixelIndex + 1] = color[1]; // G
                this.pixelBuffer[pixelIndex + 2] = color[2]; // B
                this.pixelBuffer[pixelIndex + 3] = color[3]; // A
            }
        }
    }

    /**
     * Handle window resize
     * Recalculates canvas dimensions and recreates buffers
     */
    resize() {
        const dims = this.calculateCanvasDimensions();

        // Only resize if dimensions actually changed
        if (dims.width !== this.canvasWidth || dims.height !== this.canvasHeight) {
            this.canvasWidth = dims.width;
            this.canvasHeight = dims.height;

            // Recreate graphics buffer
            this.graphics = this.p.createGraphics(this.canvasWidth, this.canvasHeight);

            // Recreate pixel buffer
            const pixelCount = this.canvasWidth * this.canvasHeight;
            this.pixelBuffer = new Uint8ClampedArray(pixelCount * 4);

            // Resize p5.js canvas
            this.p.resizeCanvas(this.canvasWidth, this.canvasHeight);

            console.log(`[Renderer] Resized to ${this.canvasWidth}x${this.canvasHeight}`);
        }
    }

    /**
     * Get last render time in milliseconds
     * Useful for performance monitoring
     *
     * @returns {number} Render time in ms
     */
    getLastRenderTime() {
        return this.lastRenderTime;
    }

    /**
     * Clear the canvas to background color
     */
    clear() {
        this.graphics.background(this.deadColorRGBA[0], this.deadColorRGBA[1], this.deadColorRGBA[2]);

        // Also clear pixel buffer
        const pixelCount = this.canvasWidth * this.canvasHeight;
        for (let i = 0; i < pixelCount; i++) {
            const idx = i * 4;
            this.pixelBuffer[idx] = this.deadColorRGBA[0];
            this.pixelBuffer[idx + 1] = this.deadColorRGBA[1];
            this.pixelBuffer[idx + 2] = this.deadColorRGBA[2];
            this.pixelBuffer[idx + 3] = this.deadColorRGBA[3];
        }
    }
}
