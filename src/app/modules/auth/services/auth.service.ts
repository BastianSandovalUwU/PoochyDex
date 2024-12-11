import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse, SignUp } from '../../../../../entities/auth/auth.entity';
import { Router } from '@angular/router';
import { UserData } from '../../../../../entities/auth/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.nodeJsApi;
  private sessionDataSubject = new BehaviorSubject<UserData | null>(this.getSessionData());
  sessionData$ = this.sessionDataSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  register(newUserData: SignUp): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/register`, newUserData);
  }

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/auth/login`, credentials).pipe(
      tap(response => {
        this.createUserData(response, credentials.username);
        this.router.navigate(['/profile/show']);
      })
    );
  }

  logout() {
    this.clearSessionData();
    this.router.navigate(['/auth/login']);
  }

  createUserData(loginResponse: LoginResponse, username: string): UserData {
    const userData: UserData = {
      user: username,
      token: loginResponse.token
    };
    this.setSessionData(userData);
    return userData;
  }

  getSessionData(): UserData | null {
    const sessionData = localStorage.getItem('sessionData');
    return sessionData ? JSON.parse(sessionData) as UserData : null;
  }

  setSessionData(userData: UserData): void {
    localStorage.setItem('sessionData', JSON.stringify(userData));
    this.sessionDataSubject.next(userData);
  }

  clearSessionData(): void {
    localStorage.removeItem('sessionData');
    this.sessionDataSubject.next(null);
  }

}
