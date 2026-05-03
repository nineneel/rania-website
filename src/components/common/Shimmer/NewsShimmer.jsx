import './NewsShimmer.css';

const NewsShimmer = () => {
  return (
    <div className="news-shimmer-layout">
      {/* Featured (left) */}
      <div className="news-shimmer-featured">
        <div className="news-shimmer-featured-logo"></div>
        <div className="news-shimmer-featured-title"></div>
        <div className="news-shimmer-featured-title news-shimmer-featured-title--short"></div>
        <div className="news-shimmer-featured-image"></div>
      </div>

      {/* List (right) */}
      <div className="news-shimmer-list">
        {[1, 2, 3].map((i) => (
          <div key={i} className="news-shimmer-item">
            <div className="news-shimmer-item-thumb"></div>
            <div className="news-shimmer-item-body">
              <div className="news-shimmer-item-source"></div>
              <div className="news-shimmer-item-title"></div>
              <div className="news-shimmer-item-title news-shimmer-item-title--short"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsShimmer;
