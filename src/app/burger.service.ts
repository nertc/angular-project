import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BurgerService {
  small: boolean = false;

  constructor() { }
}
