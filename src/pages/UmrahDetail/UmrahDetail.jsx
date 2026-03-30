import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/layout/Header/Header';
import SEO from '../../components/common/SEO';
import { StructuredData } from '../../components/common/SEO';
import Button from '../../components/common/Button/Button';
import Carousel from '../../components/common/Carousel/Carousel';
import { getUmrahPackageDetail, getOtherAdditionalServices } from '../../services/api';
import { openWhatsAppUmrah, whatsappMessages } from '../../utils/whatsapp';
import locationIcon from '../../assets/icons/location.svg';
import calendarIcon from '../../assets/icons/calendar.svg';
import calendar2Icon from '../../assets/icons/calendar-2.svg';
import hotelIcon from '../../assets/icons/hotel.svg';
import additionalServiceHero from '../../assets/images/umrah/additional-service-hero.webp';
import './UmrahDetail.css';


const sortByOrder = (items = []) => {
  return [...items].sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));
};

const formatPrice = (price) => {
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return price;
  }

  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericPrice);
};

const buildGallery = (pkg) => {
  if (!pkg) {
    return [];
  }

  const collected = [
    ...(pkg.gallery_images || []).map((hotel) => hotel.image_url),
  ].filter(Boolean);

  const uniqueImages = [...new Set(collected)];
  return uniqueImages.slice(0, 4);
};

