import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Home.css';
import Button from '../../components/common/Button/Button';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import Carousel from '../../components/common/Carousel/Carousel';
import Partners from '../../components/common/Partners';
import SignatureCard from '../../components/common/SignatureCard';
import Testimonial from '../../components/common/Testimonial';
import SEO from '../../components/common/SEO';
import { StructuredData } from '../../components/common/SEO';
import { HeroShimmer, EventShimmer } from '../../components/common/Shimmer';
import { getHeroSlides, getEvents, getUmrahPackages } from '../../services/api';
import logger from '../../utils/logger';
import HajjPackageCard from '../../components/common/HajjPackageCard';
import UmrahPackageCard from '../../components/common/UmrahPackageCard';
import { hajjPackages } from '../../data/hajjPackages';

// Import coverage/media images
import logoLiputan6 from '../../assets/images/about/coverage/logos/liputan6.webp';
import logoSuara from '../../assets/images/about/coverage/logos/suara.webp';
import logoSindonews from '../../assets/images/about/coverage/logos/sindonews.webp';
import logoTimesIndonesia from '../../assets/images/about/coverage/logos/times-indonesia.webp';
import coverageCollage from '../../assets/images/about/coverage/coverage-collage.webp';

// Reuse home hero images for news article thumbnails (dummy data)
import newsThumb1 from '../../assets/images/home/hero/hero-1.webp';
import newsThumb2 from '../../assets/images/home/hero/hero-2.webp';
import newsThumb3 from '../../assets/images/home/hero/hero-3.webp';

// Gallery placeholder images (replace with API + pagination later)
import gallery1 from '../../assets/images/home/hero/hero-1.webp';
import gallery2 from '../../assets/images/home/hero/hero-2.webp';
import gallery3 from '../../assets/images/home/hero/hero-3.webp';
import gallery4 from '../../assets/images/home/hero/hero-4.webp';
import gallery5 from '../../assets/images/about/life/life-1.webp';

// Placeholder hero for the Contact Us section
import contactHero from '../../assets/images/support-help/support-help-hero.webp';

// Import hero images
import hero1 from '../../assets/images/home/hero/hero-1.webp';
import hero2 from '../../assets/images/home/hero/hero-2.webp';
import hero3 from '../../assets/images/home/hero/hero-3.webp';
import hero4 from '../../assets/images/home/hero/hero-4.webp';

