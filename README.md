# BaseProject - Claude Code Template

A comprehensive project template with built-in Claude Code workflows, best practices, and extensive documentation for rapid development setup.

## 🚀 Quick Start

### Using Claude Code (Recommended)

**One-liner in Claude Code:**
```
Clone https://github.com/AutumnsGrove/BaseProject to /tmp, copy (excluding .git and scripts) to ~/Projects/[ASK ME PROJECT NAME], customize CLAUDE.md and README with my project details [ASK ME: name, description, tech stack, API keys needed], init dependencies for my stack, create src/ and tests/ dirs, make secrets_template.json, generate smart TODOS.md, setup git with proper user config, optionally install pre-commit hooks [ASK ME], initial commit with BaseProject format, show summary and next steps
```

Claude will interactively:
- Ask for project name, tech stack, and requirements
- Copy BaseProject template to your chosen location
- Customize CLAUDE.md with your project details
- Set up language-specific dependencies (pyproject.toml, package.json, etc.)
- Create proper project structure (src/, tests/)
- Generate secrets_template.json with your needed API keys
- Initialize git with proper configuration
- Create initial commit following our standards

### Manual Setup

For full control over the setup process, see [NEW_PROJECT_SETUP.md](NEW_PROJECT_SETUP.md) for detailed step-by-step instructions.

---

## 📁 What's Included

```
BaseProject/
├── TEMPLATE_CLAUDE.md          # Main project instructions (rename to CLAUDE.md)
├── ClaudeUsage/                # Comprehensive workflow guides
│   ├── README.md               # Guide index
│   ├── git_workflow.md         # Git operations and commits
│   ├── secrets_management.md  # API key handling
│   ├── code_style_guide.md    # Code style principles
│   ├── project_setup.md       # Project initialization patterns
│   ├── uv_usage.md            # Python UV package manager
│   ├── testing_strategies.md  # Test patterns
│   ├── docker_guide.md        # Containerization
│   ├── ci_cd_patterns.md      # GitHub Actions
│   ├── house_agents.md        # Claude subagent usage
│   ├── pre_commit_hooks/      # Git hooks for code quality
│   ├── templates/             # Template files for common configs
│   └── ... (18 total guides)
├── NEW_PROJECT_SETUP.md        # Manual setup guide
└── .gitignore                  # Comprehensive gitignore
```

---

## 🏠 House Agents Integration

