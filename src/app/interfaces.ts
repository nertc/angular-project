export interface IEmployee {
  "name": string,
  "salary": number,
  "age": number,
}

export interface IGetEmployee {
  "id": number,
  "employee_name": string,
  "employee_salary": number,
  "employee_age": number,
  "profile_image"?: string,
}

export interface User extends Object {
  email: string,
  password: string,
  nickname: string,
  phone: string,
  website: string,
  passwordKeys?: [number, number]
};

export type UserProperty = 'email' | 'password' | 'nickname' | 'phone' | 'website';
