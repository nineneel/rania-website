import { useState, useEffect, useRef } from 'react';

import './Home.css';
import Button from '../../components/common/Button/Button';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import Carousel from '../../components/common/Carousel/Carousel';

// Import hero images
import hero1 from '../../assets/images/home/hero/hero-1.webp';
import hero2 from '../../assets/images/home/hero/hero-2.webp';
import hero3 from '../../assets/images/home/hero/hero-3.webp';
import hero4 from '../../assets/images/home/hero/hero-4.webp';

// Import journey images
import journey1 from '../../assets/images/home/jurney/jurney_1.webp';
import journey2 from '../../assets/images/home/jurney/jurney-2.webp';
import journey3 from '../../assets/images/home/jurney/jurney-3.webp';

// Import partner logos
import partnerLogo1 from '../../assets/images/home/partner-logo/partner-logo-1.webp';
import partnerLogo2 from '../../assets/images/home/partner-logo/partner-logo-2.webp';
import partnerLogo3 from '../../assets/images/home/partner-logo/partner-logo-3.webp';
import partnerLogo4 from '../../assets/images/home/partner-logo/partner-logo-4.webp';
import partnerLogo5 from '../../assets/images/home/partner-logo/partner-logo-5.webp';
import partnerLogo6 from '../../assets/images/home/partner-logo/partner-logo-6.webp';
import partnerLogo7 from '../../assets/images/home/partner-logo/partner-logo-7.webp';
import partnerLogo8 from '../../assets/images/home/partner-logo/partner-logo-8.webp';
import partnerLogo9 from '../../assets/images/home/partner-logo/partner-logo-9.webp';
import partnerLogo10 from '../../assets/images/home/partner-logo/partner-logo-10.webp';
import partnerLogo11 from '../../assets/images/home/partner-logo/partner-logo-11.webp';
import partnerLogo12 from '../../assets/images/home/partner-logo/partner-logo-12.webp';

// Import upcoming event images
import upcomingEvent1 from '../../assets/images/home/upcoming-event/upcoming-event-1.webp';
import upcomingEvent2 from '../../assets/images/home/upcoming-event/upcoming-event-2.webp';
import upcomingEvent3 from '../../assets/images/home/upcoming-event/upcoming-event-3.webp';

// Import signature card image
import signatureCard from '../../assets/images/home/signature-card.webp';

