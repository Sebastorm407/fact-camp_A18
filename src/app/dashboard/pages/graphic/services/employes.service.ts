import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployesService {

  private apiUrl: String = 'http://localhost:8080/employee'

  constructor(
    private http: HttpClient
  ) { }

  getEmployees(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`)
  }

  deleteEmployeeById(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }

  createEmployee(employee: any): Observable<any>{
    return this.http.post(`${this.apiUrl}`, employee)
  }
}
