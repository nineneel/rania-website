import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { openWhatsAppHajj, whatsappMessages } from '../../../utils/whatsapp';
import hotelIcon from '../../../assets/icons/hotel.svg';
import locationIcon from '../../../assets/icons/location.svg';
import starIcon from '../../../assets/icons/start.svg';
import calendarIcon from '../../../assets/icons/calendar-icon.svg';
import paxIcon from '../../../assets/icons/pax-icon.svg';
import bedIcon from '../../../assets/icons/bed-icon.webp';
import './HajjPackageCard.css';

const CURRENCY_LOCALE = {
  IDR: 'id-ID',
  USD: 'en-US',
  SAR: 'ar-SA',
};

const ROOM_TYPES = [
  { key: 'quad', labelKey: 'hajj.roomQuad', beds: 4 },
  { key: 'triple', labelKey: 'hajj.roomTriple', beds: 3 },
  { key: 'double', labelKey: 'hajj.roomDouble', beds: 2 },
];

const formatRoomPrice = (value, currency) => {
  if (value == null || value === '') return null;
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return null;
  const locale = CURRENCY_LOCALE[currency] || 'en-US';
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numeric);
};

const expandShortHex = (hex) => {
  if (hex.length !== 4) return hex;
  return '#' + hex.slice(1).split('').map((c) => c + c).join('');
};

