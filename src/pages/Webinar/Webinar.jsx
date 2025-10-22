import { useEffect } from 'react';
import Button from '../../components/common/Button/Button';
import Header from '../../components/layout/Header';
import Partners from '../../components/common/Partners';
import SEO from '../../components/common/SEO';
import { StructuredData } from '../../components/common/SEO';
import { openWhatsAppUmrah, whatsappMessages } from '../../utils/whatsapp';
import './Webinar.css';

// Import hero image (placeholder - replace with actual webinar hero image)
import heroWebinar from '../../assets/images/partnership/partnership-hero.webp';

// Import icons
import calendarIcon from '../../assets/icons/calendar-simple.svg';
import clockIcon from '../../assets/icons/clock.svg';

// Import webinar event images (placeholders - replace with actual webinar images)
import webinarImage1 from '../../assets/images/partnership/partnership-hero.webp';
import webinarImage2 from '../../assets/images/partnership/partnership-hero.webp';
import webinarImage3 from '../../assets/images/partnership/partnership-hero.webp';

const Webinar = () => {
  // Webinar events data - dynamic structure
  const webinarEvents = [
    {
      id: 'scheduled-webinar',
      title: 'Understanding the Sacred Journey: Hajj and Umrah Preparation Guide',
      date: '25/11/2025',
      time: '19.30 WIB',
      buttonText: 'I am Interest',
      available: true,
      image: webinarImage1
    },
    {
      id: 'digital-manasik',
      title: 'Digital Manasik: Complete Guide to Hajj Rituals',
      date: '30/11/2025',
      time: '20.00 WIB',
      buttonText: 'I am Interest',
      available: true,
      image: webinarImage2
    },
    {
      id: 'live-event',
      title: 'Live Q&A Session: Your Questions About Umrah Answered',
      date: '05/12/2025',
      time: '19.00 WIB',
      buttonText: 'I am Interest',
      available: true,
      image: webinarImage3
    }
  ];

  // Scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.webinar-section');
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

  const handleEventClick = (eventId) => {
    // Handle event click - can be customized based on event type
    openWhatsAppUmrah(whatsappMessages.webinar(eventId));
  };

  return (
    <div className="webinar">
      {/* SEO Meta Tags */}
      <SEO
        title="Webinar With Rania - RANIA Travel"
        description="Join our webinars, digital Manasik training, and live events. Learn about Hajj and Umrah preparation with PT Rania Almutamayizah Travel."
        keywords="webinar rania, digital manasik, hajj training, umrah training, rania live event, islamic webinar"
        canonical="/webinar"
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Webinar', url: '/webinar' }
        ]}
      />

      {/* Header */}
      <Header activeLink="Webinar With Rania" />

      {/* Hero Section */}
      <section className="webinar-hero-section" style={{ backgroundImage: `url(${heroWebinar})` }}>
        <div className="webinar-hero-overlay"></div>
        <div className="webinar-hero-content">
          <h1 className="webinar-hero-title">
            Webinar With Rania
          </h1>
          <p className="webinar-hero-subtitle">
            Enhance your spiritual journey with our educational programs
          </p>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="webinar-events-section webinar-section">
        <h2 className="webinar-events-title">Upcoming Events</h2>
        <p className="webinar-events-subtitle">
          Discover our upcoming webinars, training sessions, and live events<br/>
          designed to prepare you for your sacred journey
        </p>

        <div className="webinar-events-container">
          {webinarEvents.map((event) => (
            <div key={event.id} className="webinar-event-card">
              <img
                src={event.image}
                alt={event.title}
                className="webinar-event-image"
              />

              <div className="webinar-event-content">
                <h3 className="webinar-event-title">{event.title}</h3>

                <div className="webinar-event-info">
                  <div className="webinar-event-badge">
                    <img src={calendarIcon} alt="Calendar" className="webinar-event-icon" />
                    <span className="webinar-event-text">{event.date}</span>
                  </div>

                  <div className="webinar-event-badge">
                    <img src={clockIcon} alt="Clock" className="webinar-event-icon" />
                    <span className="webinar-event-text">{event.time}</span>
                  </div>
                </div>

                <Button
                  variant="outline-dark"
                  size="medium"
                  className="webinar-event-button"
                  onClick={() => handleEventClick(event.title)}
                >
                  {event.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Carousel Section */}
      <Partners />
    </div>
  );
};

export default Webinar;
