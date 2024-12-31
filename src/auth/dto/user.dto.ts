import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The username of the user',
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    description: 'The date and time when the user was created',
    example: '2024-12-31T00:00:00Z',
  })
  createdAt: Date;
}
