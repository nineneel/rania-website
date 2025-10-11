import { useState } from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import raniaLogo from '../../../assets/icons/rania-logo.webp';
import Button from '../../common/Button/Button';
import facebookIcon from '../../../assets/icons/Facebook.svg';
import instagramIcon from '../../../assets/icons/Instagram.svg';
import linkedinIcon from '../../../assets/icons/LinkedIn.svg';
import youtubeIcon from '../../../assets/icons/YouTube.svg';
import tiktokIcon from '../../../assets/icons/tiktok.svg';

const Footer = () => {
  const [email, setEmail] = useState('');

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

  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/raniaalmutamayizahtravel/', icon: facebookIcon },
    { name: 'Instagram', href: 'https://www.instagram.com/hajj.rania.co/', icon: instagramIcon },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/pt-rania-almutamayizah-travel/', icon: linkedinIcon },
    { name: 'YouTube', href: 'https://www.youtube.com/@HajjRania', icon: youtubeIcon },
    { name: 'TikTok', href: 'https://www.tiktok.com/@hajjrania.co?_t=ZS-90RuTBM3OZI&_r=1', icon: tiktokIcon }
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
            <p className="footer-address">
              Mall Kota Kasablanka, Prudential Centre, <br />
              Kav No.88 Floor 7N,<br /> 
              Kota Jakarta Selatan, 12870
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="social-icon"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={social.icon} alt={social.name} className="social-icon-img" />
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
