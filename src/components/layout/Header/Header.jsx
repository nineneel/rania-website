import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';
import raniaLogo from '../../../assets/icons/rania-logo.png';

const Header = ({ activeLink = 'Home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { id: 'home', label: 'Home', href: '/', isRoute: true },
    { id: 'about', label: 'About Rania', href: '/about', isRoute: true },
    { id: 'hajj', label: 'Hajj With Rania', href: '/hajj', isRoute: false },
    { id: 'umrah', label: 'Umrah With Rania', href: '#umrah', isRoute: false },
    { id: 'world', label: 'Rania To The World', href: '#world', isRoute: false },
    { id: 'webinar', label: 'Webinar With Rania', href: '#webinar', isRoute: false },
    { id: 'partnership', label: 'Partnership', href: '#partnership', isRoute: false },
    { id: 'contact', label: 'Contact Us', href: '#contact', isRoute: false },
    { id: 'support', label: 'Support & Help', href: '#support', isRoute: false }
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
          {navLinks.map((link) => {
            const isActive = link.isRoute ? location.pathname === link.href : false;
            return link.isRoute ? (
              <Link
                key={link.id}
                to={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.id}
                href={link.href}
                className={`nav-link ${activeLink.toLowerCase() === link.label.toLowerCase() ? 'active' : ''}`}
              >
                {link.label}
              </a>
            );
          })}
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
            {navLinks.map((link, index) => {
              const isActive = link.isRoute ? location.pathname === link.href : false;
              return (
                <div key={link.id}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className={`mobile-nav-link ${activeLink.toLowerCase() === link.label.toLowerCase() ? 'active' : ''}`}
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </a>
                  )}
                  {index < navLinks.length - 1 && <div className="mobile-nav-divider"></div>}
                </div>
              );
            })}
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
