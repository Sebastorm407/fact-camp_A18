import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCategoryService {

  private apiUrl = 'http://localhost:8080/category'

  constructor(
    private http: HttpClient
  ) { }

  createCategory(category: {name: string}): Observable<any>{
    console.log('Datos enviados:', category);  // Inspecciona los datos
    return this.http.post(`${this.apiUrl}`, category)
  }

  getCategory(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }
}
