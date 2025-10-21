# Elementary Cellular Automata Visualizer - Technical Specification

## Project Overview

### Vision
An immersive, live, browser-based visualizer for elementary cellular automata with a cyberpunk aesthetic. The system will support real-time rendering of multiple layered CA rules, procedural infinite generation, and a rich set of visual effects including temporal trails, parallax depth, and post-processing shaders.

### Core Concept
Elementary cellular automata (ECA) are one-dimensional CA systems with 256 possible rules (Rule 0-255). This visualizer will:
- Run multiple ECA rules simultaneously on separate layers
- Blend and composite layers with various blend modes
- Apply cyberpunk-styled post-processing effects
- Generate infinitely from a center point with toroidal wrapping
- Provide comprehensive real-time control over all parameters
- Support export of visuals and configurations

### Target Experience
Users should feel immersed in a living, breathing, generative artwork that responds to their input. The aesthetic should evoke cyberpunk themes: neon colors, glitch effects, depth, and a sense of digital chaos tempered by mathematical precision.

---

## Technical Stack

### Core Technologies
- **p5.js (WebGL mode)**: Primary rendering engine
  - GPU-accelerated graphics
  - Shader support for custom effects
  - Creative coding friendly API
  - Cross-browser compatibility

### Supporting Technologies
- **Web Workers**: Off-main-thread CA computation
  - Prevents UI blocking during complex calculations
  - Parallel processing for multiple CA layers

- **MediaRecorder API**: Video recording
  - Canvas stream capture
  - WebM/MP4 export support

- **Canvas API**: Screenshot export
  - PNG export with toBlob()

- **LocalStorage**: Configuration persistence
  - Save/load user presets
  - Remember last used settings

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│              User Interface Layer               │
│  (Controls, Presets, Export, Keyboard Shortcuts)│
└────────────┬────────────────────────┬───────────┘
             │                        │
             ▼                        ▼
┌────────────────────────┐  ┌─────────────────────┐
│   Control Manager      │  │   Export Manager    │
│  - Parameter updates   │  │  - Screenshot       │
│  - Preset management   │  │  - Video recording  │
│  - State coordination  │  │  - Config JSON      │
└────────────┬───────────┘  └─────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────┐
│              Core Engine Layer                  │
│                                                 │
│  ┌──────────────────┐    ┌──────────────────┐   │
│  │  CA Engine       │    │  Renderer        │   │
│  │  (Web Workers)   │───▶│  (p5.js/WebGL)   │   │
│  │                  │    │                  │   │
│  │ - Rule compute   │    │ - Multi-pass     │   │
│  │ - Multi-layer    │    │ - Layer blend    │   │
│  │ - Buffer mgmt    │    │ - Shader FX      │   │
│  └──────────────────┘    └──────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Module Breakdown

#### 1. CA Engine (`ca-engine.js`)
**Responsibilities:**
- Implement all 256 elementary CA rules
- Manage multiple concurrent CA instances (layers)
- Handle toroidal wrapping logic
- Generate CA from center point outward
- Buffer management for efficient memory usage
- Web Worker integration for non-blocking computation

**Key Classes/Functions:**
```javascript
class CAEngine {
  constructor(rule, width, height)
  step()                    // Compute next generation
  getState()                // Return current state buffer
  setInitialCondition(pattern)
  reset(newRule?)
  setRule(rule)
}

class CALayer {
  constructor(config)
  update()
  getTexture()
  setBlendMode(mode)
  setOpacity(opacity)
}

function computeRule(cells, rule, index) {
  // Apply ECA rule logic
}
```

#### 2. Renderer (`renderer.js`)
**Responsibilities:**
- Initialize p5.js WebGL context
- Multi-pass rendering pipeline
- Layer composition and blending
- Shader management
- Frame buffer management for temporal effects
- Camera/viewport management

**Rendering Pipeline:**
```
1. Clear frame buffer
2. For each CA layer:
   a. Render CA to texture
   b. Apply layer-specific shaders
3. Composite all layers with blend modes
4. Apply temporal trail effect (blend with history buffer)
5. Apply parallax depth effect
6. Post-processing pass:
   a. Chromatic aberration
   b. Bloom
   c. Glitch
   d. Scan lines
7. Output to screen
```

