const fileTypes = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  mp4: 'video/mp4'
};

const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
const pdfExtensions = ['pdf'];
const spreadsheetExtensions = ['xls', 'xlsx'];
const videoExtensions = ['mp4'];

const defaultExtensions = [
  ...imageExtensions,
  ...pdfExtensions,
  ...spreadsheetExtensions,
  ...videoExtensions
];

const getExtension = (file) => {
  const name = (file && file.name) || '';
  const index = name.lastIndexOf('.');
  return index < 0 ? '' : name.slice(index + 1).toLowerCase();
};

const buildAccept = (extensions = defaultExtensions) =>
  extensions.map(extension => `.${extension}`).join(',');

const validateFiles = (files, extensions = defaultExtensions) => {
  const invalid = Array.from(files || []).filter(file => {
    const extension = getExtension(file);
    if (extensions.includes(extension)) return false;
    // senza estensione nel nome si ricade sul mime dichiarato dal browser
    return !!extension || !extensions.some(allowed => fileTypes[allowed] === file.type);
  });

  if (invalid.length == 0) return null;

  const names = [...new Set(invalid.map(file => {
    const extension = getExtension(file);
    return extension ? `.${extension}` : file.name;
  }))];
  return `Estensione non supportata: ${names.join(', ')}.\n` +
    `Estensioni ammesse: ${buildAccept(extensions)}`;
};

export default {
  fileTypes,
  defaultExtensions,
  imageExtensions,
  pdfExtensions,
  spreadsheetExtensions,
  videoExtensions,
  buildAccept,
  validateFiles
};
