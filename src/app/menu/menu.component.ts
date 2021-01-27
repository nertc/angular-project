import { Component, Input, OnInit } from '@angular/core';
import { BurgerService } from '../burger.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: Array<{ icon: string, title: string, router: Array<string> }> = [
    { icon: "las la-sign-in-alt", title: "Log In", router: ['/login']},
    { icon: "las la-user-plus", title: "Registration", router: ['/']},
    { icon: "las la-users", title: "List of Users", router: ['/users']},
    { icon: "las la-exchange-alt", title: "Exchange", router: ['/exchange']},
    { icon: "las la-plus-circle", title: "New Employee", router: ['/employee/register']},
    { icon: "las la-user-friends", title: "Employees", router: ['/employees']},
  ];

  constructor(
    public burgerService: BurgerService,
  ) { }

  ngOnInit(): void {
  }

}
