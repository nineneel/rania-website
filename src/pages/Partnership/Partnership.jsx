import { useEffect } from 'react';
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
  // Collaboration data
  const collaborations = [
    {
      id: 'company',
      title: 'Company Collaboration',
      description: 'Share our commitment to providing a seamless and dignified pilgrimage experience',
      image: companyCollab,
      type: 'large'
    },
    {
      id: 'ngo',
      title: 'NGO Collaboration',
      description: 'Aiming to make the sacred journey an accessible reality for their members and beneficiaries',
      image: ngoCollab,
      type: 'small'
    },
    {
      id: 'other',
      title: 'Other Collaboration',
      description: 'For individuals, content creators, and innovators to enrich the pilgrimage experience',
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
            Let’s collaborate <br /> With Rania
          </h1>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="partnership-collaboration-section partnership-section">
        <h2 className="partnership-collaboration-title">Become a Partner in a Sacred Journey</h2>
        <p className="partnership-collaboration-subtitle">
          Explore opportunities to work together and make the dream of Hajj and Umrah<br/>
          more accessible and meaningful for everyone
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
                Collaborate Now
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
                  Collaborate Now
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
                  Collaborate Now
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
