# Rania Travel Website - Folder Structure Documentation

## Overview
This document explains the folder structure implemented for the Rania Travel website project.

## Directory Structure

```
frontend/
├── public/                      # Static assets served directly
│   ├── images/                  # Static images (logos, favicons)
│   ├── locales/                 # i18n translation files
│   ├── favicon.svg
│   └── robots.txt
│
├── src/
│   ├── assets/                  # Dynamic assets imported in components
│   │   ├── fonts/               # Custom fonts
│   │   ├── icons/               # SVG icons and logos
│   │   └── images/              # Images (destinations, hero, gallery)
│   │
│   ├── components/              # Reusable React components
│   │   ├── common/              # Generic reusable components
│   │   │   ├── Button/          # Button component
│   │   │   ├── Card/            # Card component
│   │   │   ├── Input/           # Input component
│   │   │   └── Modal/           # Modal component
│   │   │
│   │   ├── layout/              # Layout components
│   │   │   ├── Header/          # Header with navigation
│   │   │   ├── Footer/          # Footer
│   │   │   ├── Navbar/          # Navigation bar
│   │   │   └── Sidebar/         # Sidebar
│   │   │
│   │   └── features/            # Feature-specific components
│   │       ├── booking/         # Booking-related components
│   │       ├── destinations/    # Destination cards/lists
│   │       └── gallery/         # Image gallery components
│   │
│   ├── pages/                   # Page-level components (routes)
│   │   ├── Home/                # Homepage
│   │   ├── Destinations/        # Destinations listing page
│   │   ├── Tours/               # Tours page
│   │   ├── About/               # About page
│   │   ├── Contact/             # Contact page
│   │   ├── Booking/             # Booking page
│   │   └── NotFound/            # 404 page
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useBooking.js        # Booking logic hook
│   │   ├── useDestinations.js   # Destinations data hook
│   │   └── useAuth.js           # Authentication hook
│   │
│   ├── services/                # API and external services
│   │   ├── api.js               # Base API configuration
│   │   ├── bookingService.js    # Booking API calls
│   │   └── destinationService.js # Destination API calls
│   │
│   ├── utils/                   # Utility functions
│   │   ├── constants.js         # App constants
│   │   ├── helpers.js           # Helper functions
│   │   └── validators.js        # Validation functions
│   │
│   ├── context/                 # React Context providers
│   │   ├── AuthContext.jsx      # Authentication context
│   │   └── BookingContext.jsx   # Booking state context
│   │
│   ├── styles/                  # Global styles
│   │   ├── index.css            # Global base styles
│   │   ├── App.css              # App-level styles
│   │   └── variables.css        # CSS variables (colors, spacing, etc.)
│   │
│   ├── routes/                  # Route configuration
│   │   └── index.jsx            # Route definitions
│   │
│   ├── App.jsx                  # Main App component
│   └── index.jsx                # App entry point
│
├── .env.example                 # Environment variables template
├── .gitignore
├── index.html                   # HTML template
├── package.json
├── plan.md                      # Project plan
├── vite.config.js               # Vite configuration
└── README.md
```

## Folder Purposes

### `/public`
Static files served directly by the server without processing. Use for files that don't need bundling.

### `/src/assets`
Assets that are imported and processed by Vite. Images here get optimized and hashed for caching.

### `/src/components`
Reusable UI components following a hierarchical structure:
- **common**: Generic, reusable UI components (buttons, inputs, cards)
- **layout**: Layout structure components (header, footer, navigation)
- **features**: Domain-specific components (booking forms, destination cards)

### `/src/pages`
Page-level components that represent routes in the application. Each page has its own folder with component, styles, and index file.

### `/src/hooks`
Custom React hooks for reusable stateful logic.

### `/src/services`
API integration and external service communication logic.

### `/src/utils`
Pure utility functions, constants, and helpers.

### `/src/context`
React Context providers for global state management.

### `/src/styles`
Global CSS files including variables and base styles.

## Component Structure Pattern

Each component folder follows this pattern:
```
ComponentName/
├── ComponentName.jsx      # Component logic
├── ComponentName.css      # Component styles
└── index.js               # Export file (barrel export)
```

## Import Examples

```javascript
// Importing a layout component
import Header from './components/layout/Header';

// Importing a page
import Home from './pages/Home';

// Importing utilities
import { formatCurrency } from './utils/helpers';
import { ROUTES } from './utils/constants';

// Importing services
import apiRequest from './services/api';

// Importing assets
import logo from './assets/icons/logo.svg';
```

## Best Practices

1. **Keep components small and focused** - Each component should have a single responsibility
2. **Use barrel exports** - Export components through index.js files
3. **Colocate related files** - Keep component, styles, and tests together
4. **Use CSS variables** - Define colors, spacing, etc. in variables.css
5. **Separate concerns** - Business logic in services, UI logic in components
6. **Absolute imports** - Consider configuring path aliases in vite.config.js

## Next Steps

1. Install React Router for page navigation
2. Set up state management (Context API or Redux)
3. Create reusable component library in `/components/common`
4. Implement API services
5. Add form validation
6. Set up testing infrastructure

## Build & Development

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run serve
```

## Notes

- All components use functional components with hooks
- CSS modules can be adopted for better scoping
- Consider adding TypeScript for type safety
- The structure is scalable for growing applications
