import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/category/category';

@Injectable({
  providedIn: 'root'
})
export class GetCategoriesService {

  private apiUrl: string = 'http://localhost:8080/category'

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}`)
  }

  deleteCategory(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  updateCategory(id: number, category: Category): Observable<Category>{
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category)
  }
}
