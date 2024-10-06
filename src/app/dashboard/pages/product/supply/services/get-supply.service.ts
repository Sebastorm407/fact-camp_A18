import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetSupplyService {

  private apiUrl: string = 'http://localhost:8080/supply';

  constructor(
    private http: HttpClient
  ) { }

  getSupply(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

}
