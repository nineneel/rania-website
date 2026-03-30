import './HajjUpgrade.css';
import Header from '../../components/layout/Header/Header';
import Button from '../../components/common/Button/Button';
import SEO from '../../components/common/SEO';
import { openWhatsAppHajj, whatsappMessages } from '../../utils/whatsapp';

// Import hero image
import heroImage from '../../assets/images/hajj/hero.webp';

const HajjUpgrade = () => {
  return (
    <div className="hajj-upgrade">
      <SEO
        title="Upgrade Rencana Haji - Haji Plus by Rania"
        description="Wujudkan Panggilan Baitullah Lebih Awal dengan Haji Plus by Rania. Temukan alasan mengapa beralih ke Haji Khusus (Haji Plus) by RANIA adalah keputusan terbaik untuk ketenangan ibadah."
        keywords="haji plus, upgrade haji, haji khusus, haji rania, upgrade paket haji"
        canonical="/hajj/upgrade"
      />

      <Header activeLink="Hajj With Rania" />

      {/* Hero Section */}
      <section className="hajj-upgrade-hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hajj-upgrade-hero-overlay"></div>
        <div className="hajj-upgrade-hero-content">
          <h1 className="hajj-upgrade-hero-title">
            Wujudkan Panggilan Baitullah Lebih<br />Awal, dengan Haji Plus by Rania
          </h1>
          <p className="hajj-upgrade-hero-subtitle">
            Temukan alasan mengapa beralih ke Haji Khusus (Haji Plus) by RANIA adalah
            keputusan terbaik untuk ketenangan ibadah
          </p>
          <Button
            variant="tertiary-filled"
            size="small"
            onClick={() => openWhatsAppHajj(whatsappMessages.hajjUpgrade())}
          >
            Konsultasi
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HajjUpgrade;
