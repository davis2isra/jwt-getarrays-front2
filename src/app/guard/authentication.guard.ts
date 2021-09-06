import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { LoginService } from '../services/login.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private router: Router,
              private notificationService: NotificationService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isUserLoggedIn();
  }

  isUserLoggedIn(): boolean {
    if(this.loginService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.notificationService.notify(NotificationType.ERROR, 'Necesitar iniciar sesión para acceder a ésta página.');
      return false;
    }

  }

}
