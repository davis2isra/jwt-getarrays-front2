import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarioslist',
  templateUrl: './usuarioslist.component.html',
  styleUrls: ['./usuarioslist.component.css']
})
export class UsuarioslistComponent implements OnInit {

  usuarios: Usuario[] = [];
  username: string = '';
  isLoggedIn: boolean = false;

  constructor(private usuarioService: UsuarioService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isUserLoggedIn();
    this.username = localStorage.getItem("username");
    this.usuarioService.getUsuarios().subscribe(
      respuesta => {
        console.log(respuesta);
        this.usuarios = respuesta;
      }
    )
  }

  isUserLoggedIn() {
    return this.loginService.isUserLoggedIn();
  }

  logout() {
    this.router.navigate(['/login']);
    return this.loginService.logout();
  }

}