// Import journey images
import journey1 from '../../assets/images/home/jurney/jurney_1.webp';
import journey2 from '../../assets/images/home/jurney/jurney-2.webp';
import journey3 from '../../assets/images/home/jurney/jurney-3.webp';


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
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bgColor, setBgColor] = useState('var(--primary-dark)');
  const [textColor, setTextColor] = useState('white');

  // API Data States
  const [heroSlides, setHeroSlides] = useState([]);
  const [events, setEvents] = useState([]);
  const [umrahPackages, setUmrahPackages] = useState([]);

  // Loading States
  const [isLoadingHero, setIsLoadingHero] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingMoreSlides, setIsLoadingMoreSlides] = useState(false);

  // Pagination States
  const [heroPage, setHeroPage] = useState(1);
  const [hasMoreSlides, setHasMoreSlides] = useState(false);

  // Error States
  const [heroError, setHeroError] = useState(null);
  const [eventsError, setEventsError] = useState(null);

  // Refs for tracking sections
  const servicesRef = useRef(null);
  const eventsRef = useRef(null);
  const signatureRef = useRef(null);
  const coverageRef = useRef(null);

  // Fallback hero slides (keep for development/error cases)
  const fallbackHeroSlides = [
    {
      title: t('home.fallbackHero.title1'),
      subtitle: t('home.fallbackHero.subtitle1'),
      image_url: hero1
    },
    {
      title: t('home.fallbackHero.title2'),
      subtitle: t('home.fallbackHero.subtitle2'),
      image_url: hero2
    },
    {
      title: t('home.fallbackHero.title3'),
      subtitle: t('home.fallbackHero.subtitle3'),
      image_url: hero3
    },
    {
      title: t('home.fallbackHero.title4'),
      subtitle: t('home.fallbackHero.subtitle4'),
      image_url: hero4
    }
  ];

  const values = [
    { title: t('home.values.trust'), subtitle: t('home.values.trustSub'), icon: value1 },
    { title: t('home.values.heartfelt'), subtitle: t('home.values.heartfeltSub'), icon: value2 },
    { title: t('home.values.excellence'), subtitle: t('home.values.excellenceSub'), icon: value3 },
    { title: t('home.values.spirituality'), subtitle: t('home.values.spiritualitySub'), icon: value4 },
    { title: t('home.values.elevation'), subtitle: t('home.values.elevationSub'), icon: value5 }
  ];

  const services = [
    {
      title: t('home.hajjWithRania'),
      description: t('home.hajjDesc'),
      image: journey1,
      available: true,
      link: "/hajj"
    },
    {
      title: t('home.umrahWithRania'),
      description: t('home.umrahDesc'),
      image: journey2,
      available: true,
      link: "/umrah"
    },
    {
      title: t('home.worldWithRania'),
      description: t('home.worldDesc'),
      image: journey3,
      available: false,
      link: null
    }
  ];

  // Media coverage (mirrors About page)
  const mediaCoverage = [
    { logo: logoLiputan6, alt: 'Liputan6', description: t('about.coverageMedia1'), link: 'https://www.liputan6.com/islami/read/6116187/calon-jemaah-bisa-berangkat-haji-lebih-cepat-tanpa-tunggu-antrean-lama' },
    { logo: logoSuara, alt: 'Suara.com', description: t('about.coverageMedia2'), dark: true, link: 'https://www.suara.com/lifestyle/2025/12/15/164041/jamaah-bukan-sekadar-peserta-mengapa-pendekatan-humanis-dibutuhkan-saat-umrah-dan-haji' },
    { logo: logoSindonews, alt: 'SindoNews', description: t('about.coverageMedia3'), link: 'https://lifestyle.sindonews.com/read/1652299/156/transformasi-industri-travel-perjalanan-ibadah-kini-dituntut-lebih-personal-dan-bermakna-1764951127?showpage=all' },
    { logo: logoTimesIndonesia, alt: 'Times Indonesia', description: t('about.coverageMedia4'), link: 'https://timesindonesia.co.id/indonesia-positif/571250/bangun-kepercayaan-publik-rania-perkuat-ekosistem-haji-premium-lewat-kolaborasi-syariah-strategis' }
  ];

  const homeHajjPackages = hajjPackages.slice(0, 3);

  // Rania News & Articles (dummy data — replace with API later)
  const newsArticles = [
    {
      logo: logoSuara,
      logoAlt: 'Suara.com',
      thumbnail: newsThumb1,
      title: t('home.newsItem1Title'),
      description: t('home.newsItem1Desc'),
      link: '#'
    },
    {
      logo: logoTimesIndonesia,
      logoAlt: 'Times Indonesia',
      thumbnail: newsThumb2,
      title: t('home.newsItem2Title'),
      description: t('home.newsItem2Desc'),
      link: '#'
    },
    {
      logo: logoSindonews,
      logoAlt: 'SindoNews',
      thumbnail: newsThumb3,
      title: t('home.newsItem3Title'),
      description: t('home.newsItem3Desc'),
      link: '#'
    }
  ];

  // Rania Galleries (dummy data — replace with paginated API later)
  const galleryImages = [
    { src: gallery1, alt: 'Pilgrim near Kaaba' },
    { src: gallery2, alt: 'Family at hotel suite' },
    { src: gallery3, alt: 'Couple by the mountains' },
    { src: gallery4, alt: 'Pilgrim couple at the Grand Mosque' },
    { src: gallery5, alt: 'Inside Rania life' }
  ];

  const featuredNews = {
    logo: logoLiputan6,
    logoAlt: 'Liputan6',
    breadcrumbHome: t('home.newsBreadcrumbHome'),
    breadcrumbCategory: t('home.newsBreadcrumbCategory'),
    title: t('home.newsFeaturedTitle'),
    description: t('home.newsFeaturedDesc'),
    image: newsArticles[0].thumbnail,
    link: '#'
  };
  
  // Fallback events (keep for development/error cases)
  const fallbackEvents = [
    {
      title: "Scheduled Webinar",
      description: "Join our complimentary webinar for heartfelt guidance on your upcoming pilgrimage.",
      image_url: upcomingEvent1,
      is_available: true,
      link: "https://bit.ly/41lq9z0?r=qr"
    },
    {
      title: "Digital Manasik",
      description: "Find the true understanding, learn the Manasik with our supportive and accessible online program.",
      image_url: upcomingEvent2,
      is_available: false
    },
    {
      title: "Live Event",
      description: "Join our live event to share in the spirit and prepare your heart for the journey ahead.",
      image_url: upcomingEvent3,
      is_available: false
    }
  ];

  // Fetch initial hero slides
  const fetchHeroSlides = async (page = 1) => {
    const logPrefix = '[Hero Slides]';

    try {
      logger.debug(`${logPrefix} Fetching page ${page}...`, { per_page: 5, page });

      if (page === 1) {
        setIsLoadingHero(true);
      } else {
        setIsLoadingMoreSlides(true);
        logger.info(`${logPrefix} 🔄 Lazy loading triggered for page ${page}`);
      }

      const response = await getHeroSlides({ per_page: 5, page });
      logger.debug(`${logPrefix} ✅ API Response:`, response);

      if (response.success && response.data) {
        const slideCount = response.data.length;

        if (page === 1) {
          setHeroSlides(response.data);
          logger.info(`${logPrefix} ✅ Initial load: ${slideCount} slides loaded`);
        } else {
          // Append new slides for lazy loading
          setHeroSlides(prev => {
            const newSlides = [...prev, ...response.data];
            logger.info(`${logPrefix} ✅ Lazy load: Added ${slideCount} slides (Total: ${newSlides.length})`);
            return newSlides;
          });
        }

        setHasMoreSlides(response.pagination?.has_more || false);
        logger.debug(`${logPrefix} 📊 Pagination:`, {
          current_page: response.pagination?.current_page,
          total: response.pagination?.total,
          has_more: response.pagination?.has_more
        });

        setHeroError(null);
      }
    } catch (error) {
      logger.error(`${logPrefix} ❌ API Error:`, error);
      setHeroError(error.message);

      // Use fallback only on initial load
      if (page === 1) {
        setHeroSlides(fallbackHeroSlides);
        logger.warn(`${logPrefix} ⚠️ Using fallback data (${fallbackHeroSlides.length} slides)`);
      } else {
        logger.warn(`${logPrefix} ⚠️ Lazy load failed, continuing with existing slides`);
      }
    } finally {
      setIsLoadingHero(false);
      setIsLoadingMoreSlides(false);
      logger.debug(`${logPrefix} Loading complete`);
    }
  };

  // Fetch events
  const fetchEvents = async () => {
    const logPrefix = '[Events]';

    try {
      logger.debug(`${logPrefix} Fetching events...`);
      setIsLoadingEvents(true);

      const response = await getEvents();
      logger.debug(`${logPrefix} ✅ API Response:`, response);

      if (response.data) {
        setEvents(response.data);
        logger.info(`${logPrefix} ✅ Loaded ${response.data.length} events`);
        setEventsError(null);
      }
    } catch (error) {
      logger.error(`${logPrefix} ❌ API Error:`, error);
      setEventsError(error.message);
      setEvents(fallbackEvents);
      logger.warn(`${logPrefix} ⚠️ Using fallback data (${fallbackEvents.length} events)`);
    } finally {
      setIsLoadingEvents(false);
      logger.debug(`${logPrefix} Loading complete`);
    }
  };

  const fetchUmrahPackagesPreview = async () => {
    const logPrefix = '[Umrah Packages Preview]';

    try {
      const response = await getUmrahPackages();
      if (response.success && response.data) {
        setUmrahPackages(response.data.slice(0, 3));
        logger.info(`${logPrefix} ✅ Loaded ${response.data.length} packages (showing up to 3)`);
      }
    } catch (error) {
      logger.error(`${logPrefix} ❌ API Error:`, error);
      setUmrahPackages([]);
    }
  };

  // Initial data fetch
  useEffect(() => {
    logger.info('🚀 [Home] Initializing API data fetch...');
    fetchHeroSlides(1);
    fetchEvents();
    fetchUmrahPackagesPreview();
  }, []);

  // Lazy load more hero slides when approaching the end
  useEffect(() => {
    if (heroSlides.length === 0 || !hasMoreSlides || isLoadingMoreSlides) return;

    // Load next page when within 2 slides of the end
    const shouldLoadMore = currentSlide >= heroSlides.length - 2;

    if (shouldLoadMore) {
      logger.debug('🔄 [Lazy Loading] Trigger conditions met:', {
        currentSlide,
        totalSlides: heroSlides.length,
        hasMoreSlides,
        isLoadingMoreSlides
      });

      const nextPage = heroPage + 1;
      setHeroPage(nextPage);
      fetchHeroSlides(nextPage);
    }
  }, [currentSlide, heroSlides.length, hasMoreSlides, isLoadingMoreSlides, heroPage]);

  // Auto-advance hero slides every 4 seconds
  useEffect(() => {
    if (heroSlides.length === 0) return;

    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!coverageRef.current) return;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const coverageTop = coverageRef.current.getBoundingClientRect().top + scrollY;

      if (scrollY + windowHeight / 2 >= coverageTop) {
        setBgColor('#ffffff');
        setTextColor('var(--text-primary)');
      } else {
        setBgColor('var(--primary-dark)');
        setTextColor('white');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to services section
  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="home" style={{ backgroundColor: bgColor, transition: 'background-color 0.5s ease' }}>
      {/* SEO Meta Tags */}
      <SEO
        title="Redefine Hajj Reimagined Journey"
        description="RANIA - Your trusted partner for exclusive Umrah and Hajj pilgrimage services. Premium travel packages with exceptional service, comfort, and spiritual connection. Licensed PPIU & PIHK operator."
        keywords="rania, rania travel, travel rania, umrah travel, hajj travel, rania hajj, rania umrah, umrah indonesia, hajj indonesia, umroh rania, haji rania, paket umrah, paket haji, travel umrah terpercaya, travel haji terbaik, PPIU, PIHK, umrah package, hajj package"
        canonical="/"
      />
      <StructuredData type="organization" />
      <StructuredData type="website" />

      {/* Header */}
      <Header activeLink="Home" />

      {/* Hero Section */}
      <section className="hero-section">
        {isLoadingHero ? (
          <HeroShimmer />
        ) : (
          <>
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id || index}
                className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide.image_url})` }}
              >
                <div className="hero-overlay"></div>
                <div className={`hero-content ${index === currentSlide ? 'active' : ''}`}>
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  <div className="hero-buttons">
                    <Button variant="primary" size="small" onClick={scrollToServices}>{t('home.seeDetails')}</Button>
                    <Button variant="tertiary" size="small" to='/contact'>{t('home.contactRania')}</Button>
                  </div>
                </div>
              </div>
            ))}
            {heroSlides.length > 0 && (
              <div className="hero-indicators">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  ></button>
                ))}
              </div>
            )}
          </>
        )}
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

      {/* Partners Carousel */}
      <div id="partners">
        <Partners />
      </div>

      {/* Services Section */}
      <section id="programs" ref={servicesRef} className="services-section">
        <Carousel className="services-carousel">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-image" style={{ backgroundImage: `url(${service.image})` }}>
                <div className="service-overlay"></div>
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <Button
                    variant="service-details"
                    size="small"
                    disabled={!service.available}
                    to={service.available ? service.link : undefined}
                  >
                    {service.available ? t('home.seeDetails') : t('nav.comingSoon')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>


      {/* Media Coverage Section */}
      <section ref={coverageRef} className="home-coverage-section">
        <h2 className="home-coverage-title">{t('home.coverageTitle')}</h2>
        <div className="home-coverage-left">
          <p className="home-coverage-description">
            {t('home.coverageDesc')}
          </p>
          <div className="home-coverage-cards">
            {mediaCoverage.map((media, index) => (
              <a key={index} href={media.link} target="_blank" rel="noopener noreferrer" className={`home-coverage-card ${media.dark ? 'home-coverage-card--dark' : ''}`}>
                <div className="home-coverage-card-logo">
                  <img src={media.logo} alt={media.alt} loading="lazy" />
                </div>
                <p className="home-coverage-card-text">{media.description}</p>
              </a>
            ))}
          </div>
        </div>
        <div className="home-coverage-right">
          <img
            src={coverageCollage}
            alt="Rania media coverage collage"
            className="home-coverage-collage"
            loading="lazy"
          />
        </div>
      </section>

      {/* Best Hajj Packages */}
      <section className="home-best-packages-section">
        <div className="home-best-packages-header">
          <h2 className="home-best-packages-title">{t('home.bestHajjPackages')}</h2>
          <Button variant="primary" size="small" to="/hajj">
            {t('home.seeMore')}
          </Button>
        </div>
        <div className="hajj-packages-container">
          {homeHajjPackages.map((pkg, index) => (
            <HajjPackageCard
              key={index}
              pkg={pkg}
              ctaLabel={t('home.moreDetails')}
            />
          ))}
        </div>
      </section>

      {/* Best Umrah Packages */}
      {umrahPackages.length > 0 && (
        <section className="home-best-packages-section">
          <div className="home-best-packages-header">
            <h2 className="home-best-packages-title">{t('home.bestUmrahPackages')}</h2>
            <Button variant="primary" size="small" to="/umrah">
              {t('home.seeMore')}
            </Button>
          </div>
          <div className="umrah-packages-container">
            {umrahPackages.map((pkg, index) => (
              <UmrahPackageCard
                key={pkg.id || index}
                pkg={pkg}
                ctaLabel={t('home.moreDetails')}
              />
            ))}
          </div>
        </section>
      )}

      {/* Signature Card Section — hidden for now */}
      {false && (
        <div id="signature-card">
          <SignatureCard
            image={signatureCard}
            textColor={textColor}
          />
        </div>
      )}

      {/* Testimonial Section + Rania News (shares the wave-bordered background) */}
      <Testimonial>
        <section className="home-news-section">
          <h2 className="home-news-title">{t('home.raniaNews')}</h2>
          <div className="home-news-layout">
            <a
              href={featuredNews.link}
              className="home-news-featured"
              target={featuredNews.link === '#' ? undefined : '_blank'}
              rel={featuredNews.link === '#' ? undefined : 'noopener noreferrer'}
            >
              <div className="home-news-featured-logo">
                <img src={featuredNews.logo} alt={featuredNews.logoAlt} loading="lazy" />
              </div>
              <p className="home-news-featured-breadcrumb">
                {featuredNews.breadcrumbHome} <span>›</span> {featuredNews.breadcrumbCategory}
              </p>
              <h3 className="home-news-featured-title">{featuredNews.title}</h3>
              <p className="home-news-featured-desc">{featuredNews.description}</p>
              <div className="home-news-featured-image">
                <img src={featuredNews.image} alt={featuredNews.title} loading="lazy" />
              </div>
            </a>

            <div className="home-news-list">
              {newsArticles.map((article, index) => (
                <a
                  key={index}
                  href={article.link}
                  className="home-news-item"
                  target={article.link === '#' ? undefined : '_blank'}
                  rel={article.link === '#' ? undefined : 'noopener noreferrer'}
                >
                  <div className="home-news-item-thumb">
                    <img src={article.thumbnail} alt={article.title} loading="lazy" />
                  </div>
                  <div className="home-news-item-body">
                    <div className="home-news-item-logo">
                      <img src={article.logo} alt={article.logoAlt} loading="lazy" />
                    </div>
                    <h4 className="home-news-item-title">{article.title}</h4>
                    <p className="home-news-item-desc">{article.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </Testimonial>

      {/* Rania Galleries */}
      <section className="home-gallery-section">
        <h2 className="home-gallery-title">{t('home.raniaGalleries')}</h2>
        <div className="home-gallery-grid">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`home-gallery-item ${index === 0 ? 'home-gallery-item--feature' : ''}`}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" ref={eventsRef} className="events-section">
        <h2 className="section-title">{t('home.upcomingEvents')}</h2>
        {isLoadingEvents ? (
          <EventShimmer />
        ) : (
          <Carousel className="events-carousel">
            {events.map((event, index) => (
              <div key={event.id || index} className="event-card">
                <div className="event-image" style={{ backgroundImage: `url(${event.image_url})` }}>
                  <div className="event-overlay"></div>
                  <div className="event-content">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    <Button
                      variant="service-details"
                      size="small"
                      disabled={!event.is_available}
                      to={event.is_available ? event.link : undefined}
                    >
                      {event.is_available ? t('home.seeDetails') : t('nav.comingSoon')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </section>

      {/* Contact Us Section */}
      <section className="home-contact-section">
        <div
          className="home-contact-hero"
          style={{ backgroundImage: `url(${contactHero})` }}
        >
          <div className="home-contact-hero-overlay"></div>
          <h2 className="home-contact-hero-title">{t('nav.contactUs')}</h2>
        </div>

        <div className="home-contact-body">
          <div className="home-contact-cards">
            <div className="home-contact-card">
              <div className="home-contact-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="home-contact-card-body">
                <h3 className="home-contact-card-title">{t('contact.hotline')}</h3>
                <p className="home-contact-card-text">
                  <a href="tel:08118855489" className="home-contact-card-link">0811-8855-489</a>
                </p>
              </div>
            </div>

            <div className="home-contact-card">
              <div className="home-contact-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className="home-contact-card-body">
                <h3 className="home-contact-card-title">{t('contact.workingHours')}</h3>
                <p className="home-contact-card-text" style={{ whiteSpace: 'pre-line' }}>
                  {t('contact.workingHoursText')}
                </p>
              </div>
            </div>

            <div className="home-contact-card">
              <div className="home-contact-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="home-contact-card-body">
                <h3 className="home-contact-card-title">{t('contact.officeAddress')}</h3>
                <p className="home-contact-card-text">
                  Mall Kota Kasablanka,<br />
                  Prudential Centre,<br />
                  Kav No.88 Floor 7N,<br />
                  Kota Jakarta Selatan,<br />
                  12870
                </p>
              </div>
            </div>
          </div>

          <div className="home-contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2845!2d106.8430!3d-6.2245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e94c09c0e7%3A0x31a0f5e0c9e8e1a0!2sMall%20Kota%20Kasablanka!5e0!3m2!1sen!2sid!4v1700000000000"
              title="Rania Office Location"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
