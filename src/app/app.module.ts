import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login.guard';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RegistrationComponent,
    UsersListComponent,
    ExchangeComponent,
    EmployeeRegisterComponent,
    EmployeesComponent,
    EmployeeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: RegistrationComponent},
      { path: 'users', component: UsersListComponent, canActivate: [LoginGuard]},
      { path: 'edit/:userId', component: RegistrationComponent, canActivate: [LoginGuard]},
      { path: 'exchange', component: ExchangeComponent},
      { path: 'employee/register', component: EmployeeRegisterComponent},
      { path: 'employees', component: EmployeesComponent},
      { path: 'employees/:id', component: EmployeeComponent},
      { path: 'login', component: LoginComponent},
      { path: '**', redirectTo: 'login'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
