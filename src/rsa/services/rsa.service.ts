import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class RsaService {
  private publicKey: string;
  private privateKey: string;

  constructor() {
    this.publicKey = (process.env.RSA_PUBLIC_KEY ?? '').replace(/\\n/g, '\n');
    this.privateKey = (process.env.RSA_PRIVATE_KEY ?? '').replace(/\\n/g, '\n');
  }

  private generateAesKey(): Buffer {
    return crypto.randomBytes(32); // AES-256 key
  }

  private encryptAes(payload: string, key: Buffer): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(payload, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    const ivBuffer = iv;
    const encryptedBuffer = Buffer.from(encrypted, 'base64');
    const combined = Buffer.concat([ivBuffer, encryptedBuffer]);

    return combined.toString('base64');
  }

  private decryptAes(encryptedDataWithIvBase64: string, key: Buffer): string {
    const combined = Buffer.from(encryptedDataWithIvBase64, 'base64');
    const iv = combined.slice(0, 16);
    const encryptedData = combined.slice(16);

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedData, undefined, 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  private encryptRsaPrivateKey(buffer: Buffer): string {
    const encrypted = crypto.privateEncrypt(
      {
        key: this.privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      buffer,
    );
    return encrypted.toString('base64');
  }

  private decryptRsaPublicKey(encryptedBase64: string): Buffer {
    const buffer = Buffer.from(encryptedBase64, 'base64');
    const decrypted = crypto.publicDecrypt(
      {
        key: this.publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      buffer,
    );
    return decrypted;
  }

  encryptPayload(payload: string): { data1: string; data2: string } {
    const aesKey = this.generateAesKey();
    const encryptedPayload = this.encryptAes(payload, aesKey);
    const encryptedAesKey = this.encryptRsaPrivateKey(aesKey);
    return {
      data1: encryptedAesKey,
      data2: encryptedPayload,
    };
  }

  decryptPayload(data1: string, data2: string): string {
    const aesKey = this.decryptRsaPublicKey(data1);
    const payload = this.decryptAes(data2, aesKey);
    return payload;
  }
}
