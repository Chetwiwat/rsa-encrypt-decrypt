import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RsaService } from '../services/rsa.service';
import {
  EncryptDto,
  DecryptDto,
  EncryptResponseDto,
  DecryptResponseDto,
} from '../dtos';

@ApiTags('RSA API')
@Controller()
export class RsaController {
  constructor(private readonly rsaService: RsaService) {}

  @Post('get-encrypt-data')
  @ApiResponse({ status: 200, type: EncryptResponseDto })
  getEncryptData(@Body() body: EncryptDto): EncryptResponseDto {
    try {
      const data = this.rsaService.encryptPayload(body.payload);
      return { successful: true, error_code: '', data };
    } catch {
      return { successful: false, error_code: 'ENCRYPTION_FAILED', data: null };
    }
  }

  @Post('get-decrypt-data')
  @ApiResponse({ status: 200, type: DecryptResponseDto })
  getDecryptData(@Body() body: DecryptDto): DecryptResponseDto {
    try {
      const payload = this.rsaService.decryptPayload(body.data1, body.data2);
      return { successful: true, error_code: '', data: { payload } };
    } catch {
      return { successful: false, error_code: 'DECRYPTION_FAILED', data: null };
    }
  }
}
