import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-project';
  burgerSmall: boolean = false;

  constructor(
    public authService: AuthService,
  ) { }

  onBurgerEvent( val: boolean ) {
    this.burgerSmall = val;
  }
}
