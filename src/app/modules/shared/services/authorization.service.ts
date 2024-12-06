import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private apiUrl = environment.nodeJsApi;

  constructor(private http: HttpClient) { }

  register(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/register`, userData);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/api/auth/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        // this.router.navigate(['/']);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    // this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
