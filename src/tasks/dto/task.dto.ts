import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  task: string;

  @ApiProperty()
  done?: boolean;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  update_at?: Date;

  @ApiProperty()
  user_id?: number;
}