// Import value images
import value1 from '../../assets/images/home/value/value-1.webp';
import value2 from '../../assets/images/home/value/value-2.webp';
import value3 from '../../assets/images/home/value/value-3.webp';
import value4 from '../../assets/images/home/value/value-4.webp';
import value5 from '../../assets/images/home/value/value-5.webp';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bgColor, setBgColor] = useState('var(--primary-dark)');
  const [textColor, setTextColor] = useState('white');

  // Refs for tracking sections
  const eventsRef = useRef(null);
  const signatureRef = useRef(null);

  const heroSlides = [
    {
      title: "Weekly Departure From Jakarta To ...",
      subtitle: "The Sacred Umrah Journey Crafted For Your Heart",
      image: hero1
    },
    {
      title: "Experience The Sacred Journey",
      subtitle: "With Complete Guidance and Comfort",
      image: hero2
    },
    {
      title: "Your Spiritual Journey Begins",
      subtitle: "Professional Service, Heartfelt Care",
      image: hero3
    },
    {
      title: "Join Thousands of Satisfied Pilgrims",
      subtitle: "Making Dreams Come True Since 2015",
      image: hero4
    }
  ];

  const values = [
    { title: "Trust", subtitle: "With Integrity", icon: value1 },
    { title: "Heartfelt", subtitle: "Care", icon: value2 },
    { title: "Excellence", subtitle: "End-to-end Service", icon: value3 },
    { title: "Spirituality", subtitle: "Best Service", icon: value4 },
    { title: "Elevation", subtitle: "Journey", icon: value5 }
  ];

  const services = [
    {
      title: "Hajj With Rania",
      description: "Journey with a serene soul, ready to receive the immense blessings of Hajj.",
      image: journey1,
      available: true
    },
    {
      title: "Umrah With Rania",
      description: "Take the first step toward the journey your heart has been yearning for.",
      image: journey2,
      available: true
    },
    {
      title: "World With Rania",
      description: "Discover the world through personalized journeys that reveal the authentic soul of each destination.",
      image: journey3,
      available: false
    }
  ];

  const events = [
    {
      title: "Scheduled Webinar",
      description: "Join our complimentary webinar for heartfelt guidance on your upcoming pilgrimage.",
      image: upcomingEvent1
    },
    {
      title: "Digital Manasik",
      description: "Find the true understanding, learn the Manasik with our supportive and accessible online program.",
      image: upcomingEvent2
    },
    {
      title: "Live Event",
      description: "Join our live event to share in the spirit and prepare your heart for the journey ahead.",
      image: upcomingEvent3
    }
  ];

  const partners = [
    partnerLogo1, partnerLogo2, partnerLogo3, partnerLogo4,
    partnerLogo5, partnerLogo6, partnerLogo7, partnerLogo8,
    partnerLogo9, partnerLogo10, partnerLogo11, partnerLogo12
  ];

  // Auto-advance hero slides every 4 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get Events section position
      if (eventsRef.current) {
        const eventsTop = eventsRef.current.getBoundingClientRect().top + scrollY;

        // Change to white background when reaching events section
        if (scrollY + windowHeight / 2 >= eventsTop) {
          setBgColor('#ffffff');
          setTextColor('var(--text-primary)'); // Dark text on white background
        } else {
          setBgColor('var(--primary-dark)');
          setTextColor('white'); // White text on dark background
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home" style={{ backgroundColor: bgColor, transition: 'background-color 0.5s ease' }}>
      {/* Header */}
      <Header activeLink="Home" />

      {/* Hero Section */}
      <section className="hero-section">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay"></div>
            <div className={`hero-content ${index === currentSlide ? 'active' : ''}`}>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <div className="hero-buttons">
                <Button variant="primary" size="small">See Details</Button>
                <Button variant="tertiary" size="small">Contact Rania</Button>
              </div>
            </div>
          </div>
        ))}
        <div className="hero-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-container">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon-wrapper">
                <img src={value.icon} alt={value.title} className="value-icon" />
              </div>
              <div className="value-text">
                <h3 className="value-title">{value.title}</h3>
                <p className="value-subtitle">{value.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="service-section-title" style={{ color: textColor, transition: 'color 0.5s ease' }}>Redefine Your Journey</h2>
        <Carousel className="services-carousel">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-image" style={{ backgroundImage: `url(${service.image})` }}>
                <div className="service-overlay"></div>
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <Button
                    variant={service.available ? 'primary' : 'primary-dark'}
                    size="small"
                    disabled={!service.available}
                  >
                    {service.available ? 'See Details' : 'Coming Soon'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Partners Carousel */}
      <section className="partners-section">
        <div className="partners-carousel">
          <div className="partners-track">
            {[...partners, ...partners].map((partner, index) => (
              <img key={index} src={partner} alt={`Partner ${index + 1}`} className="partner-logo" />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section ref={eventsRef} className="events-section">
        <h2 className="section-title" style={{ color: textColor, transition: 'color 0.5s ease' }}>Upcoming Events</h2>
        <Carousel className="events-carousel">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <div className="event-image" style={{ backgroundImage: `url(${event.image})` }}>
                <div className="event-overlay"></div>
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  <Button variant="primary" size="small">See Details</Button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Signature Card Section */}
      <section className="signature-card-section">
        <div className="signature-card-container">
          <div className="signature-card-image">
            <img src={signatureCard} alt="Rania BSI Signature Card" />
          </div>
          <div className="signature-card-content">
            <h2 className="signature-card-title" style={{ color: textColor, transition: 'color 0.5s ease' }}>Rania BSI Signature Card</h2>
            <p className="signature-card-description" style={{ color: textColor, transition: 'color 0.5s ease' }}>
              Carry your blessings, not your worries; experience secure and simple payments throughout your journey with the Rania Signature Card.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
