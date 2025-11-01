# Vanilla HTML Dashboard

A 100% data-driven, standalone dashboard application built with vanilla HTML, CSS, and JavaScript. No React, no TypeScript, no build process.

**NEW: Multi-App Support** - Run multiple independent dashboards from a single installation by loading different settings based on URL parameters!

## Files & Structure

```
dashboard/
├── index.html           # Main dashboard application (single file)
├── apps/               # Apps folder - each subfolder is a separate app
│   └── partners/       # Example app: "partners"
│       └── settings.json
└── README.md
```

## Multi-App Feature

The dashboard can load different configurations based on a URL parameter, allowing you to run multiple independent dashboards:

### Usage

- **Default app**: `http://localhost:5000/` → Loads `apps/partners/settings.json`
- **Specific app**: `http://localhost:5000/?app=partners` → Loads `apps/partners/settings.json`
- **Another app**: `http://localhost:5000/?app=clients` → Loads `apps/clients/settings.json`

### Creating a New App

1. Create a new folder in `apps/`: `apps/your-app-name/`
2. Copy `apps/partners/settings.json` to your new folder
3. Customize the settings for your new app
4. Access it via: `?app=your-app-name`

Example:
```bash
# Create a new app called "clients"
cd dashboard/apps
mkdir clients
cp partners/settings.json clients/settings.json

# Edit clients/settings.json with your custom navigation, branding, etc.
```

Then visit: `http://localhost:5000/?app=clients`

### Deep Linking Still Works

The multi-app feature works seamlessly with the existing hash-based routing:

- `?app=partners#/homepage.html` - Loads partners app and navigates to homepage
- `?app=clients#/dashboard.html` - Loads clients app and navigates to dashboard

The `?app=` parameter is separate from the hash routing, so all existing navigation features continue to work perfectly.

## How to Use

### Option 1: Open Directly
Simply open `index.html` in any web browser. It will default to the `partners` app.

### Option 2: Local Server
Run any simple HTTP server in the `dashboard/` directory:

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

Then visit: 
- `http://localhost:8000/` (default app)
- `http://localhost:8000/?app=partners`
- `http://localhost:8000/?app=your-app-name`

## Customize Your Dashboard

All customization is done through `apps/{appName}/settings.json`. The file is organized with commonly-changed items at the top and technical settings at the bottom:

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

- ✅ **Multi-app support** - Run multiple dashboards from one installation
- ✅ Collapsible sidebar with hover-to-expand
- ✅ Mobile responsive slide-out menu
- ✅ Multi-level navigation (headers, links, submenus)
- ✅ Hash-based routing with query parameter support
- ✅ Iframe content embedding with loading indicator
- ✅ Dynamic theming via URL parameters
- ✅ localStorage state persistence
- ✅ 100% data-driven (zero hardcoded values)
- ✅ Zero dependencies (CDN for Tailwind CSS & Lucide icons)

## Use Cases for Multi-App

- **Different Clients**: Create separate dashboards for different clients
- **Multiple Brands**: Run different branded versions of the dashboard
- **Testing**: Have production and staging configurations
- **Localization**: Different language/region configurations
- **Department Dashboards**: Separate dashboards for Sales, Support, etc.

## Example: Adding a Menu Item

Open `apps/partners/settings.json` (or your app's settings) and add to `sidebar.navItems`:

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
- **Multi-app architecture**: Settings loaded dynamically via URL parameter
- **CDN resources**: Tailwind CSS and Lucide icons
- **Works anywhere**: Any modern browser with JavaScript
