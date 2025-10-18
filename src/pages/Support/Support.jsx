import Header from '../../components/layout/Header';
import Button from '../../components/common/Button/Button';
import SEO from '../../components/common/SEO';
import { StructuredData } from '../../components/common/SEO';
import './Support.css';

const Support = () => {
  const faqs = [
    {
      question: "How do I book a Hajj or Umrah package?",
      answer: "You can book directly through our website by selecting your preferred package, or contact our team for personalized assistance. We'll guide you through every step of the booking process."
    },
    // {
    //   question: "What documents do I need for my pilgrimage?",
    //   answer: "You'll need a valid passport (minimum 6 months validity), vaccination certificates, passport-sized photos, and other documents depending on your nationality. Our team will provide a complete checklist after booking."
    // },
    // {
    //   question: "Are payment plans available?",
    //   answer: "Yes, we offer flexible payment plans to make your sacred journey more accessible. Contact our team to discuss payment options that work best for you."
    // },
    // {
    //   question: "What is included in the package?",
    //   answer: "Our packages typically include visa processing, flights, accommodation, transportation in Saudi Arabia, guided tours, and meals. Specific inclusions vary by package - check the package details or contact us for more information."
    // },
    // {
    //   question: "Can I customize my package?",
    //   answer: "Absolutely! We understand every journey is personal. Contact our team to discuss your specific needs and preferences, and we'll create a customized package for you."
    // },
    // {
    //   question: "What support is available during the trip?",
    //   answer: "We provide 24/7 support throughout your journey, with experienced guides, local representatives, and a dedicated support team available to assist you at any time."
    // }
  ];

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

      {/* Title Section */}
      <section className="support-title-section">
        <h1 className="support-main-title">How Can We Help You?</h1>
        <p className="support-main-subtitle">
          Find answers to common questions or reach out to our support team
        </p>
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

      {/* FAQ Section */}
      <section className="support-faq-section">
        <h2 className="support-faq-title">Frequently Asked Questions</h2>
        <div className="support-faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="support-faq-item">
              <h3 className="support-faq-question">{faq.question}</h3>
              <p className="support-faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="support-contact-section">
        <div className="support-contact-content">
          <h2 className="support-contact-title">Still Need Help?</h2>
          <p className="support-contact-description">
            Our team is here to assist you with any questions or concerns
          </p>
          <Button variant="primary" size="medium" to="/contact">
            Contact Our Team
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Support;
