import { ApiProperty } from '@nestjs/swagger';

export class EncryptResponseData {
  @ApiProperty()
  data1: string;

  @ApiProperty()
  data2: string;
}

export class EncryptResponseDto {
  @ApiProperty()
  successful: boolean;

  @ApiProperty({ nullable: true })
  error_code: string | null;

  @ApiProperty({ type: EncryptResponseData, nullable: true })
  data: EncryptResponseData | null;
}
