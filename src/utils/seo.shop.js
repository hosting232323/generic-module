const breadcrumbs = [
  {
    name: 'Home',
    url: 'https://carpediembisceglie.it',
    position: 1,
  },
  {
    name: 'Shop',
    url: 'https://carpediembisceglie.it/shop',
    position: 2,
  },
];

const getBreadcrumbShop = () => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://carpediembisceglie.it/shop',
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
  title: 'Shop Scarpe Bambini – Carpe Diem Bisceglie',
  meta: [
    {
      name: 'description',
      content:
        'Scopri lo shop Carpe Diem a Bisceglie: scarpe per bambini, primo passo, brand selezionati e consulenza personalizzata.',
    },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Shop – Carpe Diem Bisceglie' },
    { property: 'og:description', content: 'Scarpe per bambini e primo passo a Bisceglie.' },
    { property: 'og:image', content: 'https://carpediembisceglie.it/lanostrastoria.webp' },
    { property: 'og:url', content: 'https://carpediembisceglie.it/shop' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'it_IT' },
  ],
  script: [
    {
      type: 'application/ld+json',
      json: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': 'https://carpediembisceglie.it/shop#collection',
            url: 'https://carpediembisceglie.it/shop',
            name: 'Shop Scarpe Bambini – Carpe Diem',
            isPartOf: { '@id': 'https://carpediembisceglie.it/#website' },
          },
          {
            '@type': 'WebPage',
            '@id': 'https://carpediembisceglie.it/shop#webpage',
            url: 'https://carpediembisceglie.it/shop',
            name: 'Shop – Carpe Diem Bisceglie',
            breadcrumb: { '@id': 'https://carpediembisceglie.it/shop#breadcrumb' },
          },
          getBreadcrumbShop(),
        ],
      }),
    },
  ],
};
