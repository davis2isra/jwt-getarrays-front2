import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarioslist',
  templateUrl: './usuarioslist.component.html',
  styleUrls: ['./usuarioslist.component.css']
})
export class UsuarioslistComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario;


  constructor(private usuarioService: UsuarioService,
              private loginService: LoginService,
              private router: Router,
              private modalService: ModalService) { }

  ngOnInit(): void {

    this.getUsuarios();

  }

  getUsuarios() {

    this.usuarioService.getUsuarios().subscribe(
      respuesta => {
        console.log(respuesta);
        this.usuarios = respuesta;
      }
    )

  }

  abrirModal(usuario: Usuario) {
    console.log("En el método abrirModal()");
    this.usuarioSeleccionado = usuario;
    this.modalService.abrirModal();
  }

  borrar(id: number) {
    console.log("Borrando: ", id);
    this.usuarioService.deleteUsuario(id).subscribe(
      respuesta => {
        this.getUsuarios();
        this.router.navigate(['/users/list']);
      }
    )
  }



}
