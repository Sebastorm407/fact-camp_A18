import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = 'http://localhost:8080/product';

  constructor(
    private http: HttpClient
  ) { }

  private productsSubject = new BehaviorSubject<{ id: number, name: string, sell_price: number}[]>([]);
  products$ = this.productsSubject.asObservable();

  addProduct(product: {id: number, name: string, sell_price: number}){
    const currentProduct = this.productsSubject.value;
    this.productsSubject.next([...currentProduct, product]);
  }

  getProducts(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/all`)
  }

  getProductById(id: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`)
  }


}
