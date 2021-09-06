import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Usuario } from 'src/app/model/usuario.model';
import { NotificationService } from 'src/app/services/notification.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarioeditar',
  templateUrl: './usuarioeditar.component.html',
  styleUrls: ['./usuarioeditar.component.css']
})
export class UsuarioeditarComponent implements OnInit {

  pageTitle = '';
  usuario: Usuario;
  usuariosForm: FormGroup;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private usuariosService: UsuarioService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.usuariosForm = this.fb.group({
      'name': ['', Validators.required],
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });

    this.route.paramMap.subscribe(
      params => {
        let id = params.get('id');
        this.getUsuario(+id);
      }
    )
  }

  getUsuario(id: number) {
    this.usuariosService.getUsuario(id).subscribe(
      (usuario: Usuario) => this.displayUsuario(usuario)
    )
  }
  displayUsuario(usuario: Usuario): void {
    if(this.usuariosForm) {
      this.usuariosForm.reset();
    }
    this.usuario = usuario;
    if(this.usuario.id === 0) {
      this.pageTitle = 'Crear Usuario';
    } else {
      this.pageTitle = `Editar Usuario: ${this.usuario.name}`
    }

    this.usuariosForm.patchValue({
      name: this.usuario.name,
      username: this.usuario.username,
      password: this.usuario.password
    })

  }

  saveUsuario() {
    if(this.usuariosForm.valid) {
      if(this.usuariosForm.dirty) {
        const usr = { ...this.usuario, ...this.usuariosForm.value };

        if(usr.id === 0) {
          this.usuariosService.createUsuario(usr).subscribe(
            response =>{
              this.onSaveComplete();
              this.sendNotification(NotificationType.SUCCESS, 'Usuario Creado Exitosamente');
            },
            (errorResponse: HttpErrorResponse) => {
              this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
            }
          )
        } else {
          this.usuariosService.updateUsuario(usr).subscribe(
            response =>{
              this.onSaveComplete();
              this.sendNotification(NotificationType.SUCCESS, 'Usuario Editado Exitosamente');
            },
            (errorResponse: HttpErrorResponse) => {
              this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
            }
          )
        }
      }
    }
  }

  onSaveComplete() {
    this.usuariosForm.reset();
    this.router.navigate(['/users/list']);

  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if(message) {
      this.notificationService.notify(notificationType, message );
    } else {
      this.notificationService.notify(notificationType, 'Ha ocurrido un error. Por favor, intentelo de nuevo.' );
    }
  }


}
