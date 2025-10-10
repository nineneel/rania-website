import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  type = 'button',
  disabled = false,
  className = ''
}) => {
  const buttonClass = `button button-${variant} button-${size} ${className}`.trim();

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
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default Button;
