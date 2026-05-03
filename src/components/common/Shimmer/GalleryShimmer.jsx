import './GalleryShimmer.css';

const GalleryShimmer = () => {
  return (
    <div className="gallery-shimmer-grid">
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className={`gallery-shimmer-item ${index === 1 ? 'gallery-shimmer-item--feature' : ''}`}
        >
          <div className="gallery-shimmer-overlay"></div>
        </div>
      ))}
    </div>
  );
};

export default GalleryShimmer;
