# Overview

This is a modern dashboard application that serves as a navigation shell for embedding external web applications within an iframe. The application is built with a full-stack architecture using Express.js for the backend and supports two frontend implementations: React with TypeScript and a standalone vanilla JavaScript version.

## Vanilla JavaScript Dashboard

**Location**: `/dashboard.html` - A completely standalone, self-contained dashboard application.

**Key Features**:
- **Zero Dependencies**: Single HTML file with embedded CSS and JavaScript, no build process required
- **Embedded Configuration**: All settings (navigation, theme, security) embedded directly in the HTML
- **Full Feature Parity**: Implements all features of the React version including:
  - Collapsible sidebar with hover-to-expand on desktop
  - Mobile slide-out overlay menu with backdrop
  - Multi-level navigation (headers, links, expandable submenus)
  - Hash-based routing with query parameter support
  - Iframe content loading with security domain whitelist
  - localStorage state persistence (sidebar state, open submenus)
  - Smooth CSS animations and transitions
  - URL parameter theme overrides
- **Responsive Design**: Adapts seamlessly between mobile (<768px) and desktop viewports
- **Tailwind CSS via CDN**: Styling through CDN with custom CSS for animations
- **Lucide Icons**: Icon library loaded from CDN

**Technical Implementation**:
- Pure vanilla JavaScript (ES6+) with no frameworks
- Event delegation and DOM manipulation
- Media query detection for responsive behavior
- localStorage API for state persistence
- Hash routing with window.hashchange events
- Embedded settings as JavaScript constant to avoid server fetch issues

**Use Cases**: 
- Deployments where a build process is not desired
- Environments where React cannot be used
- Simple hosting scenarios requiring a single HTML file
- Testing and prototyping without toolchain setup

**Testing**: Comprehensive end-to-end Playwright tests verify all functionality including sidebar interactions, mobile menu, submenu toggles, navigation routing, iframe loading, and state persistence.

## React Dashboard

The application features a sophisticated, data-driven sidebar navigation system where the entire UI configuration—including navigation items, themes, and branding—is loaded from a JSON file and can be dynamically overridden via URL parameters. Key features include seamless iframe integration with deep-linking support, dynamic theming capabilities, responsive design for desktop and mobile, and persistent user preferences.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 18+ with TypeScript, built using Vite as the build tool and development server.

**UI Component System**: The application uses shadcn/ui components built on top of Radix UI primitives. This provides:
- Accessible, pre-built components following WAI-ARIA standards
- Customizable design system using Tailwind CSS
- Consistent styling through CSS custom properties for theming

**Styling Approach**: Tailwind CSS with a custom configuration that uses HSL color values stored as CSS variables. This enables runtime theme customization without rebuilding the application.

**State Management**: 
- React Context API for global settings and sidebar state
- localStorage for persisting user preferences (sidebar expanded/collapsed state, open submenus)
- URL hash-based routing for navigation without full page reloads

**Routing Strategy**: Hash-based routing (`#/path`) that supports:
- Query parameters for configuration overrides (`?primary=...&logoUrl=...`)
- Nested hash fragments for iframe internal routing (`#/page?id=123#details`)
- Deep-linking to specific content within the embedded application

## Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**Build Process**: 
- Client: Vite bundles the React application
- Server: esbuild compiles TypeScript server code to ESM format
- Development: tsx for running TypeScript directly with hot reload

**API Structure**: Minimal REST endpoints serving:
- `/settings.json` - Application configuration (navigation, theme, security)
- `/app.js` - Vanilla JavaScript version of the application
- Static file serving for the built client application

**Session Management**: Uses `connect-pg-simple` for session storage, indicating PostgreSQL-backed sessions (though not actively implemented in current codebase).

## Data Storage Solutions

**Primary Data Store**: File-based configuration (`public/settings.json`) containing:
- Theme color definitions (HSL values)
- Navigation structure (links, submenus, headers)
- Security settings (allowed iframe domains)
- Branding assets (logo URLs)

**Database Schema**: Drizzle ORM configured for PostgreSQL with a basic user schema:
- Users table with id, username, and password fields
- Schema uses `gen_random_uuid()` for primary keys
- Prepared for authentication features (not currently implemented)

**Client-Side Storage**: 
- localStorage for user preferences
- No IndexedDB or complex client-side database

**Rationale**: The file-based configuration approach allows for easy customization and deployment without database dependencies for core functionality. The database is prepared for future user management features.

## External Dependencies

**Database**: 
- PostgreSQL (via Neon serverless)
- Drizzle ORM for type-safe database queries
- Connection managed through `DATABASE_URL` environment variable

**UI Libraries**:
- Radix UI for accessible component primitives
- Lucide React for iconography
- Framer Motion for animations (in attached React version)
- shadcn/ui component collection

**Form Handling**:
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for integration

**Query Management**:
- TanStack Query (React Query) for server state management
- Configured with custom fetch wrapper for API requests

**Development Tools**:
- Replit-specific plugins for development (cartographer, dev-banner, runtime-error-modal)
- TypeScript for type safety across the stack
- ESLint/Prettier for code quality (implied by project structure)

**Third-Party Integration**: 
- Iframe embedding of external applications (specifically mypancho.com based on settings)
- Domain whitelist security to prevent unauthorized embeds
- Cross-origin iframe communication support

**Build Dependencies**:
- Vite for frontend bundling and dev server
- esbuild for backend compilation
- PostCSS with Tailwind CSS and Autoprefixer