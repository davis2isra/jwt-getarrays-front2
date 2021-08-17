import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if(httpRequest.url.includes('http://localhost:8080/api/login')) {
      return httpHandler.handle(httpRequest)
    }

    this.loginService.loadToken();
    const token = this.loginService.getToken();
    const request = httpRequest.clone ({
      headers: httpRequest.headers.set('Authorization', `Bearer ${token}` )
    });
    //console.log("")
    return httpHandler.handle(request);

  }

}