const UmrahDetail = () => {
  const { slug } = useParams();

  const [umrahPackage, setUmrahPackage] = useState(null);
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

        const response = await getUmrahPackageDetail(slug);

        if (response.success && response.data) {
          setUmrahPackage(response.data);
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
  }, [slug]);

  const fetchOtherServices = async (page = 1) => {
    if (!slug) return;
    try {
      setIsLoadingMore(true);
      const response = await getOtherAdditionalServices(slug, { page, per_page: 12 });
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

  const hotels = useMemo(() => sortByOrder(umrahPackage?.hotels), [umrahPackage]);
  const transportations = useMemo(() => sortByOrder(umrahPackage?.transportations), [umrahPackage]);
  const itineraries = useMemo(() => sortByOrder(umrahPackage?.itineraries), [umrahPackage]);
  const additionalServices = useMemo(() => sortByOrder(umrahPackage?.additional_services), [umrahPackage]);
  const packageServices = useMemo(() => sortByOrder(umrahPackage?.package_services), [umrahPackage]);

  const galleryImages = useMemo(() => buildGallery(umrahPackage), [umrahPackage]);
  const heroPrice = umrahPackage?.price != null ? formatPrice(umrahPackage.price) : '---';
  const heroCapacity = umrahPackage?.capacity || umrahPackage?.pax || '1-10 Pax';

  return (
    <div className="umrah-detail-page">
      <SEO
        title={umrahPackage ? `${umrahPackage.title} - Umrah Detail` : 'Umrah Detail'}
        description={umrahPackage?.description || 'Complete Umrah package detail, itinerary, additional services, and cancellation policy.'}
        canonical={slug ? `/umrah/${slug}` : '/umrah'}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Umrah With Rania', url: '/umrah' },
          { name: umrahPackage?.title || 'Umrah Detail', url: `/umrah/${slug || ''}` }
        ]}
      />

      <Header activeLink="Umrah With Rania" />

      <main className="umrah-detail-content">
        {isLoading ? (
          <section className="umrah-detail-state-card">
            <h2>Loading package detail...</h2>
            <p>Please wait while we prepare your Umrah package information.</p>
          </section>
        ) : error ? (
          <section className="umrah-detail-state-card umrah-detail-state-error">
            <h2>Unable to load package</h2>
            <p>{error}</p>
            <Button
              variant="tertiary"
              size="small"
              onClick={() => openWhatsAppUmrah(whatsappMessages.umrahCTA())}
            >
              Contact Rania
            </Button>
          </section>
        ) : (
          <>
            <section className="umrah-detail-hero">
              <article className="umrah-detail-hero-card" aria-labelledby="umrah-detail-hero-title">
                <figure className="umrah-detail-hero-media">
                  {umrahPackage?.image_url ? (
                    <img src={umrahPackage.image_url} alt={umrahPackage.title || 'Umrah package hero'} />
                  ) : (
                    <div className="umrah-detail-image-fallback">No image</div>
                  )}
                </figure>
                <div className="umrah-detail-hero-gradient" aria-hidden="true"></div>
                <div className="umrah-detail-hero-content">
                  <header className="umrah-detail-hero-header">
                    <h1 id="umrah-detail-hero-title" className="umrah-detail-hero-title">
                      {umrahPackage?.title || 'Royal Hilton Signature'}
                    </h1>
                  </header>
                  <dl className="umrah-detail-hero-details">
                    <div className="umrah-detail-hero-detail">
                      <dt>Starting From</dt>
                      <dd className="umrah-detail-hero-price">
                        <span className="umrah-detail-hero-price-currency">{umrahPackage?.currency || 'Rp'}.</span>
                        <span className="umrah-detail-hero-price-value">{heroPrice}</span>
                      </dd>
                    </div>
                    <div className="umrah-detail-hero-detail">
                      <dt className="umrah-detail-sr-only">Capacity</dt>
                      <dd className="umrah-detail-hero-capacity">{heroCapacity}</dd>
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
                      <img src={image} alt={`${umrahPackage?.title} ${index + 1}`} loading="lazy" />
                    </div>
                  ))
                ) : (
                  <div className="umrah-detail-gallery-empty">Gallery is unavailable.</div>
                )}
              </div>
            </section>

            <section className="umrah-detail-overview-section">
              <h2 className="umrah-detail-section-title">Package Overview</h2>
              <p className="umrah-detail-overview-text">{umrahPackage?.description}</p>
              <div className="umrah-detail-overview-info">
                <div className="umrah-detail-overview-item">
                  <span className="umrah-detail-overview-icon"><img src={locationIcon} alt="Departure" /></span>
                  <span className="umrah-detail-overview-label">Departure</span>
                  <span>{umrahPackage?.departure || '-'}</span>
                </div>
                <div className="umrah-detail-overview-item">
                  <span className="umrah-detail-overview-icon"><img src={calendarIcon} alt="Duration" /></span>
                  <span className="umrah-detail-overview-label">Number of Nights</span>
                  <span>{umrahPackage?.duration || '-'}</span>
                </div>
                <div className="umrah-detail-overview-item">
                  <span className="umrah-detail-overview-icon"><img src={calendar2Icon} alt="Schedule" /></span>
                  <span className="umrah-detail-overview-label">Pax</span>
                  <span>{umrahPackage?.departure_schedule || '-'}</span>
                </div>
              </div>
            </section>

            <section className="umrah-detail-block-section">
              <h3 className="umrah-detail-block-title">Accomodation</h3>
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
                        <div className="umrah-detail-image-fallback">No image</div>
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
                        <span>{hotel.stars} Nights</span>
                      </div>
                    </div>
                  </article>
                ))}
              </Carousel>
            </section>

            <section className="umrah-detail-block-section">
              <h3 className="umrah-detail-block-title">Transportation</h3>
              <div className="umrah-detail-grid-cards two-col transportation-grid">
                {transportations.map((transportation) => (
                  <article key={transportation.id} className="umrah-detail-transport-card">
                    <span className="umrah-detail-transport-icon">
                      <img src={transportation.icon_url || hotelIcon} alt={transportation.name} loading="lazy" />
                    </span>
                    <div className="umrah-detail-transport-body">
                      <h4 className="umrah-detail-transport-name">{transportation.name}</h4>
                      <div className="umrah-detail-transport-footer">
                        <p className="umrah-detail-transport-desc">{transportation.description}</p>
                        {transportation.duration && (
                          <span className="umrah-detail-transport-duration">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="9" stroke="#242d44" strokeWidth="2"/>
                              <path d="M12 7v5l3 3" stroke="#242d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {transportation.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="umrah-detail-block-section">
              <h3 className="umrah-detail-block-title">Itinerary</h3>
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
                        <div className="umrah-detail-image-fallback">No image</div>
                      )}
                    </div>
                    <div className="umrah-detail-itinerary-card-body">
                      <h4 className="umrah-detail-itinerary-card-name">{itinerary.title}</h4>
                      {itinerary.location && (
                        <p className="umrah-detail-itinerary-card-subtitle">Itinerary in {itinerary.location}</p>
                      )}
                      <p className="umrah-detail-itinerary-card-desc">{itinerary.description}</p>
                      {itinerary.duration && (
                        <div className="umrah-detail-itinerary-card-duration">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="9" stroke="#242d44" strokeWidth="2"/>
                            <path d="M12 7v5l3 3" stroke="#242d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>Average activity duration: {itinerary.duration}</span>
                        </div>
                      )}
                      {itinerary.location && (
                        <a
                          href={itinerary.location_url || `https://maps.google.com/?q=${encodeURIComponent(itinerary.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="umrah-detail-itinerary-card-btn"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                          </svg>
                          Location
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
                  Bikin Umrahmu Lebih Spesial dengan &quot;Add-On&quot; Suka-Suka!
                </h3>
                <p className="umrah-detail-addon-banner-desc">
                  {umrahPackage?.additional_services_description || <>Paket sudah oke, tapi masih ingin tambah fasilitas lain? Bisa banget! Di sini, Anda adalah penentunya. Semua layanan tambahan (additional services) di bawah ini bersifat <strong>100% Customizable</strong>. Anda bisa menambahkan layanan VIP Airport, upgrade transportasi ke GMC, hingga city tour tambahan ke dalam paket mana pun yang Anda pilih.</>}
                </p>
              </div>
            </div>

            <section className="umrah-detail-block-section">
              <div className="umrah-detail-block-header">
                <h3 className="umrah-detail-block-title">Additional Services</h3>
                <button
                  className={`umrah-detail-see-more-btn${showOtherServices ? ' active' : ''}`}
                  onClick={handleSeeMore}
                >
                  {showOtherServices ? 'See Less' : 'See More'}
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
                        <div className="umrah-detail-image-fallback">No image</div>
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
                            <div className="umrah-detail-image-fallback">No image</div>
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
                      {isLoadingMore ? 'Loading...' : 'Load More'}
                    </button>
                  )}
                </>
              )}
              {showOtherServices && isLoadingMore && otherServices.length === 0 && (
                <p className="umrah-detail-services-loading">Loading additional services...</p>
              )}
            </section>

            <section className="umrah-detail-services-section">
              <div className="umrah-detail-section-shell">
                <h3>Package Services</h3>
                <div className="umrah-detail-services-legend">
                  <span className="umrah-detail-services-legend-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#4ade80" strokeWidth="2"/>
                      <path d="M7.5 12l3 3 6-6" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Included
                  </span>
                  <span className="umrah-detail-services-legend-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="12" fill="#f59e0b"/>
                      <text x="12" y="17" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif">$</text>
                    </svg>
                    Available at additional fees
                  </span>
                </div>
                <h4 className="umrah-detail-services-category">Essential Services</h4>
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
                <h3>Cancellation Policy</h3>

                <div className="umrah-detail-cancellation-table-wrap">
                  <table className="umrah-detail-cancellation-table">
                    <thead>
                      <tr>
                        <th>Refund rate in case of cancellation</th>
                        <th>Within the first (1) hours</th>
                        <th>Before the last (0) Day/Days of the package</th>
                        <th>Within the last (0) Day/Days of the package</th>
                        <th>In the last 72 hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="umrah-detail-cancellation-label">Package fees</td>
                        <td>0%</td>
                        <td>0%</td>
                        <td>0%</td>
                        <td>0%</td>
                      </tr>
                      <tr>
                        <td className="umrah-detail-cancellation-label">Visa</td>
                        <td colSpan={3} className="umrah-detail-cancellation-span">Within the first (72) hours</td>
                        <td>0%</td>
                      </tr>
                      <tr>
                        <td className="umrah-detail-cancellation-label">Flight reservation value (customs flights)</td>
                        <td colSpan={4} className="umrah-detail-cancellation-span">
                          <a href="#" className="umrah-detail-cancellation-link">Based on the cancellation policy of flight reservation</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="umrah-detail-cancellation-note">
                  <ul>
                    <li>0% of the package value will be refunded in case of cancellation within (1) hours from the time of booking.</li>
                    <li>0% of the value of the package services will be refunded in case of cancellation after (1) hours, and before the last (0) Day/Days. An exception to this rule is the visa application processing fee, which is non-refundable after the 1-hour period.</li>
                    <li>Policy Msg 7</li>
                    <li>No refunds will be made in case of cancellation within the last (72) hours.</li>
                    <li>The above rules apply to flight reservations organized by the service provider, and do not apply to custom flight reservations designated by the airline system for which specific cancellation policies apply to each reservation.</li>
                    <li>3.45% processing fees &amp; its VAT will be deducted when the amounts are withdrawn from the wallet.</li>
                    <li>Currency exchange rates may result in differences in the amounts deposited and withdrawn from digital wallets.</li>
                  </ul>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {umrahPackage && (
        <div className={`umrah-detail-sticky-bar${stickyVisible ? ' visible' : ''}`}>
          <div className="umrah-detail-sticky-inner">
            <div className="umrah-detail-sticky-info">
              <h2 className="umrah-detail-sticky-title">{umrahPackage.title}</h2>
              <p className="umrah-detail-sticky-subtitle">Premium Service Agency for Umrah Services</p>
            </div>
            <div className="umrah-detail-sticky-price">
              <span className="umrah-detail-sticky-price-label">Starting From</span>
              <span className="umrah-detail-sticky-price-value">
                {umrahPackage.currency || 'Rp'}. {heroPrice}
              </span>
            </div>
            <button
              className="umrah-detail-sticky-btn"
              onClick={() => openWhatsAppUmrah(whatsappMessages.umrahCTA())}
            >
              Book Package
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UmrahDetail;
