import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private targetApiUrl = 'https://poochy-dex-api-node-js.vercel.app';

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(this.targetApiUrl)) {
      const sessionData = this.authService.getSessionData();
      if (sessionData) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${sessionData.token}`
          }
        });
        return next.handle(authReq);
      }
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}
