// src/auth/dto/create-user.dto.ts
import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'new_user',
  })
  @IsString()
  @MinLength(3, { message: 'username must be longer than 3 characters' })
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  @MinLength(6, { message: 'password must be longer than 6 characters' })
  password: string;
}
