import './UmrahShimmer.css';

const UmrahShimmer = () => {
  return (
    <div className="umrah-shimmer-container">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div key={index} className="umrah-shimmer-card">
          <div className="umrah-shimmer-image">
            <div className="umrah-shimmer-overlay"></div>
          </div>

          <div className="umrah-shimmer-content">
            <div className="umrah-shimmer-title"></div>
            <div className="umrah-shimmer-description"></div>

            <div className="umrah-shimmer-hotels">
              <div className="umrah-shimmer-hotel-item"></div>
              <div className="umrah-shimmer-hotel-item"></div>
              <div className="umrah-shimmer-departure"></div>
            </div>

            <div className="umrah-shimmer-details">
              <div className="umrah-shimmer-detail"></div>
              <div className="umrah-shimmer-detail"></div>
              <div className="umrah-shimmer-airlines"></div>
            </div>

            <div className="umrah-shimmer-price">
              <div className="umrah-shimmer-price-label"></div>
              <div className="umrah-shimmer-price-amount"></div>
            </div>

            <div className="umrah-shimmer-divider"></div>

            <div className="umrah-shimmer-button"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UmrahShimmer;
