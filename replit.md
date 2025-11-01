# Vanilla HTML Dashboard

A 100% data-driven, standalone vanilla JavaScript dashboard application - no React, no TypeScript, no build process.

## Structure

```
dashboard/
  ├── index.html      # Complete dashboard application
  ├── settings.json   # 100% of configuration (navigation, theme, messages, styling)
  └── README.md       # Usage instructions
```

## How It Works

The dashboard is a single HTML file that:
- Loads **all configuration** from `settings.json` via fetch API
- Uses Tailwind CSS (CDN) for styling
- Uses Lucide icons (CDN) for UI icons
- Implements collapsible sidebar, mobile menu, hash routing, and iframe embedding
- Stores user preferences in localStorage
- **Zero hardcoded values** - everything is configurable

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
- ✅ Iframe loading indicator with spinner
- ✅ localStorage state persistence
- ✅ Dynamic theming via URL parameters
- ✅ 100% data-driven - zero hardcoded values
- ✅ Zero build process required

## Configuration (settings.json)

All aspects of the dashboard are configurable via `settings.json`:

### Page Configuration
```json
"page": {
  "title": "Modern Dashboard",
  "lang": "en"
}
```

### Styling Configuration
```json
"styling": {
  "fontFamily": "'Inter', sans-serif",
  "fontSize": "14px",
  "iconStrokeWidth": "1.5"
}
```

### Theme Configuration
```json
"theme": {
  "primary": "hsl(220, 13%, 61%)",
  "secondary": "hsl(210, 40%, 96.1%)",
  "sidebarBorder": "#f0f0f0",
  "toggleButtonBg": "#f5f5f5",
  "headerBg": "#fafafa",
  ...
}
```

### Messages & Localization
```json
"messages": {
  "welcome": {
    "title": "Welcome to your Dashboard",
    "subtitle": "Select a menu item to view its content."
  },
  "errors": {
    "invalidUrl": "The configured iframe URL is invalid.",
    "domainNotAllowed": "For security reasons, only content from configured domains can be displayed."
  },
  "ariaLabels": {
    "openMenu": "Open menu",
    "collapseSidebar": "Collapse sidebar",
    "expandSidebar": "Expand sidebar"
  }
}
```

### Navigation & Security
- Navigation items and structure
- Logo URL
- Profile information
- Allowed iframe domains
- Default sidebar state

## Customization

Edit `dashboard/settings.json` to customize:
- **Page**: Title, language
- **Styling**: Font family, font size, icon stroke width
- **Theme**: All colors (primary, secondary, borders, backgrounds)
- **Messages**: All text content (welcome messages, errors, labels)
- **Navigation**: Items, structure, icons
- **Security**: Allowed iframe domains
- **Sidebar**: Logo, profile, default state

## Technical Details

- **No dependencies**: All code is in one HTML file
- **CDN resources**: Tailwind CSS and Lucide icons loaded from CDN
- **Pure vanilla JavaScript**: No frameworks, no transpilation
- **100% data-driven**: Zero hardcoded values in HTML
- **Works anywhere**: Any modern browser with JavaScript enabled
- **Fully customizable**: Every aspect configurable via JSON

## Recent Updates

- 2025-11-01: Made app 100% data-driven - moved all hardcoded values to settings.json
  - Page configuration (title, lang)
  - Styling configuration (fonts, sizes)
  - All messages and labels (welcome screen, errors, aria labels)
  - All colors (sidebar borders, button backgrounds, header backgrounds)
  - Added iframe loading indicator
