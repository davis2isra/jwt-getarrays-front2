import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html' ,
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isUserLoggedIn();
    this.username = localStorage.getItem("username");
  }

  isUserLoggedIn() {
    return this.loginService.isUserLoggedIn();
  }

  logout() {
    this.router.navigate(['/login']);
    return this.loginService.logout();
  }

}
