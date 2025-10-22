# Elementary CA Visualizer - TODOs

## Implementation Decisions (2025-10-21)

Based on planning session, Phase 1 scope has been expanded to include:
- **Canvas**: Responsive container (90vw × 70vh)
- **Grid Resolution**: 1:1 pixel mapping (CA cells = canvas pixels)
- **Initial State**: Single CA layer running Rule 30 on load
- **Generation**: Center-outward infinite generation from Phase 1 (not top-to-bottom)
- **Workers**: Web Workers implemented from Phase 1 for non-blocking CA computation
- **Palettes**: Full Synthwave/Vaporwave palette system in Phase 1 (not just black/white)
- **Performance**: FPS counter visible from Phase 1
- **Shaders**: Hybrid approach - simple shaders inline, complex in .glsl files
- **Dependencies**: p5.js downloaded to lib/ (not CDN)
- **Storage**: Presets stored as `ca_visualizer:presets` array in LocalStorage
- **Testing**: Continuous testing tasks added to each phase

---

## Current Phase: Phase 1 - Foundation

### Phase 1 Polish (Immediate - User Testing Feedback)
**Priority:** HIGH - Address UX issues from browser testing

- [ ] **Fix control panel visibility issue**
  - Controls still not visible/accessible in browser
  - Investigate positioning, viewport overlap, or responsive issues
  - Ensure controls visible on all screen sizes

- [ ] **Redesign FPS toggle UX**
  - Remove FPS button from main control bar
  - Make FPS meter itself clickable to hide
  - Add small "FPS" button in top-right corner when meter is hidden
  - Click top-right button to show meter again
  - Better UX: less clutter, more intuitive