**Key Classes/Functions:**
```javascript
class Renderer {
  constructor(p5Instance)
  setup()
  render(layers, params)
  applyPostProcessing(params)
  createShader(vertSrc, fragSrc)
}

class ShaderManager {
  loadShaders()
  getShader(name)
  updateUniforms(shader, params)
}
```

#### 3. Shader System (`shaders/`)

**CA Vertex Shader** (`ca-vertex.glsl`)
```glsl
// Standard vertex shader for CA grid
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}
```

**CA Fragment Shader** (`ca-fragment.glsl`)
```glsl
// Convert CA cell data to colored pixels
precision highp float;
varying vec2 vTexCoord;
uniform sampler2D uCellData;
uniform vec3 uColorAlive;
uniform vec3 uColorDead;
uniform float uGradientSteps;

void main() {
  float cell = texture2D(uCellData, vTexCoord).r;
  vec3 color = mix(uColorDead, uColorAlive, cell);
  gl_FragColor = vec4(color, 1.0);
}
```

**Post-Processing Shader** (`post-fx.glsl`)
```glsl
// Cyberpunk effects: glitch, chromatic aberration, bloom, scan lines
precision highp float;
varying vec2 vTexCoord;
uniform sampler2D uTexture;
uniform float uTime;
uniform float uGlitchIntensity;
uniform float uChromaticAberration;
uniform float uBloomIntensity;
uniform float uScanLineIntensity;
uniform vec2 uResolution;

// ... shader implementation
```

**Parallax Shader** (`parallax.glsl`)
```glsl
// 3D depth effect for layers
// Offset layers based on depth value
```

#### 4. Control Interface (`controls.js`)
**Responsibilities:**
- UI element creation and management
- Real-time parameter updates
- Keyboard shortcut handling
- Preset system interface
- Visual feedback for parameter changes

**UI Components:**
- Rule selectors (dropdowns or number inputs) for each layer
- Speed controls (play/pause/step, speed slider)
- Color palette selectors
- Effect intensity sliders (glitch, bloom, trails, etc.)
- Blend mode selectors per layer
- Initialization pattern selector
- Random seed generator button
- Export buttons (screenshot, record, save config)

**Keyboard Shortcuts:**
```
Space:      Play/Pause
R:          Randomize all rules
S:          Take screenshot
V:          Toggle video recording
1-5:        Switch to preset 1-5
Arrow Up:   Increase speed
Arrow Down: Decrease speed
G:          Toggle glitch effect
B:          Toggle bloom effect
T:          Toggle temporal trails
```

#### 5. Preset System (`presets.js`)
**Responsibilities:**
- Store interesting configurations
- Quick-load functionality
- User preset saving
- Preset management UI

**Preset Format:**
```javascript
{
  name: "Neon Chaos",
  description: "High-energy multi-rule composition",
  layers: [
    { rule: 30, opacity: 0.8, blendMode: "ADD", color: "#FF00FF" },
    { rule: 110, opacity: 0.6, blendMode: "SCREEN", color: "#00FFFF" },
    { rule: 184, opacity: 0.5, blendMode: "MULTIPLY", color: "#FF00AA" }
  ],
  effects: {
    glitch: 0.3,
    bloom: 0.7,
    chromatic: 0.2,
    scanLines: 0.4,
    trails: 0.8,
    parallax: 0.6
  },
  colorPalette: "synthwave",
  speed: 1.0,
  initialization: "random"
}
```

**Built-in Presets:**
1. **Neon Dreams** - Synthwave colors, high bloom, medium glitch
2. **Vaporwave Chill** - Pastel colors, heavy trails, slow speed
3. **Digital Rain** - Matrix-style green cascade
4. **Glitch City** - High glitch, fast speed, multiple chaotic rules
5. **Minimal Techno** - Single rule, clean lines, rhythmic

#### 6. Export Manager (`export.js`)
**Responsibilities:**
- Screenshot capture
- Video recording with MediaRecorder
- Configuration JSON export/import
- File download handling

