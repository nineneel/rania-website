# Rania Travel Website - Folder Structure Plan

## Project Overview
This is a travel website built with Vite + React template for Rania Travel services.

## Folder Structure

```
frontend/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── images/              # Static images (logos, icons)
│   └── locales/             # Translation files (if multilingual)
│
├── src/
│   ├── assets/              # Dynamic assets
│   │   ├── images/          # Image files
│   │   ├── icons/           # SVG icons
│   │   └── fonts/           # Custom fonts
│   │
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Shared components
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   └── Input/
│   │   ├── layout/          # Layout components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Navbar/
│   │   │   └── Sidebar/
│   │   └── features/        # Feature-specific components
│   │       ├── destinations/
│   │       ├── booking/
│   │       └── gallery/
│   │
│   ├── pages/               # Page components (route pages)
│   │   ├── Home/
│   │   ├── Destinations/
│   │   ├── Tours/
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Booking/
│   │   └── NotFound/
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useBooking.js
│   │   ├── useDestinations.js
│   │   └── useAuth.js
│   │
│   ├── services/            # API calls and external services
│   │   ├── api.js           # API configuration
│   │   ├── bookingService.js
│   │   └── destinationService.js
│   │
│   ├── utils/               # Utility functions
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   └── validators.js
│   │
│   ├── context/             # React Context (global state)
│   │   ├── AuthContext.jsx
│   │   └── BookingContext.jsx
│   │
│   ├── styles/              # Global styles
│   │   ├── index.css        # Global CSS
│   │   ├── variables.css    # CSS variables
│   │   └── themes.css       # Theme configurations
│   │
│   ├── routes/              # Route configuration
│   │   └── index.jsx
│   │
│   ├── App.jsx
│   ├── index.jsx
│   └── main.jsx
│
├── .env.example             # Environment variables template
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Key Benefits for Travel Website

1. **components/features/** - Specific travel features like destination cards, booking forms, tour listings
2. **pages/** - Clear separation of route-level components (Home, Tours, Destinations, etc.)
3. **services/** - API integration for bookings, destinations, tours data
4. **assets/images/** - Store destination photos, hero images, gallery photos
5. **Scalable** - Easy to add new destinations, tours, or features
6. **Maintainable** - Clear separation of concerns

## Travel Website Specific Considerations

- **Image optimization** is crucial (consider lazy loading)
- **Booking flow** needs its own feature component
- **Multi-language support** structure (if needed)
- **SEO optimization** for destinations
- **Map integration** folder if using maps

## Implementation Status

- [x] Plan created
- [x] Folder structure applied
- [x] Existing files reorganized
- [x] Import paths updated
- [x] Initial components created (Header, Footer, Home)
- [x] CSS variables and global styles configured
- [x] Build verified successfully

## Documentation Created

- [STRUCTURE.md](STRUCTURE.md) - Complete folder structure documentation
- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Implementation summary and next steps
- [src/components/README.md](src/components/README.md) - Component development guidelines
- [.env.example](.env.example) - Environment variables template
