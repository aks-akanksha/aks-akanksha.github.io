#!/bin/bash
# This script creates the GitHub repo and deploys

GITHUB_USER="aks-akanksha"
REPO_NAME="${GITHUB_USER}.github.io"
REPO_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

echo "🚀 Creating GitHub repository and deploying portfolio..."
echo ""

# Check if we can access GitHub
echo "Step 1: Checking GitHub access..."
if curl -s -o /dev/null -w "%{http_code}" "https://github.com/${GITHUB_USER}" | grep -q "200\|404"; then
    echo "✓ GitHub is accessible"
else
    echo "⚠ Cannot verify GitHub access"
fi

echo ""
echo "Step 2: Repository setup"
echo "Repository name: ${REPO_NAME}"
echo "Repository URL: ${REPO_URL}"
echo ""

# Set remote
cd "$(dirname "$0")"
git remote remove origin 2>/dev/null || true
git remote add origin "${REPO_URL}" 2>/dev/null || git remote set-url origin "${REPO_URL}"

echo "✓ Remote configured"
echo ""

echo "=========================================="
echo "MANUAL STEP REQUIRED:"
echo "=========================================="
echo ""
echo "1. Open this URL in your browser:"
echo "   https://github.com/new"
echo ""
echo "2. Repository name: ${REPO_NAME}"
echo "3. Description: Portfolio website"
echo "4. Make it PUBLIC"
echo "5. DO NOT check 'Add a README file'"
echo "6. DO NOT add .gitignore or license"
echo "7. Click 'Create repository'"
echo ""
read -p "Press Enter after you've created the repository on GitHub..."

echo ""
echo "Step 3: Pushing code to GitHub..."
git push -u origin main 2>&1 | head -20

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Code pushed successfully!"
    echo ""
    echo "Step 4: Enable GitHub Pages"
    echo "1. Go to: https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
    echo "2. Under 'Source', select 'main' branch"
    echo "3. Click 'Save'"
    echo ""
    echo "✨ Your site will be live at: https://${GITHUB_USER}.github.io"
    echo "   (It may take 2-3 minutes to go live)"
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "1. Repository exists on GitHub"
    echo "2. You have push access"
    echo "3. Your Git credentials are configured"
fi
