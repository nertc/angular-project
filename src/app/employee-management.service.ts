import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagementService {

  constructor(
    private http: HttpClient
  ) { }

  add( employee: Employee ): Promise<Object> {
    return new Promise((res, rej) => {
      this.http.post<Employee>('http://dummy.restapiexample.com/api/v1/create', JSON.stringify(employee)).subscribe({
        next: v => res(v),
        error: err => rej(err)
      });
    });
  }

  get( id: number ): Promise<Employee> {
    return new Promise((res, rej) => {
      this.http.get<Employee>('http://dummy.restapiexample.com/api/v1/employee/' + id).subscribe({
        next: v => res('data' in v ? v['data'] : v),
        error: err => rej(err)
      });
    });
  }
}
