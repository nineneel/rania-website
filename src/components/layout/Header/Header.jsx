import { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import raniaLogo from '../../../assets/icons/rania-logo.png';

const Header = ({ activeLink = 'Home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About Rania', href: '#about' },
    { id: 'hajj', label: 'Hajj With Rania', href: '#hajj' },
    { id: 'umrah', label: 'Umrah With Rania', href: '#umrah' },
    { id: 'world', label: 'Rania To The World', href: '#world' },
    { id: 'webinar', label: 'Webinar With Rania', href: '#webinar' },
    { id: 'partnership', label: 'Partnership', href: '#partnership' },
    { id: 'contact', label: 'Contact Us', href: '#contact' },
    { id: 'support', label: 'Support & Help', href: '#support' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      {/* Desktop Header */}
      <div className="header-desktop">
        <img src={raniaLogo} alt="Rania Logo" className="header-logo" />
        <nav className="header-nav">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link ${activeLink.toLowerCase() === link.label.toLowerCase() ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="header-mobile">
        <div className="header-mobile-top">
          <img src={raniaLogo} alt="Rania Logo" className="header-mobile-logo" />
          <button
            className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav">
            {navLinks.map((link, index) => (
              <div key={link.id}>
                <a
                  href={link.href}
                  className={`mobile-nav-link ${activeLink.toLowerCase() === link.label.toLowerCase() ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </a>
                {index < navLinks.length - 1 && <div className="mobile-nav-divider"></div>}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  activeLink: PropTypes.string
};

export default Header;