- [ ] **Tone down bright color intensity**
  - Current cyan/teal (#00ffff) is too bright/eye-searing
  - Reduce saturation or brightness of synthwave palette
  - Test less intense alternatives
  - Maintain cyberpunk aesthetic but easier on eyes

- [ ] **Expand palette collection**
  - Add more color palette options beyond Synthwave/Vaporwave
  - Suggested palettes:
    - Matrix Green (classic digital rain aesthetic)
    - Neon Purple/Orange (darker cyberpunk)
    - Pastel Dream (softer vaporwave variant)
    - Monochrome Blue (tron-style)
    - Fire/Lava (warm gradient)
    - Ocean/Ice (cool gradient)
  - Each palette needs: alive, dead, and accent colors
  - Update palette selector dropdown

---

### Phase 1: Foundation (Core CA + Basic Rendering)
**Goal:** Get basic CA visualization working with infinite generation and full palette support

**Setup & Infrastructure:**
- [ ] Download p5.js to lib/p5.min.js
- [ ] Set up project structure for Web Workers
- [ ] Create testing infrastructure
  - [ ] Set up manual testing checklist
  - [ ] Browser testing setup (Chrome, Firefox, Safari)

**CA Engine (ca-engine.js):**
- [ ] Implement core ECA computation
  - [ ] Core rule computation for all 256 ECA rules
  - [ ] Efficient bit/boolean array handling
  - [ ] Rule lookup table optimization
- [ ] Center-outward infinite generation
  - [ ] Toroidal wrapping logic for infinite grid
  - [ ] Center-point initialization
  - [ ] Outward expansion algorithm
  - [ ] Viewport-based rendering region
- [ ] State management and buffer handling
  - [ ] Circular buffer for generations
  - [ ] Memory-efficient storage
- [ ] Web Worker integration
  - [ ] Create ca-worker.js in src/workers/
  - [ ] Message passing protocol (main ↔ worker)
  - [ ] Non-blocking CA computation
- [ ] Initial condition patterns
  - [ ] Single center pixel pattern
  - [ ] Random noise pattern with density control
  - [ ] Pattern injection API

**Renderer (renderer.js):**
- [ ] WebGL setup and initialization
  - [ ] Responsive canvas (90vw × 70vh)
  - [ ] p5.js WEBGL mode configuration
  - [ ] Frame buffer setup
- [ ] CA visualization rendering
  - [ ] 1:1 pixel mapping (CA cells → canvas pixels)
  - [ ] Efficient texture updates from CA state
  - [ ] Basic vertex shader (inline)
- [ ] Full palette system (Phase 1)
  - [ ] Synthwave/Neon palette (hot pink, cyan, electric blue)
  - [ ] Vaporwave Pastels palette (soft pink, light blue, lavender)
  - [ ] Color mapping from CA state to palette
  - [ ] Palette switcher implementation
- [ ] Performance monitoring UI
  - [ ] FPS counter display
  - [ ] Frame time graph (optional but recommended)
  - [ ] Performance stats overlay

**Controls (controls.js):**
- [ ] Basic UI elements
  - [ ] Rule selector (dropdown or number input for 0-255)
  - [ ] Play/pause toggle button
  - [ ] Reset button (restart with new seed)
  - [ ] Speed control slider (0.1x - 10x)
  - [ ] Palette selector dropdown
- [ ] Keyboard shortcuts (from main.js)
  - [ ] Space: Play/Pause
  - [ ] R: Randomize rule
  - [ ] Arrow Up/Down: Speed adjustment
  - [ ] Verify all shortcuts work
- [ ] UI state synchronization
  - [ ] Update UI when parameters change programmatically
  - [ ] Debounce rapid changes

**Testing & Verification:**
- [ ] Unit tests for CA computation
  - [ ] Test all 256 rules compute correctly
  - [ ] Verify toroidal wrapping edge cases
  - [ ] Test random seed reproducibility
- [ ] Visual verification
  - [ ] Famous rules render correctly (Rule 30, 90, 110, 184)
  - [ ] Palettes display accurate colors
  - [ ] Center-outward generation is symmetrical
- [ ] Performance testing
  - [ ] Verify 60 FPS target on modern hardware
  - [ ] Test on lower-end devices
  - [ ] Profile Web Worker overhead
  - [ ] Memory usage profiling (no leaks)
- [ ] Cross-browser testing
  - [ ] Chrome (primary target)
  - [ ] Firefox
  - [ ] Safari
  - [ ] Test WebGL compatibility

### Phase 2: Multi-Layer System
**Goal:** Support multiple concurrent CA layers with blending

**Multi-Layer Architecture:**
- [ ] Refactor CA engine for multiple instances
  - [ ] CALayer class wrapper
  - [ ] Independent Web Worker per layer (or shared worker pool)
  - [ ] Layer state isolation
- [ ] Layer management system
  - [ ] Add/remove layers dynamically (3-5 layers)
  - [ ] Per-layer configuration (rule, opacity, palette, blend mode)
  - [ ] Layer ordering/z-index control
- [ ] Implement WebGL blend modes
  - [ ] NORMAL blend mode
  - [ ] ADD (additive blending)
  - [ ] MULTIPLY
  - [ ] SCREEN
  - [ ] OVERLAY
  - [ ] Blend mode shader implementation

**UI & Controls:**
- [ ] Layer controls UI panel
  - [ ] Layer list with drag-to-reorder
  - [ ] Per-layer enable/disable toggles
  - [ ] Opacity sliders per layer
  - [ ] Blend mode dropdown per layer
  - [ ] Per-layer palette selection
  - [ ] Solo/mute layer buttons
- [ ] Layer presets
  - [ ] Save multi-layer configurations
  - [ ] Quick-load layer combinations

**Testing:**
- [ ] Multi-layer rendering tests
  - [ ] Verify blend modes produce expected results
  - [ ] Test layer ordering/compositing
  - [ ] Performance test with 3-5 active layers
- [ ] Cross-browser blend mode compatibility
- [ ] Memory profiling for multiple CA instances

### Phase 3: Effects Pipeline (Cyberpunk Aesthetic)
**Goal:** Add visual effects for cyberpunk aesthetic

**Shader System Setup:**
- [ ] Multi-pass rendering pipeline
  - [ ] Frame buffer management
  - [ ] Shader loading system (hybrid: inline + .glsl files)
  - [ ] Uniform management utilities
- [ ] Create shader files structure (src/shaders/)
  - [ ] Simple shaders inline in renderer.js
  - [ ] Complex shaders in separate .glsl files

**Effect Implementation:**
- [ ] Temporal trails effect
  - [ ] Frame history buffer (60-120 frames)
  - [ ] Blend current frame with history
  - [ ] Trail length parameter (0-1)
  - [ ] Trail opacity decay control
- [ ] Chromatic aberration shader (post-fx.glsl)
  - [ ] RGB channel offset implementation
  - [ ] Intensity control (pixel offset amount)
  - [ ] Aberration direction (horizontal/vertical/radial)
- [ ] Bloom effect (bloom.glsl)
  - [ ] Downsample pass
  - [ ] Gaussian blur implementation
  - [ ] Upsample and composite pass
  - [ ] Threshold and intensity controls
  - [ ] Bloom radius parameter
- [ ] Glitch effect shader (glitch.glsl)
  - [ ] Block displacement algorithm
  - [ ] Color corruption/channel shift
  - [ ] Scan line displacement
  - [ ] Frequency parameter (glitch occurrence rate)
  - [ ] Intensity control
  - [ ] Time-based randomization
- [ ] Scan lines effect
  - [ ] Horizontal line overlay pattern
  - [ ] Line spacing control
  - [ ] Opacity/intensity parameter
  - [ ] CRT curvature (optional, nice-to-have)
- [ ] Parallax depth effect (parallax.glsl)
  - [ ] Layer offset based on depth value
  - [ ] Mouse position tracking
  - [ ] Camera tracking for interactive parallax
  - [ ] Depth intensity control

**UI & Controls:**
- [ ] Effects control panel
  - [ ] Intensity sliders for each effect
  - [ ] On/off toggle switches
  - [ ] Keyboard shortcuts (G, B, T from main.js)
- [ ] Effect presets
  - [ ] Preset combinations of effects
  - [ ] Quick toggle buttons

**Testing:**
- [ ] Shader compilation verification
  - [ ] Test all shaders compile on target browsers
  - [ ] GLSL syntax validation
- [ ] Effect visual verification
  - [ ] Each effect produces expected visual result
  - [ ] Effects combine properly (no conflicts)
- [ ] Performance testing
  - [ ] Profile each effect's GPU cost
  - [ ] Test all effects enabled simultaneously
  - [ ] Verify 60 FPS maintained with full effects stack
- [ ] Browser compatibility testing
  - [ ] WebGL shader compatibility across browsers

### Phase 4: Viewport & Navigation
**Goal:** Add pan/zoom exploration and viewport optimization
*(Note: Center-outward infinite generation implemented in Phase 1)*

**Camera & Viewport System:**
- [ ] Implement camera/viewport abstraction
  - [ ] Camera position tracking
  - [ ] Viewport bounds calculation
  - [ ] Coordinate transformation (world ↔ screen)
- [ ] Pan controls
  - [ ] Mouse drag panning
  - [ ] WASD keyboard panning
  - [ ] Touch drag support (mobile)
  - [ ] Pan speed controls
- [ ] Zoom functionality
  - [ ] Mouse wheel zoom
  - [ ] Pinch-to-zoom (mobile)
  - [ ] Zoom to cursor position
  - [ ] Min/max zoom limits
  - [ ] Smooth zoom interpolation

**Optimization & Performance:**
- [ ] On-demand CA generation
  - [ ] Generate only visible viewport + buffer area
  - [ ] Lazy computation for off-screen regions
  - [ ] Generation culling optimization
- [ ] Buffer management for large grids
  - [ ] Viewport-aware buffer sizing
  - [ ] Memory pool for CA generations
  - [ ] Garbage collection optimization
- [ ] LOD (Level of Detail) system (optional)
  - [ ] Reduce CA resolution when zoomed out
  - [ ] Increase resolution when zoomed in

**UI Enhancements:**
- [ ] Navigation UI
  - [ ] Reset camera button
  - [ ] Zoom level indicator
  - [ ] Current coordinates display
- [ ] Minimap (optional, nice-to-have)
  - [ ] Small overview window
  - [ ] Viewport position indicator
  - [ ] Click-to-navigate

**Testing:**
- [ ] Navigation testing
  - [ ] Smooth pan and zoom behavior
  - [ ] Edge case handling (extreme zoom, far panning)
  - [ ] Touch/mobile input testing
- [ ] Performance profiling
  - [ ] Large viewport performance
  - [ ] Memory usage with extensive panning
  - [ ] Frame rate stability during navigation
- [ ] Visual correctness
  - [ ] CA patterns remain consistent during pan/zoom
  - [ ] No rendering artifacts at viewport edges

### Phase 5: Advanced Controls & Presets
**Goal:** Polish UX and add preset system

**Keyboard Shortcuts & Help:**
- [ ] Complete keyboard shortcuts implementation
  - [ ] Verify all shortcuts work (Space, R, S, V, G, B, T, arrows, 1-5)
  - [ ] Add keyboard event handling robustness
- [ ] Keyboard shortcut help overlay
  - [ ] Modal or panel showing all shortcuts
  - [ ] Toggle with '?' or 'H' key
  - [ ] Categorized shortcuts (playback, effects, presets)

**Preset System:**
- [ ] Preset data structure and storage
  - [ ] Define complete preset JSON schema
  - [ ] LocalStorage integration (`ca_visualizer:presets` array)
  - [ ] Preset versioning for future compatibility
- [ ] Built-in presets (5 total)
  - [ ] Neon Dreams (synthwave, high bloom, medium glitch)
  - [ ] Vaporwave Chill (pastels, heavy trails, slow speed)
  - [ ] Digital Rain (Matrix green, cascading effect)
  - [ ] Glitch City (chaotic rules, high glitch, fast)
  - [ ] Minimal Techno (single rule, clean, rhythmic)
- [ ] Preset UI
  - [ ] Preset browser/selector
  - [ ] Load preset (1-5 keyboard shortcuts)
  - [ ] Save current config as custom preset
  - [ ] Delete custom presets
  - [ ] Import/export preset files (JSON)
- [ ] Preset features
  - [ ] Smooth transitions between presets
  - [ ] Preset preview thumbnails (optional)

**Palette Editor:**
- [ ] Custom palette creation
  - [ ] Color pickers for alive/dead cells
  - [ ] Gradient builders (multi-stop gradients)
  - [ ] Real-time preview
- [ ] Palette management
  - [ ] Save custom palettes
  - [ ] Load saved palettes
  - [ ] Palette library UI

**Advanced Initialization Patterns:**
- [ ] User drawable canvas
  - [ ] Pre-simulation drawing mode
  - [ ] Click-and-drag painting
  - [ ] Brush size control
  - [ ] Clear/reset button
  - [ ] Mirror mode (symmetrical drawing)
- [ ] Preset patterns library
  - [ ] Fibonacci sequence pattern
  - [ ] Alternating pattern
  - [ ] Custom mathematical sequences
  - [ ] Pattern selector UI

**Performance Optimization:**
- [ ] Profiling and optimization pass
  - [ ] Profile with Chrome DevTools Performance tab
  - [ ] Identify performance bottlenecks
  - [ ] Optimize shader code (reduce texture lookups, branching)
  - [ ] Reduce garbage collection in render loop
  - [ ] Object pooling for frequently allocated objects
- [ ] Testing on lower-end devices
  - [ ] Test on older hardware
  - [ ] Test on mobile devices
  - [ ] Identify minimum viable hardware specs

**Testing:**
- [ ] Preset system testing
  - [ ] All built-in presets load correctly
  - [ ] Custom preset save/load works
  - [ ] LocalStorage persistence across sessions
  - [ ] Preset import/export functionality
- [ ] Keyboard shortcut testing
  - [ ] All shortcuts respond correctly
  - [ ] No conflicts with browser shortcuts
  - [ ] Help overlay displays accurately
- [ ] Palette editor testing
  - [ ] Custom palettes apply correctly
  - [ ] Gradient generation works smoothly
  - [ ] Palette persistence
- [ ] User testing
  - [ ] Get feedback from real users
  - [ ] Usability testing on UI/controls
  - [ ] Identify confusing or unclear features

### Phase 6: Export & Final Polish
**Goal:** Add export capabilities and finalize

**Export Functionality:**
- [ ] Screenshot export (PNG)
  - [ ] Canvas.toBlob() integration
  - [ ] Download trigger with proper filename
  - [ ] Timestamp in filename (ca-snapshot-YYYYMMDD-HHMMSS.png)
  - [ ] Resolution options (current, 2x, 4x)
  - [ ] Keyboard shortcut (S key)
- [ ] Video recording (WebM)
  - [ ] MediaRecorder API setup
  - [ ] Canvas stream capture (captureStream)
  - [ ] Start/stop controls with visual indicator
  - [ ] Recording duration display
  - [ ] Quality settings (bitrate, framerate)
  - [ ] Keyboard shortcut (V key)
  - [ ] Auto-download on stop
- [ ] Configuration export/import (JSON)
  - [ ] Serialize complete current state to JSON
  - [ ] Include version number for compatibility
  - [ ] Export button with timestamp filename
  - [ ] Import validation (schema check)
  - [ ] File upload/drag-drop UI
  - [ ] Error handling for invalid configs

**Final Performance & Quality:**
- [ ] Final performance profiling
  - [ ] 60 FPS verification across all features
  - [ ] Memory leak detection (long-running sessions)
  - [ ] Load testing (stress test with extreme settings)
  - [ ] Startup time optimization
  - [ ] Asset loading optimization
- [ ] Code quality pass
  - [ ] Remove console.log statements (or use proper logging)
  - [ ] Clean up commented-out code
  - [ ] Verify all TODOs in code are addressed
  - [ ] Code style consistency check

**Cross-Browser & Device Testing:**
- [ ] Desktop browser testing
  - [ ] Chrome (latest + 2 versions back)
  - [ ] Firefox (latest + 2 versions back)
  - [ ] Safari (latest)
  - [ ] Edge (Chromium)
- [ ] Mobile browser testing
  - [ ] iOS Safari (iPhone, iPad)
  - [ ] Chrome Mobile (Android)
  - [ ] Test touch controls (pan, zoom)
  - [ ] Test mobile performance
  - [ ] Responsive design verification
- [ ] WebGL compatibility testing
  - [ ] Verify shaders work on all target browsers
  - [ ] Test fallback behavior for unsupported features

**Documentation:**
- [ ] User documentation
  - [ ] Controls reference (keyboard + mouse)
  - [ ] Preset descriptions and use cases
  - [ ] Performance tips and optimization advice
  - [ ] Troubleshooting guide
  - [ ] FAQ section
- [ ] Technical documentation
  - [ ] API reference (if exposing public API)
  - [ ] Architecture overview
  - [ ] Extending/customizing guide
  - [ ] Browser compatibility matrix

**Showcase & Polish:**
- [ ] Create example showcase
  - [ ] Screenshot gallery (10-15 interesting captures)
  - [ ] Demo video (1-2 minutes showcasing features)
  - [ ] Curated preset collection
  - [ ] Usage examples and tutorials
- [ ] Final UI polish
  - [ ] Visual consistency check
  - [ ] Button/control alignment and spacing
  - [ ] Hover states and visual feedback
  - [ ] Loading states and transitions
  - [ ] Error message clarity
- [ ] Accessibility audit
  - [ ] Keyboard navigation support
  - [ ] Screen reader compatibility (where applicable)
  - [ ] Color contrast verification
  - [ ] Focus indicators

**Testing & Validation:**
- [ ] Export functionality testing
  - [ ] Screenshots export correctly
  - [ ] Video recording produces valid files
  - [ ] Config export/import round-trip works
  - [ ] Export on different browsers
- [ ] Integration testing
  - [ ] All features work together harmoniously
  - [ ] No conflicts between effects/layers/controls
  - [ ] State persistence works correctly
- [ ] End-to-end user testing
  - [ ] Complete user workflows (preset → customize → export)
  - [ ] Usability testing with fresh users
  - [ ] Collect and address feedback
- [ ] Production readiness checklist
  - [ ] All known bugs fixed
  - [ ] Performance targets met
  - [ ] Documentation complete
  - [ ] Assets optimized and ready
  - [ ] No console errors or warnings

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

**Note:** Phase 1 scope has been significantly expanded from original plan to include:
- Web Workers for parallel computation
- Full palette system (Synthwave/Vaporwave)
- Center-outward infinite generation
- FPS counter and performance monitoring
- Testing infrastructure

This creates a stronger foundation but will take longer to complete Phase 1.
