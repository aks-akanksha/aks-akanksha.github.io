# Akanksha Singh - Portfolio Website

A unique retro terminal-themed portfolio website showcasing my work, experience, and projects.

## Features

- 🎨 **Unique Terminal UI**: Retro-futuristic terminal interface with neon green aesthetics
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 🎯 **Interactive Navigation**: Smooth transitions and animations
- 📊 **Analytics Tracking**: Built-in visitor and interaction tracking
- 🖼️ **Gallery Section**: Showcase experiences through photos and blogs
- ⚡ **Fast & Lightweight**: Optimized for performance

## Sections

- **About**: Personal introduction and education
- **Experience**: Professional timeline with detailed achievements
- **Projects**: Showcase of GitHub projects and work
- **Skills**: Technical skills organized by category
- **Gallery**: Photos and blog posts
- **Contact**: Ways to get in touch

## Setup for GitHub Pages

### Option 1: Using GitHub Repository (Recommended)

1. Create a new repository on GitHub named `yourusername.github.io` (replace `yourusername` with your GitHub username)

2. Clone the repository locally:
   ```bash
   git clone https://github.com/yourusername/yourusername.github.io.git
   cd yourusername.github.io
   ```

3. Copy all files from this portfolio-website directory to the cloned repository

4. Commit and push:
   ```bash
   git add .
   git commit -m "Initial portfolio website"
   git push origin main
   ```

5. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" section
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be live at `https://yourusername.github.io`

### Option 2: Using a Custom Repository Name

1. Create a repository with any name (e.g., `portfolio`)

2. Follow steps 2-4 from Option 1

3. Enable GitHub Pages:
   - Go to Settings → Pages
   - Select "main" branch as source
   - Your site will be at `https://yourusername.github.io/repository-name`

## Analytics

The website includes built-in analytics tracking that stores data locally. You can:

- View analytics data in browser console: `portfolioAnalytics.getSummary()`
- Export analytics data: `portfolioAnalytics.exportData()`
- Clear analytics data: `portfolioAnalytics.clearData()`

### Integrating External Analytics

To integrate with Google Analytics, Plausible, or other services, edit `analytics.js` and uncomment the relevant sections in the `logEvent()` function.

## Customization

### Adding Gallery Images

Replace the placeholder gallery items in `index.html` with your actual images:

```html
<div class="gallery-item">
    <img src="path/to/your/image.jpg" alt="Description">
</div>
```

### Adding Blog Posts

Add blog entries in the gallery section:

```html
<div class="blog-item">
    <h3>Blog Post Title</h3>
    <p>Blog content...</p>
    <a href="blog-post-url">Read More →</a>
</div>
```

### Updating Contact Information

Edit the contact section in `index.html` with your current information.

### Changing Colors

Modify the CSS variables in `styles.css`:

```css
:root {
    --terminal-green: #00ff41;
    --terminal-cyan: #00ffff;
    --terminal-purple: #b026ff;
    /* ... */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This portfolio is open source and available for personal use.

## Contact

- **Email**: aks.akanksha01@gmail.com
- **LinkedIn**: [singhakanksha01](https://www.linkedin.com/in/singhakanksha01)
- **GitHub**: [aks-akanksha](https://github.com/aks-akanksha)

---

Built with ❤️ using HTML, CSS, and JavaScript


