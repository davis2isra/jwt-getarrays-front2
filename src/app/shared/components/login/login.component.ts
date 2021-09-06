import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private notificationService: NotificationService) { }

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
        this.router.navigate(['/users/list']);
        this.notificationService.notify(NotificationType.SUCCESS, `Hola ${localStorage.getItem('username')}. Has iniciado sesion exitosamente.`)
      },
      (error) => {
        this.notificationService.notify(NotificationType.ERROR, 'Ha ocurrido un error. Por favor, intentelo de nuevo.');
      }

    )
  }

}
