import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users: Array<{
    email: string,
    password: string,
    nickname: string,
    phone: string,
    website: string,
    passwordKeys?: [number, number];
  }> = [];

  constructor() { }
}
