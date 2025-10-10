# Design Tokens

Design tokens extracted from the Figma design for the Rania Travel website.

## Files

- [colors.md](./colors.md) - Color palette and gradients
- [typography.md](./typography.md) - Font families, sizes, and weights
- [spacing.md](./spacing.md) - Container widths, padding, gaps, and border radius

## How to Use

These design tokens should be implemented as CSS custom properties (variables) in your global CSS file:

```css
:root {
  /* Import all variables from the token files */
  /* Colors */
  --primary-dark: #1A243D;
  --primary-gold: #A38447;
  /* ... etc */
}
```

Then reference them in your components:

```css
.hero-section {
  background: var(--primary-dark);
  padding: var(--section-padding);
}

.title {
  font-family: var(--font-family);
  font-size: var(--font-size-hero);
  font-weight: var(--font-weight-extra-bold);
}
```

## Implementation Location

Create a global CSS file at `src/styles/tokens.css` or include these variables in your main `src/index.css` file.
