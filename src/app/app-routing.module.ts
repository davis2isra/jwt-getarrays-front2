import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'users', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)},
  {path: '', redirectTo: 'users', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
