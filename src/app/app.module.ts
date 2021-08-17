import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioslistComponent } from './components/usuarioslist/usuarioslist.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { UsuariodetalleComponent } from './components/usuariodetalle/usuariodetalle.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuarioslistComponent,
    UsuariodetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
