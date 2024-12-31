// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller'; // Make sure this is imported

@Module({
  imports: [PassportModule, PrismaModule], // PassportModule and PrismaModule should be imported
  controllers: [AuthController], // AuthController must be listed here
  providers: [AuthService, LocalStrategy], // Your service and any strategies go here
  exports: [AuthService], // If needed, export the AuthService
})
export class AuthModule {}
