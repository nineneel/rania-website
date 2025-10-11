import { useState } from 'react';
import './Umrah.css';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import Button from '../../components/common/Button/Button';
import Partners from '../../components/common/Partners';
import SignatureCard from '../../components/common/SignatureCard';

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

// Import airline logos
import saudiaLogo from '../../assets/logo/saudia-logo.webp';
import emiratesLogo from '../../assets/logo/emirates-logo.webp';

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
import signatureCardImage from '../../assets/images/home/signature-card.webp';

// Import package card images
import umrahDubai1 from '../../assets/images/umrah/packages/umrah-1.webp';
import umrahRegular from '../../assets/images/umrah/packages/umrah-2.webp';
import umrahDubai2 from '../../assets/images/umrah/packages/umrah-3.webp';
import umrahDubai3 from '../../assets/images/umrah/packages/umrah-4.webp';
import umrahTurkiye1 from '../../assets/images/umrah/packages/umrah-5.webp';
import umrahTurkiye2 from '../../assets/images/umrah/packages/umrah-6.webp';

const Umrah = () => {
  const [email, setEmail] = useState('');

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

  // Package data for Umrah
  const packages = [
    {
      title: "Umrah Dubai",
      description: "Discover Your Sacred Umrah Journey and Amazing Dubai",
      image: umrahDubai1,
      hotels: [
        { name: "Maden Hotel madinah", stars: 5 },
        { name: "Marwa Rotana hotel Makkah", stars: 5 }
      ],
      departure: "Soekarno-Hatta airport (CGK) Jakarta",
      duration: "12 Days",
      frequency: "Weekly",
      airlines: [
        { name: "Saudia", logo: saudiaLogo },
        { name: "Emirates", logo: emiratesLogo }
      ],
      price: "57.000.000,00",
      currency: "Rp"
    },
    {
      title: "Umrah Regular",
      description: "Discover Your Sacred Umrah Journey",
      image: umrahRegular,
      hotels: [
        { name: "Ansar Golden Tulip", stars: 5 },
        { name: "Makarem Ajyad Hotel", stars: 5 }
      ],
      departure: "Soekarno-Hatta airport (CGK) Jakarta",
      duration: "9 Days",
      frequency: "Weekly",
      airlines: [
        { name: "Saudia", logo: saudiaLogo },
        { name: "Emirates", logo: emiratesLogo }
      ],
      price: "43.800.000,00",
      currency: "Rp"
    },
    {
      title: "Umrah Dubai",
      description: "Discover Your Sacred Umrah Journey and Amazing Dubai",
      image: umrahDubai2,
      hotels: [
        { name: "Maden Hotel madinah", stars: 5 },
        { name: "Marwa Rotana hotel Makkah", stars: 5 }
      ],
      departure: "Soekarno-Hatta airport (CGK) Jakarta",
      duration: "12 Days",
      frequency: "Weekly",
      airlines: [
        { name: "Saudia", logo: saudiaLogo },
        { name: "Emirates", logo: emiratesLogo }
      ],
      price: "57.000.000,00",
      currency: "Rp"
    },
    {
      title: "Umrah Dubai",
      description: "Discover Your Sacred Umrah Journey and Amazing Dubai",
      image: umrahDubai3,
      hotels: [
        { name: "Ansar Golden Tulip", stars: 5 },
        { name: "Makarem Ajyad Hotel", stars: 5 }
      ],
      departure: "Soekarno-Hatta airport (CGK) Jakarta",
      duration: "12 Days",
      frequency: "Weekly",
      airlines: [
        { name: "Saudia", logo: saudiaLogo },
        { name: "Emirates", logo: emiratesLogo }
      ],
      price: "46.100.000,00",
      currency: "Rp"
    },
    {
      title: "Umrah Turkiye",
      description: "Discover Your Sacred Umrah and Wonderful Turkiye",
      image: umrahTurkiye1,
      hotels: [
        { name: "Maden Hotel madinah", stars: 5 },
        { name: "Marwa Rotana hotel Makkah", stars: 5 }
      ],
      departure: "Soekarno-Hatta airport (CGK) Jakarta",
      duration: "14 Days",
      frequency: "Weekly",
      airlines: [
        { name: "Saudia", logo: saudiaLogo },
        { name: "Emirates", logo: emiratesLogo }
      ],
      price: "68.800.000,00",
      currency: "Rp"
    },
    {
      title: "Umrah Turkiye",
      description: "Discover Your Sacred Umrah and Wonderful Turkiye",
      image: umrahTurkiye2,
      hotels: [
        { name: "Ansar Golden Tulip", stars: 5 },
        { name: "Makarem Ajyad Hotel", stars: 5 }
      ],
      departure: "Soekarno-Hatta airport (CGK) Jakarta",
      duration: "14 Days",
      frequency: "Weekly",
      airlines: [
        { name: "Saudia", logo: saudiaLogo },
        { name: "Emirates", logo: emiratesLogo }
      ],
      price: "57.900.000,00",
      currency: "Rp"
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribe email:', email);
    // Add subscription logic here
  };

  return (
    <div className="umrah">
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
      <Partners />

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
      <section className="umrah-packages-section">
        <div className="umrah-packages-header">
          <h2 className="umrah-section-title">Discover Your Umrah</h2>
          <div className="umrah-certification-badge">
            <div className="umrah-cert-icon">
              <img src={verifiedIcon} alt="Verified" />
            </div>
            <div className="umrah-cert-title">PPIU Certification<br/>(Official Umrah License)</div>
            <div className="umrah-cert-desc">
              <span className="umrah-cert-a">'A'</span> Accredited Umrah Pilgrimage Organizer<br/>License Number: 02202041807930001
            </div>
          </div>
        </div>

        <div className="umrah-packages-container">
          {packages.map((pkg, index) => (
            <div key={index} className="umrah-package-card">
              <img src={pkg.image} alt={pkg.title} className="umrah-package-image" />

              <h3 className="umrah-package-title">{pkg.title}</h3>

              <p className="umrah-package-description">{pkg.description}</p>

              <div className="umrah-package-hotels">
                {pkg.hotels.map((hotel, idx) => (
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
                  {pkg.airlines.map((airline, idx) => (
                    <img key={idx} src={airline.logo} alt={airline.name} className="umrah-airline-logo" />
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
                <Button variant="primary" size="small" className="umrah-itinerary-button">
                  Itinerary
                </Button>
                <Button variant="secondary" size="medium" className="umrah-interest-button">
                  I am Interest
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="umrah-cta-section">
        <div className="umrah-cta-content">
          <h2 className="umrah-cta-title">Want To Know More For Your Unforgotten Journey?</h2>
          <p className="umrah-cta-description">
            Lorem ipsum dolor sit amet consectetur adipiscing elit dolor semper at ac tempus enim.
          </p>
          <Button variant="tertiary-filled" size="small">
            Contact Rania
          </Button>
        </div>
        <div className="umrah-cta-image">
          <img src={knowMoreImage} alt="Journey" loading="lazy" />
        </div>
      </section>

      {/* Manage Plan Section */}
      <section className="umrah-manage-section">
        <h2 className="umrah-section-title-dark">Manage Your Umrah</h2>
        <div className="umrah-manage-container">
          <div className="umrah-manage-card umrah-manage-card-gold">
            <h3 className="umrah-manage-title">Change My Plan</h3>
            <p className="umrah-manage-description">
              Lorem ipsum dolor sit amet consecte tur adipiscing elit semper.
            </p>
            <div className="umrah-manage-button">
              <Button variant="change" size="small">
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
