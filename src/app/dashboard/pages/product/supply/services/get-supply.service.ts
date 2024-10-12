import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supply } from '../interfaces/supply/supply';

@Injectable({
  providedIn: 'root'
})
export class GetSupplyService {

  private apiUrlS: string = 'http://localhost:8080/supply';
  private apiUrlC: string = 'http://localhost:8080/category';

  constructor(
    private http: HttpClient
  ) { }

  getSupply(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrlS);
  }

    // Actualizar insumo
    updateSupply(id: number, supply: Supply): Observable<Supply> {
      return this.http.put<Supply>(`${this.apiUrlS}/${id}`, supply);
    }

    getCategory(): Observable<any[]>{
      return this.http.get<any[]>(this.apiUrlC);
    }

  deleteSupplyById(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrlS}/${id}`)
  }

}
