# ClaudeUsage Documentation Refactoring - Resume Point

## Current Status

### ✅ Completed Files (6 tasks)

| File | Original | New | Reduction | Status |
|------|----------|-----|-----------|--------|
| secrets_management.md | 1,018 | 416 | 59% | ✅ Done |
| secrets_advanced.md | 0 | 561 | NEW | ✅ Created |
| git_commit_guide.md | 716 | 511 | 29% | ✅ Done |
| git_conventional_commits.md | 0 | 534 | NEW | ✅ Created |
| git_workflow.md | 704 | 495 | 30% | ✅ Done |

**Total Progress**: 5 of 11 main files refactored

---

## 🔄 Remaining Tasks (6 files)

Use **Task tool with subagents** for each remaining file to minimize context usage.

### 1. uv_usage.md (779 → ~350 lines)

**Launch subagent:**
```
Task tool:
- subagent_type: "quick-code-patch"
- description: "Refactor uv_usage.md to 350 lines"
- prompt: "Refactor /Users/mini/Documents/Projects/BaseProject/ClaudeUsage/uv_usage.md to approximately 350 lines.

Target changes:
- Remove Docker section entirely (lines 566-640) - reference docker_guide.md instead
- Reduce migration section to one streamlined example (keep pip migration, remove poetry/pipenv details)
- Condense troubleshooting to 5 most common issues only
- Remove redundant command examples (keep one per pattern)
- Keep Quick Reference, installation, project setup, and core commands intact

Add cross-reference to docker_guide.md where Docker section was removed.

Target: ~350 lines, down from 779 lines."
```

---

### 2. database_setup.md (598 → ~300 lines)

**Launch subagent:**
```
Task tool:
- subagent_type: "quick-code-patch"
- description: "Refactor database_setup.md to 300 lines"
- prompt: "Refactor /Users/mini/Documents/Projects/BaseProject/ClaudeUsage/database_setup.md to approximately 300 lines.

Target changes:
- Keep SQLite focus and quick start
- Remove ConnectionPool class (advanced use case, lines 186-213)
- Simplify migration to single schema versioning example
- Reduce testing section to 2 examples (basic fixture + one test)
- PostgreSQL comparison → reduce to bullet points only (5-7 key differences)
- Keep CRUD operations but consolidate to essential methods only
- Remove 'Claude-Friendly Patterns' section (lines 522-568) - redundant

Target: ~300 lines, down from 598 lines."
```

---

### 3. subagent_usage.md (546 → ~400 lines)

**Launch subagent:**
```
Task tool:
- subagent_type: "quick-code-patch"
- description: "Refactor subagent_usage.md to 400 lines"
- prompt: "Refactor /Users/mini/Documents/Projects/BaseProject/ClaudeUsage/subagent_usage.md to approximately 400 lines.

Target changes:
- Reduce commit protocol examples by 50% (keep 2-3 examples instead of 6)
- Condense web app decomposition example (lines 356-383) to bullet list format
- Simplify handoff protocol format (remove redundant examples)
- Keep phase ordering intact (it's critical)
- Consolidate 'Best Practices' DO/DON'T sections (currently very repetitive)
- Streamline error recovery section

Target: ~400 lines, down from 546 lines."
```

---

### 4. testing_strategies.md (537 → ~350 lines)

**Launch subagent:**
```
Task tool:
- subagent_type: "quick-code-patch"
- description: "Refactor testing_strategies.md to 350 lines"
- prompt: "Refactor /Users/mini/Documents/Projects/BaseProject/ClaudeUsage/testing_strategies.md to approximately 350 lines.

Target changes:
- One example per test type (unit, integration, e2e) - remove variations
- Remove deep pytest fixture examples (keep basic fixtures only)
- Simplify CI/CD integration to one workflow example
- Condense mocking section to essential patterns
- Remove redundant 'best practices' that repeat across sections
- Keep test organization and basic patterns

Target: ~350 lines, down from 537 lines."
```

---

### 5. docker_guide.md (527 → ~350 lines)

