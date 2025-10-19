# New Project Setup Guide

This guide explains how to clone the BaseProject template and set up a new independent project with all the Claude Code configurations and workflows.

---

## Quick Start

```bash
# 1. Clone/copy the BaseProject to your new project location
cp -r BaseProject/ ~/Projects/MyNewProject/

# 2. Navigate to your new project
cd ~/Projects/MyNewProject/

# 3. Run the setup script
bash setup_new_project.sh
```

---

## Manual Setup (Detailed Steps)

### Step 1: Copy the Base Template

```bash
# Option A: Copy to a new location
cp -r /path/to/BaseProject/ ~/Projects/YourProjectName/

# Option B: Clone if it's a git repo
git clone /path/to/BaseProject ~/Projects/YourProjectName/
cd ~/Projects/YourProjectName/
```

### Step 2: Clean Up Git History

Since you're creating a new project, you'll want to start fresh:

```bash
# Remove the existing git history
rm -rf .git

# Remove the backup prevention (if you want a truly clean start)
# This is safe since you're working from a copy
```

### Step 3: Rename and Customize CLAUDE.md

```bash
# Rename the template to the active file
mv TEMPLATE_CLAUDE.md CLAUDE.md

# Edit CLAUDE.md to fill in your project details
# Fill in these sections:
# - Project Purpose
# - Tech Stack
# - Architecture Notes
```

**Example customization:**

```markdown
## Project Purpose
A web scraper that collects product data from e-commerce sites and stores it in a PostgreSQL database.

## Tech Stack
- Language: Python 3.11+
- Framework: FastAPI
- Key Libraries: BeautifulSoup4, SQLAlchemy, Pydantic
- Package Manager: UV

## Architecture Notes
- Uses async/await for concurrent scraping
- Rate limiting per domain to avoid blocks
- Stores raw HTML in S3, parsed data in PostgreSQL
```

### Step 4: Initialize Git Repository

```bash
# Initialize fresh git repo
git init

# Verify .gitignore is present
cat .gitignore

# Create initial commit
git add .
git commit -m "Initial commit: Setup project from BaseProject template

- Copied BaseProject structure with ClaudeUsage guides
- Configured CLAUDE.md for this specific project
- Initialized git repository

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Step 5: Set Up Project-Specific Files

Depending on your tech stack, create the necessary files:

#### For Python Projects:

```bash
# Create pyproject.toml if using UV
# See ClaudeUsage/uv_usage.md for examples

# Create secrets_template.json
cat > secrets_template.json << 'EOF'
{
  "anthropic_api_key": "sk-ant-api03-...",
  "openai_api_key": "sk-...",
  "database_url": "postgresql://user:pass@localhost/db",
  "comment": "Add your API keys here. Copy this file to secrets.json and fill in real values."
}
EOF

# Create your actual secrets.json
cp secrets_template.json secrets.json
# Edit secrets.json with real values (already gitignored)
```

#### For JavaScript/TypeScript Projects:

```bash
# Create package.json
npm init -y

# Create .env.example
cat > .env.example << 'EOF'
ANTHROPIC_API_KEY=sk-ant-api03-...
DATABASE_URL=postgresql://user:pass@localhost/db
PORT=3000
EOF

# Create actual .env file
cp .env.example .env
# Edit .env with real values
```

### Step 6: Create TODOS.md

```bash
# Create initial TODO list for your project
cat > TODOS.md << 'EOF'
# Project TODOs

## High Priority
- [ ] Set up project structure and dependencies
- [ ] Configure secrets management
- [ ] Implement core functionality

## Medium Priority
- [ ] Add unit tests
- [ ] Set up CI/CD pipeline
- [ ] Write documentation

## Low Priority / Future Ideas
- [ ] Performance optimizations
- [ ] Additional features

## Blocked
- [ ] (None currently)
EOF
```

### Step 7: Review and Customize ClaudeUsage Guides

The `ClaudeUsage/` directory contains comprehensive guides. Review them and:

1. **Keep as-is**: Most guides are universal and don't need changes
2. **Add project-specific examples**: You can add examples to guides for your specific use case
3. **Add new guides**: If you have project-specific patterns, add them

```bash
# Example: Add a project-specific guide
cat > ClaudeUsage/api_patterns.md << 'EOF'
# API Patterns for This Project

