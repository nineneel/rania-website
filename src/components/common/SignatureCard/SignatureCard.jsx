import './SignatureCard.css';

const SignatureCard = ({
  image,
  title = "Rania Signature Card",
  description = "Carry your blessings, not your worries; experience secure and simple payments throughout your journey with the Rania Signature Card.",
  textColor = "var(--text-primary)",
  backgroundColor = "transparent"
}) => {
  return (
    <section className="signature-card-section" style={{ backgroundColor }}>
      <div className="signature-card-container">
        <div className="signature-card-image">
          <img src={image} alt={title} />
        </div>
        <div className="signature-card-content">
          <h2 className="signature-card-title" style={{ color: textColor, transition: 'color 0.5s ease' }}>
            {title}
          </h2>
          <p className="signature-card-description" style={{ color: textColor, transition: 'color 0.5s ease' }}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignatureCard;
