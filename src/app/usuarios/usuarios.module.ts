import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { UsuarioslistComponent } from './usuarioslist/usuarioslist.component';
import { UsuariodetalleComponent } from './usuariodetalle/usuariodetalle.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { UsuarioeditarComponent } from './usuarioeditar/usuarioeditar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsuariosComponent,
    UsuarioslistComponent,
    UsuariodetalleComponent,
    ConfirmDialogComponent,
    UsuarioeditarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