---

## Feature Specifications

### 1. Multiple CA Layers

**Layer Count:** 3-5 simultaneous layers (configurable, default 3)

**Per-Layer Configuration:**
- ECA rule (0-255)
- Opacity (0-1)
- Blend mode (ADD, MULTIPLY, SCREEN, OVERLAY, NORMAL)
- Color mapping (alive/dead colors or gradient)
- Enabled/disabled toggle

**Blend Modes:**
```javascript
const BLEND_MODES = {
  NORMAL: "normal",
  ADD: "additive",
  MULTIPLY: "multiply",
  SCREEN: "screen",
  OVERLAY: "overlay"
};
```

### 2. Initialization Patterns

**Random Noise:**
- Each cell has X% chance of being alive (configurable density)
- Good for chaotic, organic starts

**Single Center Pixel:**
- Classic ECA visualization
- Single alive cell in center
- Symmetrical evolution

**User Drawable:**
- Click-and-drag interface before simulation starts
- Paint tool with brush size control
- Clear button
- Mirror mode option

**Preset Patterns:**
- Fibonacci sequence
- Alternating pattern
- Custom saved patterns
- Random famous mathematical sequences

### 3. Toroidal Wrapping & Infinite Generation

**Toroidal Topology:**
- Left edge wraps to right edge
- Top edge wraps to bottom edge (for 2D view of generations)
- Creates seamless infinite tiling

**Center-Outward Generation:**
- Initial pattern placed at viewport center
- CA generates outward in all directions
- Viewport can pan to explore different regions
- Generation computed on-demand for visible area + buffer

**Implementation Strategy:**
```javascript
// Circular buffer for efficient infinite generation
class InfiniteCAGrid {
  constructor(viewportWidth, viewportHeight, bufferSize) {
    this.buffer = bufferSize; // Extra cells beyond viewport
    this.centerX = 0;
    this.centerY = 0;
  }

  getCellState(x, y) {
    // Wrap coordinates
    const wrappedX = ((x % this.width) + this.width) % this.width;
    const wrappedY = ((y % this.height) + this.height) % this.height;
    return this.grid[wrappedY][wrappedX];
  }

  pan(dx, dy) {
    // Update center, regenerate as needed
  }
}
```

### 4. Visual Effects Stack

#### Temporal Trails
- **Implementation:** Blend current frame with previous frames
- **Parameters:**
  - Trail length (0-1, where 1 = infinite trail)
  - Trail opacity decay
- **Shader approach:** Mix current frame with history buffer

#### Parallax Depth
- **Implementation:** Offset each layer based on depth value
- **Parameters:**
  - Depth per layer
  - Parallax intensity
  - Mouse/touch tracking for interactive parallax
- **Effect:** Creates 3D illusion with 2D layers

#### Chromatic Aberration
- **Implementation:** Offset RGB channels slightly
- **Parameters:**
  - Aberration intensity (pixel offset)
  - Aberration direction (horizontal, vertical, radial)
- **Shader:** Sample texture with R, G, B channel offsets

#### Bloom
- **Implementation:** Gaussian blur + additive blend
- **Parameters:**
  - Bloom threshold (brightness cutoff)
  - Bloom intensity
  - Bloom radius
- **Multi-pass:** Downsample, blur, upsample, composite

#### Glitch Effect
- **Implementation:** Random pixel offset, color shift, scan line displacement
- **Parameters:**
  - Glitch intensity
  - Glitch frequency (how often glitches occur)
  - Glitch types (block displacement, color corruption, scan line shift)
- **Time-based:** Randomized per frame or triggered

#### Scan Lines
- **Implementation:** Horizontal or vertical line overlay
- **Parameters:**
  - Line spacing
  - Line opacity
  - CRT curvature (optional)
- **Shader:** Modulo-based line pattern

### 5. Color Palettes

