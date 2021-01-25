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
        name: ['', Validators.required],
        salary: ['', [Validators.required, Validators.pattern('\\d+\\.?\\d*')]],
        age: ['', [Validators.required, Validators.pattern('\\d+')]],
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
  }

  get employees(): Array<IEmployee> {
    return this.allEmployees.filter((v, i) => i >= (this.curPage - 1) * this.perPage && i < this.curPage * this.perPage);
  }

  get maxPage(): number {
    return Math.ceil(this.allEmployees.length / this.perPage);
  }

  getfname( i: number ): FormControl {return this.fg[i].get('name') as FormControl};
  getfsalary( i: number ): FormControl {return this.fg[i].get('salary') as FormControl};
  getfage( i: number ): FormControl {return this.fg[i].get('age') as FormControl};

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
}
