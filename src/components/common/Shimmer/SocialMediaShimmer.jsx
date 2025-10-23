import './SocialMediaShimmer.css';

const SocialMediaShimmer = () => {
  return (
    <div className="contact-social-links">
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} className="social-shimmer-link">
          <span className="social-shimmer-icon">
            <div className="social-shimmer-icon-placeholder"></div>
          </span>
          <span className="social-shimmer-name"></span>
        </div>
      ))}
    </div>
  );
};

export default SocialMediaShimmer;
