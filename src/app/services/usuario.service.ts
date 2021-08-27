import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}/api/users`);
  }

  getUsuario(id: number): Observable<Usuario> {
    if(id === 0){
      return of(this.initializeUser())
    }

    return this.http.get<Usuario>(`${this.url}/api/user/${id}`);
  }

  initializeUser(): Usuario {
    return {
      id: 0,
      name: null,
      password: null,
      username: null

    }
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${this.url}/api/user/delete/${id}`);
  }

  createUsuario(usr: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/api/user/save`, usr);
  }

  updateUsuario(usr: any) {
    return this.http.put<Usuario>(`${this.url}/api/user/update/${usr.id}`, usr);
  }
}
