import { Component, OnInit } from '@angular/core';
import { EmployeeManagementService } from '../employee-management.service';
import { GetEmployee as Employee } from '../interfaces';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  public pages: number[] = [];
  public curPage: number = 1;
  public perPage = 8;
  private allEmployees: Employee[] = [];

  constructor(
    private empService: EmployeeManagementService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.empService.getAll()
    .then( v => {
      this.allEmployees = v;
      this.pages = new Array(this.maxPage);
      this.curPage = Math.min(this.curPage, this.maxPage);
    })
    .catch( err => {
      console.error(err);
      this.getData();
    });
  }

  get employees(): Array<Employee> {
    return this.allEmployees.filter((v, i) => i >= (this.curPage - 1) * this.perPage && i < this.curPage * this.perPage);
  }

  get maxPage(): number {
    return Math.ceil(this.allEmployees.length / this.perPage);
  }
}
