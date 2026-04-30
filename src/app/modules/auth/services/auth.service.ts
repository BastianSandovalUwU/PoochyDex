import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse, SignUp } from '../../../../../entities/auth/auth.entity';
import { Router } from '@angular/router';
import { CreateUserConfigData, UserConfigData, UserConfigResponse, UserData } from '../../../../../entities/auth/user.entity';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { LocalStorageKeys } from '../../../../../entities/common/enum';

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
        this.createUserData(response);
      })
    );
  }

  getUserConfigs(): Observable<UserConfigResponse> {
    return this.http.get<UserConfigResponse>(`${this.apiUrl}/api/userConfig/getUserConfig`);
  }

  createUserConfig(userConfigData: CreateUserConfigData): Observable<CreateUserConfigData> {
    return this.http.post<CreateUserConfigData>(`${this.apiUrl}/api/userConfig/createUserConfig`, userConfigData).pipe(
      tap(response => {
        localStorage.setItem(LocalStorageKeys.USER_CONFIG_DATA, JSON.stringify({ language: userConfigData.language }));
        localStorage.setItem(LocalStorageKeys.APP_LANGUAGE, userConfigData.language);
        this.setLanguage(userConfigData.language);
      })
    );
  }

  updateUserConfig(userConfigData: UserConfigData): Observable<CreateUserConfigData> {
    return this.http.put<CreateUserConfigData>(`${this.apiUrl}/api/userConfig/updateUserConfig`, userConfigData).pipe(
      tap(response => {
        localStorage.setItem(LocalStorageKeys.USER_CONFIG_DATA, JSON.stringify({ language: userConfigData.language }));
        localStorage.setItem(LocalStorageKeys.APP_LANGUAGE, userConfigData.language);
        this.setLanguage(userConfigData.language);
      })
    );
  }

  logout() {
    this.clearSessionData();
    this.clearUserConfigData();
  }

  async createUserData(loginResponse: LoginResponse): Promise<UserData> {
    const userData: UserData = {
      user: loginResponse.username,
      role: loginResponse.role,
      token: loginResponse.token,
    };
    this.setSessionData(userData);
    return userData;
  }

  getSessionData(): UserData | null {
    const sessionData = localStorage.getItem(LocalStorageKeys.SESSION_DATA);
    return sessionData ? JSON.parse(sessionData) as UserData : null;
  }

  getUserConfigData(): UserConfigData | null {
    const userConfigData = localStorage.getItem(LocalStorageKeys.USER_CONFIG_DATA);
    return userConfigData ? JSON.parse(userConfigData) as UserConfigData : null;
  }

  setSessionData(userData: UserData): void {
    localStorage.setItem(LocalStorageKeys.SESSION_DATA, JSON.stringify(userData));
    this.sessionDataSubject.next(userData);
  }

  setUserConfigData(userConfigData: UserConfigData): void {
    localStorage.setItem(LocalStorageKeys.USER_CONFIG_DATA, JSON.stringify(userConfigData));
    this.userConfigSubject.next(userConfigData);
  }

  clearSessionData(): void {
    localStorage.removeItem(LocalStorageKeys.SESSION_DATA);
    this.sessionDataSubject.next(null);
  }

  clearUserConfigData(): void {
    localStorage.removeItem(LocalStorageKeys.USER_CONFIG_DATA);
    this.userConfigSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.sessionDataSubject.value !== null;
  }

  setLanguageFromUser(language: string): void {
    // Future: when authenticated, persist language via updateUserConfig / createUserConfig
    // (see API routes under /api/userConfig) instead of only localStorage.
    this.setLanguage(language);
  }

  setLanguage(language: string): void {
    localStorage.setItem(LocalStorageKeys.APP_LANGUAGE, language);
    this.languageService.setCurrentLanguage(language);

  }

}
