import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from 'src/events/user-created.event';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  // Validate user during login
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  // Generate JWT for the authenticated user
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: jwt.sign(payload, 'secretKey', { expiresIn: '60m' }),
    };
  }

  async createUser(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // Emit the user.created event
    this.eventEmitter.emit('user.created', new UserCreatedEvent(user.username));

    return user;
  }

  // Method to fetch all users
  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
