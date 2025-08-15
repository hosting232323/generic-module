import CryptoJS from "crypto-js";


export const encryptPassword = (password, secretKey, ivString) => {
  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const iv = CryptoJS.enc.Utf8.parse(ivString);

  const encrypted = CryptoJS.AES.encrypt(password, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};


export const decryptPassword = (encryptedBase64, secretKey, ivString) => {
  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const iv = CryptoJS.enc.Utf8.parse(ivString);
  const ciphertext = CryptoJS.enc.Base64.parse(encryptedBase64);

  const decrypted = CryptoJS.AES.decrypt({ ciphertext }, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};
