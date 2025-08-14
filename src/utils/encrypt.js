import CryptoJS from "crypto-js";


export const encryptPassword = (password, secretKey, ivString) => {
  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const iv = CryptoJS.enc.Utf8.parse(ivString);

  const encrypted = CryptoJS.AES.encrypt(password, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
  });

  const ivAndCiphertext = iv.concat(encrypted.ciphertext);
  const encryptedBase64 = ivAndCiphertext.toString(CryptoJS.enc.Base64);
  return encryptedBase64;
};

export const decryptPassword = (encryptedBase64, secretKey) => {
  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const ivAndCiphertext = CryptoJS.enc.Base64.parse(encryptedBase64);

  const iv = CryptoJS.lib.WordArray.create(ivAndCiphertext.words.slice(0, 4)); // 4 words = 16 bytes
  const ciphertext = CryptoJS.lib.WordArray.create(ivAndCiphertext.words.slice(4), ivAndCiphertext.sigBytes - 16);

  const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};
