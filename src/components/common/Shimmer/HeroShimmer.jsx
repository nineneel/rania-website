import './HeroShimmer.css';

const HeroShimmer = () => {
  return (
    <div className="hero-shimmer">
      <div className="hero-shimmer-overlay"></div>
      <div className="hero-shimmer-content">
        <div className="hero-shimmer-title"></div>
        <div className="hero-shimmer-subtitle"></div>
        <div className="hero-shimmer-buttons">
          <div className="hero-shimmer-button"></div>
          <div className="hero-shimmer-button"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroShimmer;
