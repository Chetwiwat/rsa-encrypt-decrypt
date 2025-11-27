import { ApiProperty } from '@nestjs/swagger';

export class DecryptResponseData {
  @ApiProperty()
  payload: string;
}

export class DecryptResponseDto {
  @ApiProperty()
  successful: boolean;

  @ApiProperty({ nullable: true })
  error_code: string | null;

  @ApiProperty({ type: DecryptResponseData, nullable: true })
  data: DecryptResponseData | null;
}
