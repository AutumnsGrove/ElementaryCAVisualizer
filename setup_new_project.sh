#!/bin/bash
# setup_new_project.sh - Automate new project setup from BaseProject template

set -e  # Exit on error

echo "🚀 Setting up new project from BaseProject template..."

# Step 1: Clean up old git history
if [ -d ".git" ]; then
    echo "📦 Removing old git history..."
    read -p "⚠️  This will delete the existing .git directory. Continue? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf .git
    else
        echo "❌ Cancelled. Keeping existing git history."
        exit 1
    fi
fi

# Step 2: Rename CLAUDE.md
if [ -f "TEMPLATE_CLAUDE.md" ]; then
    echo "📝 Renaming TEMPLATE_CLAUDE.md to CLAUDE.md..."
    if [ -f "CLAUDE.md" ]; then
        read -p "⚠️  CLAUDE.md already exists. Overwrite? (y/N) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            mv TEMPLATE_CLAUDE.md CLAUDE.md
        else
            echo "⏭️  Keeping existing CLAUDE.md"
        fi
    else
        mv TEMPLATE_CLAUDE.md CLAUDE.md
    fi
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
*.pyc
.pytest_cache/
.coverage
htmlcov/
EOF
fi

# Step 6: Prompt for project details
echo ""
echo "📋 Let's gather some project information..."
read -p "Project name: " project_name
read -p "Primary language (Python/JavaScript/Go/Rust/Other): " primary_language
read -p "Brief description (one line): " project_description

# Step 7: Update CLAUDE.md with basic info
if [ -f "CLAUDE.md" ]; then
    echo "📝 Updating CLAUDE.md with project info..."
    # This is a basic sed replacement - users can further customize
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/\[Fill in: What this project does - 1-2 sentences\]/$project_description/" CLAUDE.md
        sed -i '' "s/- Language:/- Language: $primary_language/" CLAUDE.md
    else
        # Linux
        sed -i "s/\[Fill in: What this project does - 1-2 sentences\]/$project_description/" CLAUDE.md
        sed -i "s/- Language:/- Language: $primary_language/" CLAUDE.md
    fi
fi

# Step 8: Create initial commit
echo "💾 Creating initial commit..."
git add .
git commit -m "Initial commit: Setup $project_name from BaseProject template

- Copied BaseProject structure with ClaudeUsage guides
- Configured CLAUDE.md for $project_name
- Initialized git repository
- Created TODOS.md for task tracking

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo ""
echo "✨ Setup complete!"
echo ""
echo "📊 Project Summary:"
echo "   Name: $project_name"
echo "   Language: $primary_language"
echo "   Description: $project_description"
echo ""
echo "Next steps:"
echo "1. Review and complete CLAUDE.md customization (sections marked with [Fill in:])"
echo "2. Update TODOS.md with your specific tasks"
echo "3. Create secrets_template.json and secrets.json (see ClaudeUsage/secrets_management.md)"
echo "4. Set up your project dependencies:"
if [ "$primary_language" = "Python" ]; then
    echo "   - Create pyproject.toml (see ClaudeUsage/uv_usage.md)"
    echo "   - Run: uv init (if using UV package manager)"
elif [ "$primary_language" = "JavaScript" ] || [ "$primary_language" = "TypeScript" ]; then
    echo "   - Run: npm init -y"
    echo "   - Set up package.json with your dependencies"
fi
echo "5. Review ClaudeUsage/ guides for workflows and best practices"
echo ""
echo "📚 Quick reference:"
echo "   - All guides: ClaudeUsage/README.md"
echo "   - Git workflow: ClaudeUsage/git_workflow.md"
echo "   - Secrets management: ClaudeUsage/secrets_management.md"
echo ""
echo "🎉 Happy coding!"
