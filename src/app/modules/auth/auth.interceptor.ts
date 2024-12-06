import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../shared/services/authorization.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private targetApiUrl = 'https://poochy-dex-api-node-js.vercel.app';

  constructor(private authService: AuthorizationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(this.targetApiUrl)) {
      const token = this.authService.getToken();

      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(authReq);
      }
    }

    return next.handle(req);
  }
}
