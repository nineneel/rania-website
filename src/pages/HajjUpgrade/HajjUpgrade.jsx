import { useState, useEffect } from 'react';
import './HajjUpgrade.css';
import '../Hajj/Hajj.css';
import Header from '../../components/layout/Header/Header';
import Button from '../../components/common/Button/Button';
import SEO from '../../components/common/SEO';
import { openWhatsAppHajj, whatsappMessages } from '../../utils/whatsapp';

// Import hero image
import heroImage from '../../assets/images/umrah/additional-service-hero.webp';

// Import wave divider
import waveImage from '../../assets/utils/wave.webp';

// Import icons for package section
import verifiedIcon from '../../assets/icons/verified-icon.webp';
import bedIcon from '../../assets/icons/bed-icon.webp';
import checkIcon from '../../assets/icons/check-icon.webp';

// Import signature collection images
import signature1 from '../../assets/images/hajj/signature/signature-1.webp';
import signature2 from '../../assets/images/hajj/signature/signature-2.webp';
import signature3 from '../../assets/images/hajj/signature/signature-3.webp';
import signature4 from '../../assets/images/hajj/signature/signature-4.webp';

// Import why switch images
import whyImg1 from '../../assets/images/hajj/upgrade/hajj-plus-1.webp';
import whyImg2 from '../../assets/images/hajj/upgrade/hajj-plus-2.webp';
import whyImg3 from '../../assets/images/hajj/upgrade/hajj-plus-3.webp';
import whyImg4 from '../../assets/images/hajj/upgrade/hajj-plus-4.webp';
import whyImg5 from '../../assets/images/hajj/upgrade/hajj-plus-5.webp';
import whyImg6 from '../../assets/images/hajj/upgrade/hajj-plus-6.webp';

const packages = [
  {
    name: "Economy",
    color: "gold",
    downPayment: "1500",
    downPaymentIDR: "25JT",
    features: [
      "Etihad/Qatar Airways",
      "Hotel Makkah Bintang 4 di Pelataran Haram",
      "Hotel Madinah Bintang 3 dekat Masjid Nabawi",
      "Apartment Transit Kawasan Mina Aziziyah",
      "Bus Kontrak",
      "Maktab Zona C"
    ],
    pricing: [
      { type: "Quad", price: "10,250", beds: 4 },
      { type: "Triple", price: "11,750", beds: 3 },
      { type: "Double", price: "13,250", beds: 2 }
    ]
  },
  {
    name: "Luxury",
    color: "luxury",
    isVIP: true,
    downPayment: "1500",
    downPaymentIDR: "25JT",
    features: [
      "Saudia Airlines - Direct Flight",
      "Hotel Makkah Bintang 5 Fairmont",
      "Hotel Madinah Bintang 5 Sofitel",
      "Transportasi Makkah-Madinah Kereta Cepat",
      "Bus Private VIP",
      "Maktab Zona A VIP 111"
    ],
    pricing: [
      { type: "Quad", price: "18,000", beds: 4 },
      { type: "Triple", price: "20,000", beds: 3 },
      { type: "Double", price: "21,500", beds: 2 }
    ]
  },
  {
    name: "Premium",
    color: "dark",
    downPayment: "1500",
    downPaymentIDR: "25JT",
    features: [
      "Etihad/Qatar Airways",
      "Hotel Makkah Bintang 5 di Pelataran Haram",
      "Hotel Madinah Bintang 4 dekat Masjid Nabawi",
      "Apartment Transit Kawasan Mina Aziziyah",
      "Bus Kontrak",
      "Maktab Zona B"
    ],
    pricing: [
      { type: "Quad", price: "14,450", beds: 4 },
      { type: "Triple", price: "15,450", beds: 3 },
      { type: "Double", price: "16,450", beds: 2 }
    ]
  }
];

const signatureData = [
  {
    title: 'Akses VIP Altanfeethi',
    description: 'Merencanakan haji kini jauh lebih mudah dan ringan. Jamaah bisa memulai langkah menuju Baitullah karena tabungan haji di Rania hanya Rp 1,9 juta/bulan selama 5 tahun.',
  },
  {
    title: 'Rania Signature Card',
    description: 'Bawa keberkahan, bukan kekhawatiran. Kartu eksklusif untuk kemudahan transaksi dan pembayaran Anda selama di Tanah Suci.',
  },
  {
    title: 'Transportasi Premium',
    description: 'Perjalanan Makkah-Madinah menggunakan Kereta Cepat atau Bus Private VIP, serta opsi upgrade armada menggunakan GMC Yukon/Tahoe yang menjamin privasi layaknya mobil pribadi.',
  },
  {
    title: 'Rania Signature Kit',
    richDescription: (
      <>
        Dapatkan cendera mata premium yang fungsional, seperti <strong>Quran Cordoba (Custom Edition)</strong>, <strong>Afiat Smart Ring</strong> (cincin pintar untuk pantau kesehatan &amp; hitung tawaf/sa&apos;i), wewangian <strong>Derya Oud</strong>, hingga <strong>Legoss Watches</strong> dengan seni kaligrafi Arab.
      </>
    ),
  },
];

