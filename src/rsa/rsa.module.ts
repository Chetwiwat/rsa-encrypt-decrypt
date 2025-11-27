import { Module } from '@nestjs/common';
import { RsaController } from './controllers/rsa.controller';
import { RsaService } from './services/rsa.service';

@Module({
  controllers: [RsaController],
  providers: [RsaService],
  exports: [RsaService],
})
export class RsaModule {}
