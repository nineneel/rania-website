import { useState } from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import raniaLogo from '../../../assets/icons/rania-logo.png';
import Button from '../../common/Button/Button';

const Footer = () => {
  const [email, setEmail] = useState('');

  const footerLinks = {
    home: [
      { label: 'Partners', href: '#partners' },
      { label: 'As Seen On', href: '#seen-on' },
      { label: 'Programs', href: '#programs' },
      { label: 'Upcoming', href: '#upcoming' },
      { label: 'Signature Card', href: '#signature-card' },
      { label: 'Subscribe', href: '#subscribe' },
      { label: 'Articles', href: '#articles' }
    ],
    hajj: [
      { label: 'Accrediation', href: '#accreditation' },
      { label: 'Partners', href: '#partners' },
      { label: 'Programs', href: '#programs' },
      { label: 'Manage Plan', href: '#manage-plan' },
      { label: 'Signature Card', href: '#signature-card' }
    ],
    umrah: [
      { label: 'Accrediation', href: '#accreditation' },
      { label: 'Partners', href: '#partners' },
      { label: 'Programs', href: '#programs' },
      { label: 'Manage Plan', href: '#manage-plan' }
    ],
    company: [
      { label: 'About Rania', href: '#about' },
      { label: 'Milestone', href: '#milestone' },
      { label: 'Our Vision', href: '#vision' },
      { label: 'Meet Expert', href: '#experts' },
      { label: 'Partners', href: '#partners' },
      { label: 'Life', href: '#life' }
    ],
    support: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Visa', href: '#visa' },
      { label: 'Passpor', href: '#passport' },
      { label: 'Feedback', href: '#feedback' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', href: '#facebook', icon: 'f' },
    { name: 'Twitter', href: '#twitter', icon: '𝕏' },
    { name: 'Instagram', href: '#instagram', icon: '📷' },
    { name: 'LinkedIn', href: '#linkedin', icon: 'in' },
    { name: 'YouTube', href: '#youtube', icon: '▶' }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
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
              />
            </div>
            <Button type="submit" variant="subscribe" size="small">Subscribe</Button>
          </form>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="footer-links-section">
        <div className="footer-container">
          <div className="footer-logo-section">
            <img src={raniaLogo} alt="Rania Logo" className="footer-logo" />
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="social-icon"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
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
          <p className="footer-copyright">Copyright © 2025 Rania</p>
          <div className="footer-legal">
            <span>All Rights Reserved | </span>
            <a href="#terms">Terms and Conditions</a>
            <span> | </span>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
