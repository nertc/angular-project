import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './interfaces';
import { MathService } from './math.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private key = 'u8h5189h9waj5pj9asjfkla5gj9g4j8hq195jfo8[89n8n908-01//14281n0v-5128v51-n-nv-1iwjsjmdihqovoqvq[qwy4716as9q0e0-v3n-285oywfns642oj8428';

  constructor(
    private userService: UsersService,
    private encryptionService: MathService,
    private router: Router,
  ) { }

  private get token(): string {
    let token = localStorage.getItem(this.key) ?? "";
    if( token !== "" && this.userService.getUser(Number(token)) === undefined ) {
      token = "";
      this.logout();
    }

    return token;
  }

  private set token( val ) {
    localStorage.setItem(this.key, val);
  }

  get loggedIn(): boolean {
    return this.token !== "";
  }

  get id(): string {
    return this.token;
  }

  login( email: string, password: string ): boolean {
    const ids: number[] = Array.from(this.userService.getUsers().keys()).filter(id => this.userService.getUser(id)?.email === email);
    const userId = ids.find(id => {
      const user = this.userService.getUser(id);
      if( !user ) return false;
      return this.encryptionService.compareEncryption(user.password, password, ...(user.passwordKeys ?? [0, 0]));
    });
    if( userId === undefined ) return false;

    this.token = userId.toString();
    return true;
  }

  logout(): void {
    this.token = "";
    this.router.navigate(['/login']);
  }
}
