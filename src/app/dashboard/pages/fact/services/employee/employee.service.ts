import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl: string = 'http://localhost:8080/employee';

  constructor(
    private http: HttpClient
  ) { }

  getEmployee(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}`)
  }

}

