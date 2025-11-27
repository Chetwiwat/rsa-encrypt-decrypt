import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DecryptDto {
  @ApiProperty({
    description: 'Data1 (AES key encrypted with RSA private key)',
  })
  @IsString()
  data1: string;

  @ApiProperty({
    description: 'Data2 (AES encrypted payload)',
  })
  @IsString()
  data2: string;
}
