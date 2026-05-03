const buildUrl = (path = '') => `${seoConfig.domain}${path.startsWith('/') ? path : '/' + path}`;

export const seoConfig = {
  // Base
  domain: 'https://yourdomain.com',
  brandName: 'Your Brand',
  tagline: 'Il tuo slogan',
  description: 'Descrizione generale del progetto',

  // UI
  language: 'it-IT',
  themeColor: '#000000',

  // Assets
  logo: '/logo.png',
  defaultImage: '/seo-cover.jpg',

  // Local SEO
  location: {
    city: 'Bari',
    region: 'IT-BA',
    country: 'IT',
    lat: 41.12765160469907,
    lng: 16.865408873701487,
    address: 'Via Roma 1',
    postalCode: '70122',
  },

  // Contacts
  contact: {
    email: 'info@yourdomain.com',
    phone: '+39 0000000000',
  },

  // Social profiles
  socials: [
    'https://instagram.com/yourbrand',
    'https://facebook.com/yourbrand',
  ],
};

export const head = {
  title: `${seoConfig.brandName} - ${seoConfig.tagline}`,

  meta: [
    { name: 'description', content: seoConfig.description },
    { name: 'robots', content: 'index, follow' },
    { name: 'theme-color', content: seoConfig.themeColor },

    { property: 'og:title', content: `${seoConfig.brandName} - ${seoConfig.tagline}` },
    { property: 'og:description', content: seoConfig.description },
    { property: 'og:url', content: seoConfig.domain },
    { property: 'og:image', content: buildUrl(seoConfig.defaultImage) },
  ],

  link: [
    { rel: 'canonical', href: seoConfig.domain },
    { rel: 'icon', href: seoConfig.logo },
  ],

  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: seoConfig.brandName,
        url: seoConfig.domain,
        logo: buildUrl(seoConfig.logo),
        sameAs: seoConfig.socials,
      }),
    },
  ],
};

export function generateSeoHead({
  title,
  description,
  slug = '',
  breadcrumbs = [],
  image,
}) {
  const pageUrl = buildUrl(slug);

  const finalImage = image
    ? buildUrl(image)
    : buildUrl(seoConfig.defaultImage);

  const breadcrumbList = breadcrumbs.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: buildUrl(item.path),
  }));

  return {
    title,

    meta: [
      { name: 'description', content: description },

      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: pageUrl },
      { property: 'og:image', content: finalImage },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: finalImage },
    ],

    link: [
      { rel: 'canonical', href: pageUrl },
      { rel: 'icon', href: seoConfig.logo },
    ],

    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          url: pageUrl,
          name: title,
          description,
          inLanguage: seoConfig.language,

          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbList,
          },
        }),
      },
    ],
  };
}
