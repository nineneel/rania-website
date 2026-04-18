import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button/Button';
import Header from '../../components/layout/Header';
import Partners from '../../components/common/Partners';
import SEO from '../../components/common/SEO';
import { StructuredData } from '../../components/common/SEO';
import { openWhatsAppUmrah, whatsappMessages } from '../../utils/whatsapp';
import './Partnership.css';

// Import hero image (you can change this to a specific partnership hero image)
import heroPartnership from '../../assets/images/partnership/partnership-hero.webp';

// Import collaboration images (placeholder - replace with actual images)
import companyCollab from '../../assets/images/partnership/partnership-1.webp';
import ngoCollab from '../../assets/images/partnership/partnership-2.webp';
import otherCollab from '../../assets/images/partnership/partnership-3.webp';

const Partnership = () => {
  const { t } = useTranslation();

  // Collaboration data
  const collaborations = [
    {
      id: 'company',
      title: t('partnership.companyCollab'),
      description: t('partnership.companyCollabDesc'),
      image: companyCollab,
      type: 'large'
    },
    {
      id: 'ngo',
      title: t('partnership.ngoCollab'),
      description: t('partnership.ngoCollabDesc'),
      image: ngoCollab,
      type: 'small'
    },
    {
      id: 'other',
      title: t('partnership.otherCollab'),
      description: t('partnership.otherCollabDesc'),
      image: otherCollab,
      type: 'small'
    }
  ];

  // Scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.partnership-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          section.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="partnership">
      {/* SEO Meta Tags */}
      <SEO
        title="Partnership - RANIA Travel"
        description="Discover partnership opportunities with PT Rania Almutamayizah Travel. Join us in providing premium Hajj and Umrah services to pilgrims across Indonesia."
        keywords="partnership rania, rania travel partnership, travel partnership, umrah partnership, hajj partnership, kerjasama rania"
        canonical="/partnership"
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Partnership', url: '/partnership' }
        ]}
      />

      {/* Header */}
      <Header activeLink="Partnership" />

      {/* Hero Section */}
      <section className="partnership-hero-section" style={{ backgroundImage: `url(${heroPartnership})` }}>
        <div className="partnership-hero-overlay"></div>
        <div className="partnership-hero-content">
          <h1 className="partnership-hero-title">
            {t('partnership.heroTitle')}
          </h1>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="partnership-collaboration-section partnership-section">
        <h2 className="partnership-collaboration-title">{t('partnership.becomePartner')}</h2>
        <p className="partnership-collaboration-subtitle">
          {t('partnership.partnerSubtitle')}
        </p>

        <div className="partnership-collaboration-container">
          {/* Company Collaboration - Large Card */}
          <div className="partnership-collab-card partnership-collab-large">
            <div className="partnership-collab-image-wrapper">
              <img
                src={collaborations[0].image}
                alt={collaborations[0].title}
                className="partnership-collab-image"
                loading="lazy"
              />
              <div className="partnership-collab-overlay"></div>
            </div>
            <div className="partnership-collab-content">
              <h3 className="partnership-collab-title">{collaborations[0].title}</h3>
              <p className="partnership-collab-description">{collaborations[0].description}</p>
              <Button
                variant="subscribe"
                size="small"
                className="partnership-collab-button"
                onClick={() => openWhatsAppUmrah(whatsappMessages.partnershipCompany())}
              >
                {t('partnership.collaborateNow')}
              </Button>
            </div>
          </div>

          {/* Small Cards Container */}
          <div className="partnership-collab-small-container">
            {/* NGO Collaboration */}
            <div className="partnership-collab-card partnership-collab-small">
              <div className="partnership-collab-image-wrapper">
                <img
                  src={collaborations[1].image}
                  alt={collaborations[1].title}
                  className="partnership-collab-image"
                  loading="lazy"
                />
                <div className="partnership-collab-overlay partnership-collab-overlay-horizontal"></div>
              </div>
              <div className="partnership-collab-content partnership-collab-content-horizontal">
                <h3 className="partnership-collab-title partnership-collab-title-small">{collaborations[1].title}</h3>
                <p className="partnership-collab-description partnership-collab-description-small">{collaborations[1].description}</p>
                <Button
                  variant="subscribe"
                  size="small"
                  className="partnership-collab-button partnership-collab-button-small"
                  onClick={() => openWhatsAppUmrah(whatsappMessages.partnershipNGO())}
                >
                  {t('partnership.collaborateNow')}
                </Button>
              </div>
            </div>

            {/* Other Collaboration */}
            <div className="partnership-collab-card partnership-collab-small">
              <div className="partnership-collab-image-wrapper">
                <img
                  src={collaborations[2].image}
                  alt={collaborations[2].title}
                  className="partnership-collab-image"
                  loading="lazy"
                />
                <div className="partnership-collab-overlay partnership-collab-overlay-horizontal"></div>
              </div>
              <div className="partnership-collab-content partnership-collab-content-horizontal">
                <h3 className="partnership-collab-title partnership-collab-title-small">{collaborations[2].title}</h3>
                <p className="partnership-collab-description partnership-collab-description-small">{collaborations[2].description}</p>
                <Button
                  variant="subscribe"
                  size="small"
                  className="partnership-collab-button partnership-collab-button-small"
                  onClick={() => openWhatsAppUmrah(whatsappMessages.partnershipOther())}
                >
                  {t('partnership.collaborateNow')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Carousel Section */}
      <Partners />
    </div>
  );
};

export default Partnership;