const whySwitchData = [
  {
    title: 'Tinggalkan Antrean Panjang',
    description: 'Menunggu puluhan tahun untuk berhaji? Waktu adalah hal yang paling berharga. Dengan Rania, Anda mendapatkan kepastian "Without The Wait" (Tanpa Antre Panjang). Rencanakan ibadah Anda di usia yang masih prima dengan kepastian jadwal yang jelas.',
    image: whyImg1,
    variant: 'light',
  },
  {
    title: 'Keamanan & Legalitas Terjamin',
    description: null,
    richDescription: (
      <>
        Hindari risiko gagal berangkat atau masalah visa yang sering terjadi pada haji non-kuota. Rania adalah penyelenggara berlisensi resmi <strong>PIHK (Official Special Hajj License) Terakreditasi &apos;A&apos; (No. Izin: 02202041807930002).</strong> Kami menjamin keamanan, legalitas, dan ketenangan pikiran Anda dari berangkat hingga pulang.
      </>
    ),
    image: whyImg2,
    variant: 'dark',
  },
  {
    title: 'This is The "Unforgotten Hajj"',
    description: 'Rania meredefinisi kualitas ibadah haji. Jamaah tidak hanya mendapatkan Hotels in Prime Locations, tetapi juga fasilitas pendukung 24/7, Asuransi Perjalanan, Mutawif Tersertifikasi, dan Dedicated Tour Leader.',
    image: whyImg3,
    variant: 'light',
  },
  {
    title: 'Seluruh Paket Haji Menggunakan Tenda VIP',
    description: 'Seluruh paket haji Rania dipastikan menggunakan fasilitas Tenda VIP111.',
    image: whyImg4,
    variant: 'dark',
  },
  {
    title: (
      <>
        Percepatan Keberangkatan Tidak<br />Ditambah Biaya
      </>
    ),
    description: 'Percepatan keberangkatan tidak ditambah biaya. Jadi, jika ada jamaah yang sudah menunggu 2-10 tahun dan pengen dipercepat keberangkatannya, bisa dilakukan tanpa biaya tambahan di Rania.',
    image: whyImg5,
    variant: 'light',
  },
  {
    title: 'Tabungan Haji Hanya 1,9 Juta/Bulan',
    description: 'Merencanakan haji kini jauh lebih mudah dan ringan. Jamaah bisa memulai langkah menuju Baitullah karena tabungan haji di Rania hanya Rp 1,9 juta/bulan selama 5 tahun.',
    image: whyImg6,
    variant: 'dark',
  },
];

