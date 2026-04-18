import { useTranslation } from 'react-i18next';
import './SignatureCard.css';

const SignatureCard = ({
  image,
  title,
  description,
  textColor = "var(--text-primary)",
  backgroundColor = "transparent"
}) => {
  const { t } = useTranslation();
  const displayTitle = title || t('common.signatureCardTitle');
  const displayDescription = description || t('common.signatureCardDesc');
  return (
    <section className="signature-card-section" style={{ backgroundColor }}>
      <div className="signature-card-container">
        <div className="signature-card-image">
          <img src={image} alt={displayTitle} />
        </div>
        <div className="signature-card-content">
          <h2 className="signature-card-title" style={{ color: textColor, transition: 'color 0.5s ease' }}>
            {displayTitle}
          </h2>
          <p className="signature-card-description" style={{ color: textColor, transition: 'color 0.5s ease' }}>
            {displayDescription}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignatureCard;
