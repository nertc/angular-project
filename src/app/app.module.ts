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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RegistrationComponent,
    UsersListComponent,
    ExchangeComponent,
    EmployeeRegisterComponent,
    EmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: RegistrationComponent},
      { path: 'users', component: UsersListComponent},
      { path: 'edit/:userId', component: RegistrationComponent},
      { path: 'exchange', component: ExchangeComponent},
      { path: 'employee/register', component: EmployeeRegisterComponent},
      { path: 'employee', component: EmployeesComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
