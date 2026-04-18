import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Hajj.css';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import Button from '../../components/common/Button/Button';
import Partners from '../../components/common/Partners';
import SignatureCard from '../../components/common/SignatureCard';
import SEO from '../../components/common/SEO';
import { StructuredData } from '../../components/common/SEO';
import { openWhatsAppHajj, whatsappMessages } from '../../utils/whatsapp';

// Import wave divider
import waveImage from '../../assets/utils/wave-light.webp';

// Import hero image
import heroHajj from '../../assets/images/hajj/hero.webp';

// Import icons
import verifiedIcon from '../../assets/icons/verified-icon.webp';
import bedIcon from '../../assets/icons/bed-icon.webp';
import checkIcon from '../../assets/icons/check-icon.webp';

// Import value/feature icons
import value1 from '../../assets/images/hajj/value/value-1.webp';
import value2 from '../../assets/images/hajj/value/value-2.webp';
import value3 from '../../assets/images/hajj/value/value-3.webp';
import value4 from '../../assets/images/hajj/value/value-4.webp';
import value5 from '../../assets/images/hajj/value/value-5.webp';
import value6 from '../../assets/images/hajj/value/value-6.webp';
import value7 from '../../assets/images/hajj/value/value-7.webp';
import value8 from '../../assets/images/hajj/value/value-8.webp';
import value9 from '../../assets/images/hajj/value/value-9.webp';
import value10 from '../../assets/images/hajj/value/value-10.webp';

// Import know more image
import knowMoreImage from '../../assets/images/hajj/know_more_image.webp';

// Import signature card image
import signatureCardImage from '../../assets/images/home/signature-card.webp';

