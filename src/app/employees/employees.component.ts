import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { appear } from '../animations';
import { EmployeeManagementService } from '../employee-management.service';
import { IGetEmployee as IEmployee } from '../interfaces';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  animations: [
    appear
  ]
})
export class EmployeesComponent implements OnInit {
  public fg: FormGroup[] = [];
  public pages: number[] = [];
  public curPage: number = 1;
  public perPage: number = 8;
  public isChanging: boolean[] = [];
  public status: string[] = [];
  public isLoading: boolean[] = [];
  public isLoadingMain: boolean = false;
  public deleteFailed: boolean[] = [];
  public $changePerPage = new Subject<any>();
  private allEmployees: IEmployee[] = [];

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeManagementService,
    private popupSevice: PopupService,
  ) {
  }

  ngOnInit(): void {
    this.$changePerPage.subscribe({
      next: v => {
        v = v.value ?? null;
        if( !v ) return;
        if( v > 8 ) v = 8;
        this.perPage = v;
        this.restart();
      }
    });
    this.getData();
  }

  getData(): void {
    this.isLoadingMain = true;
    this.empService.getAll()
    .then( v => {
      this.allEmployees = v;
      this.restart();
      this.isLoadingMain = false;
    })
    .catch( err => {
      console.error(err);
      this.getData();
    });
  }

  restart(): void {
    this.pages = new Array(this.maxPage);
    this.curPage = Math.min(this.curPage, this.maxPage);
    this.refresh();
    const temp = [];
    for( let i = 0; i < this.perPage; ++i )
      temp.push(this.fb.group({
        name: ['', Validators.required],
        salary: ['', [Validators.required, Validators.pattern('\\d+\\.?\\d*')]],
        age: ['', [Validators.required, Validators.pattern('\\d+')]],
      }));
    this.fg = temp;
  }

  refresh(): void {
    this.isChanging = new Array(this.perPage).fill(false);
    this.status = new Array(this.perPage).fill(' ');
    this.isLoading = new Array(this.perPage).fill(false);
    this.deleteFailed = new Array(this.perPage).fill(false);
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
      .finally(() => {
        this.isChanging[i] = false;
        this.isLoading[i] = false;
        this.status[i] = " ";
      })
    })
    .catch(() => (this.status[i] = "Failed"));
  }

  change( id: number, i: number ): void {
    this.isLoading[i] = true;
    this.status[i] = " ";
    this.empService.get(id)
    .then( v => this.fg[i].patchValue({
      name: v.employee_name,
      salary: v.employee_salary,
      age: v.employee_age
    }))
    .catch(() => this.tryChange(id, i))
    .finally( () => {
      this.isChanging[i] = true;
      this.isLoading[i] = false;
    });
  }

  private tryChange( id: number, i: number ): void {
    this.empService.get(id)
    .then( v => this.fg[i].patchValue({
      name: v.employee_name,
      salary: v.employee_salary,
      age: v.employee_age
    }))
    .catch(() => this.tryChange(id, i));
  }

  delete( id: number, i: number, name: string ) {
    this.popupSevice.create(`This action will remove a user with this name: ${name}\nAre you sure?`).subscribe(
      v => {
        if( v ) {
          this.empService.delete(id)
          .then(v => {
            this.getData();
          })
          .catch( err => {
            console.error(err);
            this.deleteFailed[i] = true;
          });
        }
      }
    )
  }

  pageIsShown( page: number ): boolean {
    return page <= 2 || page >= this.maxPage - 1 || (page >= this.curPage - 2 && page <= this.curPage + 2) || (this.curPage < 6 && page <= 8) || (this.curPage > this.maxPage - 5 && page >= this.maxPage - 7);
  }
}
