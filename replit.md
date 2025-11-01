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

### Smart Settings Override System (NEW!)

**Scales to 200+ apps with minimal duplication!**

The dashboard now uses a smart two-tier settings system:
1. **Default Settings** (`default-settings.json`) - Common settings shared across all apps
2. **App-Specific Settings** (`apps/{app}/settings.json`) - Only what's unique to each app
3. **Intelligent Merging** - Automatically combines both with override support

**Benefits:**
- ✅ Define common menus once in `default-settings.json`
- ✅ App settings are 5-20 lines instead of 275+
- ✅ Update 200 apps by changing one file
- ✅ Override specific items using `_override` markers
- ✅ Control menu position with `_position: "before"` or `"after"`

**Example - Minimal App:**
```json
{
  "page": {
    "title": "My Custom App"
  }
}
```
This 5-line file gets all default menus, styling, and features!

**Example - Override a Menu Item:**
```json
{
  "sidebar": {
    "navItems": [
      {
        "_override": "label",
        "type": "link",
        "href": "#/index.html",
        "label": "Custom Homepage",
        "icon": "home"
      }
    ]
  }
}
```

**See `SETTINGS-OVERRIDE-GUIDE.md` for complete documentation.**

### Deep Linking
The `?app=` parameter works seamlessly with hash routing and parameter passing:
- `/?app=partners#/homepage.html` - Loads partners app, navigates to homepage
- `/?app=clients#/invoices.html?status=unpaid` - Loads clients app, passes status parameter to iframe
- `/?app=partners#/settings.html?tab=billing#profile` - Full deep linking with parameters and hash

### Creating New Apps

**Option 1: Use all defaults (1 line)**
```bash
mkdir -p apps/myapp && echo '{}' > apps/myapp/settings.json
```

**Option 2: Custom title only (5 lines)**
```bash
mkdir -p apps/myapp
cat > apps/myapp/settings.json << 'EOF'
{
  "page": {
    "title": "My App"
  }
}
EOF
```

**Option 3: Add custom menu item**
```bash
mkdir -p apps/myapp
cat > apps/myapp/settings.json << 'EOF'
{
  "sidebar": {
    "navItems": [
      {
        "_position": "before",
        "type": "link",
        "href": "#/special.html",
        "label": "Special Feature",
        "icon": "zap"
      }
    ]
  }
}
EOF
```

Access any app via: `https://mypancho.com/?app=myapp`

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

- 2025-11-01: Added Smart Settings Override System
  - Created `default-settings.json` with all common settings
  - Apps now only need to define what's unique (5-20 lines vs 275+)
  - Intelligent merging with override support (`_override` markers)
  - Position control (`_position: "before"` or `"after"`)
  - Scales to 200+ apps with minimal duplication
  - Update all apps by changing default settings once
  - Created comprehensive `SETTINGS-OVERRIDE-GUIDE.md` documentation
  - Migrated existing apps to use minimal settings files

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
