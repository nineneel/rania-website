import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  to,
  type = 'button',
  disabled = false,
  className = ''
}) => {
  const buttonClass = `button button-${variant} button-${size} ${className}`.trim();

  // If 'to' prop is provided, render as Link (for internal navigation)
  if (to && !disabled) {
    return (
      <Link to={to} className={buttonClass}>
        {children}
      </Link>
    );
  }

  // Otherwise, render as button (for onClick handlers like WhatsApp)
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'primary',           // See Details (white bg, gray text)
    'primary-dark',      // See Details (dark bg, beige text)
    'secondary',         // I am Interest (outline brown)
    'secondary-filled',  // I am Interest (brown bg)
    'tertiary',          // Contact Rania (outline gold)
    'tertiary-filled',   // Contact Rania (gold bg)
    'subscribe',         // Subscribe (white bg, black text)
    'subscribe-gradient',// Subscribe (gradient bg)
    'upgrade',           // Upgrade Now (outline brown)
    'upgrade-gradient',  // Upgrade Now (gold gradient)
    'change',            // Change Now (outline gold)
    'change-gradient',   // Change Now (gold gradient)
    'itinerary',         // Itinerary (dark bg)
    'itinerary-gradient' // Itinerary (gold gradient)
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  onClick: PropTypes.func,
  to: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default Button;
