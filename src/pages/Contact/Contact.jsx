import Header from '../../components/layout/Header';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact">
      {/* Header */}
      <Header activeLink="Contact Us" />

      {/* Hero Section */}
      <section className="contact-hero-section">
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Get In Touch With Us</h1>
          <p className="contact-hero-subtitle">
            We're here to help you plan your perfect spiritual journey
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info-section">
        <div className="contact-info-container">
          <div className="contact-info-card">
            <div className="contact-info-icon">📍</div>
            <h3 className="contact-info-title">Visit Us</h3>
            <p className="contact-info-text">
              Jl. Example Street No. 123<br />
              Jakarta, Indonesia 12345
            </p>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">📞</div>
            <h3 className="contact-info-title">Call Us</h3>
            <p className="contact-info-text">
              +62 21 1234 5678<br />
              +62 812 3456 7890
            </p>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">✉️</div>
            <h3 className="contact-info-title">Email Us</h3>
            <p className="contact-info-text">
              info@rania.com<br />
              support@rania.com
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contact-form-container">
          <h2 className="contact-form-title">Send Us a Message</h2>
          <form className="contact-form">
            <div className="contact-form-row">
              <div className="contact-form-group">
                <label htmlFor="name" className="contact-form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="contact-form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="email" className="contact-form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="contact-form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="contact-form-row">
              <div className="contact-form-group">
                <label htmlFor="phone" className="contact-form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="contact-form-input"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="subject" className="contact-form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="contact-form-input"
                  placeholder="What is this regarding?"
                  required
                />
              </div>
            </div>

            <div className="contact-form-group">
              <label htmlFor="message" className="contact-form-label">Message</label>
              <textarea
                id="message"
                name="message"
                className="contact-form-textarea"
                placeholder="Tell us more about your inquiry..."
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" className="contact-form-button">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="contact-map-section">
        <div className="contact-map-placeholder">
          <p className="contact-map-text">Map Location (Placeholder)</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
