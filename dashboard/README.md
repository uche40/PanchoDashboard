# Vanilla HTML Dashboard

A simple, standalone dashboard application built with vanilla HTML, CSS, and JavaScript.

## Files

- `index.html` - The complete dashboard application
- `settings.json` - Configuration file for navigation, theme, and security

## How to Use

### Option 1: Open Directly
Simply open `index.html` in any web browser.

### Option 2: Local Server
Run any simple HTTP server in this directory:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (npx)
npx serve

# PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## Customize

Edit `settings.json` to change:
- Navigation items
- Theme colors
- Logo URL
- Allowed iframe domains

## Features

- ✅ Collapsible sidebar
- ✅ Mobile responsive menu
- ✅ Multi-level navigation
- ✅ Hash-based routing
- ✅ Iframe content embedding
- ✅ Dynamic theming via URL parameters
- ✅ localStorage state persistence
- ✅ Zero dependencies (uses CDN for Tailwind & Lucide icons)
