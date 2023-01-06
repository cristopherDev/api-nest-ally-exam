import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  last_login?: Date;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  update_at?: Date;
}
