import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeManagementService } from '../employee-management.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent implements OnInit {
  public fg: FormGroup;
  public status: string = " ";

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeManagementService
  ) {
    this.fg = this.fb.group({
      name: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern('\\d+\\.?\\d*')]],
      age: ['', [Validators.required, Validators.pattern('\\d+')]],
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    if( !this.status ) return;
    this.status = "";
    this.empService.add(this.fg.getRawValue())
    .then(() => (this.status = "Registration was successful"))
    .catch(() => (this.status = "Registration has failed! Please try again"));
  }

  isValidNotRequired( field: FormControl ): boolean {
    return field.valid || !field.errors || (Object.getOwnPropertyNames(field.errors).length <= 1 && 'required' in field.errors);
  }

  get fname(): FormControl {return this.fg.get('name') as FormControl};
  get fsalary(): FormControl {return this.fg.get('salary') as FormControl};
  get fage(): FormControl {return this.fg.get('age') as FormControl};
}
