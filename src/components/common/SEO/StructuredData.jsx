import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const StructuredData = ({ type = 'organization', data }) => {
  const getOrganizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'PT Rania Almutamayizah Travel',
    alternateName: 'RANIA',
    url: 'https://www.rania.co.id',
    logo: 'https://www.rania.co.id/logo.png',
    description: 'Premium Umrah and Hajj travel services provider in Indonesia. Licensed PPIU & PIHK operator offering exclusive pilgrimage experiences.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID',
      addressRegion: 'Indonesia'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Indonesian', 'Arabic']
    },
    sameAs: [
      'https://www.facebook.com/raniaalmutamayizahtravel/',
      'https://www.instagram.com/hajj.rania.co/',
      'https://www.linkedin.com/company/pt-rania-almutamayizah-travel/',
      'https://www.youtube.com/@HajjRania',
      'https://www.tiktok.com/@hajjrania.co?_t=ZS-90RuTBM3OZI&_r=1'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '500'
    },
    priceRange: '$$$$',
    serviceArea: {
      '@type': 'Country',
      name: 'Indonesia'
    }
  });

  const getServiceSchema = (serviceData) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceData.serviceType,
    provider: {
      '@type': 'TravelAgency',
      name: 'RANIA'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia'
    },
    description: serviceData.description
  });

  const getWebsiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RANIA',
    url: 'https://www.rania.co.id',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.rania.co.id/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  });

  const getBreadcrumbSchema = (breadcrumbs) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://www.rania.co.id${item.url}`
    }))
  });

  const getSchema = () => {
    switch (type) {
      case 'organization':
        return getOrganizationSchema();
      case 'service':
        return getServiceSchema(data);
      case 'website':
        return getWebsiteSchema();
      case 'breadcrumb':
        return getBreadcrumbSchema(data);
      default:
        return getOrganizationSchema();
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getSchema())}
      </script>
    </Helmet>
  );
};

StructuredData.propTypes = {
  type: PropTypes.oneOf(['organization', 'service', 'website', 'breadcrumb']),
  data: PropTypes.object
};

export default StructuredData;
