#!/bin/bash
# Final push script - Run this after creating the GitHub repository

GITHUB_USER="aks-akanksha"
REPO_NAME="${GITHUB_USER}.github.io"

cd "$(dirname "$0")"

echo "🚀 Pushing portfolio to GitHub..."
echo ""

# Ensure we're on main branch
git checkout main 2>/dev/null || git checkout -b main

# Configure remote
git remote remove origin 2>/dev/null
git remote add origin "git@github.com:${GITHUB_USER}/${REPO_NAME}.git"

# Push
echo "Pushing to: git@github.com:${GITHUB_USER}/${REPO_NAME}.git"
if git push -u origin main; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "Next steps:"
    echo "1. Enable GitHub Pages: https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
    echo "2. Select 'main' branch as source"
    echo "3. Your site will be live at: https://${GITHUB_USER}.github.io"
else
    echo ""
    echo "❌ Push failed. Make sure:"
    echo "1. Repository exists: https://github.com/${GITHUB_USER}/${REPO_NAME}"
    echo "2. You're logged into GitHub"
    echo "3. SSH keys are configured: ssh -T git@github.com"
fi

