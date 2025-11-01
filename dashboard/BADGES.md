# Menu Badges

Beautiful pill-shaped badges can be added to menu items to highlight important information like notifications, new features, or status indicators.

## Features

- **Small & Pill-Shaped**: Compact design with 5px border radius for a modern, clean look
- **Multiple Variants**: Six color variants to match different purposes
- **Auto-Hide on Collapse**: Badges automatically hide when the sidebar is collapsed
- **Easy Configuration**: Simple JSON-based setup in settings files

## Badge Variants

| Variant | Use Case | Color |
|---------|----------|-------|
| `primary` | Default badge style | Primary theme color |
| `secondary` | Subtle, low-emphasis badges | Muted/secondary color |
| `success` | New features, positive status | Green |
| `warning` | Pending items, attention needed | Orange |
| `danger` | Urgent items, alerts | Red |
| `info` | Informational badges | Blue |

## How to Add Badges

Add a `badge` property to any nav item (link or submenu) in your `settings.json`:

### Example: Badge on a Link

```json
{
  "type": "link",
  "href": "#/templates.html",
  "label": "Browse Templates",
  "icon": "layout-grid",
  "iframeUrl": "https://mypancho.com/cms/products",
  "badge": {
    "text": "New",
    "variant": "success"
  }
}
```

### Example: Badge on a Submenu

```json
{
  "type": "submenu",
  "path": "support",
  "label": "Support",
  "icon": "headset",
  "badge": {
    "text": "3",
    "variant": "danger"
  },
  "children": [...]
}
```

### Example: Badge on a Submenu Child Item

```json
{
  "type": "link",
  "href": "#/announcements.html",
  "label": "Announcements",
  "icon": "megaphone",
  "iframeUrl": "https://mypancho.com/account/announcements",
  "badge": {
    "text": "2",
    "variant": "warning"
  }
}
```

## Badge Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `text` | string | Yes | The text to display in the badge (keep it short!) |
| `variant` | string | No | Badge color variant. Defaults to `primary` if not specified |

## Best Practices

1. **Keep Text Short**: Use 1-3 characters for counts, or short words like "New", "Hot", "Beta"
2. **Use Appropriate Colors**: 
   - Green (`success`) for new or positive items
   - Red (`danger`) for urgent items or high counts
   - Orange (`warning`) for items needing attention
   - Blue (`info`) for general information
3. **Don't Overuse**: Too many badges can be distracting. Use them sparingly for important items only
4. **Update Dynamically**: Consider updating badge counts programmatically based on actual data (requires custom JavaScript)

## Examples in Action

Check out the example badges in:
- `dashboard/apps/partners/settings.json` - Shows "New", notification counts, and warning badges
- `dashboard/apps/clients/settings.json` - Shows "Hot" and "Due" status badges
