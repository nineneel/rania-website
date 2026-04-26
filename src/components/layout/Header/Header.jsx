import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ShareButton from '../../common/ShareButton';
import './Header.css';
import raniaLogo from '../../../assets/icons/rania-logo.webp';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
];

const Header = ({ activeLink = 'Home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const lastScrollY = useRef(0);
  const langRef = useRef(null);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const selectLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: t('nav.home'), href: '/', isRoute: true },
    { id: 'about', label: t('nav.aboutRania'), href: '/about', isRoute: true },
    { id: 'hajj', label: t('nav.hajjWithRania'), href: '/hajj', isRoute: true },
    { id: 'umrah', label: t('nav.umrahWithRania'), href: '/umrah', isRoute: true},
    { id: 'world', label: t('nav.raniaToTheWorld'), href: '#world', isRoute: false, comingSoon: true },
    { id: 'webinar', label: t('nav.webinarWithRania'), href: '#webinar', isRoute: false, comingSoon: true },
    { id: 'partnership', label: t('nav.partnership'), href: '/partnership', isRoute: false},
    { id: 'contact', label: t('nav.contactUs'), href: '/contact', isRoute: true },
    { id: 'support', label: t('nav.supportHelp'), href: '/support', isRoute: true }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <Link to="/" onClick={handleLogoClick}>
          <img src={raniaLogo} alt="Rania Logo" className={`header-logo ${isVisible ? 'header-logo-visible' : 'header-logo-hidden'}`} />
        </Link>
        <nav className={`header-nav ${isVisible ? 'nav-visible' : 'nav-hidden'}`}>
          {navLinks.map((link) => {
            const isActive = link.isRoute
              ? (link.href === '/'
                ? location.pathname === '/'
                : location.pathname === link.href || location.pathname.startsWith(`${link.href}/`))
              : false;
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
                {link.comingSoon && <span className="coming-soon-badge">{t('nav.comingSoon')}</span>}
              </a>
            );
          })}
          <div className="header-nav-actions">
            <div className="lang-dropdown" ref={langRef}>
              <button
                className="lang-toggle"
                onClick={() => setIsLangOpen(!isLangOpen)}
                aria-label="Select language"
              >
                <span className="lang-flag">{currentLang.flag}</span>
                <svg className={`lang-arrow ${isLangOpen ? 'open' : ''}`} width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {isLangOpen && (
                <div className="lang-menu">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`lang-option ${lang.code === i18n.language ? 'active' : ''}`}
                      onClick={() => selectLanguage(lang.code)}
                    >
                      <span className="lang-flag">{lang.flag}</span>
                      <span className="lang-option-label">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <ShareButton size="small" />
          </div>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="header-mobile">
        <div className="header-mobile-top">
          <Link to="/" onClick={handleLogoClick}>
            <img src={raniaLogo} alt="Rania Logo" className="header-mobile-logo" />
          </Link>
          <div className="header-mobile-actions">
            <ShareButton size="small" className="header-mobile-share" />
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
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav">
            {navLinks.map((link, index) => {
              const isActive = link.isRoute
                ? (link.href === '/'
                  ? location.pathname === '/'
                  : location.pathname === link.href || location.pathname.startsWith(`${link.href}/`))
                : false;
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
                      {link.comingSoon && <span className="coming-soon-badge">{t('nav.comingSoon')}</span>}
                    </a>
                  )}
                  {index < navLinks.length - 1 && <div className="mobile-nav-divider"></div>}
                </div>
              );
            })}
            <div className="mobile-nav-divider"></div>
            <div className="mobile-lang-selector">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`mobile-lang-option ${lang.code === i18n.language ? 'active' : ''}`}
                  onClick={() => {
                    selectLanguage(lang.code);
                    handleLinkClick();
                  }}
                >
                  <span className="lang-flag">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
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