## Overview
Specific API patterns and conventions used in this project.

## Endpoint Structure
- All endpoints follow REST conventions
- Use `/api/v1/` prefix
- Authentication via JWT tokens
EOF
```

### Step 8: Set Up Pre-commit Hooks (Optional but Recommended)

```bash
# Navigate to pre-commit hooks directory
cd ClaudeUsage/pre_commit_hooks/

# Read the setup guide
cat setup_guide.md

# Make hooks executable
chmod +x pre-commit commit-msg

# Copy to .git/hooks/
cp pre-commit commit-msg ../../.git/hooks/

# Test the hooks
cd ../..
git add .
git commit -m "test: Testing pre-commit hooks"
```

### Step 9: Commit Your Initial Setup

```bash
# Stage all changes
git add .

# Verify what will be committed
git status
git diff --cached --stat

# Create setup commit
git commit -m "Setup: Configure project-specific settings

- Customized CLAUDE.md with project details
- Created TODOS.md for task tracking
- Set up secrets_template.json for API keys
- Configured pre-commit hooks
- Added project-specific documentation

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Step 10: Optional - Link to Remote Repository

```bash
# Create a new repo on GitHub/GitLab/etc, then:
git remote add origin https://github.com/yourusername/yourproject.git
git branch -M main
git push -u origin main
```

---

## Automated Setup Script

Create a `setup_new_project.sh` script for easier setup:

```bash
#!/bin/bash
# setup_new_project.sh - Automate new project setup from BaseProject template

set -e  # Exit on error

echo "🚀 Setting up new project from BaseProject template..."

# Step 1: Clean up old git history
if [ -d ".git" ]; then
    echo "📦 Removing old git history..."
    rm -rf .git
fi

# Step 2: Rename CLAUDE.md
if [ -f "TEMPLATE_CLAUDE.md" ]; then
    echo "📝 Renaming TEMPLATE_CLAUDE.md to CLAUDE.md..."
    mv TEMPLATE_CLAUDE.md CLAUDE.md
fi

# Step 3: Create TODOS.md if it doesn't exist
if [ ! -f "TODOS.md" ]; then
    echo "✅ Creating TODOS.md..."
    cat > TODOS.md << 'EOF'
# Project TODOs

## High Priority
- [ ] Customize CLAUDE.md with project details
- [ ] Set up dependencies (pyproject.toml, package.json, etc.)
- [ ] Configure secrets management
- [ ] Implement core functionality

## Medium Priority
- [ ] Add unit tests
- [ ] Set up CI/CD pipeline
- [ ] Write project-specific documentation

## Low Priority / Future Ideas
- [ ] Performance optimizations
- [ ] Additional features

## Blocked
- [ ] (None currently)
EOF
fi

# Step 4: Initialize git
echo "🔧 Initializing git repository..."
git init

# Step 5: Verify .gitignore exists
if [ ! -f ".gitignore" ]; then
    echo "⚠️  Warning: .gitignore not found. Creating one..."
    cat > .gitignore << 'EOF'
secrets.json
*.log
__pycache__/
.DS_Store
.claude/
node_modules/
.env
dist/
build/
EOF
fi

# Step 6: Create initial commit
echo "💾 Creating initial commit..."
git add .
git commit -m "Initial commit: Setup project from BaseProject template

- Copied BaseProject structure with ClaudeUsage guides
- Configured CLAUDE.md for this specific project
- Initialized git repository
- Created TODOS.md for task tracking

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit CLAUDE.md to fill in your project details"
echo "2. Review and update TODOS.md with your specific tasks"
echo "3. Create secrets_template.json and secrets.json"
echo "4. Set up your project dependencies (pyproject.toml, package.json, etc.)"
echo "5. Review ClaudeUsage/ guides for workflows and best practices"
echo ""
echo "📚 See ClaudeUsage/README.md for complete guide index"
