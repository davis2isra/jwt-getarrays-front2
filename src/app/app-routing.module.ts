import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsuariodetalleComponent } from './components/usuariodetalle/usuariodetalle.component';
import { UsuarioslistComponent } from './components/usuarioslist/usuarioslist.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'usuarioslist', component: UsuarioslistComponent},
  {path: 'usuariosdetalle/:id', component: UsuariodetalleComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
