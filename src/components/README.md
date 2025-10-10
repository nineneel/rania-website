# Components Directory

This directory contains all reusable React components organized by their purpose.

## Directory Structure

### `/common` - Shared UI Components
Generic, reusable components used throughout the application.

**Examples:**
- Button - Reusable button component with variants
- Card - Container component for content
- Input - Form input components
- Modal - Modal/dialog component

### `/layout` - Layout Components
Components that define the page structure and layout.

**Examples:**
- Header - Top navigation and branding
- Footer - Bottom page footer
- Navbar - Main navigation menu
- Sidebar - Side navigation panel

### `/features` - Feature-Specific Components
Components tied to specific business features.

**Examples:**
- booking/ - Booking form, booking card, booking summary
- destinations/ - Destination cards, destination filters
- gallery/ - Image gallery, lightbox

## Component Guidelines

### Creating a New Component

1. Create a folder with the component name (PascalCase)
2. Add three files:
   - `ComponentName.jsx` - Component logic
   - `ComponentName.css` - Component styles
   - `index.js` - Barrel export

**Example:**
```
Button/
├── Button.jsx
├── Button.css
└── index.js
```

### Component Template

```jsx
// Button.jsx
import './Button.css';

const Button = ({ children, variant = 'primary', onClick, ...props }) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

```css
/* Button.css */
.btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}
```

```javascript
// index.js
export { default } from './Button';
```

### Import Usage

```javascript
// Good - Using barrel export
import Button from './components/common/Button';

// Avoid - Direct file import
import Button from './components/common/Button/Button';
```

## Best Practices

1. **Single Responsibility** - One component, one job
2. **Composition** - Build complex UIs from simple components
3. **Props over State** - Keep components stateless when possible
4. **Meaningful Names** - Clear, descriptive component names
5. **Consistent Structure** - Follow the folder pattern
6. **CSS Variables** - Use design tokens from variables.css
7. **Accessibility** - Include ARIA labels and semantic HTML

## Component Checklist

- [ ] Component has a clear, single purpose
- [ ] Props are documented or self-explanatory
- [ ] Handles loading and error states (if async)
- [ ] Uses CSS variables for theming
- [ ] Follows accessibility guidelines
- [ ] Has proper TypeScript types (if using TS)
- [ ] Includes PropTypes validation
- [ ] Has unit tests (recommended)
