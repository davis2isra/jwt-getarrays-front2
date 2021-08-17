import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
