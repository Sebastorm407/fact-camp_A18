import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private apiUrl: string = 'http://localhost:8080/bill'

  constructor(
    private http: HttpClient
  ) { }

  getBill(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}`);
  }

  createBill(bill: {make_date: string, id_client: number, id_employee: number}): Observable<any>{
    console.log('Datos enviados', bill)
    return this.http.post(`${this.apiUrl}`, bill)
  }
}
