# BaseProject Template Documentation

This directory contains documentation **about the BaseProject template itself**. These files are for users who want to understand or manually set up BaseProject, but should **NOT be copied** to new projects.

## Files in This Directory

### NEW_PROJECT_SETUP.md
Detailed manual setup instructions for creating a new project from the BaseProject template. This is reference documentation for the template setup process.

### QUICK_REFERENCE.md
Quick reference card for BaseProject template features and common tasks. Useful for browsing what BaseProject offers.

---

## Important Note

**When creating a new project from BaseProject:**

These files should stay in the BaseProject repository only. New projects should NOT include this `TemplateDocs/` directory.

The Claude Code one-liner automatically excludes this directory:
```
Clone https://github.com/AutumnsGrove/BaseProject to /tmp, copy (excluding .git, scripts, and TemplateDocs/) to ~/Projects/...
```

If copying manually, exclude this directory:
```bash
# Good - excludes TemplateDocs
rsync -av --exclude='.git' --exclude='TemplateDocs' BaseProject/ NewProject/

# Or use cp with caution
cp -r BaseProject/ NewProject/
rm -rf NewProject/TemplateDocs/  # Remove after copying
```

---

## What Gets Copied to New Projects?

New projects should include:
- `TEMPLATE_CLAUDE.md` (renamed to `CLAUDE.md`)
- `ClaudeUsage/` directory (all workflow guides)
- `.gitignore`
- That's it! Everything else is created during setup.

For the recommended setup process, see the main [README.md](../README.md).
