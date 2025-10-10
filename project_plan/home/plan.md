# Home Page Implementation Plan

## Overview
This plan outlines the implementation of the Home page based on the Figma design. We'll build everything directly in the Home page first, then refactor into separate components later.

## Reference
- Figma to Code: [figma_to_code.md](./figma_to_code.md)
- Current Home Component: [src/pages/Home/Home.jsx](../../src/pages/Home/Home.jsx)
- Design Tokens: [../design_tokens/](../design_tokens/)

## Approach
1. **Build in Home.jsx**: Create all sections directly in the Home page component
2. **Style in Home.css**: Add all styles in one CSS file
3. **Refactor Later**: After everything works, extract sections into reusable components

## Page Structure (Top to Bottom)

### 1. Header/Navigation (height: 165px)
- Logo (centered)
- Navigation menu with 9 items
- Transparent background with subtle shadow

### 2. Hero Section (height: 777px)
- Full-width background image with gradient overlay
- Centered headline and subheadline
- Two CTA buttons: "See Details" and "Contact Rania"
- Carousel indicators (4 dots)

### 3. Values Section (height: 276px)
- Dark blue background (#1A243D)
- 5 value cards with icons:
  - Trust (With Integrity)
  - Heartfelt (Care)
  - Excellence (End-to-end Service)
  - Spirituality (Best Service)
  - Elevation (Journey)

### 4. Services Section (height: 809px)
- Title: "Redefine Your Journey"
- 3 service cards:
  - Hajj With Rania
  - Umrah With Rania
  - World With Rania (Coming Soon)
- Each card has image, title, description, and CTA button

### 5. Partners Carousel (height: 157px)
- Horizontal scrolling logo carousel
- Gradient background transition

### 6. Upcoming Events (height: 658px)
- Title: "Upcoming Events"
- 3 event cards:
  - Scheduled Webinar
  - Digital Manasik
  - Live Event

### 7. Signature Card Section (height: 404px)
- Split layout: image left, content right
- Rania BSI Signature Card promotion

### 8. Newsletter Section (height: 190px)
- Dark gradient background
- Email input field
- Subscribe button

### 9. Footer (height: 568px)
- Logo
- Multi-column navigation links
- Social media icons
- Copyright and legal links

## Implementation Checklist

### Step 1: Build All Sections in Home.jsx
- [ ] Hero Section with placeholder image
- [ ] Values Section with 5 cards
- [ ] Services Section with 3 cards
- [ ] Partners Carousel
- [ ] Upcoming Events with 3 cards
- [ ] Signature Card Section
- [ ] Newsletter Section
- [ ] Footer Section

### Step 2: Style Everything in Home.css
- [ ] Apply design tokens (colors, typography, spacing)
- [ ] Add responsive layout
- [ ] Implement hover effects
- [ ] Add animations

### Step 3: Refactor into Components
- [ ] Extract Hero → `src/components/features/Hero/`
- [ ] Extract Values → `src/components/features/Values/`
- [ ] Extract Services → `src/components/features/Services/`
- [ ] Extract Partners → `src/components/features/Partners/`
- [ ] Extract Events → `src/components/features/Events/`
- [ ] Extract SignatureCard → `src/components/features/SignatureCard/`
- [ ] Extract Newsletter → `src/components/features/Newsletter/`
- [ ] Update Header → `src/components/layout/Header/`
- [ ] Update Footer → `src/components/layout/Footer/`

## Assets Needed
- [ ] Hero background images (high resolution)
- [ ] Value icons (5 icons)
- [ ] Service images (3 images)
- [ ] Partner logos (multiple)
- [ ] Event images (3 images)
- [ ] Signature card image
- [ ] Rania logo
- [ ] Social media icons

## Questions to Clarify
1. Should the hero carousel auto-play? If yes, what interval?
2. Is there backend API ready for newsletter subscription?
3. Are all images/assets available, or do we use placeholders?
4. Should we implement actual routing for navigation links now or later?
5. What are the exact breakpoints for responsive design?

## Answers to Clarify
1. Yes, with an interval of 5 seconds
2. Yes, we have a backend API for newsletter subscription but for now lets just show a success message
3. All images/assets are available
4. We can implement actual routing for navigation links leter
5. We can add breakpoints for responsive design later
---

**Status**: Draft - Awaiting Review
**Created**: 2025-10-10
**Last Updated**: 2025-10-10
