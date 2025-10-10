# Assets List for Home Page

## Complete List of Required Images and Assets

### 1. Logo & Branding
- **Rania Logo (Header)**: 133x61px - Centered in navigation header
- **Rania Logo (Footer)**: 243x111px - Used in footer section

### 2. Hero Section (Carousel)
- **Hero Image 1**: 1440x938px - Full-width background image with gradient overlay
- **Hero Image 2**: 1440x938px - Second carousel slide (optional)
- **Hero Image 3**: 1440x938px - Third carousel slide (optional)
- **Hero Image 4**: 1440x938px - Fourth carousel slide (optional)

**Note**: Design shows 4 carousel indicators, so prepare 4 hero images

### 3. Values Section Icons (5 Icons)
Each icon: 50x50px (white color on gold background)

1. **Trust Icon**: Icon representing trust/integrity
2. **Heartfelt Icon**: Icon representing care/heart
3. **Excellence Icon**: Icon representing service excellence
4. **Spirituality Icon**: Icon placeholder shown in Figma (50x50px)
5. **Elevation Icon**: Icon placeholder shown in Figma (50x50px)

**Note**: Icons should be white SVG or PNG with transparent background

### 4. Services Section Images (3 Cards)
Each image: 334x400px with gradient overlay

1. **Hajj Service Image**: 334x400px - Image representing Hajj pilgrimage
2. **Umrah Service Image**: 334x400px - Image representing Umrah journey
3. **World Service Image**: 334x400px - Image representing world travel

**Note**: Images will have CSS gradient overlay applied (180deg, rgba(26, 36, 61, 0) 50%, #1A243D 70%)

### 5. Partners Carousel Logos
Each logo approximately: 69x55px (some variations at 69x31px)

**Total**: 18 unique partner logos (shown twice in infinite scroll)

- Logo 1: 69x55px
- Logo 2: 69x55px
- Logo 3: 69x55px
- Logo 4: 69x55px
- Logo 5: 69x55px
- Logo 6: 69x31px (different aspect ratio)
- Logo 7: 69x55px
- Logo 8: 69x55px
- Logo 9: 69x55px
- Logo 10: 69x55px
- Logo 11: 69x55px
- Logo 12: 69x55px
- Logo 13: 69x55px
- Logo 14: 69x55px
- Logo 15: 69x55px
- Logo 16: 69x55px
- Logo 17: 69x31px (different aspect ratio)
- Logo 18: 69x55px

**Note**: All logos should have rounded corners (7.64px border radius)

### 6. Upcoming Events Images (3 Cards)
Each image: 334x400px with gradient overlay

1. **Scheduled Webinar Image**: 334x400px
2. **Digital Manasik Image**: 334x400px
3. **Live Event Image**: 334x400px

**Note**: Same gradient overlay as services section

### 7. Signature Card Section
- **Rania BSI Card Image**: 504x280px - Product image with gradient background
  - Gradient: linear-gradient(180deg, #1A243D 51%, #0D121F 75%, black 100%)
  - Border radius: 20px

### 8. Social Media Icons (5 Icons)
Each icon: 36x36px square with 8px border radius

1. **Facebook Icon**: White icon on dark background (9.82x18px icon)
2. **Twitter Icon**: White icon on dark background (18x14.60px icon)
3. **Instagram Icon**: White icon on dark background (placeholder)
4. **LinkedIn Icon**: White icon on dark background (18x17.14px icon)
5. **YouTube Icon**: White icon on dark background (19.80x14px icon)

**Note**: Background color for all icons: #1A243D with 20% opacity overlay

---

## Asset Organization

Suggested folder structure in `src/assets/`:

```
src/assets/
├── logos/
│   ├── rania-logo-header.svg (or .png)
│   └── rania-logo-footer.svg (or .png)
├── hero/
│   ├── hero-1.jpg
│   ├── hero-2.jpg
│   ├── hero-3.jpg
│   └── hero-4.jpg
├── icons/
│   ├── values/
│   │   ├── trust.svg
│   │   ├── heartfelt.svg
│   │   ├── excellence.svg
│   │   ├── spirituality.svg
│   │   └── elevation.svg
│   └── social/
│       ├── facebook.svg
│       ├── twitter.svg
│       ├── instagram.svg
│       ├── linkedin.svg
│       └── youtube.svg
├── services/
│   ├── hajj.jpg
│   ├── umrah.jpg
│   └── world.jpg
├── events/
│   ├── webinar.jpg
│   ├── manasik.jpg
│   └── live-event.jpg
├── partners/
│   ├── partner-1.png
│   ├── partner-2.png
│   ├── partner-3.png
│   ├── ... (up to 18)
│   └── partner-18.png
└── signature-card/
    └── bsi-card.png
```

---

## Asset Specifications Summary

| Asset Type | Quantity | Dimensions | Format | Notes |
|------------|----------|------------|--------|-------|
| Logos | 2 | 133x61, 243x111 | SVG/PNG | Transparent background |
| Hero Images | 4 | 1440x938 | JPG | High quality |
| Value Icons | 5 | 50x50 | SVG/PNG | White, transparent bg |
| Service Images | 3 | 334x400 | JPG | Good quality |
| Partner Logos | 18 | 69x55, 69x31 | PNG/SVG | Transparent/white bg |
| Event Images | 3 | 334x400 | JPG | Good quality |
| Signature Card | 1 | 504x280 | PNG/JPG | Product image |
| Social Icons | 5 | 36x36 | SVG | White icons |

**Total Assets**: 41 image files

---

## Priority Order

1. **High Priority** (Needed immediately):
   - Rania logo (header)
   - At least 1 hero image
   - 5 value icons
   - 3 service images

2. **Medium Priority** (Can use placeholders initially):
   - Additional hero images (2-4)
   - 3 event images
   - Signature card image

3. **Low Priority** (Can be added later):
   - Partner logos (18)
   - Social media icons (can use icon library)
   - Footer logo (can reuse header logo)
