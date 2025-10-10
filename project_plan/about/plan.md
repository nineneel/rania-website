<!-- markdownlint-configure-file { "MD022": false, "MD024": false, "MD030": false, "MD032": false, "MD026": false, "MD031": false} -->

# About Page Implementation Plan

## Overview
This plan outlines the implementation of the About page based on the Figma design. We'll build everything directly in the About page first, then refactor into separate components later.

## Reference
- Figma to Code: [figma_to_code.md](./figma_to_code.md)
- Current Home Component: [src/pages/Home/Home.jsx](../../src/pages/Home/Home.jsx)
- Design Tokens: [../design_tokens/](../design_tokens/)
- CSS Variables: [src/styles/variables.css](../../src/styles/variables.css)

## Approach
1. **Build in About.jsx**: Create all sections directly in the About page component
2. **Style in About.css**: Add all styles in one CSS file
3. **Reuse Components**: Use existing Button component from Home
4. **Refactor Later**: After everything works, extract sections into reusable components

## Page Structure (Top to Bottom)

### 1. Header/Navigation (reuse from Home)
- Same header component
- Logo and navigation menu
- Update active state for "About" link

### 2. Hero Section (height: 777px)
- Full-width background image with gradient overlay
- Centered headline: "Secure Journeys, Personal Service, Perfect Worship"
- No buttons (simpler than Home hero)
- No carousel (single static image)

### 3. Partners Carousel (height: 179px)
- Infinite horizontal scrolling logos
- Fade gradient on left/right edges
- Similar to Home partners section

### 4. Values Section (height: 276px)
- **Reuse from Home page** (same 5 values)
- Trust, Heartfelt, Excellence, Spirituality, Elevation
- Gold icon backgrounds with white icons

### 5. Milestone Section (height: ~400px)
- Title: "Milestone"
- Description text
- Timeline with 3 milestones:
  - 2013: PT Zamzam Travel Provider
  - 2021: Transformasi Menuju Travel Premium
  - 2025: PT Rania Almutamayizah Travel

### 6. Certification Section (height: ~350px)
- Title: "Our Certification"
- 3 certification cards:
  - PPIU (Umrah License)
  - IATA Accreditation
  - PIHK (Hajj License)
- Dark background cards with gold star icons

### 7. Vision Section (height: ~300px)
- Title: "Our Vision"
- Vision statement text (centered)
- White background

### 8. Know More Video Section (height: ~350px)
- Beige background card
- Title: "Know More About Rania"
- Video player/thumbnail with play button

### 9. Meet Our Experts (height: ~500px)
- Title: "Meet Our Experts"
- 3 team member cards:
  - Syed Mohd Naquib (Executive Director)
  - Antar Helmi (Director)
  - Fadhal Faisal (Deputy Director)
- Gradient overlay on images

### 10. Life With Rania Gallery (height: ~400px)
- Title: "Life With Rania"
- 2 photo gallery images side by side

### 11. Newsletter Section (reuse from Footer)
- Dark gradient background
- Email input and subscribe button

### 12. Footer (reuse from Home)
- Same footer component

## Implementation Checklist

### Step 1: Setup Routing
- [ ] Install react-router-dom
- [ ] Update App.jsx to use BrowserRouter
- [ ] Create routes for Home and About
- [ ] Update Header navigation links

### Step 2: Build All Sections in About.jsx
- [ ] Hero Section with single image
- [ ] Partners Carousel (infinite scroll)
- [ ] Values Section (copy from Home)
- [ ] Milestone Timeline
- [ ] Certification Cards
- [ ] Vision Section
- [ ] Know More Video Section
- [ ] Meet Our Experts Cards
- [ ] Life With Rania Gallery
- [ ] Newsletter Section
- [ ] Footer (reuse)

### Step 3: Style Everything in About.css
- [ ] Use CSS variables from variables.css
- [ ] Apply consistent typography and spacing
- [ ] Add responsive layout
- [ ] Implement hover effects
- [ ] Add smooth transitions

### Step 4: Refactor into Components (Later)
- [ ] Extract common Values → reusable component
- [ ] Extract Partners Carousel → reusable component
- [ ] Extract Newsletter → reusable component

## Assets Needed
- [ ] Hero background image (about-hero.webp)
- [ ] Partner logos (reuse from Home or new ones)
- [ ] Value icons (reuse from Home: value-1 to value-5)
- [ ] Star icon for certifications
- [ ] 3 team member photos
- [ ] 2 gallery photos
- [ ] Video thumbnail

### Asset Organization:
```bash
src/assets/images/about/
├── hero-about.webp
├── team/
│   ├── syed-mohd-naquib.webp
│   ├── antar-helmi.webp
│   └── fadhal-faisal.webp
├── gallery/
│   ├── life-1.webp
│   └── life-2.webp
└── video-thumbnail.webp
```

## Questions to Clarify
1. Should we implement React Router for navigation between Home and About?
2. What video source for "Know More About Rania" section (YouTube, Vimeo, self-hosted)?
3. Are all images/assets available, or do we use placeholders first?
4. Should the partners carousel use the same logos as Home page?
5. Do we need functional newsletter subscription or just show success message?
6. Should we add scroll animations (fade-in, slide-up) like Home page?
7. Is the team member information accurate (names, roles)?
8. Should we implement lazy loading for images?

## Answer to Clarify
1. we already have navigation component
2. youtube: <https://www.youtube.com/watch?v=7xcs8fC32QI>
3. use placeholders first
4. yes, please make it to be component
5. we already have footer component
6. yes
7. yes,
8. yes please


---

**Status**: ✅ Implemented
**Created**: 2025-10-11
**Last Updated**: 2025-10-11
**Dev Server**: http://localhost:3004/about
