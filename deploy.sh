#!/bin/bash

# Portfolio Deployment Script
# This script will help deploy your portfolio to GitHub Pages

set -e

echo "🚀 Portfolio Deployment Script"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get GitHub username
GITHUB_USER="aks-akanksha"
REPO_NAME="${GITHUB_USER}.github.io"

echo -e "${YELLOW}Step 1: Checking Git status...${NC}"
cd "$(dirname "$0")"

if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Git repository not initialized${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Git repository initialized${NC}"

# Check if remote exists
if git remote get-url origin &>/dev/null; then
    echo -e "${GREEN}✓ Remote already configured${NC}"
    REMOTE_URL=$(git remote get-url origin)
    echo "  Remote URL: $REMOTE_URL"
else
    echo -e "${YELLOW}Step 2: Setting up GitHub remote...${NC}"
    REMOTE_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
    git remote add origin "$REMOTE_URL" 2>/dev/null || git remote set-url origin "$REMOTE_URL"
    echo -e "${GREEN}✓ Remote configured: $REMOTE_URL${NC}"
fi

echo ""
echo -e "${YELLOW}Step 3: Checking for uncommitted changes...${NC}"
if ! git diff-index --quiet HEAD --; then
    echo "Staging changes..."
    git add .
    git commit -m "Update portfolio website"
    echo -e "${GREEN}✓ Changes committed${NC}"
else
    echo -e "${GREEN}✓ No uncommitted changes${NC}"
fi

echo ""
echo -e "${YELLOW}Step 4: Pushing to GitHub...${NC}"
echo "This will push your code to: https://github.com/${GITHUB_USER}/${REPO_NAME}"
echo ""

# Check if repo exists by trying to fetch
if git ls-remote --exit-code origin &>/dev/null; then
    echo -e "${GREEN}✓ Repository exists on GitHub${NC}"
    echo "Pushing code..."
    git push -u origin main || git push -u origin master
    echo -e "${GREEN}✓ Code pushed successfully!${NC}"
else
    echo -e "${RED}⚠ Repository not found on GitHub${NC}"
    echo ""
    echo "Please create the repository first:"
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: ${REPO_NAME}"
    echo "3. Make it PUBLIC"
    echo "4. DO NOT initialize with README, .gitignore, or license"
    echo "5. Click 'Create repository'"
    echo ""
    read -p "Press Enter after you've created the repository..."
    echo ""
    echo "Pushing code..."
    git push -u origin main || git push -u origin master
    echo -e "${GREEN}✓ Code pushed successfully!${NC}"
fi

echo ""
echo -e "${YELLOW}Step 5: Enable GitHub Pages${NC}"
echo "1. Go to: https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
echo "2. Under 'Source', select 'main' branch (or 'master' if main doesn't exist)"
echo "3. Click 'Save'"
echo "4. Wait 2-3 minutes for GitHub to build your site"
echo ""
echo -e "${GREEN}✨ Your portfolio will be live at: https://${GITHUB_USER}.github.io${NC}"
echo ""
echo "Deployment complete! 🎉"