const HajjUpgrade = () => {
  const [stickyVisible, setStickyVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setStickyVisible(currentY < lastY || currentY < 10);
      lastY = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

      {/* Why Switch Section */}
      <section className="hajj-upgrade-why-section">
        <h2 className="hajj-upgrade-why-title">
          Mengapa Harus Beralih ke Haji Plus by Rania?
        </h2>
        <div className="hajj-upgrade-why-list">
          {whySwitchData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`hajj-upgrade-why-card hajj-upgrade-why-card--${item.variant} ${isEven ? 'hajj-upgrade-why-card--img-left' : 'hajj-upgrade-why-card--img-right'}`}
              >
                <div className="hajj-upgrade-why-card-image">
                  <img src={item.image} alt={typeof item.title === 'string' ? item.title : 'Haji Plus benefit'} />
                </div>
                <div className="hajj-upgrade-why-card-content">
                  <h3 className="hajj-upgrade-why-card-title">{item.title}</h3>
                  <p className="hajj-upgrade-why-card-desc">
                    {item.richDescription || item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Wave Divider */}
      <div className="hajj-upgrade-wave-divider">
        <img src={waveImage} alt="Wave divider" className="hajj-upgrade-wave-image" />
      </div>

      {/* Signature Collection Section */}
      <div className="hajj-upgrade-gradient-wave">
        <section className="hajj-upgrade-signature-section">
          <h2 className="hajj-upgrade-signature-title">
            Sentuhan Eksklusif dengan RANIA Signature Collection
          </h2>
          <div className="hajj-upgrade-signature-images">
            <div className="hajj-upgrade-signature-img hajj-upgrade-signature-img--up">
              <img src={signature1} alt="Akses VIP Altanfeethi" />
            </div>
            <div className="hajj-upgrade-signature-img hajj-upgrade-signature-img--down">
              <img src={signature2} alt="Rania Signature Card" />
            </div>
            <div className="hajj-upgrade-signature-img hajj-upgrade-signature-img--up">
              <img src={signature3} alt="Transportasi Premium" />
            </div>
            <div className="hajj-upgrade-signature-img hajj-upgrade-signature-img--down">
              <img src={signature4} alt="Rania Signature Kit" />
            </div>
          </div>
          <ol className="hajj-upgrade-signature-list">
            {signatureData.map((item, index) => (
              <li key={index} className="hajj-upgrade-signature-item">
                <h3 className="hajj-upgrade-signature-item-title">{item.title}</h3>
                <p className="hajj-upgrade-signature-item-desc">
                  {item.richDescription || item.description}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Hajj Packages Section */}
      <section id="packages" className="hajj-packages-section">
        <div className="hajj-packages-header">
          <h2 className="hajj-section-title">Temukan Paket Haji<br />Khusus Anda</h2>
          <div className="hajj-certification-badge">
            <div className="hajj-cert-title-wrap">
              <div className="hajj-cert-icon">
                <img src={verifiedIcon} alt="Verified" />
              </div>
              <div className="hajj-cert-title">PIHK Certification<br />(Official Special Hajj License)</div>
            </div>
            <div className="hajj-cert-desc">
              <span className="hajj-cert-a">&apos;A&apos;</span> Accredited Special Hajj Pilgrimage Organizer<br />License No. 02202041807930002
            </div>
          </div>
        </div>

        <div className="hajj-packages-container">
          {packages.map((pkg, index) => (
            <div key={index} className={`hajj-package-card hajj-package-${pkg.color}`}>
              {pkg.isVIP && (
                <div className="hajj-vip-badge">
                  <span className="hajj-vip-text"> VIP <br />CHOICE</span>
                </div>
              )}
              <div className="hajj-package-header">
                <h3 className="hajj-package-name">{pkg.name}</h3>
                <div className="hajj-price-amount">{pkg.downPayment}</div>
                <div className="hajj-dp-currency">USD</div>
                <div className="hajj-dp-label">DP</div>
                <div className="hajj-dp-idr">({pkg.downPaymentIDR})</div>
              </div>

              <div className="hajj-package-divider"></div>

              <ul className="hajj-package-features">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="hajj-package-feature">
                    <span className="hajj-feature-check">
                      <img src={checkIcon} alt="Check" className="hajj-check-icon" />
                    </span>
                    <span className="hajj-feature-text">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="secondary"
                size="medium"
                className="hajj-package-button"
                onClick={() => openWhatsAppHajj(whatsappMessages.hajjInterest(pkg.name))}
              >
                I am Interest
              </Button>

              <div className="hajj-package-divider"></div>

              <div className="hajj-package-pricing">
                {pkg.pricing.map((price, idx) => (
                  <div key={idx} className="hajj-pricing-row">
                    <span className="hajj-pricing-type">{price.type}</span>
                    <span className="hajj-pricing-amount">{price.price} <span className="hajj-pricing-currency">USD</span></span>
                    <div className="hajj-pricing-beds">
                      {[...Array(price.beds)].map((_, i) => (
                        <img key={i} src={bedIcon} alt="Bed" className="hajj-bed-icon" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Bar */}
      <div className={`hajj-upgrade-sticky-bar${stickyVisible ? ' visible' : ''}`}>
        <div className="hajj-upgrade-sticky-inner">
          <div className="hajj-upgrade-sticky-info">
            <h2 className="hajj-upgrade-sticky-title">Ada Pertanyaan?</h2>
            <p className="hajj-upgrade-sticky-subtitle">Jangan ragu hubungi tim Rania</p>
          </div>
          <button
            className="hajj-upgrade-sticky-btn"
            onClick={() => openWhatsAppHajj(whatsappMessages.hajjUpgrade())}
          >
            Upgrade Rencana Haji Sekarang!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HajjUpgrade;
