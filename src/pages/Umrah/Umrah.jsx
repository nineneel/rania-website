import { useState, useEffect } from 'react';
import './Umrah.css';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import Button from '../../components/common/Button/Button';
import Partners from '../../components/common/Partners';
import SignatureCard from '../../components/common/SignatureCard';
import SEO from '../../components/common/SEO';
import { StructuredData } from '../../components/common/SEO';
import { openWhatsAppUmrah, whatsappMessages } from '../../utils/whatsapp';
import { UmrahShimmer } from '../../components/common/Shimmer';
import { getUmrahPackages } from '../../services/api';
import logger from '../../utils/logger';

// Import wave divider
import waveImage from '../../assets/utils/wave-light.webp';

// Import hero image
import heroUmrah from '../../assets/images/umrah/hero.webp';

// Import icons
import verifiedIcon from '../../assets/icons/verified-icon.webp';
import bedIcon from '../../assets/icons/bed-icon.webp';
import checkIcon from '../../assets/icons/check-icon.webp';
import hotelIcon from '../../assets/icons/hotel.svg';
import locationIcon from '../../assets/icons/location.svg';
import starIcon from '../../assets/icons/start.svg';
import calendarIcon from '../../assets/icons/calendar.svg';
import calendar2Icon from '../../assets/icons/calendar-2.svg';

// Import value/feature icons
import value1 from '../../assets/images/umrah/value/value-1.webp';
import value2 from '../../assets/images/umrah/value/value-2.webp';
import value3 from '../../assets/images/umrah/value/value-3.webp';
import value4 from '../../assets/images/umrah/value/value-4.webp';
import value5 from '../../assets/images/umrah/value/value-5.webp';
import value6 from '../../assets/images/umrah/value/value-6.webp';
import value7 from '../../assets/images/umrah/value/value-7.webp';
import value8 from '../../assets/images/umrah/value/value-8.webp';
import value9 from '../../assets/images/umrah/value/value-9.webp';
import value10 from '../../assets/images/umrah/value/value-10.webp';

// Import know more image
import knowMoreImage from '../../assets/images/umrah/know_more_image.webp';

// Import signature card image
import customizeYourUmrah from '../../assets/images/umrah/customize_your_umrah.webp';

