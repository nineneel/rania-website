import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import { openWhatsAppHajj, whatsappMessages } from '../../../utils/whatsapp';
import bedIcon from '../../../assets/icons/bed-icon.webp';
import checkIcon from '../../../assets/icons/check-icon.webp';
import './HajjPackageCard.css';

const HajjPackageCard = ({ pkg, ctaLabel, onCTAClick }) => {
  const { t } = useTranslation();

  const label = ctaLabel || t('hajj.iAmInterested');
  const handleClick = onCTAClick
    || (() => openWhatsAppHajj(whatsappMessages.hajjInterest(pkg.name)));

  return (
    <div className={`hajj-package-card hajj-package-${pkg.color}`}>
      {pkg.isVIP && (
        <div className="hajj-vip-badge">
          <span className="hajj-vip-text"> VIP <br />CHOICE</span>
        </div>
      )}
      <div className="hajj-package-header">
        <h3 className="hajj-package-name">{pkg.name}</h3>
        <div className="hajj-price-amount">{pkg.downPayment}</div>
        <div className="hajj-dp-currency">USD</div>
        <div className="hajj-dp-label">DP</div>
        <div className="hajj-dp-idr">({pkg.downPaymentIDR})</div>
      </div>

      <div className="hajj-package-divider"></div>

      <ul className="hajj-package-features">
        {pkg.features.map((feature, idx) => (
          <li key={idx} className="hajj-package-feature">
            <span className="hajj-feature-check">
              <img src={checkIcon} alt="Check" className="hajj-check-icon" />
            </span>
            <span className="hajj-feature-text">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant="secondary"
        size="medium"
        className="hajj-package-button"
        onClick={handleClick}
      >
        {label}
      </Button>

      <div className="hajj-package-divider"></div>

      <div className="hajj-package-pricing">
        {pkg.pricing.map((price, idx) => (
          <div key={idx} className="hajj-pricing-row">
            <span className="hajj-pricing-type">{price.type}</span>
            <span className="hajj-pricing-amount">
              {price.price} <span className="hajj-pricing-currency">USD</span>
            </span>
            <div className="hajj-pricing-beds">
              {[...Array(price.beds)].map((_, i) => (
                <img key={i} src={bedIcon} alt="Bed" className="hajj-bed-icon" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

HajjPackageCard.propTypes = {
  pkg: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    isVIP: PropTypes.bool,
    downPayment: PropTypes.string.isRequired,
    downPaymentIDR: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    pricing: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      beds: PropTypes.number.isRequired
    })).isRequired
  }).isRequired,
  ctaLabel: PropTypes.string,
  onCTAClick: PropTypes.func
};

export default HajjPackageCard;
