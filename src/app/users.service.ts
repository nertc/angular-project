import { Injectable } from '@angular/core';

export interface User extends Object {
  email: string,
  password: string,
  nickname: string,
  phone: string,
  website: string,
  passwordKeys?: [number, number]
};

export type UserProperty = 'email' | 'password' | 'nickname' | 'phone' | 'website';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: Map<number, User> = new Map();
  private id: number;
  userProperties: Array<UserProperty> = ['email', 'password', 'nickname', 'phone', 'website']

  constructor() {
    this.id = this.users.size;
  }

  getUsers(): Map<number, User> {
    return this.users;
  }

  addUser( user: User ): void {
    this.users.set(this.id, user);
  }

  checkType( key: string ): key is UserProperty {
    return this.userProperties.some( k => k === key );
  }

  deleteUser( id: number ): boolean {
    return this.users.delete(id);
  }

}
