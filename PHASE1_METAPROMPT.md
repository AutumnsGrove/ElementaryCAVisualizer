# Elementary CA Visualizer - Phase 1 Implementation Metaprompt

You are implementing **Phase 1: Foundation** of the Elementary Cellular Automata Visualizer. This is a browser-based p5.js WebGL project with a cyberpunk aesthetic.

## Context Files (Read These First)

- @TECHNICAL_SPEC.md - Complete technical specification with architecture, API reference, and implementation decisions (v1.1.0)
- @TODOS.md - Detailed Phase 1 tasks with expanded scope including Web Workers, full palettes, infinite generation, and FPS monitoring
- @CLAUDE.md - Project-specific constraints, performance requirements (60 FPS target), and development guidelines
- @README.md - Project overview and setup instructions
- @ClaudeUsage/house_agents.md - House agents usage patterns and thresholds
- @ClaudeUsage/subagent_usage.md - Subagent workflow, git commit protocol, and phase management

## Your Mission

Create a **comprehensive, executable plan** for implementing Phase 1 that:

1. **Breaks down Phase 1 into major tasks** following the structure in @TODOS.md
2. **Uses house-agents extensively** for context efficiency (house-research for multi-file searches, house-bash for all testing/commands, house-coder for code patches 0-250 lines, house-planner for complex sub-planning if needed)
3. **Marks off todos progressively** using TodoWrite as subtasks complete
4. **Isolates testing in house-bash** to keep context clean (test after each major task completion, not every component)
5. **Follows git workflow** with atomic commits after major milestones
6. **Can be reused as a template** for Phases 2-6 (I'll clear context between phases)

## Phase 1 Deliverables (from @TODOS.md)

- Working single-layer CA visualizer with **center-outward infinite generation**
- **Web Workers** for non-blocking CA computation
- **Full palette system** (Synthwave/Neon + Vaporwave Pastels)
- **FPS counter** and performance monitoring
- Basic UI controls (rule selector, play/pause, reset, speed, palette switcher)
- **Responsive canvas** (90vw × 70vh, 1:1 pixel mapping)
- Testing infrastructure and browser compatibility verification

## Key Constraints

- **Performance**: Target 60 FPS (profiled with browser DevTools)
- **Dependencies**: p5.js already downloaded to `lib/p5.min.js`
- **Shaders**: Hybrid approach - simple inline, complex in .glsl files
- **Initial state**: Rule 30 running on page load
- **Testing**: Manual testing checklist + browser compatibility (Chrome, Firefox, Safari)

## House-Agents Usage Guidelines

**Use house-agents proactively for context efficiency:**

- `house-research` - When searching/locating patterns across codebase (threshold: 20+ files expected)
- `house-bash` - **ALL testing execution, command output** (threshold: >100 lines output)
- `house-coder` - Small code patches 0-250 lines (fixes, implementations, refactors)
- `house-git` - Review changes before commits (threshold: >100 line diff or multi-file)
- `house-planner` - Complex sub-tasks requiring detailed planning (threshold: 3+ files or ambiguous scope)

**DO NOT use:** quick-code-patch, bash-executor, or other non-house agents. Stick to the house-agents suite.

## Plan Requirements

Your plan should include:

1. **Major task breakdown** with clear dependencies
2. **Suggested house-agent assignments** for context efficiency
3. **Testing checkpoints** (after major tasks, using house-bash)
4. **TodoWrite strategy** for tracking progress through Phase 1 subtasks
5. **Git commit milestones** (when to commit completed work)
6. **Success criteria** verification against @TODOS.md Phase 1 deliverables

## What NOT to Do

- Don't start implementation yet - just create the plan
- Don't create detailed code - that's for execution phase
- Don't skip the house-agents - they're critical for context management
- Don't test after every small component - batch testing at major milestones

## Output Format

Provide a structured plan with:
- **Phase overview** and objectives
- **Major tasks** (numbered, with dependencies noted)
- **House-agent recommendations** for each task
- **Testing strategy** with checkpoints
- **Todo tracking approach** (when to mark items complete)
- **Estimated workflow** (research → implement → test → commit pattern)

This plan will serve as a **reusable template** for Phases 2-6, so make it clear and systematic.

**Ready to create the Phase 1 implementation plan!**
