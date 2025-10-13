import { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Header from '../../components/layout/Header';
import Carousel from '../../components/common/Carousel/Carousel';
import Partners from '../../components/common/Partners';
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

// Import wave divider
import waveImage from '../../assets/utils/wave.webp';

const About = () => {
  const [activeSection, setActiveSection] = useState('');

  // Values data (same as Home page)
  const values = [
    { title: "Trust", subtitle: "With Integrity", icon: value1 },
    { title: "Heartfelt", subtitle: "Care", icon: value2 },
    { title: "Excellence", subtitle: "End-to-end Service", icon: value3 },
    { title: "Spirituality", subtitle: "Best Service", icon: value4 },
    { title: "Elevation", subtitle: "Journey", icon: value5 }
  ];

  // Milestone data
  const milestones = [
    {
      year: '2013',
      title: 'PT Zamzam Travel Provider'
    },
    {
      year: '2021',
      title: 'Transformasi Menuju Travel Premium'
    },
    {
      year: '2025',
      title: 'PT Rania Almutamayizah Travel'
    }
  ];

  // Certification data
  const certifications = [
    {
      title: 'PPIU Certification',
      subtitle: '(Official Umrah License)',
      description: "'A' Accredited Umrah Pilgrimage Organizer",
      detail: 'License Number: 02202041807930001',
      icon: '⭐'
    },
    {
      title: 'IATA',
      subtitle: 'Accreditation',
      description: 'Accreditation No. 15334782',
      detail: '',
      icon: '⭐'
    },
    {
      title: 'PIHK Certification',
      subtitle: '(Official Special Hajj License)',
      description: "'A' Accredited Special Hajj Pilgrimage Organizer",
      detail: 'License No. 02202041807930002',
      icon: '⭐'
    }
  ];

  // Team members data
  const teamMembers = [
    { name: 'Fadhal Faisal Sa’di', role: 'VP Chief Financial Officer', image: expert1 },
    { name: 'Antar Helmi Alkathiri', role: 'Chief Executive Officer', image: expert2 },
    { name: 'Syed Mohd Naquib Alattas', role: 'Chief Commercial Officer', image: expert3 }
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
      {/* Header */}
      <Header activeLink="About Rania" />

      {/* Hero Section */}
      <section className="about-hero-section" style={{ backgroundImage: `url(${heroAbout})` }}>
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1 className="about-hero-title">
            Secure Journeys, Personal Service, Perfect Worship
          </h1>
        </div>
      </section>

      {/* Partners Carousel Section */}
      <Partners />

      {/* Values Section */}
      <section className="values-section about-section">
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
        <h2 className="about-section-title">Milestone</h2>
        <p className="about-milestone-description">
          Rania offers an exclusive Hajj and Umrah experience focused on comfort, security, and serene worship. With premium facilities and personal care, we are the dedicated 'Your Sacred Journey Partner' to the Baitullah
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
        <h2 className="about-section-title">Our Certification</h2>
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
        <h2 className="about-vision-title">Our Vision</h2>
        <p className="about-vision-text">
          To become Indonesia's most trusted companion for exclusive Hajj and Umrah journeys, crafting pilgrimages defined by serenity, exceptional service, and a profound spiritual connection
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
            <h2 className="about-video-title">Know More About Rania</h2>
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
          <h2 className="about-section-title about-expert-title">Meet Our Experts</h2>
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
          <h2 className="about-section-title about-gallery-title">Life With Rania</h2>
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
    </div>
  );
};

export default About;
