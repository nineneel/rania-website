<h1 align="center">
  RANIA Website
</h1>

<p align="center">
  Frontend application for RANIA - A travel agency specializing in Hajj and Umrah pilgrimage services.
</p>

<p align="center">
  Built with <a href="https://react.dev">React 19</a> + <a href="https://vitejs.dev">Vite</a> + <a href="https://reactrouter.com">React Router</a>
</p>

## Features

- **Multi-page Application**: Home, About, Hajj, Umrah, Contact, Support, and Partnership pages
- **API Integration**: Full integration with Laravel backend REST API
- **SEO Optimized**: Structured data and meta tags using react-helmet-async
- **Responsive Design**: Mobile-first approach with modern UI components
- **Loading States**: Shimmer effects for better UX during data fetching
- **Testimonials**: Customer reviews with carousel display
- **Package Management**: Dynamic Umrah and Hajj package displays
- **Contact Form**: Integrated contact form with API submission
- **Social Media Integration**: Dynamic social media links from API
- **FAQ System**: Dynamic FAQ display from backend
- **WhatsApp Integration**: Direct WhatsApp contact functionality
- **Testing**: Unit tests with Vitest and React Testing Library

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **React Helmet Async** - SEO and meta tags management
- **Swiper** - Touch slider for carousels
- **Vitest** - Unit testing framework
- **PropTypes** - Runtime type checking
- **Loglevel** - Logging utility

## Project Structure

```
rania-website/frontend
├── public/
│   ├── assets/         # Images, icons, and static assets
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/     # Reusable components
│   │   │   ├── Button/
│   │   │   ├── Carousel/
│   │   │   ├── Partners/
│   │   │   ├── SEO/
│   │   │   ├── Shimmer/
│   │   │   ├── SignatureCard/
│   │   │   └── Testimonial/
│   │   └── layout/     # Layout components
│   │       ├── Header/
│   │       └── Footer/
│   ├── pages/          # Page components
│   │   ├── Home/
│   │   ├── About/
│   │   ├── Hajj/
│   │   ├── Umrah/
│   │   ├── Contact/
│   │   ├── Support/
│   │   └── Partnership/
│   ├── services/       # API service layer
│   │   └── api.js
│   ├── utils/          # Helper functions
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── logger.js
│   │   └── whatsapp.js
│   ├── styles/         # CSS files
│   ├── App.jsx
│   ├── index.jsx
│   └── setupTests.js
├── .env.example
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Laravel Backend** running (for API integration)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd rania-website/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Update the environment variables:

```env
# Laravel Backend API URL
VITE_API_BASE_URL=http://localhost:8000/api

# Other configurations as needed
```

**Important**: Make sure your Laravel backend is running before starting the frontend application.

### 4. Start Development Server

```bash
npm start
# or
npm run dev
```

The application will open automatically at [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Script              | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| `npm start`         | Starts the development server on port 3000                     |
| `npm run dev`       | Alias for `npm start`                                          |
| `npm run build`     | Builds the app for production to the `dist` folder             |
| `npm run build:staging` | Builds the app for staging environment                      |
| `npm run serve`     | Previews the production build locally                          |
| `npm test`          | Runs the test suite with Vitest                                |

## API Integration

The frontend communicates with a Laravel backend API. API endpoints are configured in:
- `src/services/api.js` - API service layer
- `src/utils/constants.js` - API endpoint constants

### Available API Endpoints

- `GET /api/hero-slides` - Hero carousel slides (paginated)
- `GET /api/events` - Events listing
- `GET /api/testimonials` - Customer testimonials (paginated)
- `GET /api/umrah-packages` - Umrah packages with hotels and airlines
- `GET /api/social-media` - Active social media links
- `GET /api/faqs` - Frequently asked questions
- `POST /api/contact` - Contact form submission

## Building for Production

```bash
npm run build
```

The optimized build will be generated in the `dist` folder, ready for deployment.

### Staging Build

```bash
npm run build:staging
```

## Testing

Run tests with:

```bash
npm test
```

Tests are configured with Vitest and React Testing Library.

## Code Structure

- **Components**: Organized into `common` (reusable) and `layout` (structural)
- **Pages**: Each page is a separate route with its own folder
- **Services**: API integration layer
- **Utils**: Helper functions, constants, and utilities
- **Styles**: Component-specific and global styles

## License

This project is licensed under the terms of the [ISC license](LICENSE).
