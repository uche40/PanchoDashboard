# Vanilla HTML Dashboard

A 100% data-driven, standalone vanilla JavaScript dashboard application with multi-app support - no React, no TypeScript, no build process.

**Hosted at**: https://mypancho.com/

## Structure

```
dashboard/
  ├── index.html           # Complete dashboard application
  ├── apps/               # Apps folder - each subfolder is a separate app
  │   └── partners/       # Example app
  │       └── settings.json  # App-specific configuration
  └── README.md           # Usage instructions
```

## How It Works

The dashboard is a single HTML file that:
- Loads configuration dynamically based on `?app=` URL parameter
- Defaults to `apps/partners/settings.json` if no app parameter provided
- Uses Tailwind CSS (CDN) for styling
- Uses Lucide icons (CDN) for UI icons
- Implements collapsible sidebar, mobile menu, hash routing, and iframe embedding
- Passes URL parameters and hash fragments to iframes for deep linking
- Stores user preferences in localStorage
- **Zero hardcoded values** - everything is configurable
- **Multi-app capable** - run multiple dashboards from one installation

## Multi-App Architecture

### URL Structure
- `https://mypancho.com/?app=partners` → Loads `apps/partners/settings.json`
- `https://mypancho.com/?app=clients` → Loads `apps/clients/settings.json`
- `https://mypancho.com/` (no parameter) → Defaults to `apps/partners/settings.json`

### Deep Linking
The `?app=` parameter works seamlessly with hash routing and parameter passing:
- `/?app=partners#/homepage.html` - Loads partners app, navigates to homepage
- `/?app=clients#/invoices.html?status=unpaid` - Loads clients app, passes status parameter to iframe
- `/?app=partners#/settings.html?tab=billing#profile` - Full deep linking with parameters and hash

### Creating New Apps
1. Create folder: `apps/your-app-name/`
2. Copy settings: `cp apps/partners/settings.json apps/your-app-name/settings.json`
3. Customize the new settings file
4. Access via: `https://mypancho.com/?app=your-app-name`

## Features

- ✅ **Multi-app support** - Load different settings per app via URL parameter
- ✅ **Deep linking & parameter passing** - URL params and hash fragments forwarded to iframes
- ✅ Collapsible sidebar with hover-to-expand on desktop
- ✅ Mobile slide-out overlay menu
- ✅ Multi-level navigation (headers, links, expandable submenus)
- ✅ Hash-based routing with query parameter support
- ✅ Iframe content loading with domain whitelist security
- ✅ Iframe loading indicator with spinner
- ✅ Beautiful thin scrollbar styling
- ✅ localStorage state persistence
- ✅ Dynamic theming via URL parameters
- ✅ 100% data-driven - zero hardcoded values
- ✅ Zero build process required

## Deep Linking Examples

**Navigate to specific page:**
```
https://mypancho.com/?app=partners#/account-settings.html
```

**Pass query parameters to iframe:**
```
https://mypancho.com/?app=partners#/my-invoices.html?status=unpaid&sort=date
```

**Include hash fragments for sections:**
```
https://mypancho.com/?app=clients#/homepage.html#welcome-section
```

**Complex deep linking:**
```
https://mypancho.com/?app=partners#/account-settings.html?userId=456&tab=billing#payment-methods
```

## Configuration (settings.json)

All aspects of each dashboard app are configurable via `apps/{appName}/settings.json`:

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

Edit `apps/{appName}/settings.json` to customize:
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
- **Multi-app architecture**: Different apps load different settings
- **Parameter forwarding**: Query params and hash fragments passed to iframes
- **Works anywhere**: Any modern browser with JavaScript enabled
- **Fully customizable**: Every aspect configurable via JSON

## Recent Updates

- 2025-11-01: Added beautiful thin scrollbar styling
  - 6px width, subtle colors
  - Transparent track, rounded corners
  - Smooth hover transitions

- 2025-11-01: Fixed server to handle query parameters correctly
  - `?app=` parameter no longer causes 404 errors
  - Proper URL parsing separates pathname from query string

- 2025-11-01: Added multi-app support
  - Apps are loaded based on `?app=` URL parameter
  - Created `apps/` folder structure
  - Default app: `partners`
  - Seamlessly integrates with existing hash routing
  
- 2025-11-01: Made app 100% data-driven
  - Page configuration (title, lang)
  - Styling configuration (fonts, sizes)
  - All messages and labels (welcome screen, errors, aria labels)
  - All colors (sidebar borders, button backgrounds, header backgrounds)
  - Added iframe loading indicator
  - Fixed collapsed sidebar header spacing with elegant dividers

- 2025-11-01: Reorganized settings.json
  - Commonly changed items (navigation) at top
  - Technical settings at bottom
  - Added helpful comments throughout
