import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MathService } from '../math.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  confirmationValid: boolean = false;
  invalidText: string = "";

  constructor(
    private fb: FormBuilder,
    private mathService: MathService,
    private usersService: UsersService
  ) {
    this.form = this.fb.group({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(8)]),
      'confirmation': new FormControl('', [Validators.required]),
      'nickname': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+')]),
      'phone': new FormControl('', [Validators.required, Validators.pattern('\\+380\\d{9}')]),
      'website': new FormControl('', [Validators.required, Validators.pattern('(https?:\\/\\/)?(www\\.)?([a-zA-Z0-9][a-zA-Z0-9-]*\\.)+[a-zA-Z]+.*')]),
      'agreement': new FormControl('', [Validators.requiredTrue]),
    });
    this.form.setValidators(this.confirmPassword());
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if( this.form.valid ){
      const [cryptedPassword, e, n] = this.mathService.encrypt(this.form.get('password')?.value);
      this.usersService.users.push({
        email: this.form.get('email')?.value,
        password: cryptedPassword,
        nickname: this.form.get('nickname')?.value,
        phone: this.form.get('phone')?.value,
        website: this.form.get('website')?.value,
        passwordKeys: [e, n]
      });

      this.invalidText = "Succesful registration !";
    } else {
      console.log(this.form.get('email'));
      this.validate();
    }
  }

  validate() {
    const controls: {[key: string]: AbstractControl} = this.form.controls;

    for( let controlName of Object.getOwnPropertyNames(controls) ) {
      const control: AbstractControl = controls[controlName];
      if( control.valid || !control.errors ) continue;
      
      switch( Object.getOwnPropertyNames(control.errors)[0] ) {
        case 'required':
          this.invalidText = `Fields with asterisk(*) are required`;
          break;
        case 'email':
          this.invalidText = `Such mail doesn't exist`;
          break;
        case 'pattern':
          this.invalidText = `${controlName} must satisfy the pattern ${control.errors.pattern.requiredPattern}`;
          break;
        case 'minlength':
          this.invalidText = `Length of the ${controlName} must be more than or equal to ${control.errors.minlength.requiredLength}`;
          break;
        default:
          this.invalidText = `Something went wrong! Please, try again`
          break;
      }
    }
  }

  isValidNotRequired( controlName: string ): boolean {
    const control = this.form.get(controlName);
    
    if( control?.valid ) return true;
    const errors = Object.getOwnPropertyNames(control?.errors);
    if( errors.length !== 1 ) return true;
    if( errors[0] === 'required' ) return true;

    return false;
  }

  confirmPassword(): ValidatorFn {
    return ( control: AbstractControl ): {[key: string]: any} | null => {
      const password = control.get('password')?.value;
      const confirmation = control.get('confirmation')?.value;

      this.confirmationValid = password === confirmation;
      return password === confirmation ? null : {
        confirmed: {value: control.value}
      };
    }
  }

  get canRegister(): boolean {
    return this.confirmationValid && this.form.get('agreement')?.value;
  }
}
