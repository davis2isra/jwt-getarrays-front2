import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  login(): void {
    const loginvalues = this.loginForm.value;

    this.loginService.login(loginvalues).subscribe(
      res => {
        console.log(res);
        const token = res.token
        this.loginService.saveToken(token);
        this.loginService.saveUsername(token);
        this.router.navigate(['/usuarioslist']);
      }

    )
  }

}
