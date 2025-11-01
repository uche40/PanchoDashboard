# Vanilla HTML Dashboard

A 100% data-driven, standalone dashboard application built with vanilla HTML, CSS, and JavaScript. No React, no TypeScript, no build process.

## Files

- `index.html` - The complete dashboard application (single file)
- `settings.json` - All configuration (navigation, branding, theme, messages)

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

## Customize Your Dashboard

All customization is done through `settings.json`. The file is organized with commonly-changed items at the top and technical settings at the bottom:

### 1. Navigation Menu (Top - Most Commonly Changed)
Edit `sidebar.navItems` to add, remove, or modify menu items. Supports:
- **Links**: Direct navigation items with labels and icons
- **Headers**: Section dividers in the menu
- **Submenus**: Expandable groups of related links

### 2. Logo & Profile (Commonly Changed)
- `sidebar.logoUrl` - Your logo image URL
- `sidebar.profile` - Profile section at bottom of sidebar

### 3. Page Settings (Moderately Changed)
- `page.title` - Browser tab title
- `page.lang` - Language code (e.g., "en", "es")

### 4. Security (Occasionally Changed)
- `security.allowedIframeDomains` - Domains allowed to load in iframes

### 5. Messages & Text (For Translations)
- `messages.welcome` - Welcome screen text
- `messages.errors` - Error messages
- `messages.ariaLabels` - Accessibility labels

### 6. Styling & Theme (Rarely Changed)
- `styling` - Fonts and icon appearance
- `theme` - All color values (use HSL format)

## Features

- ✅ Collapsible sidebar with hover-to-expand
- ✅ Mobile responsive slide-out menu
- ✅ Multi-level navigation (headers, links, submenus)
- ✅ Hash-based routing with query parameter support
- ✅ Iframe content embedding with loading indicator
- ✅ Dynamic theming via URL parameters
- ✅ localStorage state persistence
- ✅ 100% data-driven (zero hardcoded values)
- ✅ Zero dependencies (CDN for Tailwind CSS & Lucide icons)

## Example: Adding a Menu Item

Open `settings.json` and add to `sidebar.navItems`:

```json
{
  "type": "link",
  "href": "#/new-page.html",
  "label": "My New Page",
  "icon": "star",
  "iframeUrl": "https://example.com/page"
}
```

Icons are from [Lucide Icons](https://lucide.dev/icons/) - just use the icon name.

## Technical Details

- **No build process**: Open and edit directly
- **Pure vanilla JavaScript**: No frameworks, no transpilation
- **Single HTML file**: Everything in one place
- **CDN resources**: Tailwind CSS and Lucide icons
- **Works anywhere**: Any modern browser with JavaScript
