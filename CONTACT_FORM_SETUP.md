# Contact Form Setup Guide

## Quick Setup for Formspree (Recommended)

The contact form is now configured to use Formspree, which is the most reliable solution for static sites like GitHub Pages.

### Steps to Enable Email Notifications:

1. **Sign up for Formspree** (Free tier available - 50 submissions/month)
   - Go to https://formspree.io/
   - Sign up for a free account

2. **Create a New Form**
   - Click "New Form" in your dashboard
   - Set the recipient email to: `aks.akanksha01@gmail.com`
   - Copy your Form ID (it looks like: `xjvqkzpn`)

3. **Update the Form ID in index.html**
   - Open `index.html`
   - Find line 439: `<form id="contact-modal-form" class="contact-modal-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
   - Replace `YOUR_FORM_ID` with your actual Formspree form ID
   - Example: `action="https://formspree.io/f/xjvqkzpn"`

4. **Test the Form**
   - Commit and push your changes
   - Visit your portfolio website
   - Click "Contact Me" and submit a test message
   - Check your email at `aks.akanksha01@gmail.com`

### Alternative: Using EmailJS (Fallback)

If you prefer to use EmailJS instead:

1. Sign up at https://www.emailjs.com/
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{message}}`
   - `{{visitor_email}}`
   - `{{visitor_phone}}`
4. Get your Service ID, Template ID, and Public Key
5. Update the values in `script.js` (lines 345-351)
6. Set `EMAILJS_CONFIG.enabled = true` in `script.js`
7. Set `FORMSFREE_CONFIG.enabled = false` in `script.js`

### Notes

- Formspree is recommended because it's more reliable and easier to set up
- The form will automatically send emails to `aks.akanksha01@gmail.com`
- If neither service is configured, the form will fall back to opening your email client (mailto link)

