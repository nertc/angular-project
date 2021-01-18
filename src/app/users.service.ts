import { Injectable } from '@angular/core';

interface User {
  email: string,
  password: string,
  nickname: string,
  phone: string,
  website: string,
  passwordKeys?: [number, number]
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: Map<number, User> = new Map();
  private id: number = 0;

  constructor() { }

  getUsers(): Map<number, User> {
    return this.users;
  }

  addUser( user: User ): void {
    this.users.set(this.id, user);
  }
}
