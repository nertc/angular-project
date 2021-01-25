import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeManagementService } from '../employee-management.service';
import { IGetEmployee as IEmployee } from '../interfaces';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  public fg: FormGroup[] = [];
  public pages: number[] = [];
  public curPage: number = 1;
  public perPage: number = 8;
  public isChanging: boolean[] = [];
  public status: string[] = [];
  public isLoading: boolean[] = [];
  private allEmployees: IEmployee[] = [];

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeManagementService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.empService.getAll()
    .then( v => {
      this.allEmployees = v;
      this.pages = new Array(this.maxPage);
      this.curPage = Math.min(this.curPage, this.maxPage);
      this.refresh();
      this.fg = new Array(this.perPage).fill(this.fb.group({
        employee_name: ['', Validators.required],
        employee_salary: ['', [Validators.required, Validators.pattern('\\d+\\.?\\d*')]],
        employee_age: ['', [Validators.required, Validators.pattern('\\d+')]],
      }));
    })
    .catch( err => {
      console.error(err);
      this.getData();
    });
  }

  refresh(): void {
    this.isChanging = new Array(this.perPage).fill(false);
    this.status = new Array(this.perPage).fill(' ');
    this.isLoading = new Array(this.perPage).fill(false);
  }

  get employees(): Array<IEmployee> {
    return this.allEmployees.filter((v, i) => i >= (this.curPage - 1) * this.perPage && i < this.curPage * this.perPage);
  }

  get maxPage(): number {
    return Math.ceil(this.allEmployees.length / this.perPage);
  }

  getfname( i: number ): FormControl {return this.fg[i].get('employee_name') as FormControl};
  getfsalary( i: number ): FormControl {return this.fg[i].get('employee_salary') as FormControl};
  getfage( i: number ): FormControl {return this.fg[i].get('employee_age') as FormControl};

  submit( id: number, i: number ): void {
    if( !this.status[i] ) return;
    this.status[i] = "";
    this.empService.update(id, this.fg[i].getRawValue())
    .then(() => {
      this.status[i] = "Updated";
      this.empService.get(id)
      .then( v => (this.employees[i] = v))
      .catch( err => {
        console.error(err);
        this.getData();
      })
    })
    .catch(() => (this.status[i] = "Failed"));
  }

  change( id: number, i: number ): void {
    this.isLoading[i] = true;
    this.empService.get(id)
    .then( v => this.fg[i].patchValue(v))
    .finally( () => {
      this.isChanging[i] = true;
      this.isLoading[i] = false;
    });
  }
}
