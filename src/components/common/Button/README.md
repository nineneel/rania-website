# Button Component

A versatile button component based on the Figma design system with multiple variants and sizes.

## Import

```jsx
import Button from '../../components/common/Button';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | node | - | Button content (required) |
| variant | string | 'primary' | Button style variant |
| size | string | 'medium' | Button size |
| onClick | function | - | Click handler |
| type | string | 'button' | Button type (button, submit, reset) |
| disabled | boolean | false | Disable button |
| className | string | '' | Additional CSS classes |

## Variants

### Primary Variants
- **primary**: See Details (white background, gray text)
- **primary-dark**: See Details (dark gradient background, beige text)

### Secondary Variants
- **secondary**: I am Interest (outline brown)
- **secondary-filled**: I am Interest (brown background)

### Tertiary Variants
- **tertiary**: Contact Rania (outline gold)
- **tertiary-filled**: Contact Rania (gold background)

### Subscribe Variants
- **subscribe**: Subscribe (white background, black text)
- **subscribe-gradient**: Subscribe (dark gradient background)

### Upgrade Variants
- **upgrade**: Upgrade Now (outline brown)
- **upgrade-gradient**: Upgrade Now (gold gradient)

### Change Variants
- **change**: Change Now (outline gold)
- **change-gradient**: Change Now (gold gradient)

### Itinerary Variants
- **itinerary**: Itinerary (dark background)
- **itinerary-gradient**: Itinerary (gold gradient)

## Sizes

- **small**: 34px height, 12px font
- **medium**: 45px height, 15.69px font
- **large**: 56px height, 19.38px font
- **xlarge**: 67px height, 23.08px font

## Usage Examples

### Hero Section Buttons
```jsx
<Button variant="primary" size="small">See Details</Button>
<Button variant="tertiary" size="small">Contact Rania</Button>
```

### Service Cards
```jsx
<Button variant="primary" size="small">See Details</Button>
<Button variant="primary-dark" size="small" disabled>Coming Soon</Button>
```

### Newsletter Form
```jsx
<Button type="submit" variant="subscribe" size="small">Subscribe</Button>
```

### Special Actions
```jsx
<Button variant="upgrade-gradient" size="medium">Upgrade Now</Button>
<Button variant="change-gradient" size="large">Change Now</Button>
<Button variant="itinerary" size="small">Itinerary</Button>
```

## Styling

All button styles are defined in `Button.css`. The component uses:
- Plus Jakarta Sans font
- 100px border-radius for pill shape
- Smooth transitions (0.3s ease)
- Hover states for all variants
- Responsive sizing for mobile

## Design Reference

Based on Figma design: `project_plan/components/button_figma_to_code.md`
