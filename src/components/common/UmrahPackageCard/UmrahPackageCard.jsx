import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import { openWhatsAppUmrah, whatsappMessages } from '../../../utils/whatsapp';
import { formatPackagePrice } from '../../../utils/helpers';
import hotelIcon from '../../../assets/icons/hotel.svg';
import locationIcon from '../../../assets/icons/location.svg';
import starIcon from '../../../assets/icons/start.svg';
import calendarIcon from '../../../assets/icons/calendar-icon.svg';
import paxIcon from '../../../assets/icons/pax-icon.svg';
import './UmrahPackageCard.css';

const UmrahPackageCard = ({ pkg, ctaLabel, onCTAClick }) => {
  const { t } = useTranslation();

  const formatted = formatPackagePrice(pkg);
  const label = ctaLabel || t('umrah.iAmInterested');
  const handleClick = onCTAClick
    || (!pkg.slug
      ? () => {
        if (pkg.link) {
          window.open(pkg.link, '_blank', 'noopener,noreferrer');
        } else {
          openWhatsAppUmrah(whatsappMessages.umrahInterest(pkg.title));
        }
      }
      : undefined);

  return (
    <div className="umrah-package-card">
      <img src={pkg.image_url || pkg.image} alt={pkg.title} className="umrah-package-image" />

      <h3 className="umrah-package-title">{pkg.title}</h3>
      <p className="umrah-package-description">{pkg.subtitle}</p>

      <div className="umrah-package-hotels">
        {pkg.hotels && pkg.hotels.map((hotel, idx) => (
          <div key={idx} className="umrah-hotel-item">
            <div className="umrah-hotel-icon">
              <img src={hotelIcon} alt="Hotel" />
            </div>
            <span className="umrah-hotel-name">{hotel.name}</span>
            <div className="umrah-hotel-stars">
              {[...Array(hotel.stars)].map((_, i) => (
                <img key={i} src={starIcon} alt="Star" className="umrah-star" />
              ))}
            </div>
          </div>
        ))}

        <div className="umrah-departure-item">
          <div className="umrah-departure-icon">
            <img src={locationIcon} alt="Location" />
          </div>
          <span className="umrah-departure-text">{pkg.departure}</span>
        </div>
      </div>

      <div className="umrah-package-details">
        {pkg.duration && (
          <div className="umrah-detail-pill">
            <img src={calendarIcon} alt="Duration" className="umrah-detail-pill-icon" />
            <span className="umrah-detail-pill-text">{pkg.duration}</span>
          </div>
        )}
        {(pkg.pax || pkg.capacity || pkg.departure_schedule) && (
          <div className="umrah-detail-pill">
            <img src={paxIcon} alt="Pax" className="umrah-detail-pill-icon" />
            <span className="umrah-detail-pill-text">{pkg.pax || pkg.capacity || pkg.departure_schedule}</span>
          </div>
        )}
        {pkg.airlines && pkg.airlines.map((airline, idx) => (
          <div key={idx} className="umrah-detail-pill umrah-detail-pill-airline">
            <img
              src={airline.logo_url || airline.logo}
              alt={airline.name}
              className="umrah-detail-pill-airline-logo"
            />
            {airline.class && (
              <span className="umrah-detail-pill-text umrah-detail-pill-class">{airline.class}</span>
            )}
          </div>
        ))}
      </div>

      <div className="umrah-package-price">
        <span className="umrah-price-label">{t('umrah.startFrom')}</span>
        {!formatted ? (
          <div className="umrah-price-amount">
            <span className="umrah-price-value">{t('umrah.contactRania')}</span>
          </div>
        ) : (
          <div className="umrah-price-amount">
            <span className="umrah-price-currency">{formatted.currency}</span>
            <span className="umrah-price-value">{formatted.amount}</span>
          </div>
        )}
      </div>

      <div className="umrah-package-divider"></div>

      <div className="umrah-package-actions">
        <Button
          variant="secondary"
          size="medium"
          className="umrah-interest-button umrah-interest-button-full"
          to={pkg.slug ? `/umrah/${pkg.slug}` : undefined}
          onClick={handleClick}
        >
          {label}
        </Button>
      </div>
    </div>
  );
};

UmrahPackageCard.propTypes = {
  pkg: PropTypes.object.isRequired,
  ctaLabel: PropTypes.string,
  onCTAClick: PropTypes.func
};

export default UmrahPackageCard;
