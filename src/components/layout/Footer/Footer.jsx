import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './Footer.css';
import raniaLogo from '../../../assets/icons/rania-logo.webp';
import Button from '../../common/Button/Button';
import { getSocialMedia, subscribeNewsletter } from '../../../services/api';
import logger from '../../../utils/logger';
import facebookIcon from '../../../assets/icons/Facebook.svg';
import instagramIcon from '../../../assets/icons/Instagram.svg';
import linkedinIcon from '../../../assets/icons/LinkedIn.svg';
import youtubeIcon from '../../../assets/icons/YouTube.svg';
import tiktokIcon from '../../../assets/icons/tiktok.svg';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // API Data States
  const [socialMedia, setSocialMedia] = useState([]);
  const [isLoadingSocial, setIsLoadingSocial] = useState(true);
  const [socialError, setSocialError] = useState(null);

  // Fallback icons for social media
  const fallbackIcons = {
    instagram: instagramIcon,
    facebook: facebookIcon,
    youtube: youtubeIcon,
    linkedin: linkedinIcon,
    tiktok: tiktokIcon,
  };

  // Helper function to get fallback icon for social media
  const getFallbackIcon = (name) => {
    const lowerName = name?.toLowerCase() || '';
    for (const [key, icon] of Object.entries(fallbackIcons)) {
      if (lowerName.includes(key)) {
        return icon;
      }
    }
    // Return first available icon as default fallback
    return Object.values(fallbackIcons)[0];
  };

  const footerLinks = {
    home: [
      { label: t('footer.columnHome'), href: '/' },
      { label: t('footer.partners'), href: '/#partners' },
      { label: t('footer.programs'), href: '/#programs' },
      { label: t('footer.upcomingEvents'), href: '/#events' },
      { label: t('footer.signatureCard'), href: '/#signature-card' }
    ],
    hajj: [
      { label: t('footer.hajjWithRania'), href: '/hajj' },
      { label: t('footer.partners'), href: '/hajj#partners' },
      { label: t('footer.discover'), href: '/hajj#packages' },
      { label: t('footer.manage'), href: '/hajj#manage' },
      { label: t('footer.signatureCard'), href: '/hajj#signature-card' }
    ],
    umrah: [
      { label: t('footer.umrahWithRania'), href: '/umrah' },
      { label: t('footer.partners'), href: '/umrah#partners' },
      { label: t('footer.discover'), href: '/umrah#packages' },
      { label: t('footer.manage'), href: '/umrah#manage' }
    ],
    company: [
      { label: t('footer.aboutRania'), href: '/about' },
      { label: t('footer.contactUs'), href: '/contact' }
    ],
    support: [
      { label: t('footer.faq'), href: '#faq' },
      { label: t('footer.visa'), href: '#visa' },
      { label: t('footer.passport'), href: '#passport' },
      { label: t('footer.feedback'), href: '#feedback' }
    ]
  };

  // Fetch social media links from API
  const fetchSocialMedia = async () => {
    const logPrefix = '[Footer Social Media]';

    try {
      logger.debug(`${logPrefix} Fetching social media links...`);
      setIsLoadingSocial(true);
      setSocialError(null);

      const response = await getSocialMedia();
      logger.debug(`${logPrefix} ✅ API Response:`, response);

      if (response.success && response.data) {
        setSocialMedia(response.data);
        logger.info(`${logPrefix} ✅ Loaded ${response.data.length} social media links`);
      }
    } catch (error) {
      logger.error(`${logPrefix} ❌ API Error:`, error);
      setSocialError(error.message);
      setSocialMedia([]);
      logger.warn(`${logPrefix} ⚠️ Using empty social media links`);
    } finally {
      setIsLoadingSocial(false);
      logger.debug(`${logPrefix} Loading complete`);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    logger.info('🚀 [Footer] Initializing social media fetch...');
    fetchSocialMedia();
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const logPrefix = '[Newsletter]';

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      logger.debug(`${logPrefix} Submitting subscription...`);

      const response = await subscribeNewsletter(email);
      logger.debug(`${logPrefix} ✅ API Response:`, response);

      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: response.message || t('footer.subscribeSuccess'),
        });
        logger.info(`${logPrefix} ✅ Subscription successful`);

        // Reset form
        setEmail('');
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.message || t('footer.subscribeError'),
        });
        logger.error(`${logPrefix} ❌ Subscription failed:`, response.message);
      }
    } catch (error) {
      logger.error(`${logPrefix} ❌ Error:`, error);

      // Check if error has validation errors
      if (error.message.includes('already subscribed')) {
        setSubmitStatus({
          type: 'error',
          message: t('footer.alreadySubscribed'),
        });
      } else if (error.message.includes('validation') || error.message.includes('invalid')) {
        setSubmitStatus({
          type: 'error',
          message: error.message,
        });
      } else if (error.message.includes('connect') || error.message.includes('network')) {
        setSubmitStatus({
          type: 'error',
          message: t('footer.networkError'),
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: t('footer.subscribeFailed'),
        });
      }
    } finally {
      setIsSubmitting(false);
      logger.debug(`${logPrefix} Subscription complete`);
    }
  };

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">{t('footer.newsletterTitle')}</h2>
          </div>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <div className="newsletter-input-wrapper">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                required
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              variant="subscribe"
              size="small"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('footer.subscribing') : t('footer.subscribe')}
            </Button>
          </form>
          {submitStatus.message && (
            <div className={`newsletter-message newsletter-message-${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="footer-links-section">
        <div className="footer-container">
          <div className="footer-logo-section">
            <img src={raniaLogo} alt="Rania Logo" className="footer-logo" />
            <p className="footer-address">
              Mall Kota Kasablanka, Prudential Centre, <br />
              Kav No.88 Floor 7N,<br /> 
              Kota Jakarta Selatan, 12870
            </p>
            <div className="footer-social">
              {isLoadingSocial ? (
                <div className="footer-social-loading">
                  {/* Show loading shimmer placeholders */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="social-icon-loading"></div>
                  ))}
                </div>
              ) : socialMedia.length > 0 ? (
                socialMedia.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    className="social-icon"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={social.icon_url || getFallbackIcon(social.name)}
                      alt={social.name}
                      className="social-icon-img"
                      onError={(e) => {
                        // If image fails to load, use fallback icon
                        e.target.src = getFallbackIcon(social.name);
                      }}
                    />
                  </a>
                ))
              ) : (
                <p className="footer-social-empty">{t('footer.noSocialLinks')}</p>
              )}
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-column-title">{t('footer.columnHome')}</h3>
              {footerLinks.home.map((link, index) => (
                <a key={index} href={link.href}>{link.label}</a>
              ))}
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">{t('footer.columnHajj')}</h3>
              {footerLinks.hajj.map((link, index) => (
                <a key={index} href={link.href}>{link.label}</a>
              ))}
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">{t('footer.columnUmrah')}</h3>
              {footerLinks.umrah.map((link, index) => (
                <a key={index} href={link.href}>{link.label}</a>
              ))}
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">{t('footer.columnCompany')}</h3>
              {footerLinks.company.map((link, index) => (
                <a key={index} href={link.href}>{link.label}</a>
              ))}
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">{t('footer.columnSupport')}</h3>
              {footerLinks.support.map((link, index) => (
                <a key={index} href={link.href}>{link.label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">{t('footer.copyright')}</p>
          <div className="footer-legal">
            <span>{t('footer.allRightsReserved')}</span>
            {/* <a href="#terms">Terms and Conditions</a>
            <span> | </span>
            <a href="#privacy">Privacy Policy</a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
