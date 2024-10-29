import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../product/interfaces/product/product';
import { Bill } from '../../interfaces/bill';

@Injectable({
  providedIn: 'root'
})
export class DetailBillService {

  private apiUrl: string = 'http://localhost:8080/detail-bill'

  constructor(
    private http: HttpClient
  ) { }

  getDetailBill(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}`)
  }

  createDetailBill(detailbill: {amount: number, unit_price: number, id_product: number, id_bill: number}): Observable<any>{
    return this.http.post(`${this.apiUrl}`, detailbill)
  }
}
