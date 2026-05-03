import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Umrah.css';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import Button from '../../components/common/Button/Button';
import Partners from '../../components/common/Partners';
import SignatureCard from '../../components/common/SignatureCard';
import SEO from '../../components/common/SEO';
import { StructuredData } from '../../components/common/SEO';
import UmrahPackageCard from '../../components/common/UmrahPackageCard';
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

// Import discover section background
import discoverBg from '../../assets/images/umrah/discover-private-umrah.webp';

// Import know more image
import knowMoreImage from '../../assets/images/umrah/know_more_image.webp';

// Import signature card image
import customizeYourUmrah from '../../assets/images/umrah/customize_your_umrah.webp';

const Umrah = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');

  // API Data States
  const [umrahPackages, setUmrahPackages] = useState([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);
  const [packagesError, setPackagesError] = useState(null);

  // Features/Benefits data
  const features = [
    { title: t('umrah.directFlights'), icon: value1 },
    { title: t('umrah.exclusiveKit'), icon: value2 },
    { title: t('umrah.certifiedMutawif'), icon: value3 },
    { title: t('umrah.professionalPhotography'), icon: value4 },
    { title: t('umrah.teamSupport'), icon: value5 },
    { title: t('umrah.hotelsPrime'), icon: value6 },
    { title: t('umrah.dedicatedTourLeader'), icon: value7 },
    { title: t('umrah.flexiblePayment'), icon: value8 },
    { title: t('umrah.travelInsurance'), icon: value9 },
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

  // Fetch packages on mount and whenever active language changes (currency depends on locale)
  useEffect(() => {
    logger.info('🚀 [Umrah] Initializing API data fetch...');
    fetchUmrahPackages();
  }, [i18n.language]);

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
            {t('umrah.heroTitle')}
          </h1>
        </div>
      </section>

      {/* Partners Carousel */}
      <div id="partners">
        <Partners />
      </div>

      {/* Discover Your Private Umrah Section */}
      <section className="umrah-discover-section">
        <img src={discoverBg} alt="Discover Your Private Umrah" className="umrah-discover-bg" loading="lazy" />
        <div className="umrah-discover-overlay-top"></div>
        <div className="umrah-discover-overlay-bottom"></div>
        <div className="umrah-discover-overlay-left"></div>
        <div className="umrah-discover-content">
          <h2 className="umrah-discover-title">{t('umrah.discoverTitle')}</h2>
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
          <div className="umrah-certification-badge">
            <div className='umrah-cert-title-wrap'>
              <div className="umrah-cert-icon">
                <img src={verifiedIcon} alt="Verified" />
              </div>
              <div className="umrah-cert-title">{t('umrah.ppiuCert')}<br/>{t('umrah.ppiuCertSub')}</div>
            </div>
            <div className="umrah-cert-desc">
              <span className="umrah-cert-a">'A'</span> {t('umrah.ppiuCertDesc')}<br/>{t('umrah.ppiuCertDetail')}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="umrah-packages-section">

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
            <h3 className="umrah-empty-title">{t('umrah.noUmrah')}</h3>
            <p className="umrah-empty-description">
              {t('umrah.noUmrahDesc')}
            </p>
            <Button
              variant="tertiary"
              size="small"
              onClick={() => openWhatsAppUmrah(whatsappMessages.umrahCustomize())}
            >
              {t('umrah.contactRania')}
            </Button>
          </div>
        ) : (
          <div className="umrah-packages-container">
            {umrahPackages.map((pkg, index) => (
              <UmrahPackageCard key={pkg.id || index} pkg={pkg} />
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
              <h2 className="umrah-customize-title">{t('umrah.customizeTitle')}</h2>
              <p className="umrah-customize-description">
                {t('umrah.customizeDesc')}
              </p>
              <Button
                variant="tertiary"
                size="small"
                onClick={() => openWhatsAppUmrah(whatsappMessages.umrahCustomize())}
              >
                {t('umrah.contactRania')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="umrah-cta-section">
        <div className="umrah-cta-content">
          <h2 className="umrah-cta-title">{t('umrah.ctaTitle')}</h2>
          <p className="umrah-cta-description">
            {t('umrah.ctaDesc')}
          </p>
          <Button
            variant="tertiary-filled"
            size="small"
            onClick={() => openWhatsAppUmrah(whatsappMessages.umrahCTA())}
          >
            {t('umrah.contactRania')}
          </Button>
        </div>
        <div className="umrah-cta-image">
          <img src={knowMoreImage} alt="Journey" loading="lazy" />
        </div>
      </section>

      {/* Manage Plan Section */}
      <section id="manage" className="umrah-manage-section">
        <h2 className="umrah-section-title-dark">{t('umrah.manageUmrah')}</h2>
        <div className="umrah-manage-container">
          <div className="umrah-manage-card umrah-manage-card-gold">
            <h3 className="umrah-manage-title">{t('umrah.changePlan')}</h3>
            <p className="umrah-manage-description">
              {t('umrah.changeDesc')}
            </p>
            <div className="umrah-manage-button">
              <Button
                variant="change"
                size="small"
                onClick={() => openWhatsAppUmrah(whatsappMessages.umrahChange())}
              >
                {t('umrah.changeNow')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Umrah;
