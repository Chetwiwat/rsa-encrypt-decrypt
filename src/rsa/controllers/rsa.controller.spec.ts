import { Test, TestingModule } from '@nestjs/testing';
import { RsaController } from './rsa.controller';
import { RsaService } from '../services/rsa.service';
import * as dotenv from 'dotenv';

describe('RsaController', () => {
  let rsaController: RsaController;
  let rsaService: RsaService;

  beforeAll(() => {
    dotenv.config();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RsaController],
      providers: [RsaService],
    }).compile();

    rsaController = module.get<RsaController>(RsaController);
    rsaService = module.get<RsaService>(RsaService);
  });

  it('should encrypt and decrypt correctly using service methods', () => {
    const payload = 'Hello World!';

    const encrypted = rsaService.encryptPayload(payload);

    expect(encrypted.data1).toBeDefined();
    expect(encrypted.data2).toBeDefined();

    const decrypted = rsaService.decryptPayload(
      encrypted.data1,
      encrypted.data2,
    );

    expect(decrypted).toBe(payload);
  });

  it('getEncryptData controller should return success response with encrypted data', () => {
    const payload = 'Hello World';
    const response = rsaController.getEncryptData({ payload });

    expect(response.successful).toBe(true);
    expect(response.error_code).toBe('');
    expect(response.data).toHaveProperty('data1');
    expect(response.data).toHaveProperty('data2');
  });

  it('getDecryptData controller should return decrypted payload on valid input', () => {
    const originalPayload = 'Secret Payload';

    const encryptResponse = rsaController.getEncryptData({
      payload: originalPayload,
    });

    expect(encryptResponse.successful).toBe(true);
    expect(encryptResponse.data).toBeDefined();

    const decryptResponse = rsaController.getDecryptData({
      data1: encryptResponse.data!.data1,
      data2: encryptResponse.data!.data2,
    });

    expect(decryptResponse.successful).toBe(true);
    expect(decryptResponse.data!.payload).toBe(originalPayload);
  });

  it('getDecryptData controller should return failure response on invalid data', () => {
    const decryptResponse = rsaController.getDecryptData({
      data1: 'invalid',
      data2: 'invalid',
    });

    expect(decryptResponse.successful).toBe(false);
    expect(decryptResponse.error_code).toBe('DECRYPTION_FAILED');
    expect(decryptResponse.data).toBeNull();
  });
});