const hexToRgb = (hex) => {
  const normalized = expandShortHex(hex);
  const num = parseInt(normalized.slice(1), 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

const lightenChannel = (channel, amount) => Math.round(channel + (255 - channel) * amount);

const lightenHex = (hex, amount) => {
  try {
    const { r, g, b } = hexToRgb(hex);
    const lr = lightenChannel(r, amount);
    const lg = lightenChannel(g, amount);
    const lb = lightenChannel(b, amount);
    return `rgb(${lr}, ${lg}, ${lb})`;
  } catch {
    return hex;
  }
};

// Build a 3-stop horizontal gradient: accent → light highlight → accent
const buildAccentGradient = (hex) => {
  const highlight = lightenHex(hex, 0.55);
  return `linear-gradient(90deg, ${hex} 0%, ${highlight} 50%, ${hex} 100%)`;
};

const HajjPackageCard = ({ pkg, ctaLabel, onCTAClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const accentColor = pkg.color || '#A38447';
  const accentGradient = buildAccentGradient(accentColor);
  const currency = pkg.currency || 'USD';
  const label = ctaLabel || t('hajj.moreDetails');

  const handleClick = onCTAClick || (() => {
    if (pkg.slug) {
      navigate(`/hajj/${pkg.slug}`);
    } else if (pkg.link) {
      window.open(pkg.link, '_blank', 'noopener,noreferrer');
    } else {
      openWhatsAppHajj(whatsappMessages.hajjInterest(pkg.title || pkg.name));
    }
  });

  // Map beds[] from API (by type, e.g., "Quad"/"Triple"/"Double") into a lookup
  const bedCountByType = {};
  (pkg.beds || []).forEach((b) => {
    if (b?.type) bedCountByType[b.type.toLowerCase()] = b.bed_count;
  });

  const hotels = pkg.hotels || [];
  const airlines = pkg.airlines || [];

  return (
    <div className="hajj-package-card">
      <div className="hajj-package-image-wrap">
        <div
          className="hajj-package-tag"
          style={{ backgroundImage: accentGradient }}
        >
          <span className="hajj-package-tag-text">
            {pkg.subtitle || t('hajj.packageTagDefault')}
          </span>
        </div>
        {pkg.image_url || pkg.image ? (
          <img
            src={pkg.image_url || pkg.image}
            alt={pkg.title || pkg.name}
            className="hajj-package-image"
          />
        ) : (
          <div className="hajj-package-image-fallback">{t('umrahDetail.noImage')}</div>
        )}
      </div>

      <h3
        className="hajj-package-title"
        style={{ backgroundImage: accentGradient }}
      >
        {pkg.title || pkg.name}
      </h3>

      <p className="hajj-package-tagline">
        {t('hajj.cardTagline')}
      </p>

      <div className="hajj-package-list">
        {hotels.map((hotel, idx) => (
          <div key={`hotel-${hotel.id || idx}`} className="hajj-package-list-item">
            <div className="hajj-package-list-icon">
              <img src={hotelIcon} alt="Hotel" />
            </div>
            <span className="hajj-package-list-name">{hotel.name}</span>
            {hotel.stars > 0 && (
              <div className="hajj-package-list-stars">
                {[...Array(hotel.stars)].map((_, i) => (
                  <img key={i} src={starIcon} alt="Star" className="hajj-package-star" />
                ))}
              </div>
            )}
          </div>
        ))}

        {pkg.departure && (
          <div className="hajj-package-list-item">
            <div className="hajj-package-list-icon">
              <img src={locationIcon} alt="Location" />
            </div>
            <span className="hajj-package-list-name">{pkg.departure}</span>
          </div>
        )}
      </div>

      <div className="hajj-package-pills">
        {pkg.duration && (
          <div className="hajj-package-pill">
            <img src={calendarIcon} alt="" className="hajj-package-pill-icon" />
            <span className="hajj-package-pill-text">{pkg.duration}</span>
          </div>
        )}
        {pkg.departure_schedule && (
          <div className="hajj-package-pill">
            <img src={paxIcon} alt="" className="hajj-package-pill-icon" />
            <span className="hajj-package-pill-text">{pkg.departure_schedule}</span>
          </div>
        )}
        {airlines.map((airline, idx) => (
          <div key={`airline-${airline.id || idx}`} className="hajj-package-pill hajj-package-pill-airline">
            {(airline.logo_url || airline.logo) && (
              <img
                src={airline.logo_url || airline.logo}
                alt={airline.name}
                className="hajj-package-pill-airline-logo"
              />
            )}
            {airline.class && (
              <span className="hajj-package-pill-text">{airline.class}</span>
            )}
          </div>
        ))}
      </div>

      <div className="hajj-package-action">
        <Button
          variant="secondary"
          size="medium"
          className="hajj-package-button"
          onClick={handleClick}
        >
          {label}
        </Button>
      </div>

      <div className="hajj-package-divider"></div>

      <div className="hajj-package-pricing">
        {ROOM_TYPES.map(({ key, labelKey, beds }) => {
          const formattedPrice = formatRoomPrice(pkg.room_prices?.[key], currency);
          const bedCount = bedCountByType[key] ?? beds;
          return (
            <div key={key} className="hajj-pricing-row">
              <span className="hajj-pricing-type">{t(labelKey)}</span>
              <span className="hajj-pricing-amount">
                {formattedPrice ? (
                  <>
                    {formattedPrice}{' '}
                    <span className="hajj-pricing-currency">{currency}</span>
                  </>
                ) : (
                  <span className="hajj-pricing-empty">—</span>
                )}
              </span>
              <div className="hajj-pricing-beds">
                {[...Array(bedCount)].map((_, i) => (
                  <img key={i} src={bedIcon} alt="" className="hajj-bed-icon" />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

HajjPackageCard.propTypes = {
  pkg: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    subtitle: PropTypes.string,
    image_url: PropTypes.string,
    image: PropTypes.string,
    color: PropTypes.string,
    currency: PropTypes.string,
    departure: PropTypes.string,
    duration: PropTypes.string,
    departure_schedule: PropTypes.string,
    link: PropTypes.string,
    room_prices: PropTypes.shape({
      quad: PropTypes.string,
      triple: PropTypes.string,
      double: PropTypes.string,
    }),
    beds: PropTypes.array,
    hotels: PropTypes.array,
    airlines: PropTypes.array,
  }).isRequired,
  ctaLabel: PropTypes.string,
  onCTAClick: PropTypes.func,
};

export default HajjPackageCard;
