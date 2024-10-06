import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl: string = 'http://localhost:8080/client';

  constructor(
    private http: HttpClient
  ) { }

  getElements(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }
}