const Hajj = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  // Features/Benefits data
  const features = [
    { title: t('hajj.directFlights'), icon: value1 },
    { title: t('hajj.exclusiveKit'), icon: value2 },
    { title: t('hajj.certifiedMutawif'), icon: value3 },
    { title: t('hajj.professionalPhotography'), icon: value4 },
    { title: t('hajj.teamSupport'), icon: value5 },
    { title: t('hajj.hotelsPrime'), icon: value6 },
    { title: t('hajj.dedicatedTourLeader'), icon: value7 },
    { title: t('hajj.flexiblePayment'), icon: value8 },
    { title: t('hajj.travelInsurance'), icon: value9 },
    { title: t('hajj.exclusiveCard'), icon: value10 }
  ];

  // Package data
  const packages = [
    {
      name: "Economy",
      color: "gold",
      downPayment: "1500",
      downPaymentIDR: "25JT",
      features: [
        "Etihad/Qatar Airways",
        "Hotel Makkah Bintang 4 di Pelataran Haram",
        "Hotel Madinah Bintang 3 dekat Masjid Nabawi",
        "Apartment Transit Kawasan Mina Aziziyah",
        "Bus Kontrak",
        "Maktab Zona C"
      ],
      pricing: [
        { type: "Quad", price: "10,250", beds: 4 },
        { type: "Triple", price: "11,750", beds: 3 },
        { type: "Double", price: "13,250", beds: 2 }
      ]
    },
    {
      name: "Luxury",
      color: "luxury",
      isVIP: true,
      downPayment: "1500",
      downPaymentIDR: "25JT",
      features: [
        "Saudia Airlines - Direct Flight",
        "Hotel Makkah Bintang 5 di Pelataran Haram",
        "Hotel Madinah Bintang 5 dekat Masjid Nabawi",
        "Transportasi Makkah-Madinah Kereta Cepat",
        "Bus Private VIP",
        "Maktab Zona A VIP 111"
      ],
      pricing: [
        { type: "Quad", price: "18,000", beds: 4 },
        { type: "Triple", price: "20,000", beds: 3 },
        { type: "Double", price: "21,500", beds: 2 }
      ]
    },
    {
      name: "Premium",
      color: "dark",
      downPayment: "1500",
      downPaymentIDR: "25JT",
      features: [
        "Etihad/Qatar Airways",
        "Hotel Makkah Bintang 5 di Pelataran Haram",
        "Hotel Madinah Bintang 4 dekat Masjid Nabawi",
        "Apartment Transit Kawasan Mina Aziziyah",
        "Bus Kontrak",
        "Maktab Zona B"
      ],
      pricing: [
        { type: "Quad", price: "14,450", beds: 4 },
        { type: "Triple", price: "15,450", beds: 3 },
        { type: "Double", price: "16,450", beds: 2 }
      ]
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribe email:', email);
    // Add subscription logic here
  };

  return (
    <div className="hajj">
      {/* SEO Meta Tags */}
      <SEO
        title="Hajj With Rania - Premium Hajj Packages Without The Wait"
        description="Experience unforgettable Hajj with RANIA. Premium hajj packages with direct flights, 5-star hotels in Haram, certified Mutawif, 24/7 support, and flexible payment. PIHK 'A' accredited operator. Book your sacred journey today."
        keywords="rania hajj, hajj travel, hajj rania, paket haji, haji rania, hajj package, hajj indonesia, hajj without wait, premium hajj, luxury hajj, PIHK, haji khusus, travel haji terbaik, paket haji terpercaya, hajj 2025"
        canonical="/hajj"
      />
      <StructuredData
        type="service"
        data={{
          serviceType: 'Hajj Pilgrimage Services',
          description: 'Premium Hajj travel packages with exceptional service, comfort, and spiritual guidance. Licensed PIHK operator offering direct flights, luxury accommodations, and 24/7 support.'
        }}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Hajj With Rania', url: '/hajj' }
        ]}
      />

      {/* Header */}
      <Header activeLink="Hajj With Rania" />

      {/* Hero Section */}
      <section className="hajj-hero-section" style={{ backgroundImage: `url(${heroHajj})` }}>
        <div className="hajj-hero-overlay"></div>
        <div className="hajj-hero-content">
          <h1 className="hajj-hero-title">
            {t('hajj.heroTitle')}
          </h1>
        </div>
      </section>

      {/* Partners Carousel */}
      <div id="partners">
        <Partners />
      </div>

      {/* Features/Benefits Section */}
      <section className="hajj-features-section">
        <div className="hajj-features-grid">
          {features.map((feature, index) => (
            <div key={index} className="hajj-feature-item">
              <div className="hajj-feature-icon-wrapper">
                <img src={feature.icon} alt={feature.title} className="hajj-feature-icon" loading="lazy" />
              </div>
              <p className="hajj-feature-title">{feature.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="hajj-packages-section">
        <div className="hajj-packages-header">
          <h2 className="hajj-section-title">{t('hajj.discoverHajj')}</h2>
          <div className="hajj-certification-badge">
           <div className='hajj-cert-title-wrap'>
            <div className="hajj-cert-icon">
              <img src={verifiedIcon} alt="Verified" />
            </div>
            <div className="hajj-cert-title">{t('hajj.pihkCert')}<br/>{t('hajj.pihkCertSub')}</div>
            </div>
            <div className="hajj-cert-desc">
              <span className="hajj-cert-a">'A'</span> {t('hajj.pihkCertDesc')}<br/>{t('hajj.pihkCertDetail')}
            </div>
          </div>
        </div>

        <div className="hajj-packages-container">
          {packages.map((pkg, index) => (
            <div key={index} className={`hajj-package-card hajj-package-${pkg.color}`}>
              {pkg.isVIP && (
                <div className="hajj-vip-badge">
                  <span className="hajj-vip-text"> VIP <br/>CHOICE</span>
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
                onClick={() => openWhatsAppHajj(whatsappMessages.hajjInterest(pkg.name))}
              >
                {t('hajj.iAmInterested')}
              </Button>

              <div className="hajj-package-divider"></div>

              <div className="hajj-package-pricing">
                {pkg.pricing.map((price, idx) => (
                  <div key={idx} className="hajj-pricing-row">
                    <span className="hajj-pricing-type">{price.type}</span>
                    <span className="hajj-pricing-amount">{price.price} <span className="hajj-pricing-currency">USD</span></span>
                    <div className="hajj-pricing-beds">
                      {[...Array(price.beds)].map((_, i) => (
                        <img key={i} src={bedIcon} alt="Bed" className="hajj-bed-icon" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>


      <div className="about-wave-divider">
        <img src={waveImage} alt="Wave divider" className="about-wave-image" />
      </div>

      {/* Signature Card Section */}
      <div id="signature-card">
        <SignatureCard
          image={signatureCardImage}
          title="Rania Signature Card"
          description="Carry your blessings, not your worries; experience secure and simple payments throughout your journey with the Rania Signature Card"
          backgroundColor="#E2E2E2"
        />
      </div>

      {/* CTA Section */}
      <section className="hajj-cta-section">
        <div className="hajj-cta-content">
          <h2 className="hajj-cta-title">{t('hajj.ctaTitle')}</h2>
          <p className="hajj-cta-description">
            {t('hajj.ctaDesc')}
          </p>
          <Button
            variant="tertiary-filled"
            size="small"
            onClick={() => openWhatsAppHajj(whatsappMessages.hajjCTA())}
          >
            {t('hajj.contactRania')}
          </Button>
        </div>
        <div className="hajj-cta-image">
          <img src={knowMoreImage} alt="Journey" loading="lazy" />
        </div>
      </section>

      {/* Manage Plan Section */}
      <section id="manage" className="hajj-manage-section">
        <h2 className="hajj-section-title-dark">{t('hajj.manageHajj')}</h2>
        <div className="hajj-manage-container">
          <div className="hajj-manage-card hajj-manage-card-brown">
            <h3 className="hajj-manage-title">{t('hajj.upgradePlan')}</h3>
            <p className="hajj-manage-description">
              {t('hajj.upgradeDesc')}
            </p>
            <div className="hajj-manage-button">
              <Button
                variant="upgrade"
                size="small"
                to="/hajj/upgrade"
              >
                {t('hajj.upgradeNow')}
              </Button>
            </div>
          </div>
          <div className="hajj-manage-card hajj-manage-card-gold">
            <h3 className="hajj-manage-title">{t('hajj.changePlan')}</h3>
            <p className="hajj-manage-description">
              {t('hajj.changeDesc')}
            </p>
            <div className="hajj-manage-button">
              <Button
                variant="change"
                size="small"
                to="/hajj/upgrade"
              >
                {t('hajj.changeNow')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hajj;
