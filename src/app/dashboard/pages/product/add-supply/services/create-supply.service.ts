import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supply } from '../../supply/interfaces/supply/supply';

@Injectable({
  providedIn: 'root'
})
export class CreateSupplyService {

  private apiUrl: string = 'http://localhost:8080/supply'

  constructor(
    private http: HttpClient
  ) { }

  createSupply(supply: Supply): Observable<any>{
    return this.http.post(`${this.apiUrl}`, supply)
  }
}
