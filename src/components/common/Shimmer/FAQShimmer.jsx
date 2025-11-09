import './FAQShimmer.css';

const FAQShimmer = () => {
  return (
    <div className="faq-shimmer-container">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div key={index} className="faq-shimmer-item">
          <div className="faq-shimmer-header">
            <div className="faq-shimmer-question"></div>
            <div className="faq-shimmer-indicator"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQShimmer;
