import { Component } from '@angular/core';
import { fadeIn } from './animations';
import { AuthService } from './auth.service';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeIn,
  ]
})
export class AppComponent {
  title = 'angular-project';

  constructor(
    public authService: AuthService,
    public popupService: PopupService,
  ) { }
}
