import './EventShimmer.css';

const EventShimmer = () => {
  return (
    <div className="event-shimmer-container">
      {[1, 2, 3].map((index) => (
        <div key={index} className="event-shimmer-card">
          <div className="event-shimmer-image">
            <div className="event-shimmer-overlay"></div>
          </div>
          <div className="event-shimmer-content">
            <div className="event-shimmer-title"></div>
            <div className="event-shimmer-description"></div>
            <div className="event-shimmer-description short"></div>
            <div className="event-shimmer-button"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventShimmer;
