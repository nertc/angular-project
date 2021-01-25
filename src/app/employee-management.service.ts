import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IEmployee, IGetEmployee } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagementService {

  constructor(
    private http: HttpClient
  ) { }

  add( employee: IEmployee ): Promise<Object> {
    return new Promise((res, rej) => {
      this.http.post<IEmployee>(environment.url + 'create', employee, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).subscribe({
        next: v => res(v),
        error: err => rej(err)
      });
    });
  }

  get( id: number ): Promise<IGetEmployee> {
    return new Promise((res, rej) => {
      this.http.get<IGetEmployee>(environment.url + 'employee/' + id).subscribe({
        next: v => res('data' in v ? v['data'] : v),
        error: err => rej(err),
      });
    });
  }

  getAll(): Promise<IGetEmployee[]> {
    return new Promise((res, rej) => {
      this.http.get<IGetEmployee[]>(environment.url + 'employees').subscribe({
        next: v => res('data' in v ? v['data'] : v),
        error: err => rej(err),
      });
    });
  }

  update( id: number, employee: IEmployee ): Promise<Object> {
    return new Promise((res, rej) => {
      this.http.put<IEmployee>(environment.url + 'update/' + id, employee, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).subscribe({
        next: v => res(v),
        error: err => rej(err)
      });
    });
  }

  delete( id: number ): Promise<any> {
    return new Promise((res, rej) => {
      this.http.delete<IEmployee>(environment.url + 'delete/' + id).subscribe({
        next: v => res(v),
        error: err => rej(err)
      });
    });
  }
}
