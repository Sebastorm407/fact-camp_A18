import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetClientService {

  private apiUrl: String = 'http://localhost:8080/client'

  constructor(
    private http: HttpClient
  ) { }

  getClients(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}`);
  }

  deleteClientById(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }

}
