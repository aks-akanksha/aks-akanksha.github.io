# Quick Start Guide

## 🚀 Deploy to GitHub Pages (5 minutes)

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `akanksha.github.io` (replace `akanksha` with your GitHub username)
3. Make it **public**
4. Click "Create repository"

### Step 2: Upload Files
Run these commands in the portfolio-website directory:

```bash
cd /home/akanksha/portfolio-website

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio website"

# Rename branch to main
git branch -M main

# Add your GitHub repository (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select **main** branch
5. Click **Save**
6. Wait 2-3 minutes for GitHub to build your site
7. Visit `https://YOUR_USERNAME.github.io` 🎉

## 📊 View Analytics

Open browser console (F12) and run:

```javascript
// View summary
portfolioAnalytics.getSummary()

// View all data
portfolioAnalytics.getData()

// Export data as JSON
portfolioAnalytics.exportData()
```

## 🖼️ Add Gallery Images

Edit `index.html` and replace placeholder gallery items:

```html
<div class="gallery-item">
    <img src="images/your-photo.jpg" alt="Description" style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

## 📝 Add Blog Posts

Edit `index.html` in the blogs section:

```html
<div class="blog-item">
    <h3>My Blog Post Title</h3>
    <p class="blog-date">December 16, 2024</p>
    <p>Your blog content here...</p>
    <a href="blog-url" class="blog-link">Read More →</a>
</div>
```

## 🎨 Customize Colors

Edit `styles.css` and modify the CSS variables at the top:

```css
:root {
    --terminal-green: #00ff41;  /* Change to your preferred color */
    --terminal-cyan: #00ffff;
    --terminal-purple: #b026ff;
}
```

## ✅ That's It!

Your unique terminal-themed portfolio is ready! 🎊


