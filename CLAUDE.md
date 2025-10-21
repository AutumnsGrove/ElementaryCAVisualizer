# Project Instructions - Claude Code

> **Note**: This is the main orchestrator file. For detailed guides, see `ClaudeUsage/README.md`

---

## Project Purpose
An immersive, live, browser-based visualizer for elementary cellular automata (ECA) with a cyberpunk aesthetic. Features multi-layer CA rendering, infinite procedural generation, real-time visual effects (glitch, bloom, chromatic aberration, parallax), and comprehensive export capabilities.

## Tech Stack
- Language: JavaScript (ES6+)
- Framework: p5.js (WebGL mode for GPU acceleration)
- Key Libraries:
  - p5.js v1.11.2+ (rendering engine)
  - Web Workers API (parallel CA computation)
  - MediaRecorder API (video export)
  - Canvas API (screenshot export)
  - LocalStorage API (preset persistence)
- Package Manager: None (vanilla HTML/CSS/JS for now, may add npm/Vite later if needed)

## Architecture Notes
**Modular architecture with performance-first design:**
- **CA Engine** (ca-engine.js): Implements all 256 ECA rules, multi-layer support, toroidal wrapping, runs in Web Workers for non-blocking computation
- **Renderer** (renderer.js): Multi-pass WebGL rendering pipeline with custom GLSL shaders for effects
- **Control Manager** (controls.js): Real-time parameter updates, keyboard shortcuts, preset system
- **Export Manager** (export.js): Screenshot (PNG), video recording (WebM), config JSON export/import
- **Shader System**: Custom GLSL shaders for CA visualization, temporal trails, parallax depth, post-processing effects
- **Performance target**: 60 FPS rendering with efficient buffer management and GPU acceleration

---

## Project-Specific Constraints

### Performance Requirements (CRITICAL)
- **60 FPS target**: Always prioritize maintaining 60 FPS rendering
- **Profile regularly**: Use browser dev tools to monitor frame rates and identify bottlenecks
- **GPU acceleration**: Leverage WebGL/shaders for all heavy visual processing
- **Efficient algorithms**: Optimize CA computation and buffer management
- **Web Workers**: Keep CA computation off main thread to prevent UI blocking
- **Memory management**: Avoid object creation in render loops, use object pooling

### Dependency Management
- **Keep dependencies minimal**: Only add libraries if absolutely necessary
- **Prefer vanilla solutions**: Use native Web APIs when possible
- **Justify new dependencies**: If adding a library, explain why it's needed
- **No heavy frameworks**: Stick with p5.js as the only major framework
- **CDN-first**: Load libraries from CDN to avoid build complexity (for now)

### Visual Effects Best Practices
- **Shader-based effects**: Implement all visual effects in GLSL shaders for GPU acceleration
- **Effect toggles**: Every effect should be toggleable for performance testing
- **Intensity controls**: All effects need adjustable intensity parameters
- **Frame buffer reuse**: Recycle WebGL textures and buffers efficiently

### Development Workflow
- **Test on multiple browsers**: Chrome, Firefox, Safari compatibility required
- **Start vanilla**: No build tools initially, add only if complexity demands it
- **Modular code**: Each module should be independently testable
- **TODO tracking**: Use TODOS.md to track implementation phases (see TECHNICAL_SPEC.md for 6 phases)

---

## Essential Instructions (Always Follow)

### Core Behavior
- Do what has been asked; nothing more, nothing less
- NEVER create files unless absolutely necessary for achieving your goal
- ALWAYS prefer editing existing files to creating new ones
- NEVER proactively create documentation files (*.md) or README files unless explicitly requested

### Naming Conventions
- **Directories**: Use CamelCase (e.g., `VideoProcessor`, `AudioTools`, `DataAnalysis`)
- **Date-based paths**: Use skewer-case with YYYY-MM-DD (e.g., `logs-2025-01-15`, `backup-2025-12-31`)
- **No spaces or underscores** in directory names (except date-based paths)

### TODO Management
- **Always check `TODOS.md` first** when starting a task or session
- **Update immediately** when tasks are completed, added, or changed
- Keep the list current and manageable

### Git Workflow Essentials
**After completing major changes, you MUST:**
1. Check git status: `git status`
2. Review recent commits for style: `git log --oneline -5`
3. Stage changes: `git add .`
4. Commit with proper message format (see below)

