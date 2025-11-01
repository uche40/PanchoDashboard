# Design Guidelines: Modern Dashboard Application

## Design Approach

**Selected Approach: Design System - Material Design 3 Inspired**

This dashboard is a utility-focused, information-dense application requiring consistency, clarity, and efficiency. The design draws inspiration from Material Design 3 and modern dashboard systems like Linear and Vercel, emphasizing clean interfaces with purposeful interactions.

**Key Design Principles:**
- Clarity over decoration
- Functional hierarchy through spacing and typography
- Subtle, purposeful animations
- Responsive efficiency across devices

---

## Typography System

**Font Stack:**
- Primary: System UI fonts (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)
- Monospace (for code/technical elements): `'SF Mono', Monaco, 'Cascadia Code', monospace`

**Type Scale:**
- Base font size: `13.8px` (defined in root HTML)
- Hero/Page Titles: `text-3xl` (1.875rem, ~26px) - `font-bold`
- Section Headers: `text-xl` (1.25rem, ~17px) - `font-semibold`
- Navigation Items: `text-base` (1rem, ~14px) - `font-medium`
- Submenu Items: `text-sm` (0.875rem, ~12px) - `font-medium`
- Category Headers: `text-xs` (0.75rem, ~10px) - `font-semibold uppercase`
- Body Text: `text-sm` - `font-normal`
- Helper Text: `text-xs` - `text-muted-foreground`

---

## Layout System

**Spacing Primitives:**
Use Tailwind units: **2, 3, 4, 8, 12, 16, 20, 24** for consistent rhythm

- Component padding: `p-2`, `p-3`, `p-4`
- Section spacing: `py-8`, `py-12`
- Item gaps: `gap-2`, `gap-3`, `gap-4`
- Margins between elements: `my-2.5`, `my-4`, `mt-4 mb-2`

**Sidebar Dimensions:**
- Collapsed width: `w-16` (4rem)
- Expanded width: `w-64` (16rem)
- Mobile overlay width: `w-64` (16rem)
- Logo height: `h-10` (2.5rem)
- Icon size: `w-5 h-5` (20px) for main nav, `w-4 h-4` (16px) for submenus
- Profile avatar: `w-10 h-10` (2.5rem)

**Main Content Area:**
- Full height viewport: `h-screen`
- Overflow handling: `overflow-y-auto` on main content
- Iframe: `w-full h-full`

---

## Component Library

### Navigation Components

**Sidebar Container:**
- Desktop: Fixed height, vertical flex layout, shadow-sm, border-right
- Mobile: Fixed overlay with backdrop blur, slide-in animation from left
- Background: `bg-white`
- Border: `border-r border-border`
- Transition: `duration-300 ease-out` for width changes

**Navigation Links:**
- Default state: `hover:bg-muted text-secondary-foreground/80`
- Hover: `hover:text-secondary-foreground`
- Active state: `bg-primary/10 text-primary`
- Padding: `p-2`
- Margin: `my-2.5`
- Border radius: `rounded-md`
- Font: `font-medium`

**Submenu Items:**
- Nested indent: `pl-5`
- Smaller icons: `w-4 h-4` (16px)
- Active indicator: Vertical bar on left edge `w-0.5 bg-primary`
- Text size: `text-sm`
- Spacing: `my-0.5`

**Category Headers:**
- Uppercase labels: `text-xs font-semibold uppercase`
- Color: `text-muted-foreground`
- Spacing: `pl-3 mt-4 mb-2`
- Fade out when collapsed: `opacity-0` transition

**Profile Section:**
- Border top: `border-t border-border`
- Clickable area: `p-3 cursor-pointer hover:bg-muted`
- Avatar: Rounded square `w-10 h-10 rounded-md bg-primary`
- Icon color: `text-primary-foreground`
- Name: `text-sm font-semibold text-primary`
- Role: `text-xs text-muted-foreground`

### Interactive Elements

**Toggle Button (Sidebar Expand/Collapse):**
- Size: `p-1.5`
- Background: `bg-secondary hover:bg-muted`
- Border radius: `rounded-lg`
- Icon: ChevronLeft/ChevronRight, size 20px

**Mobile Menu Button:**
- Position: Fixed header, visible only on mobile
- Icon: Menu (hamburger), size 24px
- Background: `bg-white` with shadow
- Padding: `p-4`

**Tooltips (Collapsed Sidebar):**
- Position: Absolute, left-full with offset `ml-2`
- Background: `bg-primary text-primary-foreground`
- Padding: `px-2 py-1`
- Font size: `text-sm`
- Pointer triangle: `w-2 h-2` rotated 45deg
- States: `invisible opacity-20 -translate-x-3` → `visible opacity-100 translate-x-0` on hover
- Transition: All properties with group-hover

### Content Components

**Iframe Container:**
- Full dimensions: `w-full h-full`
- Loading overlay: Centered spinner with `bg-secondary/50 backdrop-blur-sm`
- Spinner: `w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin`
- Fade transition: `opacity-0` → `opacity-100` when loaded

**Welcome Screen (No Content):**
- Centered padding: `p-8`
- Title: `text-3xl font-bold text-primary`
- Subtitle: `mt-4 text-muted-foreground`
- Code blocks: `<code>` styling for technical info

**Error States:**
- Centered layout: `p-8 text-center`
- Title: `text-2xl font-bold text-red-600`
- Message: `mt-4 text-muted-foreground`

---

## Animations & Transitions

**Sidebar Expand/Collapse:**
- Property: `width`
- Duration: `300ms`
- Easing: `ease-out`

**Mobile Menu Slide:**
- Property: `transform translateX`
- Duration: `300ms`
- Easing: `ease-in-out`
- Backdrop fade: `opacity` 300ms

**Submenu Expansion:**
- Properties: `height`, `opacity`
- Duration: `200ms`
- Easing: Default
- Chevron rotation: `rotate` 200ms

**Hover Transitions:**
- Background colors: `transition-colors`
- Opacity: `duration-200 ease-out`
- Tooltip appearance: All properties with `transition-all`

**Text Visibility (Collapsed Sidebar):**
- Property: `opacity`
- Duration: `200ms`
- Easing: `ease-out`
- States: `opacity-0` ↔ `opacity-100`

---

## Responsive Behavior

**Breakpoint:** `md:` at `768px`

**Desktop (≥768px):**
- Sidebar: Persistent, collapsible with hover-to-expand
- Default state from localStorage or settings
- Smooth width transitions
- Tooltips on collapsed state

**Mobile (<768px):**
- Sidebar: Fixed overlay from left edge
- Hamburger menu in header
- Backdrop overlay when open
- Full-width menu (w-64)
- Auto-close on navigation

---

## Color Application

**Backgrounds:**
- App background: `bg-secondary`
- Sidebar: `bg-white`
- Hover states: `bg-muted`
- Active items: `bg-primary/10`

**Text:**
- Primary headings: `text-primary`
- Body text: `text-secondary-foreground`
- Muted labels: `text-muted-foreground`
- Link default: `text-secondary-foreground/80`

**Borders:**
- Dividers: `border-border`
- Active indicators: `bg-primary`

**Accents:**
- Icons in avatar: `text-primary-foreground`
- Loading spinner: `border-primary`

---

## Accessibility

- ARIA labels on all interactive buttons
- Semantic HTML structure (`<nav>`, `<aside>`, `<main>`)
- Focus states using Tailwind's default focus-visible styles
- Keyboard navigation support for all menu items
- Screen reader friendly collapsible states