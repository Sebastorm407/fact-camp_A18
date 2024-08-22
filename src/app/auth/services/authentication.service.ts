import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginEmployee } from '../models/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private httpClient: HttpClient
  private API_URL: String = 'http://localhost:8080/employee';

  constructor(
    private injector: Injector
  ) {
    this.httpClient = this.injector.get(HttpClient)
   }

  getEmployee(employeeId: string): Observable<LoginEmployee>{
    return this.httpClient.get<LoginEmployee>(`${this.API_URL}/${employeeId}`)
  }
}