**Commit Message Format:**
```
[Action] [Brief description]

- [Specific change 1 with technical detail]
- [Specific change 2 with technical detail]
- [Additional implementation details]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Action Verbs**: Add, Update, Fix, Refactor, Remove, Enhance

---

## When to Read Specific Guides

**Read the full guide in `ClaudeUsage/` when you encounter these situations:**

### Secrets & API Keys
- **When managing API keys or secrets** → Read `ClaudeUsage/secrets_management.md`
- **Before implementing secrets loading** → Read `ClaudeUsage/secrets_management.md`

### Package Management
- **When using UV package manager** → Read `ClaudeUsage/uv_usage.md`
- **Before creating pyproject.toml** → Read `ClaudeUsage/uv_usage.md`
- **When managing Python dependencies** → Read `ClaudeUsage/uv_usage.md`

### Version Control
- **Before making a git commit** → Read `ClaudeUsage/git_commit_guide.md`
- **When initializing a new repo** → Read `ClaudeUsage/git_commit_guide.md`
- **For git workflow details** → Read `ClaudeUsage/git_commit_guide.md`

### Search & Research
- **When searching across 20+ files** → Read `ClaudeUsage/house_agents.md`
- **When finding patterns in codebase** → Read `ClaudeUsage/house_agents.md`
- **When locating TODOs/FIXMEs** → Read `ClaudeUsage/house_agents.md`

### Testing
- **Before writing tests** → Read `ClaudeUsage/testing_strategies.md`
- **When implementing test coverage** → Read `ClaudeUsage/testing_strategies.md`
- **For test organization** → Read `ClaudeUsage/testing_strategies.md`


### Code Quality
- **When refactoring code** → Read `ClaudeUsage/code_style_guide.md`
- **Before major code changes** → Read `ClaudeUsage/code_style_guide.md`
- **For style guidelines** → Read `ClaudeUsage/code_style_guide.md`

### Project Setup
- **When starting a new project** → Read `ClaudeUsage/project_setup.md`
- **For directory structure** → Read `ClaudeUsage/project_setup.md`
- **Setting up CI/CD** → Read `ClaudeUsage/project_setup.md`

---

## Quick Reference

### Security Basics
- Store API keys in `secrets.json` (NEVER commit)
- Add `secrets.json` to `.gitignore` immediately
- Provide `secrets_template.json` for setup
- Use environment variables as fallbacks


### House Agents Quick Trigger
**When searching 20+ files**, use house-research for:
- Finding patterns across codebase
- Searching TODO/FIXME comments
- Locating API endpoints or functions
- Documentation searches

---

## Code Style Guidelines

### Function & Variable Naming
- Use meaningful, descriptive names
- Keep functions small and focused on single responsibilities
- Add docstrings to functions and classes

### Error Handling
- Use try/except blocks gracefully
- Provide helpful error messages
- Never let errors fail silently

### File Organization
- Group related functionality into modules
- Use consistent import ordering:
  1. Standard library
  2. Third-party packages
  3. Local imports
- Keep configuration separate from logic

---

## Communication Style
- Be concise but thorough
- Explain reasoning for significant decisions
- Ask for clarification when requirements are ambiguous
- Proactively suggest improvements when appropriate

---

## Elementary CA Development Quick Reference

### Key ECA Rules to Know
- **Rule 30**: Chaotic, random-looking pattern (used in Mathematica for random number generation)
- **Rule 90**: Sierpiński triangle pattern
- **Rule 110**: Turing complete, complex behavior
- **Rule 184**: Traffic flow simulation
- **Rule 30, 90, 110, 184**: Most famous/interesting rules to showcase

### Implementation Phases (see TECHNICAL_SPEC.md)
1. **Phase 1**: Foundation - Core CA + Basic Rendering
2. **Phase 2**: Multi-Layer System with blending
3. **Phase 3**: Effects Pipeline (trails, parallax, bloom, glitch, chromatic aberration, scan lines)
4. **Phase 4**: Infinite Generation with pan/zoom
5. **Phase 5**: Advanced Controls & Presets
6. **Phase 6**: Export & Final Polish

### Color Palettes
- **Synthwave/Neon**: Hot pink (#ff00ff), cyan (#00ffff), electric blue (#0080ff)
- **Vaporwave Pastels**: Soft pink (#ff99cc), light blue (#99ccff), lavender (#cc99ff)

### Keyboard Shortcuts (already in main.js)
```
Space:      Play/Pause
R:          Randomize rules
S:          Screenshot
V:          Video recording
G:          Toggle glitch
B:          Toggle bloom
T:          Toggle trails
Arrow Up:   Increase speed
Arrow Down: Decrease speed
1-5:        Load presets
```

---

## Complete Guide Index
For all detailed guides, workflows, and examples, see:
**`ClaudeUsage/README.md`** - Master index of all documentation

**Project-Specific Documentation:**
- **`TECHNICAL_SPEC.md`** - Comprehensive 400+ line technical specification with complete architecture, API reference, and implementation phases

---

*Last updated: 2025-10-21*
*Model: Claude Sonnet 4.5*
*Project: Elementary CA Cyberpunk Visualizer*
