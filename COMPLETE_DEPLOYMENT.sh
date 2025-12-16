#!/bin/bash

# Complete Portfolio Deployment Script
# This script will prepare everything and guide you through deployment

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

GITHUB_USER="aks-akanksha"
REPO_NAME="${GITHUB_USER}.github.io"

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Portfolio Deployment - Complete Setup ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

cd "$(dirname "$0")"

echo -e "${GREEN}✓ Step 1: Verifying local repository...${NC}"
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial portfolio website"
    git branch -M main
fi
echo -e "${GREEN}✓ Local repository ready${NC}"
echo ""

echo -e "${GREEN}✓ Step 2: Configuring GitHub remote...${NC}"
git remote remove origin 2>/dev/null || true
git remote add origin "git@github.com:${GITHUB_USER}/${REPO_NAME}.git" 2>/dev/null || \
git remote set-url origin "git@github.com:${GITHUB_USER}/${REPO_NAME}.git"
echo -e "${GREEN}✓ Remote configured: git@github.com:${GITHUB_USER}/${REPO_NAME}.git${NC}"
echo ""

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}  MANUAL STEP: Create GitHub Repository${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "I'll open GitHub in your browser. Please:"
echo ""
echo "1. Sign in to GitHub (if not already signed in)"
echo "2. Repository name: ${REPO_NAME}"
echo "3. Description: Portfolio website"
echo "4. Make it PUBLIC ⚠️"
echo "5. DO NOT check 'Add a README file'"
echo "6. DO NOT add .gitignore or license"
echo "7. Click 'Create repository'"
echo ""
echo "After creating the repository, come back here and press Enter..."
echo ""

# Try to open GitHub in browser
if command -v xdg-open &> /dev/null; then
    xdg-open "https://github.com/new" 2>/dev/null &
elif command -v open &> /dev/null; then
    open "https://github.com/new" 2>/dev/null &
fi

read -p "Press Enter after you've created the repository on GitHub..."

echo ""
echo -e "${GREEN}✓ Step 3: Pushing code to GitHub...${NC}"
echo ""

# Try to push
if git push -u origin main 2>&1; then
    echo ""
    echo -e "${GREEN}✅ Code pushed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}  FINAL STEP: Enable GitHub Pages${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "1. Go to: https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
    echo ""
    echo "2. Under 'Source' section:"
    echo "   - Select 'Deploy from a branch'"
    echo "   - Branch: main"
    echo "   - Folder: / (root)"
    echo ""
    echo "3. Click 'Save'"
    echo ""
    echo "4. Wait 2-3 minutes for GitHub to build your site"
    echo ""
    echo -e "${GREEN}✨ Your portfolio will be live at:${NC}"
    echo -e "${BLUE}   https://${GITHUB_USER}.github.io${NC}"
    echo ""
    
    # Try to open Pages settings
    if command -v xdg-open &> /dev/null; then
        xdg-open "https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages" 2>/dev/null &
    elif command -v open &> /dev/null; then
        open "https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages" 2>/dev/null &
    fi
    
    echo -e "${GREEN}🎉 Deployment process complete!${NC}"
    echo ""
    echo "Your portfolio website is being deployed!"
    echo "Check the status at: https://github.com/${GITHUB_USER}/${REPO_NAME}/actions"
    
else
    echo ""
    echo -e "${YELLOW}⚠ Push failed. This might mean:${NC}"
    echo "1. Repository doesn't exist yet (create it first)"
    echo "2. SSH keys not configured"
    echo "3. Permission issues"
    echo ""
    echo "Troubleshooting:"
    echo "- Make sure you created the repository: ${REPO_NAME}"
    echo "- Check SSH: ssh -T git@github.com"
    echo "- Try HTTPS instead: git remote set-url origin https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

