import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateProductService {

  private apiUrl: string = 'http://localhost:8080/product'

  constructor(
    private http: HttpClient
  ) { }

  createProduct(product: {name: string, sell_price: number}): Observable<any>{
    return this.http.post(`${this.apiUrl}`, product)
  }
}