#### Neon/Synthwave
```javascript
const SYNTHWAVE = {
  background: "#0a0a0a",
  primary: "#ff00ff",    // Hot pink
  secondary: "#00ffff",  // Cyan
  tertiary: "#ff0080",   // Pink
  quaternary: "#0080ff", // Electric blue
  gradients: [
    ["#ff00ff", "#ff0080", "#ff00ff"], // Pink cycle
    ["#00ffff", "#0080ff", "#00ffff"]  // Blue cycle
  ]
};
```

#### Vaporwave Pastels
```javascript
const VAPORWAVE = {
  background: "#1a0033",
  primary: "#ff99cc",    // Soft pink
  secondary: "#99ccff",  // Light blue
  tertiary: "#cc99ff",   // Lavender
  quaternary: "#ffccff", // Pale pink
  gradients: [
    ["#ff99cc", "#cc99ff", "#99ccff"], // Pastel rainbow
  ]
};
```

**Palette Features:**
- Smooth color transitions between states
- Per-layer palette override
- Real-time palette switching
- Custom palette editor

### 6. Real-Time Controls

**Rule Switching:**
- Dropdown or number input per layer
- Instant rule change without reset
- Random rule button
- Rule preset buttons (famous rules: 30, 90, 110, 184)

**Speed Control:**
- Play/Pause toggle
- Speed slider (0.1x - 10x)
- Step-through (advance one generation)
- FPS display

**Visual Parameters:**
All effect intensities adjustable via sliders:
- Glitch intensity
- Bloom intensity
- Chromatic aberration
- Scan line opacity
- Temporal trail length
- Parallax depth

**Layer Controls:**
- Add/remove layers
- Reorder layers (z-index)
- Solo/mute layers
- Copy layer settings

**Random Seed/Restart:**
- Randomize all rules
- Randomize colors
- Randomize effects
- Reset to initial state
- New random seed

### 7. Export Capabilities

#### Screenshot (PNG)
```javascript
function exportScreenshot() {
  const canvas = document.getElementById("defaultCanvas0");
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ca-snapshot-${Date.now()}.png`;
    a.click();
  });
}
```

#### Video Recording (WebM)
```javascript
class VideoRecorder {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.stream = canvas.captureStream(60); // 60fps
    this.mediaRecorder = new MediaRecorder(this.stream, {
      mimeType: 'video/webm',
      videoBitsPerSecond: 5000000
    });
    this.chunks = [];
  }

  start() {
    this.mediaRecorder.start();
  }

  stop() {
    this.mediaRecorder.stop();
    // Download on stop
  }
}
```

**Recording Features:**
- Start/stop recording button
- Recording indicator
- Duration display
- Quality settings (resolution, bitrate)

#### Config Save/Load (JSON)
```javascript
function exportConfig() {
  const config = {
    version: "1.0.0",
    timestamp: Date.now(),
    layers: layers.map(l => l.getConfig()),
    effects: effectsManager.getConfig(),
    palette: currentPalette,
    // ... all parameters
  };

  const blob = new Blob([JSON.stringify(config, null, 2)],
    { type: "application/json" });
  // Download
}

