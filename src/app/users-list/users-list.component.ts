import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    public authService: AuthService,
    private router: Router,
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
    const sure = confirm(`This action will remove a user with this email: ${this.usersService.getUsers().get(id)?.email}\n\nAre you sure?`);
    if( sure ) {
      if( !this.usersService.deleteUser(id) ) {
        alert('Error occured');
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
