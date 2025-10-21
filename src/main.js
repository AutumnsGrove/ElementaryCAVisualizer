/**
 * Elementary CA Visualizer - Main Application
 *
 * This is the main entry point for the p5.js sketch.
 * Sets up the canvas, initializes the CA engine, and runs the animation loop.
 *
 * @author Claude (Sonnet 4.5)
 * @version 1.0.0
 */

// ============================================================================
// GLOBAL STATE
// ============================================================================

let canvas;
let caEngine;
let renderer;
let paletteManager;
let controlManager;
let perfMonitor;

let currentSpeed = 1.0;
let frameCounter = 0;

// ============================================================================
// P5.JS SETUP
// ============================================================================

/**
 * p5.js setup function - runs once at startup
 */
function setup() {
    // Calculate responsive canvas size (90vw × 70vh)
    const canvasWidth = Math.floor(windowWidth * 0.9);
    const canvasHeight = Math.floor(windowHeight * 0.7);

    // Create canvas with WebGL mode
    canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
    canvas.parent('canvas-container');
    frameRate(60);

    // Initialize palette manager
    paletteManager = new PaletteManager('synthwave');

    // Initialize CA engine with Rule 30
    caEngine = new CAEngine(30, canvasWidth, canvasHeight);
    caEngine.setInitialCondition('single'); // Single center pixel

    // Initialize renderer
    renderer = new Renderer(this);
    renderer.setup();
    renderer.setPalette(paletteManager.getCurrentPalette());

    // Initialize performance monitor
    perfMonitor = new PerformanceMonitor();
    perfMonitor.setVisible(true);

    // Initialize controls
    controlManager = new ControlManager();
    controlManager.setupUI();

    // Wire up control callbacks
    controlManager.setCallbacks({
        onRuleChange: (rule) => {
            caEngine.setRule(rule);
            caEngine.setInitialCondition('single');
            console.log(`Rule changed to ${rule}`);
        },
        onPlayPause: (isPaused) => {
            console.log(isPaused ? 'Paused' : 'Playing');
        },
        onReset: () => {
            caEngine.reset();
            caEngine.setInitialCondition('single');
            console.log('CA reset with new seed');
        },
        onSpeedChange: (speed) => {
            currentSpeed = speed;
            console.log(`Speed: ${speed.toFixed(1)}x`);
        },
        onPaletteChange: (paletteName) => {
            paletteManager.setPalette(paletteName);
            renderer.setPalette(paletteManager.getCurrentPalette());
            console.log(`Palette changed to ${paletteName}`);
        }
    });

    console.log('Elementary CA Visualizer initialized');
    console.log(`Canvas: ${width}x${height}`);
    console.log(`Rule: 30 (chaotic pattern)`);
    console.log(`Palette: Synthwave`);
}

// ============================================================================
// P5.JS DRAW LOOP
// ============================================================================

/**
 * p5.js draw function - runs every frame
 */
function draw() {
    // Update performance monitor
    perfMonitor.update();

    // Get current control state
    const controlState = controlManager.getState();

    // Update CA based on speed (skip frames if speed < 1.0, run multiple steps if speed > 1.0)
    if (!controlState.isPaused) {
        const stepsToRun = Math.max(1, Math.round(currentSpeed));

        if (currentSpeed >= 1.0) {
            // Run multiple steps for speeds > 1.0x
            for (let i = 0; i < stepsToRun; i++) {
                caEngine.step();
                frameCounter++;
            }
        } else {
            // Run step only every N frames for speeds < 1.0x
            if (frameCounter % Math.round(1 / currentSpeed) === 0) {
                caEngine.step();
            }
            frameCounter++;
        }
    }

    // Get CA state
    const caState = caEngine.getState();
    const palette = paletteManager.getCurrentPalette();

    // Render CA
    renderer.render(caState, width, height, palette);

    // Render performance overlay (on top of everything)
    perfMonitor.render(this);
}

// ============================================================================
// INPUT HANDLERS
// ============================================================================

/**
 * Handle keyboard input
 */
function keyPressed() {
    switch(key.toLowerCase()) {
        case ' ':
            // Play/Pause toggle
            const currentState = controlManager.getState();
            controlManager.setState({ isPaused: !currentState.isPaused });
            break;

        case 'r':
            // Randomize rule
            const randomRule = Math.floor(Math.random() * 256);
            controlManager.setState({ rule: randomRule });
            caEngine.setRule(randomRule);
            caEngine.reset();
            caEngine.setInitialCondition('single');
            console.log(`Random rule: ${randomRule}`);
            break;

        case 'p':
            // Toggle performance monitor
            perfMonitor.toggle();
            break;

        case 's':
            // Screenshot (Phase 6)
            console.log('Screenshot (not yet implemented - Phase 6)');
            break;

        case 'v':
            // Video recording (Phase 6)
            console.log('Video recording (not yet implemented - Phase 6)');
            break;

        case 'g':
            // Glitch effect (Phase 3)
            console.log('Glitch effect (not yet implemented - Phase 3)');
            break;

        case 'b':
            // Bloom effect (Phase 3)
            console.log('Bloom effect (not yet implemented - Phase 3)');
            break;

        case 't':
            // Temporal trails (Phase 3)
            console.log('Temporal trails (not yet implemented - Phase 3)');
            break;

        case '1':
            // Switch to Synthwave palette
            controlManager.setState({ palette: 'synthwave' });
            paletteManager.setPalette('synthwave');
            renderer.setPalette(paletteManager.getCurrentPalette());
            break;

        case '2':
            // Switch to Vaporwave palette
            controlManager.setState({ palette: 'vaporwave' });
            paletteManager.setPalette('vaporwave');
            renderer.setPalette(paletteManager.getCurrentPalette());
            break;

        default:
            break;
    }

    return false; // Prevent default behavior
}

/**
 * Window resize handler
 */
function windowResized() {
    // Calculate new responsive canvas size
    const newWidth = Math.floor(windowWidth * 0.9);
    const newHeight = Math.floor(windowHeight * 0.7);

    // Resize canvas
    resizeCanvas(newWidth, newHeight);

    // Reinitialize CA engine with new dimensions
    caEngine = new CAEngine(controlManager.getState().rule, newWidth, newHeight);
    caEngine.setInitialCondition('single');

    // Reinitialize renderer
    renderer.setup();
    renderer.setPalette(paletteManager.getCurrentPalette());

    console.log(`Canvas resized: ${newWidth}x${newHeight}`);
}
