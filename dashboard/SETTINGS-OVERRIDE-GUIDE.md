# Settings Override System Guide

## Overview

The dashboard now uses a **smart settings loading system** that allows you to:
- Define common settings once in `default-settings.json`
- Override only what's different for each app
- Add custom menu items with position control
- Manage 200+ apps efficiently without duplication

## How It Works

### 1. Default Settings
All apps start with the settings defined in `/dashboard/default-settings.json`. This file contains:
- Common navigation menus
- Standard theme colors
- Default messages and labels
- Security settings
- Standard styling

### 2. App-Specific Settings
Each app can have its own `apps/{app-name}/settings.json` file that:
- **Overrides** default values
- **Adds** new menu items
- **Customizes** specific properties

### 3. Merging Process
When an app loads:
1. Load `default-settings.json` first
2. If `apps/{app-name}/settings.json` exists, load it
3. Intelligently merge the two using the override system
4. Apply URL parameter overrides (existing functionality)

## Override Features

### Basic Property Override

Simply define the property in your app settings file:

```json
{
  "page": {
    "title": "My Custom App Title"
  }
}
```

This overrides the default page title while keeping all other default settings.

### Menu Item Override

Use the `_override` property to replace a default menu item:

```json
{
  "sidebar": {
    "navItems": [
      {
        "_override": "label",
        "type": "link",
        "href": "#/index.html",
        "label": "Custom Homepage",
        "icon": "home",
        "iframeUrl": "https://example.com/custom"
      }
    ]
  }
}
```

**Override Keys:**
- `"_override": "label"` - Matches by the `label` field
- `"_override": "href"` - Matches by the `href` field
- `"_override": "path"` - Matches by the `path` field (for submenus)

### Adding New Menu Items

#### Add to End (default)
```json
{
  "sidebar": {
    "navItems": [
      {
        "type": "link",
        "href": "#/special-feature.html",
        "label": "Special Feature",
        "icon": "star",
        "iframeUrl": "https://example.com/special"
      }
    ]
  }
}
```

#### Add to Beginning
```json
{
  "sidebar": {
    "navItems": [
      {
        "_position": "before",
        "type": "link",
        "href": "#/urgent.html",
        "label": "Urgent Action",
        "icon": "alert-circle",
        "iframeUrl": "https://example.com/urgent"
      }
    ]
  }
}
```

#### Add to End Explicitly
```json
{
  "sidebar": {
    "navItems": [
      {
        "_position": "after",
        "type": "link",
        "href": "#/footer-link.html",
        "label": "Footer Link",
        "icon": "link"
      }
    ]
  }
}
```

### Submenu Override

You can override specific items within a submenu:

```json
{
  "sidebar": {
    "navItems": [
      {
        "_override": "path",
        "type": "submenu",
        "path": "support",
        "label": "Custom Support",
        "icon": "headset",
        "children": [
          {
            "_override": "label",
            "type": "link",
            "href": "#/open-support-ticket.html",
            "label": "Open Custom Ticket",
            "icon": "plus-circle",
            "iframeUrl": "https://example.com/custom-ticket"
          }
        ]
      }
    ]
  }
}
```

### Theme Customization

Override just the colors you want to change:

```json
{
  "theme": {
    "primary": "hsl(200, 80%, 50%)",
    "headerBg": "#e0e0e0"
  }
}
```

All other theme colors remain from the defaults.

## Complete Example

Here's a complete app-specific settings file showcasing multiple features:

```json
{
  "_comment": "My Custom App - Demonstrates all override features",
  
  "page": {
    "title": "Custom App Dashboard"
  },

  "sidebar": {
    "logoUrl": "https://example.com/custom-logo.png",
    
    "navItems": [
      {
        "_position": "before",
        "type": "link",
        "href": "#/priority.html",
        "label": "Priority Page",
        "icon": "star",
        "iframeUrl": "https://example.com/priority"
      },
      {
        "_override": "label",
        "type": "link",
        "href": "#/index.html",
        "label": "Custom Home",
        "icon": "home",
        "iframeUrl": "https://example.com/home"
      },
      {
        "_position": "after",
        "type": "link",
        "href": "#/extra.html",
        "label": "Extra Feature",
        "icon": "plus",
        "iframeUrl": "https://example.com/extra"
      }
    ]
  },

  "theme": {
    "primary": "hsl(280, 70%, 60%)",
    "headerBg": "#f0f0ff"
  },

  "messages": {
    "welcome": {
      "title": "Welcome to Custom App"
    }
  }
}
```

## Creating a New App

### Minimal App (uses all defaults)
```bash
mkdir -p dashboard/apps/myapp
echo '{}' > dashboard/apps/myapp/settings.json
```

Access at: `?app=myapp`

### App with Custom Title
```bash
mkdir -p dashboard/apps/myapp
cat > dashboard/apps/myapp/settings.json << 'EOF'
{
  "page": {
    "title": "My App"
  }
}
EOF
```

### App with Custom Menu Item
```bash
mkdir -p dashboard/apps/myapp
cat > dashboard/apps/myapp/settings.json << 'EOF'
{
  "page": {
    "title": "My App"
  },
  "sidebar": {
    "navItems": [
      {
        "_position": "before",
        "type": "link",
        "href": "#/special.html",
        "label": "Special Feature",
        "icon": "zap",
        "iframeUrl": "https://example.com/special"
      }
    ]
  }
}
EOF
```

## Benefits

### Before (without override system)
- Each app had a ~275 line settings file
- 200 apps = 55,000 lines of duplicated configuration
- Changing a common menu item required updating 200 files

### After (with override system)
- Default settings: ~275 lines (defined once)
- Each app: 5-20 lines (only what's different)
- 200 apps = ~1,500 lines total
- Changing a common menu item: update 1 file

## Migration Guide

To migrate an existing app to use the override system:

1. **Identify what's unique** - Compare your app settings with `default-settings.json`
2. **Keep only differences** - Remove all duplicate configuration
3. **Add override markers** - Use `_override` for items that replace defaults
4. **Test** - Load your app and verify all menus appear correctly

### Example Migration

**Before:**
```json
{
  "sidebar": {
    "navItems": [
      { "type": "link", "href": "#/index.html", "label": "Homepage", ... },
      { "type": "link", "href": "#/my-services.html", "label": "My Orders", ... },
      // ... 50 more lines of standard menus
    ],
    "logoUrl": "https://mypancho.com/account/assets/img/logo.png"
  },
  "page": {
    "title": "Custom Dashboard"
  }
  // ... more default config
}
```

**After:**
```json
{
  "page": {
    "title": "Custom Dashboard"
  }
}
```

That's it! Everything else comes from defaults.

## Special Considerations

### Comments
Comments starting with `_comment` are ignored during merging and can be used for documentation.

### Arrays
Arrays are **merged intelligently** based on override rules, not replaced entirely.

### Objects
Objects are **deep merged** - you only need to specify the properties you want to change.

### Null Values
Setting a property to `null` in app settings will override the default with `null`.

## Troubleshooting

### Menu item not appearing
- Check that `_override` key matches an existing item
- Verify JSON syntax is valid
- Check browser console for merge logs

### Wrong menu order
- Use `_position: "before"` or `_position: "after"` to control placement
- Items without `_position` are added at the end

### Settings not loading
- Verify `default-settings.json` exists in `/dashboard/`
- Check browser console for error messages
- Ensure app settings file has valid JSON
