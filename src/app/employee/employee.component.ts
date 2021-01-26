import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeManagementService } from '../employee-management.service';
import { IGetEmployee as Employee } from '../interfaces';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employee: Employee = {id:-1,employee_name:'',employee_age:-1,employee_salary:-1};
  fg: FormGroup;
  status: string = " ";
  loaded: boolean = false;

  constructor(
    private empService: EmployeeManagementService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.fg = this.fb.group({
      name: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern('\\d+\\.?\\d*')]],
      age: ['', [Validators.required, Validators.pattern('\\d+')]],
    });
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const id = Number(routeParams.get('id'));
    this.getData(id);
  }

  private getData( id: number ) {
    this.empService.get(id)
    .then(v => {
      this.employee = v;
      this.fg.patchValue({
        name: this.employee.employee_name,
        age: this.employee.employee_age,
        salary: this.employee.employee_salary
      });
      this.loaded = true;
    })
    .catch(err => this.getData(id));
  }

  isValidNotRequired( field: FormControl ): boolean {
    return field.valid || !field.errors || (Object.getOwnPropertyNames(field.errors).length <= 1 && 'required' in field.errors);
  }

  get fname(): FormControl {return this.fg.get('name') as FormControl};
  get fsalary(): FormControl {return this.fg.get('salary') as FormControl};
  get fage(): FormControl {return this.fg.get('age') as FormControl};

  update() {
    if( !this.status ) return;
    this.status = "";
    this.empService.update(this.employee.id, this.fg.getRawValue())
    .then(() => {
      this.status = "Successfully updated";
      this.router.navigate(['/employees']);
    })
    .catch(() => {
      this.status = "Update has failed! Please try again";
    });
  }

  delete() {
    if( !this.status ) return;
    this.status = "";
    this.empService.delete(this.employee.id)
    .then(() => {
      this.status = "Successfully deleted";
      this.router.navigate(['/employees']);
    })
    .catch(() => {
      this.status = "Delete has failed! Please try again";
    });
  }
}
