#!/bin/bash
# Auto-deploy script that uses GitHub token if available

GITHUB_USER="aks-akanksha"
REPO_NAME="${GITHUB_USER}.github.io"

echo "🔍 Checking for GitHub authentication..."

# Check multiple sources for token
TOKEN=""
if [ -n "$GITHUB_TOKEN" ]; then
    TOKEN="$GITHUB_TOKEN"
    echo "✓ Found token in environment"
elif [ -f ~/.github_token ]; then
    TOKEN=$(cat ~/.github_token 2>/dev/null)
    echo "✓ Found token in ~/.github_token"
fi

if [ -z "$TOKEN" ]; then
    echo "❌ No GitHub token found"
    echo ""
    echo "To deploy automatically, create a Personal Access Token:"
    echo "1. Go to: https://github.com/settings/tokens"
    echo "2. Generate new token (classic)"
    echo "3. Scopes: repo (all)"
    echo "4. Save token and run:"
    echo "   export GITHUB_TOKEN=your_token_here"
    echo "   ./auto-deploy-with-token.sh"
    exit 1
fi

echo "Creating repository via API..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Authorization: token ${TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/user/repos" \
  -d "{\"name\":\"${REPO_NAME}\",\"description\":\"Portfolio website\",\"public\":true,\"auto_init\":false}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)

if [ "$HTTP_CODE" = "201" ]; then
    echo "✅ Repository created!"
    
    # Configure remote with token
    git remote set-url origin "https://${TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git"
    
    echo "Pushing code..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Code pushed successfully!"
        echo ""
        echo "Enabling GitHub Pages via API..."
        
        # Enable GitHub Pages
        curl -s -X POST \
          -H "Authorization: token ${TOKEN}" \
          -H "Accept: application/vnd.github.v3+json" \
          "https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/pages" \
          -d '{"source":{"branch":"main","path":"/"}}' > /dev/null
        
        echo "✅ GitHub Pages enabled!"
        echo ""
        echo "🌐 Your portfolio is live at:"
        echo "   https://${GITHUB_USER}.github.io"
        echo ""
        echo "⏳ It may take 2-3 minutes to build..."
    fi
else
    echo "Response: $(echo "$RESPONSE" | sed '$d')"
    echo "HTTP Code: $HTTP_CODE"
    if [ "$HTTP_CODE" = "422" ]; then
        echo "Repository might already exist. Trying to push..."
        git remote set-url origin "https://${TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git"
        git push -u origin main
    fi
fi