**Launch subagent:**
```
Task tool:
- subagent_type: "quick-code-patch"
- description: "Refactor docker_guide.md to 350 lines"
- prompt: "Refactor /Users/mini/Documents/Projects/BaseProject/ClaudeUsage/docker_guide.md to approximately 350 lines.

Target changes:
- Remove UV-specific content (duplicated from uv_usage.md)
- Keep one multi-stage build example (the optimized one)
- Essential docker-compose patterns only (remove variations)
- Reduce networking section to essentials
- Consolidate volume management to key patterns only
- Keep security best practices concise

Target: ~350 lines, down from 527 lines."
```

---

### 6. code_quality.md (500 → ~300 lines)

**Launch subagent:**
```
Task tool:
- subagent_type: "quick-code-patch"
- description: "Refactor code_quality.md to 300 lines"
- prompt: "Refactor /Users/mini/Documents/Projects/BaseProject/ClaudeUsage/code_quality.md to approximately 300 lines.

Target changes:
- One example per tool (Black, Ruff, mypy) - remove configuration variations
- Remove extensive pre-commit config examples (link to pre_commit_hooks/ instead)
- Consolidate tool comparison to simple table
- Reduce 'common issues' to top 5 per tool
- Keep quick reference and installation essentials

Cross-reference pre_commit_hooks/ directory instead of duplicating.

Target: ~300 lines, down from 500 lines."
```

---

## Final Tasks

### 7. Update README.md

**Launch subagent:**
```
Task tool:
- subagent_type: "quick-code-patch"
- description: "Update README.md with new files"
- prompt: "Update /Users/mini/Documents/Projects/BaseProject/ClaudeUsage/README.md to include new files:

Add to appropriate sections:
- secrets_advanced.md (under Core Workflows or new 'Advanced Topics' section)
- git_conventional_commits.md (under Core Workflows)

Ensure all cross-references are accurate and the table of contents reflects the new structure."
```

---

## Why Use Subagents?

**Benefits:**
1. **Reduced Context**: Each subagent works on one file only (~800-1000 tokens vs. 5000+)
2. **Parallel Work**: Can process multiple files if needed
3. **Focused Changes**: Each agent has clear, specific instructions
4. **Clean History**: Each refactoring gets its own commit
5. **Easy Recovery**: If one fails, others aren't affected

---

## Execution Strategy

### Sequential Approach (Recommended)
```bash
# For each remaining file:
1. Launch subagent with Task tool
2. Wait for completion
3. Verify line count: wc -l filename
4. Test that content is still useful
5. Move to next file
```

### Parallel Approach (Advanced)
```bash
# Launch multiple subagents at once:
# Use single message with multiple Task tool calls
# Claude will process them in parallel
# Collect results when all complete
```

---

## Verification Checklist

After each subagent completes:

- [ ] Line count meets target (±20 lines acceptable)
- [ ] Quick start section intact
- [ ] Core functionality preserved
- [ ] Cross-references updated
- [ ] No broken internal links
- [ ] File still useful for new users
- [ ] File still useful for Claude Code assistant

---

## Success Criteria

**Overall Project Goals:**
- ✅ All files under 600 lines
- ✅ Most files 200-400 lines
- ✅ Beginner vs advanced content separated
- ✅ Better cross-referencing
- ✅ Reduced token usage
- ✅ Maintained usefulness

**Expected Final State:**
- Total documentation: ~6,925 → ~3,500 lines (49% reduction)
- Better organized and scannable
- Faster for assistants to find information
- Less overwhelming for new users

---

## Current Progress Tracking

```
[✅✅✅✅✅⬜⬜⬜⬜⬜⬜] 45% Complete (5/11 files)

Completed: secrets_*, git_*
Remaining: uv, database, subagent, testing, docker, code_quality
```

---

## Resume Command

To resume this work:

1. Read this file: `next_task.md`
2. Check current todo list (if still active)
3. Start with task #1 (uv_usage.md)
4. Use Task tool with prompt from above
5. Proceed sequentially through remaining tasks

---

*Created: 2025-10-19*
*Last task completed: git_workflow.md refactored to 495 lines*
*Next task: uv_usage.md (779 → ~350 lines)*
