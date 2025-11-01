# Vanilla HTML Dashboard

A simple, standalone vanilla JavaScript dashboard application - no React, no TypeScript, no build process.

## Structure

```
dashboard/
  ├── index.html      # Complete dashboard application
  ├── settings.json   # Configuration (navigation, theme, security)
  └── README.md       # Usage instructions
```

## How It Works

The dashboard is a single HTML file that:
- Loads configuration from `settings.json` via fetch API
- Uses Tailwind CSS (CDN) for styling
- Uses Lucide icons (CDN) for UI icons
- Implements collapsible sidebar, mobile menu, hash routing, and iframe embedding
- Stores user preferences in localStorage

## Usage

### Option 1: Open Directly
Navigate to the `dashboard/` folder and open `index.html` in any browser.

### Option 2: Simple HTTP Server
Run any HTTP server in the `dashboard/` directory:
```bash
cd dashboard
python3 -m http.server 8000
```

## Features

- ✅ Collapsible sidebar with hover-to-expand on desktop
- ✅ Mobile slide-out overlay menu
- ✅ Multi-level navigation (headers, links, expandable submenus)
- ✅ Hash-based routing with query parameter support
- ✅ Iframe content loading with domain whitelist
- ✅ localStorage state persistence
- ✅ Dynamic theming via URL parameters
- ✅ Zero build process required

## Customization

Edit `dashboard/settings.json` to change:
- Navigation items and structure
- Theme colors (HSL values)
- Logo URL
- Allowed iframe domains
- Default sidebar state

## Technical Details

- **No dependencies**: All code is in one HTML file
- **CDN resources**: Tailwind CSS and Lucide icons loaded from CDN
- **Pure vanilla JavaScript**: No frameworks, no transpilation
- **Works anywhere**: Any modern browser with JavaScript enabled
