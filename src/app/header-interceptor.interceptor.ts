import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiKey = 'yxiTJkNaWNPwfxqPpwZDzavQQtD3'
    const headers = new HttpHeaders({
      'apikey': apiKey,
    });
    const newReq = request.clone({
      headers: headers
    })
    console.log('intercepted!')
    return next.handle(newReq);
  }
}
