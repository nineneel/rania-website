import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Button from '../../components/common/Button/Button';
import SEO from '../../components/common/SEO';
import { StructuredData } from '../../components/common/SEO';
import { FAQShimmer } from '../../components/common/Shimmer';
import { getFAQs } from '../../services/api';
import logger from '../../utils/logger';
import './Support.css';

// Import hero image
import heroSupport from '../../assets/images/support-help/support-help-hero.webp';

const Support = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  // API Data States
  const [faqs, setFaqs] = useState([]);
  const [isLoadingFaqs, setIsLoadingFaqs] = useState(true);
  const [faqsError, setFaqsError] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Fetch FAQs from API
  const fetchFAQs = async () => {
    const logPrefix = '[Support FAQs]';

    try {
      logger.debug(`${logPrefix} Fetching FAQs...`);
      setIsLoadingFaqs(true);

      const response = await getFAQs();
      logger.debug(`${logPrefix} ✅ API Response:`, response);

      if (response.success && response.data) {
        setFaqs(response.data);
        logger.info(`${logPrefix} ✅ Loaded ${response.data.length} FAQs`);
        setFaqsError(null);
      }
    } catch (error) {
      logger.error(`${logPrefix} ❌ API Error:`, error);
      setFaqsError(error.message);
      setFaqs([]);
      logger.warn(`${logPrefix} ⚠️ No FAQs available`);
    } finally {
      setIsLoadingFaqs(false);
      logger.debug(`${logPrefix} Loading complete`);
    }
  };

  // Fetch FAQs on component mount
  useEffect(() => {
    logger.info('🚀 [Support] Initializing FAQ data fetch...');
    fetchFAQs();
  }, []);

  const quickHelp = [
    {
      title: "Call Us",
      description: "Speak directly with our team",
      action: "0811-8855-489",
      link: "tel:08118855489"
    },
    {
      title: "Email Support",
      description: "Send us your questions",
      action: "Contact Form",
      link: "/contact"
    },
    {
      title: "Office Visit",
      description: "Meet us in person",
      action: "View Location",
      link: "/contact"
    }
  ];

  return (
    <div className="support">
      {/* SEO Meta Tags */}
      <SEO
        title="Support - RANIA Help Center & FAQ"
        description="Find answers to common questions about Hajj and Umrah packages with RANIA. Get help with booking, documents, payment plans, and more. 24/7 customer support available."
        keywords="rania support, rania help, rania faq, rania customer service, hajj faq, umrah faq, travel support"
        canonical="/support"
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Support', url: '/support' }
        ]}
      />

      {/* Header */}
      <Header activeLink="Support" />

      {/* Hero Section */}
      <section className="support-hero-section" style={{ backgroundImage: `url(${heroSupport})` }}>
        <div className="support-hero-overlay"></div>
        <div className="support-hero-content">
          <h1 className="support-hero-title">How Can We Help You?</h1>
          <p className="support-hero-subtitle">
            Find answers to common questions or reach out to our support team
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="support-faq-section">
        <h2 className="support-faq-title">About Visa & Documentation</h2>

        {isLoadingFaqs ? (
          <FAQShimmer />
        ) : faqs.length === 0 ? (
          <div className="support-empty-state">
            <div className="support-empty-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="38" stroke="var(--primary-gold)" strokeWidth="2" strokeDasharray="4 4"/>
                <path d="M40 25V40L50 50" stroke="var(--primary-gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="support-empty-title">No FAQs Available</h3>
            <p className="support-empty-description">
              We're currently updating our FAQ section. If you have questions, please don't hesitate to contact us directly.
            </p>
            <Button
              variant="tertiary"
              size="small"
              to="/contact"
            >
              Contact Us
            </Button>
          </div>
        ) : (
          <div className="support-faq-container">
            {faqs.map((faq, index) => (
              <div
                key={faq.id || index}
                className={`support-faq-item ${expandedFaq === index ? 'expanded' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="support-faq-header">
                  <h3 className="support-faq-question">{faq.question}</h3>
                  <div className={`support-faq-indicator ${expandedFaq === index ? 'active' : ''}`}>
                    <span className="support-faq-icon"></span>
                  </div>
                </div>
                {expandedFaq === index && (
                  <p className="support-faq-answer">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
      

      {/* Quick Help Section */}
      <section className="support-quick-section">
        <div className="support-quick-container">
          {quickHelp.map((help, index) => (
            <div key={index} className="support-quick-card">
              <h3 className="support-quick-title">{help.title}</h3>
              <p className="support-quick-description">{help.description}</p>
              <Button
                variant="primary"
                size="small"
                to={help.link.startsWith('tel:') ? undefined : help.link}
                onClick={help.link.startsWith('tel:') ? () => window.location.href = help.link : undefined}
              >
                {help.action}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Support;
