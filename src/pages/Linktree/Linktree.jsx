import { useState, useEffect } from 'react';
import SEO from '../../components/common/SEO/SEO';
import { getSocialMedia } from '../../services/api';
import logger from '../../utils/logger';
import raniaLogo from '../../assets/icons/rania-logo.webp';
import facebookIcon from '../../assets/icons/Facebook.svg';
import instagramIcon from '../../assets/icons/Instagram.svg';
import linkedinIcon from '../../assets/icons/LinkedIn.svg';
import youtubeIcon from '../../assets/icons/YouTube.svg';
import tiktokIcon from '../../assets/icons/tiktok.svg';
import './Linktree.css';

// Temporary data - will be replaced with API
const TEMP_LINKS = [
  {
    id: 1,
    title: 'Official Website',
    url: 'https://www.rania.co.id',
  },
  {
    id: 2,
    title: 'Hajj Packages',
    url: 'https://www.rania.co.id/hajj',
  },
  {
    id: 3,
    title: 'Umrah Packages',
    url: 'https://www.rania.co.id/umrah',
  },
  {
    id: 4,
    title: 'About Rania',
    url: 'https://www.rania.co.id/about',
  },
  {
    id: 5,
    title: 'Contact Us',
    url: 'https://www.rania.co.id/contact',
  },
];

const TEMP_PROFILE = {
  name: 'RANIA',
  tagline: 'Redefine Hajj, Reimagined Journey',
};

const Linktree = () => {
  const [socialMedia, setSocialMedia] = useState([]);

  const fallbackIcons = {
    instagram: instagramIcon,
    facebook: facebookIcon,
    youtube: youtubeIcon,
    linkedin: linkedinIcon,
    tiktok: tiktokIcon,
  };

  const getFallbackIcon = (name) => {
    const lowerName = name?.toLowerCase() || '';
    for (const [key, icon] of Object.entries(fallbackIcons)) {
      if (lowerName.includes(key)) {
        return icon;
      }
    }
    return Object.values(fallbackIcons)[0];
  };

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const response = await getSocialMedia();
        if (response.success && response.data) {
          setSocialMedia(response.data);
        }
      } catch (error) {
        logger.error('[Linktree] Failed to fetch social media:', error);
        setSocialMedia([]);
      }
    };

    fetchSocialMedia();
  }, []);

  return (
    <>
      <SEO
        title="Links"
        description="Find all of RANIA's important links in one place. Hajj packages, Umrah packages, and more."
        canonical="/links"
      />

      <div className="linktree">
        <div className="linktree-container">
          {/* Profile Section */}
          <div className="linktree-profile">
            <div className="linktree-avatar">
              <img
                src={raniaLogo}
                alt={TEMP_PROFILE.name}
                className="linktree-avatar-img"
              />
            </div>
            <p className="linktree-tagline">{TEMP_PROFILE.tagline}</p>
          </div>

          {/* Links Section */}
          <div className="linktree-links">
            {TEMP_LINKS.map((link, index) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="linktree-link-button"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="linktree-link-title">{link.title}</span>
              </a>
            ))}
          </div>

          {/* Social Media Section */}
          <div className="linktree-socials">
            {socialMedia.length > 0
              ? socialMedia.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linktree-social-icon"
                    aria-label={social.name}
                  >
                    <img
                      src={social.icon_url || getFallbackIcon(social.name)}
                      alt={social.name}
                      onError={(e) => {
                        e.target.src = getFallbackIcon(social.name);
                      }}
                    />
                  </a>
                ))
              : Object.entries(fallbackIcons).map(([name, icon]) => (
                  <a
                    key={name}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linktree-social-icon"
                    aria-label={name}
                  >
                    <img src={icon} alt={name} />
                  </a>
                ))}
          </div>

          {/* Footer */}
          <p className="linktree-footer">
            &copy; {new Date().getFullYear()} PT Rania Almutamayizah Travel
          </p>
        </div>
      </div>
    </>
  );
};

export default Linktree;
