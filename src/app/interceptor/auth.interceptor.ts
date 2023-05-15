import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  token: any;
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // this.token= localStorage.getItem('angular-user');
    const tokenString: any = localStorage.getItem('angular-user');
    const tokenObject = JSON.parse(tokenString);
    // debugger;
    if (tokenObject) {
      // debugger;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenObject.token}`,
        },
      });
    }
    console.log(request);
    return next.handle(request);
  }
}
