#!/bin/bash
# Create GitHub repository using API

GITHUB_USER="aks-akanksha"
REPO_NAME="${GITHUB_USER}.github.io"
GITHUB_API="https://api.github.com"

echo "Creating GitHub repository: ${REPO_NAME}"

# Check for GitHub token
if [ -z "$GITHUB_TOKEN" ]; then
    echo ""
    echo "⚠ GitHub token not found in environment"
    echo ""
    echo "To create the repo automatically, you can:"
    echo "1. Create a Personal Access Token at: https://github.com/settings/tokens"
    echo "2. Run: export GITHUB_TOKEN=your_token_here"
    echo "3. Run this script again"
    echo ""
    echo "OR create the repository manually:"
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: ${REPO_NAME}"
    echo "3. Make it PUBLIC"
    echo "4. Don't initialize with README"
    echo ""
    exit 1
fi

# Create repository via API
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  "${GITHUB_API}/user/repos" \
  -d "{\"name\":\"${REPO_NAME}\",\"description\":\"Portfolio website\",\"public\":true}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "201" ]; then
    echo "✅ Repository created successfully!"
    echo ""
    echo "Pushing code..."
    git push -u origin main
    echo ""
    echo "✅ Deployment complete!"
    echo "Enable GitHub Pages at: https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
else
    echo "❌ Failed to create repository"
    echo "Response: $BODY"
    echo ""
    echo "HTTP Code: $HTTP_CODE"
    echo ""
    echo "Please create the repository manually at: https://github.com/new"
fi
