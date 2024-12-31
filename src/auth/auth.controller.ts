import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto'; // Import the UserDto

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.username || !createUserDto.password) {
      throw new BadRequestException('Username and password are required');
    }
    return this.authService.createUser(
      createUserDto.username,
      createUserDto.password,
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'Successfully logged in.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    if (!loginDto.username || !loginDto.password) {
      throw new BadRequestException('Username and password are required');
    }

    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of users',
    type: [UserDto],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getUsers(): Promise<UserDto[]> {
    const users = await this.authService.getAllUsers();
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
    }));
  }
}
