const breadcrumbs = [
  {
    name: 'Home',
    url: 'https://carpediembisceglie.it',
    position: 1,
  },
];

const getBreadcrumbHome = () => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://carpediembisceglie.it/',
  itemListElement: breadcrumbs.map((b) => ({
    '@type': 'ListItem',
    position: b.position,
    name: b.name,
    item: {
      '@type': 'WebPage',
      '@id': b.url,
      url: b.url,
      name: b.name,
    },
  })),
});

export const head = {
  title: 'Carpe Diem Bisceglie – Scarpe per Bambini | Primo Passo',
  meta: [
    {
      name: 'description',
      content:
        'Carpe Diem è il negozio di scarpe per bambini a Bisceglie specializzato nel primo passo. Consulenza personalizzata e brand di qualità.',
    },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Carpe Diem – Scarpe per Bambini a Bisceglie' },
    { property: 'og:description', content: 'Negozio specializzato nel primo passo a Bisceglie.' },
    { property: 'og:image', content: 'https://carpediembisceglie.it/lanostrastoria.webp' },
    { property: 'og:url', content: 'https://carpediembisceglie.it' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'it_IT' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#2E4D29' },
  ],
  script: [
    {
      type: 'application/ld+json',
      json: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://carpediembisceglie.it/#organization',
            name: 'Carpe Diem',
            url: 'https://carpediembisceglie.it',
            logo: 'https://carpediembisceglie.it/logo.png',
          },
          {
            '@type': 'LocalBusiness',
            '@id': 'https://carpediembisceglie.it/#localbusiness',
            name: 'Carpe Diem',
            image: 'https://carpediembisceglie.it/lanostrastoria.webp',
            url: 'https://carpediembisceglie.it',
            telephone: '+39 393 563 9468',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Via XXIV Maggio, 9',
              addressLocality: 'Bisceglie',
              postalCode: '76011',
              addressCountry: 'IT',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 41.23951,
              longitude: 16.5032,
            },
          },
          {
            '@type': 'WebSite',
            '@id': 'https://carpediembisceglie.it/#website',
            url: 'https://carpediembisceglie.it',
            name: 'Carpe Diem – Scarpe per Bambini a Bisceglie',
            inLanguage: 'it-IT',
          },
          {
            '@type': 'WebPage',
            '@id': 'https://carpediembisceglie.it/#webpage',
            url: 'https://carpediembisceglie.it',
            name: 'Home – Carpe Diem Bisceglie',
            isPartOf: { '@id': 'https://carpediembisceglie.it/#website' },
            breadcrumb: { '@id': 'https://carpediembisceglie.it/#breadcrumb' },
          },
          getBreadcrumbHome(),
        ],
      }),
    },
  ],
};
