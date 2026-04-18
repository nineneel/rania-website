import { useState, useEffect } from 'react';
import SEO from '../../components/common/SEO/SEO';
import { getLinktree, trackLinktreeClick } from '../../services/api';
import logger from '../../utils/logger';
import raniaLogo from '../../assets/icons/rania-logo.webp';
import facebookIcon from '../../assets/icons/Facebook.svg';
import instagramIcon from '../../assets/icons/Instagram.svg';
import linkedinIcon from '../../assets/icons/LinkedIn.svg';
import youtubeIcon from '../../assets/icons/YouTube.svg';
import tiktokIcon from '../../assets/icons/tiktok.svg';
import './Linktree.css';

const PROFILE = {
  name: 'RANIA',
  tagline: 'Redefine Hajj, Reimagined Journey',
};

const Linktree = () => {
  const [links, setLinks] = useState([]);
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
    const fetchLinktree = async () => {
      try {
        const response = await getLinktree();
        if (response.success && response.data) {
          setLinks(response.data.links || []);
          setSocialMedia(response.data.social_media || []);
        }
      } catch (error) {
        logger.error('[Linktree] Failed to fetch linktree data:', error);
        setLinks([]);
        setSocialMedia([]);
      }
    };

    fetchLinktree();
  }, []);

  const handleLinkClick = (linkId) => {
    trackLinktreeClick(linkId);
  };

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
                alt={PROFILE.name}
                className="linktree-avatar-img"
              />
            </div>
            <p className="linktree-tagline">{PROFILE.tagline}</p>
          </div>

          {/* Links Section */}
          <div className="linktree-links">
            {links.map((link, index) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="linktree-link-button"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleLinkClick(link.id)}
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
