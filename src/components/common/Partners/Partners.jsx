import './Partners.css';

// Import partner logos
import partnerLogo1 from '../../../assets/images/home/partner-logo/partner-logo-1.webp';
import partnerLogo2 from '../../../assets/images/home/partner-logo/partner-logo-2.webp';
import partnerLogo3 from '../../../assets/images/home/partner-logo/partner-logo-3.webp';
import partnerLogo4 from '../../../assets/images/home/partner-logo/partner-logo-4.webp';
import partnerLogo5 from '../../../assets/images/home/partner-logo/partner-logo-5.webp';
import partnerLogo6 from '../../../assets/images/home/partner-logo/partner-logo-6.webp';
import partnerLogo7 from '../../../assets/images/home/partner-logo/partner-logo-7.webp';
import partnerLogo8 from '../../../assets/images/home/partner-logo/partner-logo-8.webp';
import partnerLogo9 from '../../../assets/images/home/partner-logo/partner-logo-9.webp';
import partnerLogo10 from '../../../assets/images/home/partner-logo/partner-logo-10.webp';
import partnerLogo11 from '../../../assets/images/home/partner-logo/partner-logo-11.webp';
import partnerLogo12 from '../../../assets/images/home/partner-logo/partner-logo-12.webp';

const Partners = () => {
  const partners = [
    partnerLogo1, partnerLogo2, partnerLogo3, partnerLogo4,
    partnerLogo5, partnerLogo6, partnerLogo7, partnerLogo8,
    partnerLogo9, partnerLogo10, partnerLogo11, partnerLogo12
  ];

  return (
    <section className="partners-section">
      <div className="partners-carousel">
        <div className="partners-track">
          {[...partners, ...partners].map((partner, index) => (
            <img
              key={index}
              src={partner}
              alt={`Partner ${index + 1}`}
              className="partner-logo"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
