import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { BurgerService } from '../burger.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  nickname: string = "";

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    public burgerService: BurgerService,
  ) { }

  ngOnInit(): void {
    this.nickname =  this.userService.getUser(Number(this.authService.id))?.nickname ?? "";
  }

  logout(): void {
    this.authService.logout();
  }

}
