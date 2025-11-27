import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class EncryptDto {
  @ApiProperty({
    description: 'Payload to encrypt',
    required: true,
    minLength: 0,
    maxLength: 2000,
  })
  @IsString({ message: 'payload must be a string' })
  @MaxLength(2000, { message: 'payload must not exceed 2000 characters' })
  payload: string;
}
