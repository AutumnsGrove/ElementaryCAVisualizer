# BaseProject Quick Reference Card

## 🚀 New Project Setup (30 seconds)

```bash
cp -r BaseProject/ ~/Projects/NewProject/
cd ~/Projects/NewProject/
bash setup_new_project.sh
```

---

## 📋 Essential Files Checklist

- [ ] Rename `TEMPLATE_CLAUDE.md` → `CLAUDE.md`
- [ ] Customize `CLAUDE.md` (purpose, tech stack, architecture)
- [ ] Create `TODOS.md` for task tracking
- [ ] Create `secrets.json` (gitignored)
- [ ] Create `secrets_template.json` for team
- [ ] Initialize git: `git init && git add . && git commit`
- [ ] Set up dependencies (pyproject.toml, package.json, etc.)

---

## 🗂️ Guide Quick Access

| Need | Read |
|------|------|
| Git commits | `ClaudeUsage/git_workflow.md` |
| API keys | `ClaudeUsage/secrets_management.md` |
| Python deps | `ClaudeUsage/uv_usage.md` |
| Testing | `ClaudeUsage/testing_strategies.md` |
| Docker | `ClaudeUsage/docker_guide.md` |
| Search patterns | `ClaudeUsage/house_agents.md` |
| Pre-commit hooks | `ClaudeUsage/pre_commit_hooks/setup_guide.md` |

**Full index:** `ClaudeUsage/README.md`

---

## 🔑 Secrets Management Pattern

```python
# 1. Create secrets_template.json
{
  "anthropic_api_key": "sk-ant-api03-...",
  "comment": "Copy to secrets.json and fill in real values"
}

# 2. Copy and fill secrets.json
cp secrets_template.json secrets.json
# Edit secrets.json with real keys (gitignored)

# 3. Load in code
import json
def load_secrets():
    with open('secrets.json') as f:
        return json.load(f)
```

---

## 📝 Git Commit Format

```bash
git add .
git commit -m "$(cat <<'EOF'
[Action] [Brief description]

- [Specific change 1]
- [Specific change 2]
- [Implementation details]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

**Action verbs:** Add, Update, Fix, Refactor, Remove, Enhance

---

## 🏠 House Agents - When to Use

| Agent | Use When | Example |
|-------|----------|---------|
| `house-research` | Searching 20+ files | "Find all TODO comments" |
| `house-coder` | Small patches 0-250 lines | "Fix this import error" |
| `house-git` | Reviewing diffs 100+ lines | "Analyze this merge conflict" |
| `test-strategist` | Planning test approach | "Plan tests for auth module" |
| `house-planner` | Complex multi-file changes | "Design new feature architecture" |

**Full guide:** `ClaudeUsage/house_agents.md`

---

## 📦 Language-Specific Setup

### Python
```bash
uv init
# Edit pyproject.toml
uv add <package>
```

### JavaScript/TypeScript
```bash
npm init -y
npm install <package>
# or
pnpm init
pnpm add <package>
```

### Go
```bash
go mod init projectname
go get <package>
```

### Rust
```bash
cargo init
cargo add <crate>
```

---

## 🧪 Testing Quick Start

```bash
# Python
uv add pytest pytest-cov --dev
pytest tests/

# JavaScript
npm install --save-dev jest
npm test

# Go
go test ./...

# Rust
cargo test
```

**Full patterns:** `ClaudeUsage/testing_strategies.md`

---

## 🐳 Docker Quick Start

```dockerfile
# Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "main.py"]
```

```bash
docker build -t myapp .
docker run -it myapp
```

**Full guide:** `ClaudeUsage/docker_guide.md`

---

## ✅ Pre-commit Hooks

```bash
cd ClaudeUsage/pre_commit_hooks/
chmod +x pre-commit commit-msg
cp pre-commit commit-msg ../../.git/hooks/
```

**Setup guide:** `ClaudeUsage/pre_commit_hooks/setup_guide.md`

---

## 🔍 Common Searches

```bash
# Find all TODOs
grep -r "TODO" --include="*.py" .

# Find API keys (security check)
grep -r "api_key" --include="*.py" .

# Find test files
find . -name "*test*.py"
```

**Use house-research for 20+ files!**

---

## 📊 TODO.md Template

```markdown
# Project TODOs

## High Priority
- [ ] Critical task 1
- [ ] Critical task 2

## Medium Priority
- [ ] Important task

## Low Priority / Future Ideas
- [ ] Nice to have

## Blocked
- [ ] Blocked by X
```

---

## 🎯 Naming Conventions

- **Directories:** CamelCase (`VideoProcessor`, `AudioTools`)
- **Date paths:** Skewer-case (`logs-2025-01-15`, `backup-2025-12-31`)
- **No spaces or underscores** in directory names

---

## 🔐 .gitignore Essentials

```gitignore
secrets.json
*.log
__pycache__/
.DS_Store
.claude/
node_modules/
.env
dist/
build/
```

---

## 💡 Claude Code Tips

### Context7 - Fetch Library Docs
```
"Fetch Next.js documentation"
# Claude uses Context7 MCP to get latest docs
```

### Update TODOS.md
Always update after:
- Completing a task
- Discovering new tasks
- Changing priorities

### Git Workflow
1. `git status` - Check changes
2. `git diff --stat` - Review scope
3. `git log --oneline -5` - Check commit style
4. Stage, commit, push

---

## 🆘 Emergency Fixes

### Committed secrets by accident
```bash
git reset HEAD~1
# Remove secrets from files
git add .
git commit -m "Fix: Remove accidentally committed secrets"
```

### Need to undo last commit
```bash
git reset --soft HEAD~1
# Make changes
git add .
git commit -m "Fixed commit message"
```

### Pre-commit hook blocking valid commit
```bash
git commit --no-verify -m "message"
# Only use when hook is wrong!
```

---

## 📱 Quick Commands

```bash
# Check project structure
tree -L 2 -a .

# Find large files
find . -type f -size +1M

# Count lines of code
find . -name "*.py" | xargs wc -l

# Check git repo size
du -sh .git

# List all branches
git branch -a

# Show recent commits
git log --oneline --graph -10
```

---

## 🌟 Pro Tips

1. **Read guides on-demand** - Don't try to memorize everything
2. **Use house-research** - For large codebase searches
3. **Keep TODOS.md current** - Update it constantly
4. **Commit often** - Small, focused commits
5. **Use Context7** - For up-to-date library docs
6. **Follow naming conventions** - CamelCase directories
7. **Never commit secrets** - Use secrets.json pattern
8. **Pre-commit hooks** - Catch issues before commit

---

## 📞 Getting Help

- **All guides:** `ClaudeUsage/README.md`
- **Setup issues:** `NEW_PROJECT_SETUP.md`
- **This template:** `README.md`

---

**Print this page for quick reference while coding!**

*Last updated: 2025-10-19*
