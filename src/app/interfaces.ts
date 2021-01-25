export interface Employee {
  "name": string,
  "salary": number,
  "age": number,
}

export interface GetEmployee {
  "id": number,
  "employee_name": string,
  "employee_salary": number,
  "employee_age": number,
  "profile_image"?: string,
}
