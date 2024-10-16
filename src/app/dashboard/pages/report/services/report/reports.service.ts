import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private apiUrl: string = 'http://localhost:8080/bill'

  constructor(
    private http: HttpClient
  ) { }

  getBills(): Observable<any>{
    return this.http.get(`${this.apiUrl}`);
  }
}
