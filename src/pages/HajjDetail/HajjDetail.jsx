import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Header from '../../components/layout/Header/Header';
import SEO from '../../components/common/SEO';
import { StructuredData } from '../../components/common/SEO';
import Button from '../../components/common/Button/Button';
import Carousel from '../../components/common/Carousel/Carousel';
import ShareButton from '../../components/common/ShareButton';
import { getHajjPackageDetail, getHajjOtherAdditionalServices } from '../../services/api';
import { formatPackagePrice } from '../../utils/helpers';
import { openWhatsAppHajj, whatsappMessages } from '../../utils/whatsapp';
import calendarIcon from '../../assets/icons/calendar-icon.svg';
import mealsIcon from '../../assets/icons/meals-icon.svg';
import baggageIcon from '../../assets/icons/baggage-icon.svg';
import paxIcon from '../../assets/icons/pax-icon.svg';
import additionalServiceHero from '../../assets/images/umrah/additional-service-hero.webp';
import airlinesDivider from '../../assets/images/umrah/airlines-header.webp';
import '../UmrahDetail/UmrahDetail.css';


const sortByOrder = (items = []) => {
  return [...items].sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));
};

const formatDateDDMMMYYYY = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const buildGallery = (pkg) => {
  if (!pkg) {
    return [];
  }

  const collected = [
    ...(pkg.gallery_images || []).map((image) => image.image_url),
  ].filter(Boolean);

  const uniqueImages = [...new Set(collected)];
  return uniqueImages.slice(0, 4);
};