const Umrah = () => {
  const [email, setEmail] = useState('');

  // API Data States
  const [umrahPackages, setUmrahPackages] = useState([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);
  const [packagesError, setPackagesError] = useState(null);

  // Features/Benefits data
  const features = [
    { title: "Direct Flights", icon: value1 },
    { title: "Exclusive Kit", icon: value2 },
    { title: "Certified Mutawif", icon: value3 },
    { title: "Professional Photography", icon: value4 },
    { title: "Team Support 24/7", icon: value5 },
    { title: "Hotels in Prime Locations", icon: value6 },
    { title: "Dedicated Tour Leader", icon: value7 },
    { title: "Flexible Payment", icon: value8 },
    { title: "Travel Insurance", icon: value9 },
  ];

  // Fetch umrah packages from API
  const fetchUmrahPackages = async () => {
    const logPrefix = '[Umrah Packages]';

    try {
      logger.debug(`${logPrefix} Fetching packages...`);
      setIsLoadingPackages(true);

      const response = await getUmrahPackages();
      logger.debug(`${logPrefix} ✅ API Response:`, response);

      if (response.success && response.data) {
        setUmrahPackages(response.data);
        logger.info(`${logPrefix} ✅ Loaded ${response.data.length} packages`);
        setPackagesError(null);
      }
    } catch (error) {
      logger.error(`${logPrefix} ❌ API Error:`, error);
      setPackagesError(error.message);
      setUmrahPackages([]);
      logger.warn(`${logPrefix} ⚠️ No packages available`);
    } finally {
      setIsLoadingPackages(false);
      logger.debug(`${logPrefix} Loading complete`);
    }
  };

  // Fetch packages on component mount
  useEffect(() => {
    logger.info('🚀 [Umrah] Initializing API data fetch...');
    fetchUmrahPackages();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribe email:', email);
    // Add subscription logic here
  };

  return (
    <div className="umrah">
      {/* SEO Meta Tags */}
      <SEO
        title="Umrah With Rania - Premium Umrah Packages Weekly Departure"
        description="Experience unforgettable Umrah with RANIA. Weekly departure from Jakarta with direct flights, 5-star hotels near Haram, certified Mutawif, 24/7 support. PPIU 'A' accredited. Customize your Umrah package with Dubai or Turkey. Book now!"
        keywords="rania umrah, umrah travel, umrah rania, paket umrah, umroh rania, umrah package, umrah indonesia, weekly umrah, premium umrah, luxury umrah, PPIU, umrah dubai, umrah turkey, travel umrah terpercaya, paket umrah terbaik, umrah 2025"
        canonical="/umrah"
      />
      <StructuredData
        type="service"
        data={{
          serviceType: 'Umrah Pilgrimage Services',
          description: 'Premium Umrah travel packages with weekly departures, exceptional service, and comfort. Licensed PPIU operator offering direct flights, luxury accommodations near Haram, and customizable packages.'
        }}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Umrah With Rania', url: '/umrah' }
        ]}
      />

      {/* Header */}
      <Header activeLink="Umrah With Rania" />

      {/* Hero Section */}
      <section className="umrah-hero-section" style={{ backgroundImage: `url(${heroUmrah})` }}>
        <div className="umrah-hero-overlay"></div>
        <div className="umrah-hero-content">
          <h1 className="umrah-hero-title">
            Unforgotten Umrah<br/>Journey With Comfort
          </h1>
        </div>
      </section>

      {/* Partners Carousel */}
      <div id="partners">
        <Partners />
      </div>

      {/* Features/Benefits Section */}
      <section className="umrah-features-section">
        <div className="umrah-features-grid">
          {features.map((feature, index) => (
            <div key={index} className="umrah-feature-item">
              <div className="umrah-feature-icon-wrapper">
                <img src={feature.icon} alt={feature.title} className="umrah-feature-icon" loading="lazy" />
              </div>
              <p className="umrah-feature-title">{feature.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="umrah-packages-section">
        <div className="umrah-packages-header">
          <h2 className="umrah-section-title">Discover Your Private Umrah</h2>
          <div className="umrah-certification-badge">
           <div className='umrah-cert-title-wrap'>
            <div className="umrah-cert-icon">
              <img src={verifiedIcon} alt="Verified" />
            </div>
            <div className="umrah-cert-title">PPIU Certification<br/>(Official Umrah License)</div>
            </div> 
            <div className="umrah-cert-desc">
              <span className="umrah-cert-a">'A'</span> Accredited Umrah Pilgrimage Organizer<br/>License Number: 02202041807930001
            </div>
          </div>
        </div>

        {isLoadingPackages ? (
          <UmrahShimmer />
        ) : umrahPackages.length === 0 ? (
          <div className="umrah-empty-state">
            <div className="umrah-empty-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="38" stroke="var(--primary-gold)" strokeWidth="2" strokeDasharray="4 4"/>
                <path d="M40 25V40L50 50" stroke="var(--primary-gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="umrah-empty-title">No Umrah Available</h3>
            <p className="umrah-empty-description">
              We're currently updating our Umrah offerings. Please check back soon or contact us for personalized Umrah inquiries.
            </p>
            <Button
              variant="tertiary"
              size="small"
              onClick={() => openWhatsAppUmrah(whatsappMessages.umrahCustomize())}
            >
              Contact Rania
            </Button>
          </div>
        ) : (
          <div className="umrah-packages-container">
            {umrahPackages.map((pkg, index) => (
              <div key={pkg.id || index} className="umrah-package-card">
                <img src={pkg.image_url || pkg.image} alt={pkg.title} className="umrah-package-image" />

                <h3 className="umrah-package-title">{pkg.title}</h3>

                <p className="umrah-package-description">{pkg.description}</p>

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
                  <div className="umrah-detail-item">
                    <img src={calendarIcon} alt="Calendar" className="umrah-detail-icon" />
                    <span className="umrah-detail-text">{pkg.duration}</span>
                  </div>
                  <div className="umrah-detail-item">
                    <img src={calendar2Icon} alt="Calendar" className="umrah-detail-icon" />
                    <span className="umrah-detail-text">{pkg.frequency}</span>
                  </div>
                  <div className="umrah-detail-airlines">
                    {pkg.airlines && pkg.airlines.map((airline, idx) => (
                      <img key={idx} src={airline.logo_url || airline.logo} alt={airline.name} className="umrah-airline-logo" />
                    ))}
                  </div>
                </div>

                <div className="umrah-package-price">
                  <span className="umrah-price-label">Start From</span>
                  <div className="umrah-price-amount">
                    <span className="umrah-price-currency">{pkg.currency}</span>
                    <span className="umrah-price-value">{pkg.price}</span>
                  </div>
                </div>

                <div className="umrah-package-divider"></div>

                <div className="umrah-package-actions">
                  <Button
                    variant="secondary"
                    size="medium"
                    className="umrah-interest-button"
                    onClick={() => {
                      if (pkg.link) {
                        window.open(pkg.link, '_blank', 'noopener,noreferrer');
                      } else {
                        openWhatsAppUmrah(whatsappMessages.umrahInterest(pkg.title));
                      }
                    }}
                  >
                    I am Interest
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Customize Your Umrah Plan */}
      <section className="umrah-customize-section">
        <div className="umrah-customize-container">
          <div className="umrah-customize-card">
            <div className="umrah-customize-image">
              <img src={customizeYourUmrah} alt="Customize Plan" loading="lazy" />
            </div>
            <div className="umrah-customize-content">
              <h2 className="umrah-customize-title">Customize Your Umrah Plan</h2>
              <p className="umrah-customize-description">
                Quickly and easily change hotels, flights, dates, and destinations to match your plan.
              </p>
              <Button
                variant="tertiary"
                size="small"
                onClick={() => openWhatsAppUmrah(whatsappMessages.umrahCustomize())}
              >
                Contact Rania
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="umrah-cta-section">
        <div className="umrah-cta-content">
          <h2 className="umrah-cta-title">Ready to Answer the Call? Let's Plan Your Journey</h2>
          <p className="umrah-cta-description">
            Turn your spiritual yearning into a blessed reality. Let us help you plan a seamless and meaningful Umrah journey
          </p>
          <Button
            variant="tertiary-filled"
            size="small"
            onClick={() => openWhatsAppUmrah(whatsappMessages.umrahCTA())}
          >
            Contact Rania
          </Button>
        </div>
        <div className="umrah-cta-image">
          <img src={knowMoreImage} alt="Journey" loading="lazy" />
        </div>
      </section>

      {/* Manage Plan Section */}
      <section id="manage" className="umrah-manage-section">
        <h2 className="umrah-section-title-dark">Manage Your Umrah</h2>
        <div className="umrah-manage-container">
          <div className="umrah-manage-card umrah-manage-card-gold">
            <h3 className="umrah-manage-title">Change My Plan</h3>
            <p className="umrah-manage-description">
              Add a Different Journey to Your Umrah Experience. Where Will Your Journey Take You Next?
            </p>
            <div className="umrah-manage-button">
              <Button
                variant="change"
                size="small"
                onClick={() => openWhatsAppUmrah(whatsappMessages.umrahChange())}
              >
                Change Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Umrah;