function importConfig(file) {
  // Read JSON, validate, apply settings
}
```

---

## Performance Targets

### Frame Rate
- **Target:** 60 FPS
- **Minimum acceptable:** 30 FPS
- **Strategy:**
  - GPU-accelerated rendering
  - Web Workers for CA computation
  - Efficient buffer management
  - LOD system for very large grids

### Memory Management
- **Buffer strategy:** Ring buffer for temporal history
- **Maximum history:** 60-120 frames
- **Texture pooling:** Reuse WebGL textures
- **Garbage collection:** Avoid creating objects in render loop

### Optimization Techniques
1. **Web Workers:** Offload CA computation to separate thread
2. **Texture atlases:** Combine multiple CA layers into single texture
3. **Shader optimization:** Minimize texture lookups and branching
4. **LOD (Level of Detail):** Reduce CA resolution when zoomed out
5. **Culling:** Don't compute CA cells outside viewport + buffer
6. **Debouncing:** Throttle control updates to avoid excessive recalculation

---

## File Structure

```
ElementaryCAVisualizer/
├── index.html                 # Main HTML entry point
├── TECHNICAL_SPEC.md          # This document
├── README.md                  # User-facing documentation
├── CLAUDE.md                  # Claude Code instructions
├── TODOS.md                   # Task tracking
├── .gitignore                 # Git ignore rules
├── secrets_template.json      # Template for API keys (if needed)
│
├── src/
│   ├── main.js                # App initialization and main loop
│   ├── ca-engine.js           # CA computation engine
│   ├── renderer.js            # WebGL rendering system
│   ├── controls.js            # UI controls and input handling
│   ├── presets.js             # Preset configurations
│   ├── export.js              # Export functionality
│   ├── utils.js               # Utility functions
│   │
│   ├── shaders/
│   │   ├── ca-vertex.glsl     # CA vertex shader
│   │   ├── ca-fragment.glsl   # CA fragment shader
│   │   ├── post-fx.glsl       # Post-processing effects
│   │   ├── bloom.glsl         # Bloom effect
│   │   ├── glitch.glsl        # Glitch effect
│   │   └── parallax.glsl      # Parallax depth shader
│   │
│   ├── workers/
│   │   └── ca-worker.js       # Web Worker for CA computation
│   │
│   └── ui/
│       ├── controls-panel.js  # Control panel UI
│       ├── preset-panel.js    # Preset selection UI
│       └── export-panel.js    # Export controls UI
│
├── styles/
│   ├── main.css               # Main stylesheet
│   ├── controls.css           # Control panel styling
│   └── cyberpunk-theme.css    # Cyberpunk aesthetic theme
│
├── assets/
│   ├── fonts/                 # Cyberpunk-style fonts
│   ├── icons/                 # UI icons
│   └── presets/               # Saved preset JSON files
│
└── lib/
    └── p5.min.js              # p5.js library (or load from CDN)
```

---

## Implementation Phases

### Phase 1: Foundation (Core CA + Basic Rendering)
**Goal:** Get basic CA visualization working

**Tasks:**
1. Set up p5.js project structure
2. Implement single-layer CA engine
   - Rule computation (all 256 rules)
   - State management
   - Toroidal wrapping
3. Basic renderer
   - Display CA as black/white grid
   - Simple color mapping
4. Basic controls
   - Rule selector
   - Play/pause
   - Reset button
5. Initialize patterns
   - Random noise
   - Single center pixel

**Deliverable:** Working single-layer CA visualizer with basic controls

### Phase 2: Multi-Layer System
**Goal:** Support multiple concurrent CA layers with blending

**Tasks:**
1. Refactor CA engine for multiple instances
2. Layer management system
   - Add/remove layers
   - Per-layer configuration
3. Implement blend modes
4. Layer controls UI
5. Basic color palettes

**Deliverable:** Multi-layer CA system with basic color and blending

### Phase 3: Effects Pipeline
**Goal:** Add cyberpunk visual effects

**Tasks:**
1. Shader system setup
2. Temporal trails effect
3. Chromatic aberration
4. Bloom effect
5. Glitch effect
6. Scan lines effect
7. Parallax depth
8. Effect control UI

**Deliverable:** Full effects pipeline with real-time control

### Phase 4: Infinite Generation
**Goal:** Implement center-outward infinite generation

**Tasks:**
1. Viewport system
2. Pan/zoom camera
3. Infinite grid with toroidal wrapping
4. On-demand generation
5. Buffer management

**Deliverable:** Infinite explorable CA space

### Phase 5: Advanced Controls & Presets
**Goal:** Polish UX and add preset system

**Tasks:**
1. Complete UI implementation
2. Keyboard shortcuts
3. Preset system
   - Built-in presets
   - Save/load custom presets
4. Palette editor
5. Advanced initialization patterns
   - User drawable
   - Preset patterns
6. Performance optimization

**Deliverable:** Polished, full-featured interface

### Phase 6: Export & Final Polish
**Goal:** Add export capabilities and final touches

**Tasks:**
1. Screenshot export
2. Video recording
3. Config export/import
4. Performance profiling and optimization
5. Cross-browser testing
6. Documentation
7. Example presets and showcase

**Deliverable:** Production-ready visualizer

---

## API Reference

### CAEngine Class

```javascript
class CAEngine {
  /**
   * Create a new CA engine instance
   * @param {number} rule - ECA rule (0-255)
   * @param {number} width - Grid width
   * @param {number} height - Grid height
   */
  constructor(rule, width, height)

