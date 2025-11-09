import { useState, useEffect } from 'react';
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
      { label: 'Home', href: '/' },
      { label: 'Partners', href: '/#partners' },
      { label: 'Programs', href: '/#programs' },
      { label: 'Upcoming Events', href: '/#events' },
      { label: 'Signature Card', href: '/#signature-card' }
    ],
    hajj: [
      { label: 'Hajj With Rania', href: '/hajj' },
      { label: 'Partners', href: '/hajj#partners' },
      { label: 'Discover', href: '/hajj#packages' },
      { label: 'Manage', href: '/hajj#manage' },
      { label: 'Signature Card', href: '/hajj#signature-card' }
    ],
    umrah: [
      { label: 'Umrah With Rania', href: '/umrah' },
      { label: 'Partners', href: '/umrah#partners' },
      { label: 'Discover', href: '/umrah#packages' },
      { label: 'Manage', href: '/umrah#manage' }
    ],
    company: [
      { label: 'About Rania', href: '/about' },
      { label: 'Contact Us', href: '/contact' }
    ],
    support: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Visa', href: '#visa' },
      { label: 'Passpor', href: '#passport' },
      { label: 'Feedback', href: '#feedback' }
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
          message: response.message || 'Thank you for subscribing! Please check your email to verify your subscription.',
        });
        logger.info(`${logPrefix} ✅ Subscription successful`);

        // Reset form
        setEmail('');
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.message || 'Something went wrong. Please try again.',
        });
        logger.error(`${logPrefix} ❌ Subscription failed:`, response.message);
      }
    } catch (error) {
      logger.error(`${logPrefix} ❌ Error:`, error);

      // Check if error has validation errors
      if (error.message.includes('already subscribed')) {
        setSubmitStatus({
          type: 'error',
          message: 'This email is already subscribed to our newsletter.',
        });
      } else if (error.message.includes('validation') || error.message.includes('invalid')) {
        setSubmitStatus({
          type: 'error',
          message: error.message,
        });
      } else if (error.message.includes('connect') || error.message.includes('network')) {
        setSubmitStatus({
          type: 'error',
          message: 'Network error. Please check your connection and try again.',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to subscribe. Please try again later.',
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
            <h2 className="newsletter-title">Subscribe to our weekly email newsletter!</h2>
          </div>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <div className="newsletter-input-wrapper">
              <input
                type="email"
                placeholder="Enter your email"
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
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
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
                <p className="footer-social-empty">No social links available</p>
              )}
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-column-title">Home</h3>
              {footerLinks.home.map((link, index) => (
                <a key={index} href={link.href}>{link.label}</a>
              ))}
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Hajj</h3>
              {footerLinks.hajj.map((link, index) => (
                <a key={index} href={link.href}>{link.label}</a>
              ))}
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Umrah</h3>
              {footerLinks.umrah.map((link, index) => (
                <a key={index} href={link.href}>{link.label}</a>
              ))}
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Company</h3>
              {footerLinks.company.map((link, index) => (
                <a key={index} href={link.href}>{link.label}</a>
              ))}
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Support</h3>
              {footerLinks.support.map((link, index) => (
                <a key={index} href={link.href}>{link.label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">Copyright © 2025 PT Rania Almutamayizah Travel</p>
          <div className="footer-legal">
            <span>All Rights Reserved</span>
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
