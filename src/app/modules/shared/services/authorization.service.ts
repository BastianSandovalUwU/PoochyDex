import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

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
    return this.http.post(`${this.apiUrl}/api/auth/login`, credentials);
  }
}