  /**
   * Compute next generation
   */
  step()

  /**
   * Get current state as Uint8Array
   * @returns {Uint8Array} Current cell states
   */
  getState()

  /**
   * Set initial condition
   * @param {string|Uint8Array} pattern - "random", "single", or custom array
   * @param {Object} options - Pattern-specific options
   */
  setInitialCondition(pattern, options = {})

  /**
   * Reset CA with optional new rule
   * @param {number} newRule - Optional new rule
   */
  reset(newRule)

  /**
   * Change the rule
   * @param {number} rule - New ECA rule (0-255)
   */
  setRule(rule)
}
```

### Renderer Class

```javascript
class Renderer {
  /**
   * Initialize renderer
   * @param {p5} p - p5.js instance
   */
  constructor(p)

  /**
   * Setup WebGL context and shaders
   */
  setup()

  /**
   * Render frame
   * @param {Array<CALayer>} layers - Array of CA layers
   * @param {Object} params - Rendering parameters
   */
  render(layers, params)

  /**
   * Apply post-processing effects
   * @param {Object} params - Effect parameters
   */
  applyPostProcessing(params)
}
```

### CALayer Class

```javascript
class CALayer {
  /**
   * Create a CA layer
   * @param {Object} config - Layer configuration
   */
  constructor(config)

  /**
   * Update layer (compute next generation)
   */
  update()

  /**
   * Get layer as WebGL texture
   * @returns {p5.Framebuffer} Texture
   */
  getTexture()

  /**
   * Set blend mode
   * @param {string} mode - Blend mode name
   */
  setBlendMode(mode)

  /**
   * Set layer opacity
   * @param {number} opacity - Opacity (0-1)
   */
  setOpacity(opacity)

  /**
   * Get layer configuration
   * @returns {Object} Config object
   */
  getConfig()
}
```

---

## Testing Strategy

### Unit Tests
- CA rule computation correctness
- Toroidal wrapping logic
- Color palette generation
- Config serialization/deserialization

### Integration Tests
- Multi-layer rendering
- Effect pipeline
- Export functionality
- Preset system

### Performance Tests
- Frame rate benchmarking
- Memory leak detection
- Large grid performance
- Effect combination overhead

### Browser Compatibility
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Future Enhancements

### Potential Features
1. **Audio reactivity:** Visualizer responds to music/audio input
2. **2D CA rules:** Conway's Game of Life, Langton's Ant, etc.
3. **Machine learning:** Generate interesting rule combinations via ML
4. **Multiplayer:** Shared canvas, collaborative drawing
5. **VR support:** Immersive 3D exploration of CA space
6. **Advanced export:** SVG export, higher quality video codecs
7. **Custom rule editor:** Visual rule builder beyond 256 ECA rules
8. **Physics simulation:** Particles influenced by CA patterns
9. **NFT minting:** Export unique patterns as NFTs
10. **Mobile app:** Native iOS/Android versions

---

## References

### Elementary Cellular Automata
- Stephen Wolfram - "A New Kind of Science"
- Rule 30, Rule 110 (Turing complete)
- [MathWorld: Elementary Cellular Automaton](https://mathworld.wolfram.com/ElementaryCellularAutomaton.html)

### Technical Resources
- [p5.js Reference](https://p5js.org/reference/)
- [WebGL Shaders](https://www.khronos.org/opengl/wiki/Core_Language_(GLSL))
- [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

### Visual Inspiration
- Cyberpunk 2077 UI
- Blade Runner 2049 aesthetics
- The Matrix digital rain
- Tron: Legacy visual design
- Synthwave album covers

---

**Document Version:** 1.0.0
**Last Updated:** 2025-10-21
**Author:** Claude (Sonnet 4.5)
**Status:** Draft - Ready for Implementation
