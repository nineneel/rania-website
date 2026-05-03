import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';
import Header from '../../components/layout/Header';
import Carousel from '../../components/common/Carousel/Carousel';
import Partners from '../../components/common/Partners';
import SEO from '../../components/common/SEO';
import { StructuredData } from '../../components/common/SEO';
import './About.css';

// Import hero image
import heroAbout from '../../assets/images/about/hero.webp';

// Import expert/team images
import expert1 from '../../assets/images/about/experts/expert-1.webp';
import expert2 from '../../assets/images/about/experts/expert-2.webp';
import expert3 from '../../assets/images/about/experts/expert-3.webp';

// Import life gallery images
import life1 from '../../assets/images/about/life/life-1.webp';
import life2 from '../../assets/images/about/life/life-2.webp';

// Import value images (reuse from Home)
import value1 from '../../assets/images/home/value/value-1.webp';
import value2 from '../../assets/images/home/value/value-2.webp';
import value3 from '../../assets/images/home/value/value-3.webp';
import value4 from '../../assets/images/home/value/value-4.webp';
import value5 from '../../assets/images/home/value/value-5.webp';

// Import coverage/media images
import logoLiputan6 from '../../assets/images/about/coverage/logos/liputan6.webp';
import logoSuara from '../../assets/images/about/coverage/logos/suara.webp';
import logoSindonews from '../../assets/images/about/coverage/logos/sindonews.webp';
import logoTimesIndonesia from '../../assets/images/about/coverage/logos/times-indonesia.webp';
import coverageCollage from '../../assets/images/about/coverage/coverage-collage.webp';

// Import wave divider
import waveImage from '../../assets/utils/wave.webp';