This template works seamlessly with [house-agents](https://github.com/houseworthe/house-agents) - specialized Claude Code sub-agents that keep your context clean.

### What Are House Agents?

Specialized sub-agents that run heavy operations in separate context windows:
- **house-research** - Search 70k+ tokens across files, return 3k summary (95% savings)
- **house-git** - Analyze 43k token diffs, return 500 token summary (98% savings)
- **house-bash** - Process 21k+ command output, return 700 token summary (97% savings)

### Quick Install

**Project-Level (this project only):**
```bash
git clone https://github.com/houseworthe/house-agents.git /tmp/house-agents
cp -r /tmp/house-agents/.claude .
```

**User-Wide (all projects):**
```bash
git clone https://github.com/houseworthe/house-agents.git /tmp/house-agents
mkdir -p ~/.claude/agents
cp /tmp/house-agents/.claude/agents/*.md ~/.claude/agents/
```

**Test Installation:**
```
Use house-research to find all TODO comments in the codebase
```

See [ClaudeUsage/house_agents.md](ClaudeUsage/house_agents.md) for usage patterns and examples.

**Credit:** House Agents by [@houseworthe](https://github.com/houseworthe/house-agents) (v0.2.0-beta)

---

## 🎯 What You Get

### Instant Best Practices
- **Git workflow patterns** - Conventional commits, proper branching
- **Security by default** - API key management, secrets handling
- **Code quality** - Pre-commit hooks, linting patterns
- **Testing strategies** - Unit, integration, and E2E test patterns
- **CI/CD templates** - GitHub Actions workflows
- **Documentation standards** - Consistent, scannable docs

### Claude-Optimized Workflows
- **House agents** - Specialized agents for research, coding, git analysis
- **Context7 integration** - Automatic library documentation fetching
- **TODO management** - Task tracking integrated into workflow
- **Subagent patterns** - Breaking down complex tasks

### Multi-Language Support
Guides and patterns for:
- Python (with UV package manager)
- JavaScript/TypeScript
- Go
- Rust
- Docker containerization

---

## 📚 Documentation Structure

All guides follow a consistent, scannable format:

1. **Overview** - What the guide covers
2. **When to Use** - Specific triggers and scenarios
3. **Core Concepts** - Key principles
4. **Practical Examples** - Real-world code
5. **Common Pitfalls** - What to avoid
6. **Related Guides** - Cross-references

See [ClaudeUsage/README.md](ClaudeUsage/README.md) for the complete index.

---

## 🛠️ Customization Workflow

After running setup:

1. **Edit CLAUDE.md** - Fill in your project specifics
   - Project purpose
   - Tech stack
   - Architecture notes

2. **Create secrets files** (if needed)
   ```bash
   # For Python projects
   cp ClaudeUsage/templates/secrets_template.json secrets_template.json
   cp secrets_template.json secrets.json
   # Edit secrets.json with real API keys
   ```

3. **Set up dependencies**
   ```bash
   # Python with UV
   uv init

   # JavaScript/Node
   npm init -y

   # Go
   go mod init yourproject
   ```

4. **Configure pre-commit hooks** (optional)
   ```bash
   cd ClaudeUsage/pre_commit_hooks/
   chmod +x pre-commit commit-msg
   cp pre-commit commit-msg ../../.git/hooks/
   ```

5. **Update TODOS.md** - Add your specific tasks

---

## 💡 Key Workflows

### Starting a New Feature
1. Check `TODOS.md` for pending tasks
2. Use Context7 to fetch relevant library docs
3. Follow git workflow for commits
4. Update TODOS.md as you progress

### Managing Secrets
1. Read `ClaudeUsage/secrets_management.md`
2. Create `secrets.json` (gitignored)
3. Provide `secrets_template.json` for team
4. Use environment variable fallbacks

### Large Codebase Search
1. Use house-research agent for 20+ file searches
2. Check `ClaudeUsage/house_agents.md` for patterns
3. Use subagents for complex multi-step tasks

### Writing Tests
1. Review `ClaudeUsage/testing_strategies.md`
2. Follow framework-specific patterns
3. Use test-strategist agent for planning

---

## 🔐 Security Defaults

This template includes security best practices by default:

- ✅ `secrets.json` in `.gitignore`
- ✅ Pre-commit hooks to prevent secret commits
- ✅ Environment variable fallback patterns
- ✅ Security audit guides in `secrets_advanced.md`

---

## 🤝 Working with Claude Code

This template is optimized for Claude Code CLI. Key features:

- **CLAUDE.md** triggers automatic context loading
- **Structured guides** for quick reference without token bloat
- **Subagent workflows** for complex tasks
- **Git commit standards** with auto-formatting

### Example Session
```bash
cd ~/Projects/MyNewProject/

# Claude automatically reads CLAUDE.md and knows your project context
claude "Add user authentication with JWT tokens"

# Claude will:
# 1. Check TODOS.md
# 2. Use Context7 to fetch JWT library docs
# 3. Implement following your git commit standards
# 4. Update TODOS.md
# 5. Commit with proper message format
```

---

## 📖 Learning Path

Recommended reading order for new projects:

1. [project_structure.md](ClaudeUsage/project_structure.md) - Directory layouts
2. [git_workflow.md](ClaudeUsage/git_workflow.md) - Version control
3. [secrets_management.md](ClaudeUsage/secrets_management.md) - API keys
4. [uv_usage.md](ClaudeUsage/uv_usage.md) - Python dependencies (if applicable)
5. [testing_strategies.md](ClaudeUsage/testing_strategies.md) - Test setup
6. [house_agents.md](ClaudeUsage/house_agents.md) - Advanced workflows

---

## 🆘 Troubleshooting

### "Git not initialized"
```bash
git init
git add .
git commit -m "Initial commit"
```

### "CLAUDE.md not found"
```bash
# Rename the template
mv TEMPLATE_CLAUDE.md CLAUDE.md

# Customize it
nano CLAUDE.md
```

### "Pre-commit hooks not working"
```bash
chmod +x ClaudeUsage/pre_commit_hooks/*
cp ClaudeUsage/pre_commit_hooks/* .git/hooks/
```

---

## 🔄 Keeping BaseProject Updated

To get updates from BaseProject while preserving your customizations:

```bash
# In your project directory
# Option 1: Manual merge of specific guides
cp /path/to/BaseProject/ClaudeUsage/new_guide.md ClaudeUsage/

# Option 2: Update all guides (careful - review diffs first)
rsync -av --exclude='CLAUDE.md' /path/to/BaseProject/ClaudeUsage/ ClaudeUsage/

# Review changes
git diff

# Commit updates
git add ClaudeUsage/
git commit -m "Update ClaudeUsage guides from BaseProject"
```

---

## 🎉 What's Next?

After setup:

1. **Customize** - Edit CLAUDE.md with your project details
2. **Explore** - Read guides in ClaudeUsage/ directory
3. **Build** - Start coding with Claude Code
4. **Iterate** - Update TODOS.md and guides as needed

---

## 📝 Contributing

Found a better pattern? Want to add a guide?

1. Add your guide to `ClaudeUsage/`
2. Update `ClaudeUsage/README.md` index
3. Follow the documentation standards in `ClaudeUsage/documentation_standards.md`
4. Commit with proper message format

---

## 📄 License

This template is provided as-is for use with Claude Code. Customize freely for your projects.

---

**Last updated:** 2025-10-19
**Maintained for:** Claude Code CLI
**Guides:** 16 comprehensive workflow documents
