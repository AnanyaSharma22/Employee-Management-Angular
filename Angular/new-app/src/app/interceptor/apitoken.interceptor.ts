import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ApitokenInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authenticationService.userToken ? this.authenticationService.userToken : this.authenticationService.publicToken;
    if (token) {
        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token
            }
        });
    }
    return next.handle(request);
  }
}
