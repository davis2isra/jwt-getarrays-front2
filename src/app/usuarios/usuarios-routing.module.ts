import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariodetalleComponent } from './usuariodetalle/usuariodetalle.component';
import { UsuarioeditarComponent } from './usuarioeditar/usuarioeditar.component';
import { UsuariosComponent } from './usuarios.component';
import { UsuarioslistComponent } from './usuarioslist/usuarioslist.component';

const routes: Routes = [
  {
    path: '', // /users
    component: UsuariosComponent,
    children: [
      {
        path: '', // /users -> /users/list
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list', // /users/list
        component: UsuarioslistComponent
      },
      {
        path: 'detalle/:id', // /users/detalle/1
        component: UsuariodetalleComponent
      },
      {
        path: 'edit/:id', // /users/edit/1
        component: UsuarioeditarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
