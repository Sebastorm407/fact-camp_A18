import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginEmployee } from '../models/employee/employee';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private httpClient: HttpClient
  private API_URL: String = 'http://localhost:8080/employee';
  private loginUrl: string = 'http://localhost:8080/auth/login'; //Url de mi API de autenticacion
  private tokenKey: string = 'authToken';

  constructor(
    private injector: Injector,
    private router: Router
  ) {
    this.httpClient = this.injector.get(HttpClient)
   }

   /*

  login(number_id: string, password: string): Observable<any>{
    return this.httpClient.post(this.loginUrl, {number_id, password})
  }

  isAuthenticate(): boolean{
    const token = localStorage.getItem('token')
    return !!token;
  }

  logout(): void{
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }


  //OTHER SECTION

  getEmployeeById(employeeId: string): Observable<LoginEmployee>{
    return this.httpClient.get<LoginEmployee>(`${this.API_URL}/${employeeId}`)
  }

  getEmployees(): Observable<any>{
    return this.httpClient.get<any>(`${this.API_URL}`)
  }

  logins(id: string, password: string): Observable<any>{
    return this.httpClient.post<any>(`${this.API_URL}`, {id, password}).pipe(
      tap(res => {
        if(res.token){
          this.getToken();
        }
      })
    )
  }

  private setToken(token: string): void{
    localStorage.setItem(this.tokenKey, token)
  }

  private getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticates(): boolean{
    const token = this.getToken();
    if(!token){
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logouts(): void{
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login'])
  }
    */
}
