import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { appear } from '../animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    appear
  ]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  infoText: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.authService.login('','');
    this.form.valueChanges.subscribe(() => this.validate());
  }

  get femail(): FormControl {return this.form.get('email') as FormControl}
  get fpassword(): FormControl {return this.form.get('password') as FormControl}

  isValidNotRequired( control: FormControl ): boolean {
    if( control.valid || !control.errors ) return true;
    const errors = Object.getOwnPropertyNames(control.errors);
    if( errors.length > 1 ) return false;
    if( 'required' in control.errors ) return true;

    return false;
  }

  login() {
    if(this.authService.login(this.femail.value, this.fpassword.value)) {
      this.infoText = "Logged In";
      this.router.navigate(['/users']);
    } else {
      this.infoText = "Email is wrong or password doesn't match";
    }
  }

  validate() {
    const controls: {[key: string]: AbstractControl} = this.form.controls;

    let errorExists: boolean = false;
    for( let controlName of Object.getOwnPropertyNames(controls) ) {
      const control: AbstractControl = controls[controlName];
      if( control.valid || !control.errors ) continue;

      errorExists = true;
      switch( Object.getOwnPropertyNames(control.errors)[0] ) {
        case 'required':
          this.infoText = `All fields are required`;
          break;
        case 'email':
          this.infoText = `Such mail doesn't exist`;
          break;
        case 'minlength':
          this.infoText = `Length of the ${controlName} must be more than or equal to ${control.errors.minlength.requiredLength}`;
          break;
        case 'pattern':
          this.infoText = `Password is not compatible`;
          break;
        default:
          this.infoText = `Something went wrong! Please, try again`
          break;
      }
    }

    if( !errorExists ) this.infoText = "";
  }
}
