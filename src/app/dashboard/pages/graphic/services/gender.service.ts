import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private apiUrl: String = 'http://localhost:8080/gender'

  constructor(
    private http: HttpClient
  ) { }

  getGender(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`)
  }
}