const HajjDetail = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();

  const [hajjPackage, setHajjPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stickyVisible, setStickyVisible] = useState(true);

  const [otherServices, setOtherServices] = useState([]);
  const [otherServicesPage, setOtherServicesPage] = useState(1);
  const [hasMoreServices, setHasMoreServices] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showOtherServices, setShowOtherServices] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setStickyVisible(currentY < lastY || currentY < 10);
      lastY = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!slug) {
        setError('Package slug is missing.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await getHajjPackageDetail(slug);

        if (response.success && response.data) {
          setHajjPackage(response.data);
        } else {
          setError('Package detail is not available.');
        }
      } catch (fetchError) {
        setError(fetchError.message || 'Failed to load package detail.');
      } finally {
        setIsLoading(false);
      }
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchDetail();
  }, [slug, i18n.language]);

  const fetchOtherServices = async (page = 1) => {
    if (!slug) return;
    try {
      setIsLoadingMore(true);
      const response = await getHajjOtherAdditionalServices(slug, { page, per_page: 12 });
      if (response.success && response.data) {
        setOtherServices((prev) => page === 1 ? response.data : [...prev, ...response.data]);
        setOtherServicesPage(page);
        const meta = response.meta;
        setHasMoreServices(meta ? meta.current_page < meta.last_page : false);
      }
    } catch {
      setHasMoreServices(false);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSeeMore = () => {
    if (!showOtherServices) {
      setShowOtherServices(true);
      if (otherServices.length === 0) {
        fetchOtherServices(1);
      }
    } else {
      setShowOtherServices(false);
    }
  };

  const hotels = useMemo(() => sortByOrder(hajjPackage?.hotels), [hajjPackage]);
  const airlines = useMemo(() => sortByOrder(hajjPackage?.airlines), [hajjPackage]);
  const transportations = useMemo(() => sortByOrder(hajjPackage?.transportations), [hajjPackage]);
  const itineraries = useMemo(() => sortByOrder(hajjPackage?.itineraries), [hajjPackage]);
  const additionalServices = useMemo(() => sortByOrder(hajjPackage?.additional_services), [hajjPackage]);
  const packageServices = useMemo(() => sortByOrder(hajjPackage?.package_services), [hajjPackage]);

  const galleryImages = useMemo(() => buildGallery(hajjPackage), [hajjPackage]);
  const formattedPrice = useMemo(() => formatPackagePrice(hajjPackage), [hajjPackage]);
  const heroCapacity = hajjPackage?.departure_schedule || hajjPackage?.capacity || hajjPackage?.pax || '-';

  return (
    <div className="umrah-detail-page">
      <SEO
        title={hajjPackage ? `${hajjPackage.title} - Hajj Detail` : 'Hajj Detail'}
        description={hajjPackage?.description || 'Complete Hajj package detail, itinerary, additional services, and cancellation policy.'}
        canonical={slug ? `/hajj/${slug}` : '/hajj'}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Hajj With Rania', url: '/hajj' },
          { name: hajjPackage?.title || 'Hajj Detail', url: `/hajj/${slug || ''}` }
        ]}
      />

      <Header activeLink="Hajj With Rania" />

      <main className="umrah-detail-content">
        {isLoading ? (
          <section className="umrah-detail-state-card">
            <h2>{t('umrahDetail.loading')}</h2>
            <p>{t('umrahDetail.loadingDesc')}</p>
          </section>
        ) : error ? (
          <section className="umrah-detail-state-card umrah-detail-state-error">
            <h2>{t('umrahDetail.errorTitle')}</h2>
            <p>{error}</p>
            <Button
              variant="tertiary"
              size="small"
              onClick={() => openWhatsAppHajj(whatsappMessages.hajjCTA())}
            >
              {t('umrahDetail.contactRania')}
            </Button>
          </section>
        ) : (
          <>
            <section className="umrah-detail-hero">
              <article className="umrah-detail-hero-card" aria-labelledby="hajj-detail-hero-title">
                <figure className="umrah-detail-hero-media">
                  {hajjPackage?.image_url ? (
                    <img src={hajjPackage.image_url} alt={hajjPackage.title || 'Hajj package hero'} />
                  ) : (
                    <div className="umrah-detail-image-fallback">{t('umrahDetail.noImage')}</div>
                  )}
                </figure>
                <div className="umrah-detail-hero-gradient" aria-hidden="true"></div>
                <div className="umrah-detail-hero-content">
                  <header className="umrah-detail-hero-header">
                    <h1 id="hajj-detail-hero-title" className="umrah-detail-hero-title">
                      {hajjPackage?.title}
                    </h1>
                  </header>
                  <dl className="umrah-detail-hero-details">
                    <div className="umrah-detail-hero-detail">
                      <dt>{t('umrahDetail.startingFrom')}</dt>
                      <dd className="umrah-detail-hero-price">
                        {formattedPrice ? (
                          <>
                            <span className="umrah-detail-hero-price-currency">{formattedPrice.currency}</span>
                            <span className="umrah-detail-hero-price-value">{formattedPrice.amount}</span>
                          </>
                        ) : (
                          <span className="umrah-detail-hero-price-value">{t('umrahDetail.contactRania')}</span>
                        )}
                      </dd>
                    </div>
                    <div className="umrah-detail-hero-detail">
                      <dt className="umrah-detail-sr-only">{t('umrahDetail.capacity')}</dt>
                      <dd className="umrah-detail-hero-capacity">
                        <img src={paxIcon} alt="" aria-hidden="true" className="umrah-detail-hero-capacity-icon" />
                        <span>{heroCapacity}</span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            </section>

            <section className="umrah-detail-gallery-section">
              <div className="umrah-detail-gallery">
                {galleryImages.length > 0 ? (
                  galleryImages.map((image, index) => (
                    <div key={`${image}-${index}`} className={`umrah-detail-gallery-item item-${index + 1}`}>
                      <img src={image} alt={`${hajjPackage?.title} ${index + 1}`} loading="lazy" />
                    </div>
                  ))
                ) : (
                  <div className="umrah-detail-gallery-empty">{t('umrahDetail.galleryUnavailable')}</div>
                )}
              </div>
            </section>

            <section className="umrah-detail-overview-section">
              <h2 className="umrah-detail-section-title">{t('umrahDetail.packageOverview')}</h2>
              <p className="umrah-detail-overview-text">{hajjPackage?.description}</p>
              <div className="umrah-detail-overview-info">
                <div className="umrah-detail-overview-item">
                  <span className="umrah-detail-overview-icon"><img src={calendarIcon} alt="Date" /></span>
                  <span className="umrah-detail-overview-label">{t('umrahDetail.date')}</span>
                  <span>{formatDateDDMMMYYYY(hajjPackage?.date) || '-'}</span>
                </div>
                <div className="umrah-detail-overview-item">
                  <span className="umrah-detail-overview-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="umrah-detail-overview-label">{t('umrahDetail.dayOfJourney')}</span>
                  <span>{hajjPackage?.duration || '-'}</span>
                </div>
                <div className="umrah-detail-overview-item">
                  <span className="umrah-detail-overview-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.65 1.13 6.57L12 17.55 6.1 20.66l1.13-6.57L2.45 9.44l6.6-.96L12 2.5z" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
                    </svg>
                  </span>
                  <span className="umrah-detail-overview-label">{t('umrahDetail.package')}</span>
                  <span>{hajjPackage?.title || '-'}</span>
                </div>
              </div>
            </section>

            {airlines.length > 0 && (
              <div className="umrah-detail-airlines-divider">
                <img
                  src={airlinesDivider}
                  alt=""
                  className="umrah-detail-airlines-divider-img"
                  aria-hidden="true"
                  loading="lazy"
                />
              </div>
            )}

            {airlines.length > 0 && (
              <section className="umrah-detail-block-section">
                <h3 className="umrah-detail-block-title">{t('umrahDetail.airlines')}</h3>
                <div className="umrah-detail-airlines-list">
                  {airlines.map((airline) => (
                    <div key={airline.id} className="umrah-detail-airlines-row">
                      <article className="umrah-detail-airline-card">
                        <div className="umrah-detail-airline-logo-wrap">
                          {airline.logo_url || airline.logo ? (
                            <img
                              src={airline.logo_url || airline.logo}
                              alt={airline.name}
                              className="umrah-detail-airline-logo"
                              loading="lazy"
                            />
                          ) : (
                            <div className="umrah-detail-image-fallback">{t('umrahDetail.noImage')}</div>
                          )}
                        </div>
                        <div className="umrah-detail-airline-info">
                          <h4 className="umrah-detail-airline-name">{airline.name}</h4>
                          {airline.class && (
                            <p className="umrah-detail-airline-subtitle">{airline.class}</p>
                          )}
                        </div>
                      </article>
                      <article className="umrah-detail-airline-card">
                        <div className="umrah-detail-airline-logo-wrap">
                          <img
                            src={mealsIcon}
                            alt={t('umrahDetail.meals')}
                            className="umrah-detail-airline-logo umrah-detail-airline-logo-icon"
                            loading="lazy"
                          />
                        </div>
                        <div className="umrah-detail-airline-info">
                          <h4 className="umrah-detail-airline-name">{t('umrahDetail.meals')}</h4>
                          {airline.meal != null && airline.meal !== '' && (
                            <p className="umrah-detail-airline-subtitle">{t('umrahDetail.mealsValue', { count: airline.meal })}</p>
                          )}
                        </div>
                      </article>
                      <article className="umrah-detail-airline-card">
                        <div className="umrah-detail-airline-logo-wrap">
                          <img
                            src={baggageIcon}
                            alt={t('umrahDetail.baggage')}
                            className="umrah-detail-airline-logo umrah-detail-airline-logo-icon"
                            loading="lazy"
                          />
                        </div>
                        <div className="umrah-detail-airline-info">
                          <h4 className="umrah-detail-airline-name">{t('umrahDetail.baggage')}</h4>
                          {airline.baggage != null && airline.baggage !== '' && (
                            <p className="umrah-detail-airline-subtitle">{t('umrahDetail.baggageValue', { count: airline.baggage })}</p>
                          )}
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="umrah-detail-block-section">
              <h3 className="umrah-detail-block-title">{t('umrahDetail.accommodation')}</h3>
              <Carousel
                slidesPerView={1}
                spaceBetween={20}
                navigation={false}
                pagination={true}
                breakpoints={{
                  640: { slidesPerView: 1, spaceBetween: 20 },
                  768: { slidesPerView: 3, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                }}
              >
                {hotels.map((hotel) => (
                  <article key={hotel.id} className="umrah-detail-hotel-card">
                    <div className="umrah-detail-hotel-card-image-wrap">
                      {hotel.image_url ? (
                        <img src={hotel.image_url} alt={hotel.name} className="umrah-detail-hotel-card-image" loading="lazy" />
                      ) : (
                        <div className="umrah-detail-image-fallback">{t('umrahDetail.noImage')}</div>
                      )}
                    </div>
                    <div className="umrah-detail-hotel-card-body">
                      <h4 className="umrah-detail-hotel-card-name">{hotel.name}</h4>
                      <p className="umrah-detail-hotel-card-location">{hotel.location}</p>
                      <p className="umrah-detail-hotel-card-desc">{hotel.description}</p>
                      <div className="umrah-detail-hotel-card-nights">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#242d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{hotel.total_nights ?? hotel.nights ?? 3} {t('umrahDetail.nights')}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </Carousel>
            </section>

            <section className="umrah-detail-block-section">
              <h3 className="umrah-detail-block-title">{t('umrahDetail.transportation')}</h3>
              <Carousel
                slidesPerView={1}
                spaceBetween={20}
                navigation={false}
                pagination={true}
                breakpoints={{
                  640: { slidesPerView: 1, spaceBetween: 20 },
                  768: { slidesPerView: 3, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                }}
              >
                {transportations.map((transportation) => (
                  <article key={transportation.id} className="umrah-detail-transport-card">
                    <div className="umrah-detail-transport-card-image-wrap">
                      {transportation.icon_url ? (
                        <img
                          src={transportation.icon_url}
                          alt={transportation.name}
                          className="umrah-detail-transport-card-image"
                          loading="lazy"
                        />
                      ) : (
                        <div className="umrah-detail-image-fallback">{t('umrahDetail.noImage')}</div>
                      )}
                    </div>
                    <div className="umrah-detail-transport-card-body">
                      <h4 className="umrah-detail-transport-card-name">{transportation.name}</h4>
                      {transportation.subtitle && (
                        <p className="umrah-detail-transport-card-subtitle">{transportation.subtitle}</p>
                      )}
                      {transportation.description && (
                        <p className="umrah-detail-transport-card-desc">{transportation.description}</p>
                      )}
                    </div>
                  </article>
                ))}
              </Carousel>
            </section>

            <section className="umrah-detail-block-section">
              <h3 className="umrah-detail-block-title">{t('umrahDetail.itinerary')}</h3>
              <Carousel
                slidesPerView={1}
                spaceBetween={20}
                navigation={false}
                pagination={true}
                breakpoints={{
                  640: { slidesPerView: 1, spaceBetween: 20 },
                  768: { slidesPerView: 3, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                }}
              >
                {itineraries.map((itinerary) => (
                  <article key={itinerary.id} className="umrah-detail-itinerary-card">
                    <div className="umrah-detail-itinerary-card-image-wrap">
                      {itinerary.image_url ? (
                        <img src={itinerary.image_url} alt={itinerary.title} className="umrah-detail-itinerary-card-image" loading="lazy" />
                      ) : (
                        <div className="umrah-detail-image-fallback">{t('umrahDetail.noImage')}</div>
                      )}
                    </div>
                    <div className="umrah-detail-itinerary-card-body">
                      <h4 className="umrah-detail-itinerary-card-name">{itinerary.title}</h4>
                      {itinerary.location && (
                        <p className="umrah-detail-itinerary-card-subtitle">{t('umrahDetail.itineraryIn', { location: itinerary.location })}</p>
                      )}
                      <p className="umrah-detail-itinerary-card-desc">{itinerary.description}</p>
                      {itinerary.duration && (
                        <div className="umrah-detail-itinerary-card-duration">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="9" stroke="#242d44" strokeWidth="2"/>
                            <path d="M12 7v5l3 3" stroke="#242d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>{t('umrahDetail.avgDuration', { duration: itinerary.duration })}</span>
                        </div>
                      )}
                      {itinerary.location && (
                        <a
                          href={itinerary.location_url || `https://maps.google.com/?q=${encodeURIComponent(itinerary.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="umrah-detail-itinerary-card-btn"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 8C10.34 8 9 9.34 9 11c0 2.5 3 5 3 5s3-2.5 3-5c0-1.66-1.34-3-3-3z" fill="currentColor"/>
                            <circle cx="12" cy="11" r="1" fill="#fff"/>
                          </svg>
                          {t('umrahDetail.location')}
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </Carousel>
            </section>

            <div className="umrah-detail-addon-banner">
              <img src={additionalServiceHero} alt="Additional Services" className="umrah-detail-addon-banner-img" />
              <div className="umrah-detail-addon-banner-overlay" />
              <div className="umrah-detail-addon-banner-content">
                <h3 className="umrah-detail-addon-banner-title">
                  {t('umrahDetail.addonBannerTitle')}
                </h3>
                <p className="umrah-detail-addon-banner-desc">
                  {hajjPackage?.additional_services_description || t('umrahDetail.addonBannerDesc')}
                </p>
              </div>
            </div>

            <section className="umrah-detail-block-section">
              <div className="umrah-detail-block-header">
                <h3 className="umrah-detail-block-title">{t('umrahDetail.additionalServices')}</h3>
                <button
                  className={`umrah-detail-see-more-btn${showOtherServices ? ' active' : ''}`}
                  onClick={handleSeeMore}
                >
                  {showOtherServices ? t('umrahDetail.seeLess') : t('umrahDetail.seeMore')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="umrah-detail-services-grid">
                {additionalServices.map((service) => (
                  <article key={service.id} className="umrah-detail-service-card">
                    <div className="umrah-detail-service-card-image-wrap">
                      {service.image_url ? (
                        <img src={service.image_url} alt={service.title} className="umrah-detail-service-card-image" loading="lazy" />
                      ) : (
                        <div className="umrah-detail-image-fallback">{t('umrahDetail.noImage')}</div>
                      )}
                    </div>
                    <div className="umrah-detail-service-card-body">
                      <h4 className="umrah-detail-service-card-name">{service.title}</h4>
                      {service.subtitle && (
                        <p className="umrah-detail-service-card-subtitle"></p>
                      )}
                      <p className="umrah-detail-service-card-desc">{service.description}</p>
                    </div>
                  </article>
                ))}
              </div>
              {showOtherServices && otherServices.length > 0 && (
                <>
                  <hr className="umrah-detail-services-divider" />
                  <div className="umrah-detail-services-grid">
                    {otherServices.map((service) => (
                      <article key={`other-${service.id}`} className="umrah-detail-service-card">
                        <div className="umrah-detail-service-card-image-wrap">
                          {service.image_url ? (
                            <img src={service.image_url} alt={service.title} className="umrah-detail-service-card-image" loading="lazy" />
                          ) : (
                            <div className="umrah-detail-image-fallback">{t('umrahDetail.noImage')}</div>
                          )}
                        </div>
                        <div className="umrah-detail-service-card-body">
                          <h4 className="umrah-detail-service-card-name">{service.title}</h4>
                          {service.subtitle && (
                            <p className="umrah-detail-service-card-subtitle"></p>
                          )}
                          <p className="umrah-detail-service-card-desc">{service.description}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                  {hasMoreServices && (
                    <button
                      className="umrah-detail-load-more-btn"
                      onClick={() => fetchOtherServices(otherServicesPage + 1)}
                      disabled={isLoadingMore}
                    >
                      {isLoadingMore ? t('umrahDetail.loadingMore') : t('umrahDetail.loadMore')}
                    </button>
                  )}
                </>
              )}
              {showOtherServices && isLoadingMore && otherServices.length === 0 && (
                <p className="umrah-detail-services-loading">{t('umrahDetail.loadingAdditional')}</p>
              )}
            </section>

            <section className="umrah-detail-services-section">
              <div className="umrah-detail-section-shell">
                <h3>{t('umrahDetail.packageServices')}</h3>
                <div className="umrah-detail-services-legend">
                  <span className="umrah-detail-services-legend-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#4ade80" strokeWidth="2"/>
                      <path d="M7.5 12l3 3 6-6" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {t('umrahDetail.included')}
                  </span>
                  <span className="umrah-detail-services-legend-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="12" fill="#f59e0b"/>
                      <text x="12" y="17" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif">$</text>
                    </svg>
                    {t('umrahDetail.additionalFees')}
                  </span>
                </div>
                <h4 className="umrah-detail-services-category">{t('umrahDetail.essentialServices')}</h4>
                <ul>
                  {packageServices.map((service) => (
                    <li key={service.id}>
                      {service.is_included !== false ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Included" className="umrah-detail-services-icon">
                          <circle cx="12" cy="12" r="10" stroke="#4ade80" strokeWidth="2"/>
                          <path d="M7.5 12l3 3 6-6" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Additional fee" className="umrah-detail-services-icon">
                          <circle cx="12" cy="12" r="12" fill="#f59e0b"/>
                          <text x="12" y="17" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif">$</text>
                        </svg>
                      )}
                      <div>
                        <p>{service.title}</p>
                        {service.description && <span>{service.description}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="umrah-detail-cancellation-section">
              <div className="umrah-detail-section-shell">
                <h3>{t('umrahDetail.cancellationPolicy')}</h3>

                <div className="umrah-detail-cancellation-table-wrap">
                  <table className="umrah-detail-cancellation-table">
                    <thead>
                      <tr>
                        <th>{t('umrahDetail.cancellationRefundRate')}</th>
                        <th>{t('umrahDetail.cancellationFirstHours')}</th>
                        <th>{t('umrahDetail.cancellationBeforeLast')}</th>
                        <th>{t('umrahDetail.cancellationWithinLast')}</th>
                        <th>{t('umrahDetail.cancellationLast72')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="umrah-detail-cancellation-label">{t('umrahDetail.cancellationPackageFees')}</td>
                        <td>0%</td>
                        <td>0%</td>
                        <td>0%</td>
                        <td>0%</td>
                      </tr>
                      <tr>
                        <td className="umrah-detail-cancellation-label">{t('umrahDetail.cancellationVisa')}</td>
                        <td colSpan={3} className="umrah-detail-cancellation-span">{t('umrahDetail.cancellationVisaSpan')}</td>
                        <td>0%</td>
                      </tr>
                      <tr>
                        <td className="umrah-detail-cancellation-label">{t('umrahDetail.cancellationFlight')}</td>
                        <td colSpan={4} className="umrah-detail-cancellation-span">
                          <a href="#" className="umrah-detail-cancellation-link">{t('umrahDetail.cancellationFlightLink')}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="umrah-detail-cancellation-note">
                  <ul>
                    <li>{t('umrahDetail.cancellationNote1')}</li>
                    <li>{t('umrahDetail.cancellationNote2')}</li>
                    <li>{t('umrahDetail.cancellationNote3')}</li>
                    <li>{t('umrahDetail.cancellationNote4')}</li>
                    <li>{t('umrahDetail.cancellationNote5')}</li>
                    <li>{t('umrahDetail.cancellationNote6')}</li>
                    <li>{t('umrahDetail.cancellationNote7')}</li>
                  </ul>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {hajjPackage && (
        <div className={`umrah-detail-sticky-bar${stickyVisible ? ' visible' : ''}`}>
          <div className="umrah-detail-sticky-inner">
            <div className="umrah-detail-sticky-info">
              <h2 className="umrah-detail-sticky-title">{hajjPackage.title}</h2>
              <p className="umrah-detail-sticky-subtitle">{t('hajjDetail.stickySubtitle')}</p>
            </div>
            <div className="umrah-detail-sticky-price">
              <span className="umrah-detail-sticky-price-label">{t('umrahDetail.startingFrom')}</span>
              <span className="umrah-detail-sticky-price-value">
                {formattedPrice
                  ? `${formattedPrice.currency} ${formattedPrice.amount}`
                  : t('umrahDetail.contactRania')}
              </span>
            </div>
            <div className="umrah-detail-sticky-actions">
              <button
                className="umrah-detail-sticky-btn"
                onClick={() => openWhatsAppHajj(whatsappMessages.hajjCTA())}
              >
                {t('umrahDetail.bookPackage')}
              </button>
              <ShareButton
                className="umrah-detail-sticky-share"
                size="large"
                menuDirection="up"
                title={hajjPackage.title}
                text={hajjPackage.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HajjDetail;
