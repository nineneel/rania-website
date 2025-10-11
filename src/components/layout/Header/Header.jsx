import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';
import raniaLogo from '../../../assets/icons/rania-logo.webp';

const Header = ({ activeLink = 'Home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const navLinks = [
    { id: 'home', label: 'Home', href: '/', isRoute: true },
    { id: 'about', label: 'About Rania', href: '/about', isRoute: true },
    { id: 'hajj', label: 'Hajj With Rania', href: '/hajj', isRoute: true },
    { id: 'umrah', label: 'Umrah With Rania', href: '/umrah', isRoute: true},
    { id: 'world', label: 'Rania To The World', href: '#world', isRoute: false, comingSoon: true },
    { id: 'webinar', label: 'Webinar With Rania', href: '#webinar', isRoute: false, comingSoon: true },
    { id: 'partnership', label: 'Partnership', href: '#partnership', isRoute: false, comingSoon: true },
    { id: 'contact', label: 'Contact Us', href: '/contact', isRoute: true },
    { id: 'support', label: 'Support & Help', href: '/support', isRoute: true }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when at the top of the page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide header when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="header">
      {/* Desktop Header */}
      <div className="header-desktop">
        <img src={raniaLogo} alt="Rania Logo" className={`header-logo ${isVisible ? 'header-logo-visible' : 'header-logo-hidden'}`} />
        <nav className={`header-nav ${isVisible ? 'nav-visible' : 'nav-hidden'}`}>
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
                href={link.comingSoon ? '#' : link.href}
                className={`nav-link ${activeLink.toLowerCase() === link.label.toLowerCase() ? 'active' : ''} ${link.comingSoon ? 'coming-soon' : ''}`}
                onClick={(e) => link.comingSoon && e.preventDefault()}
                data-tooltip={link.comingSoon ? 'Coming Soon' : undefined}
              >
                {link.label}
                {link.comingSoon && <span className="coming-soon-badge">Coming Soon</span>}
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
                      href={link.comingSoon ? '#' : link.href}
                      className={`mobile-nav-link ${isActive ? 'active' : ''} ${link.comingSoon ? 'coming-soon' : ''}`}
                      onClick={(e) => {
                        if (link.comingSoon) {
                          e.preventDefault();
                        } else {
                          handleLinkClick();
                        }
                      }}
                    >
                      {link.label}
                      {link.comingSoon && <span className="coming-soon-badge">Coming Soon</span>}
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
