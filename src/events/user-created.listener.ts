import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './user-created.event';

@Injectable()
export class UserCreatedListener {
  @OnEvent('user.created')
  handleUserCreatedEvent(event: UserCreatedEvent) {
    console.log(`User created: ${event.username}`);
  }
}
