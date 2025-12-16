#!/bin/bash
# Create GitHub repository using API

GITHUB_USER="aks-akanksha"
REPO_NAME="${GITHUB_USER}.github.io"
API_URL="https://api.github.com/user/repos"

echo "Attempting to create repository: ${REPO_NAME}"

# Try to get token from git credential store or environment
TOKEN=""
if [ -f ~/.git-credentials ]; then
    TOKEN=$(grep -oP 'github\.com[^:]*:\K[^@]+' ~/.git-credentials 2>/dev/null | head -1)
fi

if [ -z "$TOKEN" ] && [ -n "$GITHUB_TOKEN" ]; then
    TOKEN="$GITHUB_TOKEN"
fi

if [ -z "$TOKEN" ]; then
    echo "No GitHub token found. Trying alternative method..."
    # Try using SSH to create via git push (will fail but might give us info)
    exit 1
fi

# Create repository
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Authorization: token ${TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  "${API_URL}" \
  -d "{\"name\":\"${REPO_NAME}\",\"description\":\"Portfolio website\",\"public\":true,\"auto_init\":false}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "201" ]; then
    echo "✅ Repository created successfully!"
    exit 0
else
    echo "Response: $BODY"
    echo "HTTP Code: $HTTP_CODE"
    exit 1
fi
