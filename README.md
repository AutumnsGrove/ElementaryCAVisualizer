# Elementary CA Cyberpunk Visualizer

An immersive, live, browser-based visualizer for elementary cellular automata with a stunning cyberpunk aesthetic. Watch mathematical patterns come alive with multi-layer rendering, real-time visual effects, and infinite procedural generation.

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Phase](https://img.shields.io/badge/phase-foundation-blue)
![p5.js](https://img.shields.io/badge/p5.js-1.11.2-pink)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Vision

Experience the mesmerizing beauty of elementary cellular automata through a lens of neon-soaked cyberpunk aesthetics. This visualizer transforms mathematical simplicity into visual complexity, featuring:

- **Multi-layer CA rendering** with blend modes and color palettes
- **Real-time visual effects**: glitch, bloom, chromatic aberration, temporal trails, parallax depth
- **Infinite procedural generation** from center point with toroidal wrapping
- **GPU-accelerated rendering** targeting 60 FPS performance
- **Comprehensive controls** for rules, colors, effects, and more
- **Export capabilities**: screenshots, video recording, configuration presets

---

## 🎮 Quick Start

### Run Locally

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd ElementaryCAVisualizer
   ```

2. Open `index.html` in your browser:
   ```bash
   # macOS
   open index.html

   # Linux
   xdg-open index.html

   # Or use a local server (recommended for development)
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. Start exploring! Use keyboard shortcuts to control the visualizer.

### Keyboard Controls

```
Space       Play/Pause generation
R           Randomize all rules
S           Take screenshot
V           Toggle video recording
G           Toggle glitch effect
B           Toggle bloom effect
T           Toggle temporal trails
Arrow Up    Increase speed
Arrow Down  Decrease speed
1-5         Load preset configurations
```

---

## 🚀 Features

### Core Capabilities

**Elementary Cellular Automata Engine**
- All 256 ECA rules (Rule 0-255)
- Famous rules: Rule 30 (chaos), Rule 90 (Sierpiński), Rule 110 (Turing complete), Rule 184 (traffic)
- Multiple initialization patterns: random noise, single pixel, user drawable, presets
- Toroidal wrapping for seamless infinite generation

**Multi-Layer System**
- 3-5 simultaneous CA layers
- Per-layer rule, opacity, and color configuration
- Blend modes: Normal, Add, Multiply, Screen, Overlay
- Real-time layer enable/disable

**Visual Effects (Cyberpunk Aesthetic)**
- **Temporal Trails**: Motion blur from previous generations
- **Parallax Depth**: 3D effect with layered CA
- **Chromatic Aberration**: RGB channel splitting
- **Bloom**: Neon glow effect
- **Glitch**: Digital corruption artifacts
- **Scan Lines**: CRT monitor aesthetics
- All effects GPU-accelerated via GLSL shaders

**Color Palettes**
- **Synthwave/Neon**: Hot pink, cyan, electric blue
- **Vaporwave Pastels**: Soft pinks, lavenders, light blues
- Real-time palette switching
- Custom color configuration

**Export & Sharing**
- Screenshot export (PNG with timestamp)
- Video recording (WebM format)
- Configuration save/load (JSON presets)
- LocalStorage preset persistence

---

## 🛠️ Tech Stack

**Core Technologies:**
- [p5.js](https://p5js.org/) (WebGL mode) - GPU-accelerated rendering
- GLSL Shaders - Custom visual effects
- Web Workers - Parallel CA computation
- MediaRecorder API - Video export
- Canvas API - Screenshot export
- LocalStorage - Preset persistence

**Performance:**
- Target: 60 FPS rendering
- GPU acceleration for all visual processing
- Efficient buffer management
- Non-blocking CA computation in Web Workers

---

## 📁 Project Structure

```
ElementaryCAVisualizer/
├── index.html              # Main entry point
├── TECHNICAL_SPEC.md       # Comprehensive technical specification
├── CLAUDE.md               # Claude Code project instructions
├── TODOS.md                # Implementation task tracking
├── src/
│   ├── main.js             # p5.js sketch and main loop
│   ├── ca-engine.js        # CA computation (256 rules)
│   ├── renderer.js         # WebGL rendering pipeline
│   ├── controls.js         # UI and keyboard controls
│   ├── presets.js          # Preset configurations
│   ├── export.js           # Screenshot/video/config export
│   ├── utils.js            # Utility functions
│   ├── shaders/            # GLSL shader files
│   ├── workers/            # Web Worker scripts
│   └── ui/                 # UI component modules
├── styles/
│   └── main.css            # Cyberpunk theme styling
└── assets/
    ├── fonts/              # Cyberpunk fonts
    ├── icons/              # UI icons
    └── presets/            # Saved preset JSON files
```

---

## 🎨 Famous Elementary CA Rules

Elementary cellular automata are 1D systems with 256 possible rules. Here are the most interesting:

### Rule 30 - Chaos Generator
- Used in Mathematica for random number generation
- Chaotic, unpredictable patterns from simple initial conditions
- Complex behavior despite simple rules

### Rule 90 - Sierpiński Triangle
- Generates fractal Sierpiński triangle pattern
- Demonstrates self-similarity
- Beautiful geometric structure

### Rule 110 - Turing Complete
- Proven to be Turing complete (can simulate any computation)
- Complex emergent structures
- Fascinating from computational theory perspective

### Rule 184 - Traffic Flow
- Models traffic flow on a highway
- Shows phase transitions
- Practical application of CA

---

## 📖 Implementation Phases

This project is being developed in 6 phases (see `TECHNICAL_SPEC.md` for details):

1. **Phase 1: Foundation** - Core CA engine + basic rendering *(current)*
2. **Phase 2: Multi-Layer System** - Multiple CA layers with blending
3. **Phase 3: Effects Pipeline** - Cyberpunk visual effects (glitch, bloom, etc.)
4. **Phase 4: Infinite Generation** - Pan/zoom with on-demand generation
5. **Phase 5: Advanced Controls** - Presets, palette editor, polish
6. **Phase 6: Export & Final** - Screenshot/video export, cross-browser testing

Track progress in `TODOS.md`.

---

## 🎯 Performance Targets

- **Frame Rate**: 60 FPS rendering
- **Minimum Acceptable**: 30 FPS
- **Memory**: Efficient buffer management with recycling
- **Compatibility**: Chrome, Firefox, Safari, mobile browsers

**Optimization Strategies:**
- GPU-accelerated shader effects
- Web Workers for CA computation
- Object pooling (no allocation in render loop)
- Texture atlases for multi-layer rendering
- LOD (Level of Detail) system for very large grids

---

## 📚 Documentation

- **[TECHNICAL_SPEC.md](TECHNICAL_SPEC.md)** - Comprehensive 400+ line technical specification with complete architecture, API reference, shader details, and implementation roadmap
- **[CLAUDE.md](CLAUDE.md)** - Project instructions for Claude Code with performance requirements and development guidelines
- **[TODOS.md](TODOS.md)** - Task tracking across all 6 implementation phases
- **[ClaudeUsage/](ClaudeUsage/)** - Comprehensive workflow guides from BaseProject template

---

## 🔮 Future Ideas

- Audio reactivity (responds to music/audio input)
- 2D CA rules (Conway's Game of Life, Langton's Ant)
- Machine learning to discover interesting rule combinations
- Multiplayer collaborative canvas
- VR support for immersive 3D exploration
- Advanced export (SVG, higher quality codecs)
- Custom rule editor beyond 256 ECA rules
- Physics simulation influenced by CA patterns
- Mobile app versions (iOS/Android)
- NFT minting for unique patterns

---

## 🤝 Development

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari)
- No build tools required (vanilla HTML/CSS/JS for now)
- Optional: Local development server for testing

### Development Workflow
1. Check `TODOS.md` for current phase tasks
2. Read relevant sections in `TECHNICAL_SPEC.md`
3. Implement features with performance in mind (60 FPS target)
4. Test in multiple browsers
5. Update `TODOS.md` as tasks complete
6. Commit following git standards in `CLAUDE.md`

### Code Style
- Modular architecture with clear separation of concerns
- Shader-based effects for GPU acceleration
- Every effect must be toggleable and adjustable
- Minimal dependencies (p5.js only)
- Prefer vanilla solutions over additional libraries

---

## 🎓 Learning Resources

### Elementary Cellular Automata
- Stephen Wolfram - "A New Kind of Science"
- [MathWorld: Elementary Cellular Automaton](https://mathworld.wolfram.com/ElementaryCellularAutomaton.html)
- [Wolfram Atlas of Simple Programs](http://atlas.wolfram.com/)

### Technical Resources
- [p5.js Reference](https://p5js.org/reference/)
- [WebGL Shaders (GLSL)](https://www.khronos.org/opengl/wiki/Core_Language_(GLSL))
- [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

### Visual Inspiration
- Cyberpunk 2077 UI design
- Blade Runner 2049 aesthetics
- The Matrix digital rain
- Tron: Legacy visual design
- Synthwave/Vaporwave album art

---

## 📄 License

MIT License - Customize freely for your projects.

---

## 🙏 Acknowledgments

- Built with [p5.js](https://p5js.org/) - Creative coding library
- Project structure from [BaseProject](https://github.com/AutumnsGrove/BaseProject) template
- Inspired by Stephen Wolfram's work on cellular automata
- Cyberpunk aesthetic inspired by 80s/90s sci-fi

---

**Status:** Phase 1 - Foundation (In Development)
**Last Updated:** 2025-10-21
**Built with:** Claude Code (Sonnet 4.5)
