import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces';
import { MathService } from '../math.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  confirmationValid: boolean = false;
  infoText: string = "";
  userToEdit: User | undefined;
  edit: boolean = false;
  userId: number = 0;

  constructor(
    private fb: FormBuilder,
    private mathService: MathService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idUnformatted = routeParams.get('userId');
    if( !idUnformatted ) {
      this.edit = false;
      this.defineForm();
      return;
    }

    const userId = Number(idUnformatted);
    this.userToEdit = this.usersService.getUsers().get(userId);
    if( !this.userToEdit ) {
      this.edit = false;
      this.defineForm();
      return;
    }

    this.userId = userId;

    this.edit = true;
    this.infoText = 'Blank fields will remain unchanged';
    this.defineForm();
    this.form.patchValue({
      'email': this.userToEdit.email,
      'password': '',
      'confirmation': '',
      'nickname': this.userToEdit.nickname,
      'phone': this.userToEdit.phone,
      'website': this.userToEdit.website,
      'agreement': true
    });
    this.form.get('agreement')?.disable();
  }

  private defineForm(): void {
    const requiredArray: Array<(control: AbstractControl) => ValidationErrors | null> = [];
    if( !this.edit ) requiredArray.push(Validators.required);

    this.form = this.fb.group({
      'email': new FormControl('', requiredArray.concat([Validators.email])),
      'password': new FormControl('', requiredArray.concat([Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(8)])),
      'confirmation': new FormControl('', requiredArray),
      'nickname': new FormControl('', requiredArray.concat([Validators.pattern('[a-zA-Z0-9-]*')])),
      'phone': new FormControl('', requiredArray.concat([Validators.pattern('(\\+380\\d{9})?')])),
      'website': new FormControl('', requiredArray.concat([Validators.pattern('((https?:\\/\\/)?(www\\.)?([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\\.)+[a-zA-Z]+.*)?')])),
      'agreement': new FormControl('', [Validators.requiredTrue]),
    });
    this.form.setValidators(this.confirmPassword());
  }

  onSubmit() {
    if( this.form.valid ) {
      const password = this.form.get('password')?.value;
      const [cryptedPassword, e, n] = password ? this.mathService.encrypt(password) : ['', 0, 0];
      const user: User = {
        email: this.form.get('email')?.value,
        password: cryptedPassword,
        nickname: this.form.get('nickname')?.value,
        phone: this.form.get('phone')?.value,
        website: this.form.get('website')?.value,
        passwordKeys: [e, n]
      };

      if( this.edit ) {
        this.usersService.changeUser(this.userId, user);
        this.infoText = "Successful change !"
      } else {
        this.usersService.addUser(user);
        this.infoText = "Successful registration !";
      }
      this.router.navigate(['/users']);
    } else {
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
          this.infoText = `Fields with asterisk(*) are required`;
          break;
        case 'email':
          this.infoText = `Such mail doesn't exist`;
          break;
        case 'pattern':
          this.infoText = `${controlName} must satisfy the pattern ${control.errors.pattern.requiredPattern}`;
          break;
        case 'minlength':
          this.infoText = `Length of the ${controlName} must be more than or equal to ${control.errors.minlength.requiredLength}`;
          break;
        default:
          this.infoText = `Something went wrong! Please, try again`
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
