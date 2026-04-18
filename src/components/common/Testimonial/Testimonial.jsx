import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from '../Carousel';
import { TestimonialShimmer } from '../Shimmer';
import { getTestimonials } from '../../../services/api';
import logger from '../../../utils/logger';
import './Testimonial.css';

const Testimonial = ({
  title,
  limit = 12,
  textLimit = 200
}) => {
  const { t } = useTranslation();
  const displayTitle = title || t('common.whatTheySay');
  // API Data States
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Truncate text if too long
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    const logPrefix = '[Testimonials]';

    try {
      logger.debug(`${logPrefix} Fetching testimonials with limit: ${limit}...`);
      setIsLoading(true);

      const response = await getTestimonials({ per_page: limit, page: 1 });
      logger.debug(`${logPrefix} ✅ API Response:`, response);

      if (response.success && response.data) {
        setTestimonials(response.data);
        logger.info(`${logPrefix} ✅ Loaded ${response.data.length} testimonials`);
        setError(null);
      }
    } catch (error) {
      logger.error(`${logPrefix} ❌ API Error:`, error);
      setError(error.message);
      setTestimonials([]);
      logger.warn(`${logPrefix} ⚠️ No testimonials available`);
    } finally {
      setIsLoading(false);
      logger.debug(`${logPrefix} Loading complete`);
    }
  };

  // Fetch testimonials on component mount
  useEffect(() => {
    logger.info('🚀 [Testimonial] Initializing API data fetch...');
    fetchTestimonials();
  }, [limit]);
  return (
    <section className="testimonial-section">
      <h2 className="testimonial-title">{displayTitle}</h2>
      <div className="testimonial-container">
        {isLoading ? (
          <TestimonialShimmer />
        ) : testimonials.length === 0 ? (
          <div className="testimonial-empty-state">
            <div className="testimonial-empty-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="38" stroke="var(--primary-gold)" strokeWidth="2" strokeDasharray="4 4"/>
                <path d="M30 35L35 40L50 25" stroke="var(--primary-gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25 50H55" stroke="var(--primary-gold)" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="testimonial-empty-title">{t('common.noTestimonials')}</h3>
            <p className="testimonial-empty-description">
              {t('common.noTestimonialsDesc')}
            </p>
          </div>
        ) : (
          <Carousel
            slidesPerView={1}
            spaceBetween={24}
            navigation={true}
            pagination={true}
            autoplay={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id || index} className="testimonial-card">
                <p className="testimonial-text">
                  {truncateText(testimonial.text, textLimit)}
                </p>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">{testimonial.name}</h3>
                  <p className="testimonial-position">{testimonial.subtitle || testimonial.position}</p>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
