import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee, GetEmployee } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagementService {

  constructor(
    private http: HttpClient
  ) { }

  add( employee: Employee ): Promise<Object> {
    return new Promise((res, rej) => {
      this.http.post<Employee>(environment.url + 'create', JSON.stringify(employee)).subscribe({
        next: v => res(v),
        error: err => rej(err)
      });
    });
  }

  get( id: number ): Promise<Employee> {
    return new Promise((res, rej) => {
      this.http.get<Employee>(environment.url + 'employee/' + id).subscribe({
        next: v => res('data' in v ? v['data'] : v),
        error: err => rej(err),
      });
    });
  }

  getAll(): Promise<GetEmployee[]> {
    return new Promise((res, rej) => {
      this.http.get<GetEmployee[]>(environment.url + 'employees').subscribe({
        next: v => res('data' in v ? v['data'] : v),
        error: err => rej(err),
      });
    });
  }
}
