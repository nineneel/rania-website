import './TestimonialShimmer.css';

const TestimonialShimmer = () => {
  return (
    <div className="testimonial-shimmer-container">
      {[1, 2, 3].map((index) => (
        <div key={index} className="testimonial-shimmer-card">
          <div className="testimonial-shimmer-text">
            <div className="testimonial-shimmer-line"></div>
            <div className="testimonial-shimmer-line"></div>
            <div className="testimonial-shimmer-line short"></div>
          </div>
          <div className="testimonial-shimmer-info">
            <div className="testimonial-shimmer-name"></div>
            <div className="testimonial-shimmer-position"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialShimmer;
