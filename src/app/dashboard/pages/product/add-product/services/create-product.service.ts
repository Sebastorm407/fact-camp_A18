import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product/product';

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

  //Actualizar producto
  updateProduct(id: number, product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product)
  }

}
