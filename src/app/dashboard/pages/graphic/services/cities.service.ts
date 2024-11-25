import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl: String = 'http://localhost:8080/city'

  constructor(
    private http: HttpClient
  ) { }

  getCities(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`)
  }
}
