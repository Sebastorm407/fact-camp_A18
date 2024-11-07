import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private apiUrl: string = 'http://localhost:8080/bill'
  private apiUrlDetails: string = 'http://localhost:8080/detail-bill'

  constructor(
    private http: HttpClient
  ) { }

  getBills(): Observable<any>{
    return this.http.get(`${this.apiUrl}`);
  }

  getDetailById(billId: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrlDetails}/${billId}`); // Asegúrate de que la URL sea correcta
  }

  getDetails(): Observable<any>{
    return this.http.get(`${this.apiUrlDetails}`)
  }
}
