export const allergenIcons = {
  glutine: { src: '/allergeni/glutine.svg', color: '#c49102' },
  lattosio: { src: '/allergeni/latte.svg', color: '#5581c1' },
  uova: { src: '/allergeni/uova.svg', color: '#e8932c' },
  pesce: { src: '/allergeni/pesce.svg', color: '#43bbd5' },
  arachidi: { src: '/allergeni/arachidi.svg', color: '#cea642' },
  soia: { src: '/allergeni/soia.svg', color: '#99bb4e' },
  frutta_a_guscio: { src: '/allergeni/frutta_guscio.svg', color: '#cf8055' },
  crostacei: { src: '/allergeni/crostacei.svg', color: '#ec6049' },
  sedano: { src: '/allergeni/sedano.svg', color: '#72b654' },
  senape: { src: '/allergeni/senape.svg', color: '#dba91a' },
  sesamo: { src: '/allergeni/sesamo.svg', color: '#9490b5' },
  anidride_solforosa: { src: '/allergeni/solfiti.svg', color: '#209fb4' },
  lupini: { src: '/allergeni/lupini.svg', color: '#f3c101' },
  molluschi: { src: '/allergeni/molluschi.svg', color: '#ed696a' },
};

export const formatAllergenName = (name) => {
  const withSpaces = name.replace(/_/g, ' ');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};
