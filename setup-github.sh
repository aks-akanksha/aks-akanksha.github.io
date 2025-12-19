#!/bin/bash

# GitHub Pages Setup Script
# This script helps you set up your portfolio on GitHub Pages

echo "🚀 Portfolio Website - GitHub Pages Setup"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

echo "📋 Instructions:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Repository name: YOUR_USERNAME.github.io (for main site)"
echo "     OR any name (for project site)"
echo ""
echo "2. Run these commands in this directory:"
echo ""
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial portfolio website'"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to your repository on GitHub"
echo "   - Settings → Pages"
echo "   - Source: main branch"
echo "   - Save"
echo ""
echo "4. Your site will be live at:"
echo "   https://YOUR_USERNAME.github.io (if repo is YOUR_USERNAME.github.io)"
echo "   OR"
echo "   https://YOUR_USERNAME.github.io/REPO_NAME (if custom repo name)"
echo ""
echo "✨ Done! Your portfolio will be live in a few minutes."
echo ""