const About = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('');

  // Values data (same as Home page)
  const values = [
    { title: t('home.values.trust'), subtitle: t('home.values.trustSub'), icon: value1 },
    { title: t('home.values.heartfelt'), subtitle: t('home.values.heartfeltSub'), icon: value2 },
    { title: t('home.values.excellence'), subtitle: t('home.values.excellenceSub'), icon: value3 },
    { title: t('home.values.spirituality'), subtitle: t('home.values.spiritualitySub'), icon: value4 },
    { title: t('home.values.elevation'), subtitle: t('home.values.elevationSub'), icon: value5 }
  ];

  // Milestone data
  const milestones = [
    {
      year: '2013',
      title: t('about.milestone2013')
    },
    {
      year: '2021',
      title: t('about.milestone2021')
    },
    {
      year: '2025',
      title: t('about.milestone2025')
    }
  ];

  // Certification data
  const certifications = [
    {
      title: t('about.ppiu'),
      subtitle: t('about.ppiuSub'),
      description: t('about.ppiuDesc'),
      detail: t('about.ppiuDetail'),
      icon: '⭐'
    },
    {
      title: t('about.iata'),
      subtitle: t('about.iataSub'),
      description: t('about.iataDesc'),
      detail: '',
      icon: '⭐'
    },
    {
      title: t('about.pihk'),
      subtitle: t('about.pihkSub'),
      description: t('about.pihkDesc'),
      detail: t('about.pihkDetail'),
      icon: '⭐'
    }
  ];

  // Team members data
  const teamMembers = [
    { name: 'Fadhal Faisal Sa’di', role: 'VP Chief Financial Officer', image: expert1 },
    { name: 'Antar Helmi Alkathiri', role: 'Chief Executive Officer', image: expert2 },
    { name: 'Syed Mohd Naquib Alattas', role: 'Chief Commercial Officer', image: expert3 }
  ];

  // Media coverage data
  const mediaCoverage = [
    { logo: logoLiputan6, alt: 'Liputan6', description: t('about.coverageMedia1'), link: 'https://www.liputan6.com/islami/read/6116187/calon-jemaah-bisa-berangkat-haji-lebih-cepat-tanpa-tunggu-antrean-lama' },
    { logo: logoSuara, alt: 'Suara.com', description: t('about.coverageMedia2'), dark: true, link: 'https://www.suara.com/lifestyle/2025/12/15/164041/jamaah-bukan-sekadar-peserta-mengapa-pendekatan-humanis-dibutuhkan-saat-umrah-dan-haji' },
    { logo: logoSindonews, alt: 'SindoNews', description: t('about.coverageMedia3'), link: 'https://lifestyle.sindonews.com/read/1652299/156/transformasi-industri-travel-perjalanan-ibadah-kini-dituntut-lebih-personal-dan-bermakna-1764951127?showpage=all' },
    { logo: logoTimesIndonesia, alt: 'Times Indonesia', description: t('about.coverageMedia4'), link: 'https://timesindonesia.co.id/indonesia-positif/571250/bangun-kepercayaan-publik-rania-perkuat-ekosistem-haji-premium-lewat-kolaborasi-syariah-strategis' }
  ];

  // Gallery images data
  const galleryImages = [
    { image: life1, alt: 'Life With Rania - Office Culture' },
    { image: life2, alt: 'Life With Rania - Team Spirit' }
  ];

  // Scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.about-section');
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
    <div className="about">
      {/* SEO Meta Tags */}
      <SEO
        title="About RANIA - Premium Hajj & Umrah Services"
        description="Learn about PT Rania Almutamayizah Travel, your sacred journey partner since 2013. Licensed PPIU & PIHK operator with 'A' accreditation offering premium Hajj and Umrah services with trust, integrity, and heartfelt care."
        keywords="about rania, rania travel about, PT Rania Almutamayizah, PPIU certification, PIHK certification, IATA accreditation, umrah organizer, hajj organizer, travel umrah terpercaya"
        canonical="/about"
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'About Rania', url: '/about' }
        ]}
      />

      {/* Header */}
      <Header activeLink="About Rania" />

      {/* Hero Section */}
      <section className="about-hero-section" style={{ backgroundImage: `url(${heroAbout})` }}>
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1 className="about-hero-title">
            {t('about.heroTitle')}
          </h1>
        </div>
      </section>

      {/* Partners Carousel Section */}
      <Partners />

      {/* Media Coverage Section */}
      <section className="about-coverage-section about-section">
        <h2 className="about-coverage-title">{t('about.coverageTitle')}</h2>
        <div className="about-coverage-left">
          <p className="about-coverage-description">
            {t('about.coverageDesc')}
          </p>
          <div className="about-coverage-cards">
            {mediaCoverage.map((media, index) => (
              <a key={index} href={media.link} target="_blank" rel="noopener noreferrer" className={`about-coverage-card ${media.dark ? 'about-coverage-card--dark' : ''}`}>
                <div className="about-coverage-card-logo">
                  <img src={media.logo} alt={media.alt} loading="lazy" />
                </div>
                <p className="about-coverage-card-text">{media.description}</p>
              </a>
            ))}
          </div>
        </div>
        <div className="about-coverage-right">
          <img
            src={coverageCollage}
            alt="Rania media coverage collage"
            className="about-coverage-collage"
            loading="lazy"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values-section">
        <div className="about-values-container">
          {values.map((value, index) => (
            <div key={index} className="about-value-card">
              <div className="about-value-icon-wrapper">
                <img
                  src={value.icon}
                  alt={value.title}
                  className="about-value-icon"
                  loading="lazy"
                />
              </div>
              <div className="about-value-text">
                <h3 className="about-value-title">{value.title}</h3>
                <p className="about-value-subtitle">{value.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Milestone Section */}
      <section className="about-milestone-section about-section">
        <h2 className="about-section-title">{t('about.milestone')}</h2>
        <p className="about-milestone-description">
          {t('about.milestoneDesc')}
        </p>
        <div className="about-milestone-timeline">
          {milestones.map((milestone, index) => (
            <div key={index} className="about-milestone-item">
              <div className="about-milestone-year">{milestone.year}</div>
              <p className="about-milestone-text">{milestone.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certification Section */}
      <section className="about-certification-section about-section">
        <h2 className="about-section-title">{t('about.ourCertification')}</h2>
        <div className="about-certification-container">
          {certifications.map((cert, index) => (
            <div key={index} className="about-certification-card">
              <div className="about-certification-icon-wrapper">
                <div className="about-certification-icon">{cert.icon}</div>
              </div>
              <div className="about-certification-card-content">
                <div className="about-certification-header">
                  <h3 className="about-certification-title">
                    {cert.title}
                    <br />
                    {cert.subtitle}
                  </h3>
                </div>
                <div className="about-certification-body">
                  <p className="about-certification-description">{cert.description}</p>
                  <p className="about-certification-detail">{cert.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="about-vision-section about-section">
        <h2 className="about-vision-title">{t('about.ourVision')}</h2>
        <p className="about-vision-text">
          {t('about.visionText')}
        </p>
        {/* Wave Divider */}
      </section>

      <div className="about-wave-divider">
        <img src={waveImage} alt="Wave divider" className="about-wave-image" />
      </div>

      <div className="gradient-wave">
        {/* Know More Video Section */}
        <section className="about-video-section about-section">
          <div className="about-video-container">
            <h2 className="about-video-title">{t('about.knowMore')}</h2>
            <div className="about-video-wrapper">
              <iframe
                className="about-video-iframe"
                src="https://www.youtube.com/embed/7xcs8fC32QI"
                title="Know More About Rania"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Meet Our Experts Section */}
        <section className="about-experts-section about-section">
          <h2 className="about-section-title about-expert-title">{t('about.meetExperts')}</h2>
          <div className="about-experts-desktop">
            {teamMembers.map((expert, index) => (
              <div key={index} className="about-expert-card">
                <div className="about-expert-image">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    loading="lazy"
                  />
                  <div className="about-expert-overlay"></div>
                  <div className="about-expert-info">
                    <h3 className="about-expert-name">{expert.name}</h3>
                    <p className="about-expert-role">{expert.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="about-experts-mobile">
            <Carousel className="about-experts-carousel">
              {teamMembers.map((expert, index) => (
                <div key={index} className="about-expert-card">
                  <div className="about-expert-image">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      loading="lazy"
                    />
                    <div className="about-expert-overlay"></div>
                    <div className="about-expert-info">
                      <h3 className="about-expert-name">{expert.name}</h3>
                      <p className="about-expert-role">{expert.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </section>

        {/* Life With Rania Gallery */}
        <section className="about-gallery-section about-section">
          <h2 className="about-section-title about-gallery-title">{t('about.lifeWithRania')}</h2>
          <div className="about-gallery-desktop">
            {galleryImages.map((item, index) => (
              <div key={index} className="about-gallery-item">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="about-gallery-mobile">
            <Carousel className="about-gallery-carousel">
              {galleryImages.map((item, index) => (
                <div key={index} className="about-gallery-item">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </section>

      </div>

      {/* Google Maps Section */}
      <section className="about-map-section about-section">
        <h2 className="about-section-title">{t('about.findUs')}</h2>
        <div className="about-map-wrapper">
          <iframe
            className="about-map-iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2845!2d106.8430!3d-6.2245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e94c09c0e7%3A0x31a0f5e0c9e8e1a0!2sMall%20Kota%20Kasablanka!5e0!3m2!1sen!2sid!4v1700000000000"
            title="Rania Office Location - Mall Kota Kasablanka"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <p className="about-map-address">
          Mall Kota Kasablanka, Prudential Centre, Kav No.88 Floor 7N, Kota Jakarta Selatan, 12870
        </p>
      </section>
    </div>
  );
};

export default About;
