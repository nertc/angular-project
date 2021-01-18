import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: Array<{ icon: string, title: string, router: Array<string> }> = [
    { icon: "las la-user-plus", title: "Registration", router: ['/'] },
    { icon: "las la-users", title: "List of Users", router: ['/users']}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
