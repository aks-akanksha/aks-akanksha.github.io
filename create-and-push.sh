#!/bin/bash
# Automated create and push - tries multiple methods

GITHUB_USER="aks-akanksha"
REPO_NAME="${GITHUB_USER}.github.io"

echo "🚀 Automated Repository Creation & Deployment"
echo "============================================"
echo ""

# Method 1: Try using GitHub API if token available
if [ -n "$GITHUB_TOKEN" ]; then
    echo "Method 1: Using GitHub API with token..."
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
      -H "Authorization: token ${GITHUB_TOKEN}" \
      -H "Accept: application/vnd.github.v3+json" \
      "https://api.github.com/user/repos" \
      -d "{\"name\":\"${REPO_NAME}\",\"description\":\"Portfolio website\",\"public\":true,\"auto_init\":false}")
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    if [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "422" ]; then
        echo "✅ Repository created/exists"
        git remote set-url origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git"
        git push -u origin main && echo "✅ Pushed!" && exit 0
    fi
fi

# Method 2: Try direct push (might work if repo exists)
echo "Method 2: Attempting direct push..."
if git push -u origin main 2>&1; then
    echo "✅ Successfully pushed!"
    exit 0
fi

# Method 3: Use HTTPS with credential helper
echo "Method 3: Trying HTTPS method..."
git remote set-url origin "https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
echo "Repository needs to be created first at: https://github.com/new"
echo "Name: ${REPO_NAME}"
