import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @Output() burgerEvent = new EventEmitter<boolean>();
  burgerClicked: boolean = false;
  $burgerClicked = new Subject<boolean>();

  nickname: string = "";

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.$burgerClicked.subscribe({
      next: () => {
        this.burgerClicked = !this.burgerClicked;
        this.burgerEvent.emit(this.burgerClicked);
      }
    });
    this.nickname =  this.userService.getUser(Number(this.authService.id))?.nickname ?? "";
  }

  logout(): void {
    this.authService.logout();
  }

}
