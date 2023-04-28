import { AES } from 'crypto-ts';
import * as CryptoTS from 'crypto-ts';

export default class AESEncryptDecryptService {
  secretKey = 'bddowf2';
  constructor() {}

  encrypt(value: string): string {
    return AES.encrypt(value, this.secretKey).toString();
  }

  decrypt(textToDecrypt: string) {
    let bytes = AES.decrypt(textToDecrypt, this.secretKey);
    return bytes.toString(CryptoTS.enc.Utf8);
  }
}
