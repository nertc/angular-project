import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appear } from '../animations';
import { AuthService } from '../auth.service';
import { PopupService } from '../popup.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [
    appear
  ]
})
export class UsersListComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    public authService: AuthService,
    private router: Router,
    private popupService: PopupService,
  ) { }

  ngOnInit(): void {
  }

  get usersData(): Array<string[]> {
    const map = this.usersService.getUsers();
    const output: Array<string[]> = [];

    map.forEach( (user, id) => {
      const temp: string[] = [];
      temp.push(id.toString());

      for( let key in user ) {
        if( !this.usersService.checkType(key) ) continue;
        if( key === 'password' ) continue;
        temp.push(user[key]);
      }

      output.push(temp);
    });

    return output;
  }

  delete( id: any ): void {
    id = Number(id);
    this.popupService.create(`This action will remove a user with this email: ${this.usersService.getUsers().get(id)?.email}\nAre you sure?`).subscribe(
      sure => {
        if( sure ) {
          if( !this.usersService.deleteUser(id) ) {
            alert('Error occured');
          }
        }
      });
  }

  logout(): void {
    this.authService.logout();
  }
}
