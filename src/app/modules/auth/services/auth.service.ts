import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse, SignUp } from '../../../../../entities/auth/auth.entity';
import { Router } from '@angular/router';
import { CreateUserConfigData, UserConfigData, UserConfigResponse, UserData } from '../../../../../entities/auth/user.entity';
import { LanguageService } from 'app/modules/shared/services/language.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.nodeJsApi;
  private sessionDataSubject = new BehaviorSubject<UserData | null>(this.getSessionData());
  private userConfigSubject = new BehaviorSubject<UserConfigData | null>(this.getUserConfigData());
  sessionData$ = this.sessionDataSubject.asObservable();
  userConfig$ = this.userConfigSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private languageService: LanguageService) { }

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

  getUserConfigs(): Observable<UserConfigResponse> {
    return this.http.get<UserConfigResponse>(`${this.apiUrl}/api/userConfig/getUserConfig`);
  }

  createUserConfig(userConfigData: CreateUserConfigData): Observable<CreateUserConfigData> {
    return this.http.post<CreateUserConfigData>(`${this.apiUrl}/api/userConfig/createUserConfig`, userConfigData).pipe(
      tap(response => {
        localStorage.setItem('userConfigData', JSON.stringify({ language: userConfigData.language }));
        localStorage.setItem('appLanguage', userConfigData.language);
        this.setLanguage(userConfigData.language);
      })
    );
  }

  logout() {
    this.clearSessionData();
    this.clearUserConfigData();
    this.router.navigate(['/auth/login']);
  }

  async createUserData(loginResponse: LoginResponse, username: string): Promise<UserData> {
    const userData: UserData = {
      user: username,
      token: loginResponse.token,
    };
    this.setSessionData(userData);
    return userData;
  }

  getSessionData(): UserData | null {
    const sessionData = localStorage.getItem('sessionData');
    return sessionData ? JSON.parse(sessionData) as UserData : null;
  }

  getUserConfigData(): UserConfigData | null {
    const userConfigData = localStorage.getItem('userConfigData');
    return userConfigData ? JSON.parse(userConfigData) as UserConfigData : null;
  }

  setSessionData(userData: UserData): void {
    localStorage.setItem('sessionData', JSON.stringify(userData));
    this.sessionDataSubject.next(userData);
  }

  setUserConfigData(userConfigData: UserConfigData): void {
    localStorage.setItem('userConfigData', JSON.stringify(userConfigData));
    this.userConfigSubject.next(userConfigData);
  }

  clearSessionData(): void {
    localStorage.removeItem('sessionData');
    this.sessionDataSubject.next(null);
  }

  clearUserConfigData(): void {
    localStorage.removeItem('userConfigData');
    this.userConfigSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.sessionDataSubject.value !== null;
  }

  setLanguageFromUser(language: string): void {
    if(this.isAuthenticated()) {
      try {
        this.createUserConfig({ language: language }).subscribe();
      } catch (error) {
        console.error('Error setting language:', error);
      }
    } else {
      this.setLanguage(language);
    }
  }

  setLanguage(language: string): void {
    localStorage.setItem('appLanguage', language);
    this.languageService.setCurrentLanguage(language);

  }

}
