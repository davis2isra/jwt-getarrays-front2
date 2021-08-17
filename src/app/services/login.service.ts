import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Login } from '../model/login.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = 'http://localhost:8080';
  private token: string;
  public loggedInUsername: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<any> {
    return this.http.post<any>(`${this.url}/api/login`, login);
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  saveToken( token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  saveUsername(token: any) {
    const tokenDecoded = this.jwtHelper.decodeToken(this.token);
    localStorage.setItem('username', tokenDecoded.sub);
  }


  loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    const tokenDecoded = this.jwtHelper.decodeToken(this.token);
    console.log('Token decodificado: ', tokenDecoded);
    if(this.token !== null && this.token !== '' && this.token !== 'null') {
      if(tokenDecoded.sub !== null || '') {
        if(!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = tokenDecoded.sub;
          console.log('Logged in username: ',this.loggedInUsername);
          return true;
        }
      }
    } else {
      this.logout();
      return false;
    }
  }
}
