# Vanilla HTML Dashboard

A 100% data-driven, standalone dashboard application built with vanilla HTML, CSS, and JavaScript. No React, no TypeScript, no build process.

**Multi-App Support** - Run multiple independent dashboards from a single installation by loading different settings based on URL parameters!

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

- **Default app**: `https://mypancho.com/` → Loads `apps/partners/settings.json`
- **Specific app**: `https://mypancho.com/?app=partners` → Loads `apps/partners/settings.json`
- **Another app**: `https://mypancho.com/?app=clients` → Loads `apps/clients/settings.json`

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

Then visit: `https://mypancho.com/?app=clients`

## Deep Linking & Parameter Passing

The dashboard seamlessly passes URL parameters and hash fragments to embedded iframes, enabling powerful deep linking capabilities.

### How It Works

The `?app=` parameter selects which dashboard to load, while everything after the `#` is used for navigation and passed to iframes:

```
https://mypancho.com/?app=partners#/page.html?param=value#section
                      └─────────┘ └──────────────────────────────┘
                      App selector   Navigation + iframe parameters
```

### Deep Linking Examples

**Example 1: Navigate to a specific page**
```
https://mypancho.com/?app=partners#/account-settings.html
```
- Loads the "partners" app
- Navigates to the menu item with href `#/account-settings.html`
- Loads that item's iframe URL

**Example 2: Pass query parameters to iframe**
```
https://mypancho.com/?app=partners#/account-settings.html?tab=billing&view=details
```
- Opens account settings
- Iframe receives: `https://mypancho.com/account/clientarea.php?action=details&tab=billing&view=details`

**Example 3: Pass hash fragment to iframe**
```
https://mypancho.com/?app=clients#/homepage.html#welcome-section
```
- Opens homepage
- Iframe receives the hash: `#welcome-section`
- Useful for scrolling to specific sections

**Example 4: Multiple parameters + hash**
```
https://mypancho.com/?app=partners#/my-invoices.html?status=unpaid&sort=date#invoice-123
```
- Opens invoices page
- Iframe URL gets: `?status=unpaid&sort=date#invoice-123`
- Perfect for linking directly to a specific invoice

**Example 5: User IDs and filters**
```
https://mypancho.com/?app=clients#/account-settings.html?userId=456&section=profile#personal-info
```
- Opens account settings
- Passes user ID and section to iframe
- Scrolls to personal info section

### Use Cases for Deep Linking

- **Email Links**: Send customers direct links to specific invoices or tickets
- **Support**: Link to exact pages in documentation
- **Onboarding**: Guide users to specific settings or forms
- **Notifications**: Deep link from emails/SMS to the exact content
- **Bookmarks**: Users can bookmark specific pages with filters applied

### Technical Details

All query parameters and hash fragments after the menu item's href are automatically appended to the iframe's URL. The dashboard intelligently:
- Extracts parameters from the hash route
- Appends them as query parameters to the iframe URL
- Preserves nested hash fragments
- Works with any number of parameters

## Features

- ✅ **Multi-app support** - Run multiple dashboards from one installation
- ✅ **Deep linking** - Pass parameters and hash fragments to iframes
- ✅ Collapsible sidebar with hover-to-expand
- ✅ Mobile responsive slide-out menu
- ✅ Multi-level navigation (headers, links, submenus)
- ✅ Hash-based routing with query parameter support
- ✅ Iframe content embedding with loading indicator
- ✅ Domain whitelist security for iframes
- ✅ Dynamic theming via URL parameters
- ✅ localStorage state persistence
- ✅ 100% data-driven (zero hardcoded values)
- ✅ Zero dependencies (CDN for Tailwind CSS & Lucide icons)

## Customization

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
  "iframeUrl": "https://mypancho.com/account/new-page.php"
}
```

Icons are from [Lucide Icons](https://lucide.dev/icons/) - just use the icon name.

## Technical Details

- **No build process**: Open and edit directly
- **Pure vanilla JavaScript**: No frameworks, no transpilation
- **Single HTML file**: Everything in one place
- **Multi-app architecture**: Settings loaded dynamically via URL parameter
- **Parameter forwarding**: Query params and hash fragments passed to iframes
- **CDN resources**: Tailwind CSS and Lucide icons
- **Works anywhere**: Any modern browser with JavaScript
