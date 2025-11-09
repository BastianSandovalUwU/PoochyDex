import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { environment } from 'environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private targetApiUrl = environment.nodeJsApi;

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
        return next.handle(authReq).pipe(
          catchError((error) => {
            if (error.status === 401) {
              console.error('❌ Unauthorized (401) - Token may be invalid or expired');
              // Opcional: descomentar para cerrar sesión automáticamente en 401
              // this.authService.logout();
            }
            return throwError(() => error);
          })
        );
      } else {
        console.log('⚠️ No session data found for:', req.url);
      }
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('❌ Unauthorized (401)');
        }
        return throwError(() => error);
      })
    );
  }
}
