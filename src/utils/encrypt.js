import CryptoJS from "crypto-js";


const encryptPassword = (password, secretKey, ivString) => {
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


export default {
  encryptPassword
};
