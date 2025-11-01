# Menu Badges

Beautiful pill-shaped badges can be added to menu items to highlight important information like notifications, new features, or status indicators.

## Features

- **Small & Pill-Shaped**: Compact design with 5px border radius for a modern, clean look
- **Multiple Variants**: Six color variants to match different purposes
- **Auto-Hide on Collapse**: Badges automatically hide when the sidebar is collapsed
- **Easy Configuration**: Simple JSON-based setup in settings files
- **Lighter Colors**: Soft, vibrant colors that maintain excellent readability

## Badge Variants

| Variant | Color | Best For | Example Use |
|---------|-------|----------|-------------|
| `success` | Light Green | New features, completed items, positive status | "New", "Live", "Updated" |
| `warning` | Light Orange | Items needing attention, pending status | "Pending", "Due", notification counts |
| `danger` | Light Red | Urgent items, alerts, high-priority notifications | "Urgent", "3", "Alert" |
| `info` | Light Blue | General information, tips, beta features | "Beta", "Info", "Help" |
| `primary` | Theme Primary | Default style matching your theme | Any general badge |
| `secondary` | Muted Gray | Low-emphasis, subtle badges | "Optional", "Extra" |

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

### 1. Keep Text Short
Badges are designed to be compact. Use concise text:
- **Counts**: `1`, `5`, `12`, `99+`
- **Short Words**: `New`, `Hot`, `Beta`, `Pro`, `Due`
- **Avoid**: Long phrases or sentences

### 2. Choose the Right Color
Match the badge variant to the message's purpose:

**Success (Light Green)** - Positive, new, or completed
- ✅ "New", "Live", "Active", "Done"
- ❌ Don't use for errors or warnings

**Warning (Light Orange)** - Needs attention but not critical
- ✅ "Pending", "Due", "Review", notification counts
- ❌ Don't use for urgent/critical items

**Danger (Light Red)** - Urgent or critical
- ✅ "Urgent", "Alert", high notification counts (5+)
- ❌ Don't use for normal notifications

**Info (Light Blue)** - Informational, non-urgent
- ✅ "Beta", "Info", "Tips", "Help"
- ❌ Don't use for important actions

**Primary** - Default theme color
- ✅ General purpose, branding-related badges
- Use when no specific emotional tone is needed

**Secondary** - Subtle, low emphasis
- ✅ Optional features, subtle indicators
- Use when you want minimal visual weight

### 3. Don't Overuse
- Limit badges to truly important items
- Too many badges reduce their effectiveness
- Consider: Does this item really need extra attention?

### 4. Update Dynamically
For real-world applications, update badge counts based on actual data:
- Notification counts from your backend
- Status changes from your database
- User-specific information

## Real-World Examples

### Notification Counts
```json
{
  "label": "Support",
  "badge": {
    "text": "3",
    "variant": "danger"
  }
}
```
Shows 3 urgent support tickets needing attention.

### New Features
```json
{
  "label": "Browse Templates",
  "badge": {
    "text": "New",
    "variant": "success"
  }
}
```
Highlights newly added features or pages.

### Status Indicators
```json
{
  "label": "Manage Billing",
  "badge": {
    "text": "Due",
    "variant": "warning"
  }
}
```
Indicates items that need attention soon.

### Informational
```json
{
  "label": "Announcements",
  "badge": {
    "text": "2",
    "variant": "warning"
  }
}
```
Shows unread announcements count.

## Live Examples

Check out the example badges in:
- `dashboard/apps/partners/settings.json` - Shows "New", notification counts, and warning badges
- `dashboard/apps/clients/settings.json` - Shows "Hot" and "Due" status badges

## Color Reference

The badges use these light, vibrant colors for excellent visibility:
- **Success**: `hsl(142, 71%, 65%)` - Light green
- **Warning**: `hsl(38, 92%, 65%)` - Light orange  
- **Danger**: `hsl(0, 84%, 72%)` - Light red
- **Info**: `hsl(199, 89%, 62%)` - Light blue
- **Primary**: Uses your theme's primary color
- **Secondary**: Uses your theme's muted color

All colored badges use white text for optimal contrast and readability.
