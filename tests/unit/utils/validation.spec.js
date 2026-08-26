import { describe, expect, it } from 'vitest';

import validation from '@/utils/validation.js';

describe('requiredRules', () => {
  it('respinge un valore vuoto', () => {
    expect(validation.validateInput('', validation.requiredRules)).toEqual(['Campo obbligatorio']);
  });

  it('accetta un valore presente', () => {
    expect(validation.validateInput('valore', validation.requiredRules)).toBeNull();
  });
});

describe('emailRules', () => {
  it('respinge un\'email senza @ o dominio', () => {
    expect(validation.validateInput('non-email', validation.emailRules)).toEqual(['E-mail non valida.']);
  });

  it('accetta un\'email valida', () => {
    expect(validation.validateInput('utente@example.com', validation.emailRules)).toBeNull();
  });
});

describe('siteRules', () => {
  it.each([
    'example.com',
    'https://example.com',
    'http://sub.example.co.uk/path?query=value'
  ])('accetta %s', (url) => {
    expect(validation.validateInput(url, validation.siteRules)).toBeNull();
  });

  it('respinge un url malformato', () => {
    expect(validation.validateInput('non un sito', validation.siteRules)).toEqual(['Sito non valido.']);
  });
});

describe('passwordRules', () => {
  it('accetta una password che rispetta tutti i vincoli', () => {
    expect(validation.validateInput('Password1', validation.passwordRules)).toBeNull();
  });

  it('elenca ogni vincolo violato', () => {
    expect(validation.validateInput('abc', validation.passwordRules)).toEqual([
      'La password deve contenere almeno una lettera maiscola.',
      'La password deve contenere almeno un numero.',
      'La password deve contenere almeno 8 caratteri.'
    ]);
  });
});
