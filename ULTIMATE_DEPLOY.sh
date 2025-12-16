#!/bin/bash
# Ultimate deployment script - handles everything

set -e

GITHUB_USER="aks-akanksha"
REPO_NAME="${GITHUB_USER}.github.io"

echo "╔════════════════════════════════════════════════════╗"
echo "║     ULTIMATE PORTFOLIO DEPLOYMENT SCRIPT         ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

cd "$(dirname "$0")"

# Step 1: Check if repo exists
echo "Step 1: Checking if repository exists..."
if git ls-remote "git@github.com:${GITHUB_USER}/${REPO_NAME}.git" &>/dev/null; then
    echo "✅ Repository exists!"
    EXISTS=true
else
    echo "⚠️  Repository doesn't exist yet"
    EXISTS=false
fi

# Step 2: Try to push (will create if using API with token)
echo ""
echo "Step 2: Attempting to push code..."

if [ "$EXISTS" = false ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Repository needs to be created first"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Quick method (30 seconds):"
    echo "1. Go to: https://github.com/settings/tokens/new"
    echo "2. Note: 'Portfolio Deploy'"
    echo "3. Expiration: 90 days"
    echo "4. Scopes: Check 'repo' (all repo permissions)"
    echo "5. Generate token"
    echo "6. Copy the token"
    echo ""
    read -p "Paste your GitHub token here (or press Enter to create repo manually): " TOKEN
    
    if [ -n "$TOKEN" ]; then
        echo ""
        echo "Creating repository via API..."
        RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
          -H "Authorization: token ${TOKEN}" \
          -H "Accept: application/vnd.github.v3+json" \
          "https://api.github.com/user/repos" \
          -d "{\"name\":\"${REPO_NAME}\",\"description\":\"Portfolio website\",\"public\":true,\"auto_init\":false}")
        
        HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
        
        if [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "422" ]; then
            echo "✅ Repository ready!"
            
            # Push with token
            git remote set-url origin "https://${TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git"
            git push -u origin main
            
            if [ $? -eq 0 ]; then
                echo ""
                echo "✅ Code pushed successfully!"
                
                # Enable Pages
                echo "Enabling GitHub Pages..."
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
                echo "⏳ Building... (2-3 minutes)"
                exit 0
            fi
        else
            echo "❌ Failed to create repository"
            echo "Response: $(echo "$RESPONSE" | sed '$d')"
        fi
    fi
    
    echo ""
    echo "Manual method:"
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: ${REPO_NAME}"
    echo "3. Make it PUBLIC"
    echo "4. Don't initialize with README"
    echo "5. Create repository"
    echo ""
    read -p "Press Enter after creating the repository..."
fi

# Try to push
if git push -u origin main 2>&1; then
    echo ""
    echo "✅ Successfully pushed!"
    echo ""
    echo "Enable GitHub Pages:"
    echo "https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
    echo ""
    echo "Your site: https://${GITHUB_USER}.github.io"
else
    echo ""
    echo "❌ Push failed. Check:"
    echo "1. Repository exists"
    echo "2. SSH keys configured: ssh -T git@github.com"
    echo "3. Or use HTTPS: git remote set-url origin https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
fi
