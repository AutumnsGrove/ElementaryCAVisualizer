# Elementary CA Visualizer - TODOs

## Current Phase: Phase 1 - Foundation

### Phase 1: Foundation (Core CA + Basic Rendering)
**Goal:** Get basic CA visualization working

- [ ] Implement single-layer CA engine (ca-engine.js)
  - [ ] Core rule computation for all 256 ECA rules
  - [ ] State management and buffer handling
  - [ ] Toroidal wrapping logic
  - [ ] Initial condition patterns (random, single pixel)
- [ ] Create basic renderer (renderer.js)
  - [ ] WebGL setup and initialization
  - [ ] Simple black/white CA display
  - [ ] Basic color mapping
- [ ] Add basic controls (controls.js)
  - [ ] Rule selector dropdown/input
  - [ ] Play/pause toggle
  - [ ] Reset button
  - [ ] Speed control slider
- [ ] Test basic CA visualization
  - [ ] Verify famous rules work (30, 90, 110, 184)
  - [ ] Check performance (should hit 60 FPS)
  - [ ] Test in Chrome, Firefox, Safari

### Phase 2: Multi-Layer System
**Goal:** Support multiple concurrent CA layers with blending

- [ ] Refactor CA engine for multiple instances
- [ ] Create layer management system
  - [ ] Add/remove layers dynamically
  - [ ] Per-layer configuration (rule, opacity, color)
- [ ] Implement blend modes (ADD, MULTIPLY, SCREEN, OVERLAY, NORMAL)
- [ ] Build layer controls UI
  - [ ] Layer list with controls
  - [ ] Enable/disable toggles
  - [ ] Opacity sliders
- [ ] Add color palettes
  - [ ] Synthwave/Neon palette
  - [ ] Vaporwave Pastels palette
  - [ ] Palette switcher UI

### Phase 3: Effects Pipeline (Cyberpunk Aesthetic)
**Goal:** Add visual effects for cyberpunk aesthetic

- [ ] Set up shader system and multi-pass rendering
- [ ] Implement temporal trails effect
  - [ ] Frame history buffer
  - [ ] Blend with previous frames
  - [ ] Trail length parameter
- [ ] Add chromatic aberration shader
  - [ ] RGB channel offset
  - [ ] Intensity control
- [ ] Implement bloom effect
  - [ ] Gaussian blur pass
  - [ ] Threshold and intensity controls
- [ ] Create glitch effect shader
  - [ ] Block displacement
  - [ ] Color corruption
  - [ ] Frequency and intensity parameters
- [ ] Add scan lines effect
  - [ ] Horizontal line overlay
  - [ ] CRT curvature (optional)
- [ ] Implement parallax depth
  - [ ] Layer offset based on depth
  - [ ] Mouse/camera tracking
- [ ] Build effect controls UI
  - [ ] Intensity sliders for each effect
  - [ ] Toggle switches
  - [ ] Effect presets

### Phase 4: Infinite Generation
**Goal:** Implement center-outward infinite generation with pan/zoom

- [ ] Create viewport/camera system
- [ ] Implement pan controls (mouse drag or WASD)
- [ ] Add zoom functionality
- [ ] Build infinite grid with toroidal wrapping
- [ ] Implement on-demand CA generation
- [ ] Optimize buffer management for large grids
- [ ] Add viewport indicators/minimap (optional)

### Phase 5: Advanced Controls & Presets
**Goal:** Polish UX and add preset system

- [ ] Complete keyboard shortcuts implementation
  - [ ] Test all shortcuts (Space, R, S, V, G, B, T, arrows, 1-5)
  - [ ] Add keyboard shortcut help overlay
- [ ] Build preset system
  - [ ] Create preset data structure
  - [ ] Implement 5 built-in presets:
    - [ ] Neon Dreams
    - [ ] Vaporwave Chill
    - [ ] Digital Rain
    - [ ] Glitch City
    - [ ] Minimal Techno
  - [ ] Save custom presets to LocalStorage
  - [ ] Load preset UI
- [ ] Add palette editor
  - [ ] Color pickers for alive/dead cells
  - [ ] Gradient builders
- [ ] Implement advanced initialization patterns
  - [ ] User drawable canvas
  - [ ] Preset patterns (Fibonacci, etc.)
  - [ ] Pattern library
- [ ] Performance optimization pass
  - [ ] Profile with browser DevTools
  - [ ] Optimize shader code
  - [ ] Reduce garbage collection
  - [ ] Test on lower-end devices

### Phase 6: Export & Final Polish
**Goal:** Add export capabilities and finalize

- [ ] Implement screenshot export (PNG)
  - [ ] Canvas.toBlob() integration
  - [ ] Filename with timestamp
  - [ ] Resolution options
- [ ] Add video recording (WebM)
  - [ ] MediaRecorder setup
  - [ ] Start/stop controls
  - [ ] Duration display
  - [ ] Quality settings
- [ ] Create config export/import (JSON)
  - [ ] Serialize current state
  - [ ] Import validation
  - [ ] File upload UI
- [ ] Final performance profiling
  - [ ] 60 FPS verification
  - [ ] Memory leak detection
  - [ ] Load testing
- [ ] Cross-browser testing
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Mobile browsers (iOS Safari, Chrome Mobile)
- [ ] Write user documentation
  - [ ] Controls reference
  - [ ] Preset descriptions
  - [ ] Performance tips
- [ ] Create example showcase
  - [ ] Screenshot gallery
  - [ ] Demo video
  - [ ] Interesting preset collection

---

## Completed Tasks

- [x] Clone BaseProject template
- [x] Create comprehensive TECHNICAL_SPEC.md
- [x] Set up basic p5.js project structure
- [x] Create index.html with p5.js integration
- [x] Implement src/main.js with WebGL canvas and keyboard shortcuts
- [x] Add src/utils.js with helper functions
- [x] Design styles/main.css with cyberpunk theme
- [x] Customize CLAUDE.md with project details
- [x] Initialize git repository
- [x] Create project directory structure

---

## Future Ideas / Low Priority

- [ ] Audio reactivity (visualizer responds to music)
- [ ] Support for 2D CA rules (Game of Life, Langton's Ant)
- [ ] Machine learning for interesting rule combinations
- [ ] Multiplayer collaborative canvas
- [ ] VR/3D exploration mode
- [ ] SVG export for high-quality prints
- [ ] Custom rule editor (beyond 256 ECA)
- [ ] Particle physics influenced by CA patterns
- [ ] Mobile app versions (iOS/Android)
- [ ] Social sharing features
- [ ] Preset marketplace/community gallery

---

## Blocked / Waiting

- [ ] (None currently)

---

**Last Updated:** 2025-10-21
**Current Focus:** Phase 1 - Foundation (Core CA + Basic Rendering)
