import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: { [username: string]: string } = {};

  constructor() {}

  getUser(username: string): { username: string, password: string } | undefined {
    if (username in this.users) {
      return { username, password: this.users[username] };
    } else {
      return undefined;
    }
  }

  addUser(username: string, password: string): void {
    this.users[username] = password;
  }
}
