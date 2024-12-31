export class UserCreatedEvent {
  constructor(public readonly username: string) {
    console.log('New user created with username: ' + username);
  }
}
