import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginEmployee } from '../models/employee/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private httpClient: HttpClient;
  private API_URL = 'http://localhost:8080/employee';

  constructor(private injector: Injector) {
    this.httpClient = this.injector.get(HttpClient);
  }

  getEmployee(employeeId: string): Observable<LoginEmployee> {
    return this.httpClient.get<LoginEmployee>(`<span class="math-inline">\{this\.API\_URL\}/</span>{employeeId}`);
  }
}

export function employeeServiceFactory(injector: Injector) {
  return new EmployeeService(injector);
}

