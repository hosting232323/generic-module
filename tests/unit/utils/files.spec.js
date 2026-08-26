import { describe, expect, it } from 'vitest';

import fileUtils from '@/utils/files.js';

const file = (name, type) => new File(['x'], name, { type });

describe('buildAccept', () => {
  it('costruisce la lista di estensioni per l\'attributo accept', () => {
    expect(fileUtils.buildAccept(['jpg', 'png'])).toBe('.jpg,.png');
  });

  it('usa le estensioni di default quando non specificate', () => {
    expect(fileUtils.buildAccept()).toBe(fileUtils.defaultExtensions.map(ext => `.${ext}`).join(','));
  });
});

describe('validateFiles', () => {
  it('accetta file con estensione ammessa', () => {
    const files = [file('foto.jpg', 'image/jpeg'), file('doc.pdf', 'application/pdf')];
    expect(fileUtils.validateFiles(files, ['jpg', 'pdf'])).toBeNull();
  });

  it('segnala le estensioni non ammesse, senza duplicati', () => {
    const files = [file('virus.exe', 'application/octet-stream'), file('altro.exe', 'application/octet-stream')];
    const error = fileUtils.validateFiles(files, ['jpg']);

    expect(error).toContain('.exe');
    expect(error).toContain('Estensioni ammesse: .jpg');
    expect(error.match(/\.exe/g)).toHaveLength(1);
  });

  it('senza estensione nel nome ricade sul mime dichiarato dal browser', () => {
    const noExtension = file('foto', 'image/jpeg');
    expect(fileUtils.validateFiles([noExtension], ['jpg'])).toBeNull();
  });

  it('senza estensione ne\' mime riconosciuto, respinge il file', () => {
    const unknown = file('misterioso', '');
    const error = fileUtils.validateFiles([unknown], ['jpg']);
    expect(error).toContain('misterioso');
  });

  it('con lista vuota o assente non segnala nulla', () => {
    expect(fileUtils.validateFiles([], ['jpg'])).toBeNull();
    expect(fileUtils.validateFiles(undefined, ['jpg'])).toBeNull();
  });
});
