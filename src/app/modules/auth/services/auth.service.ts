import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse, SignUp } from '../../../../../entities/auth/auth.entity';
import { Router } from '@angular/router';
import { CreateUserConfigData, UserConfigData, UserConfigResponse, UserData } from '../../../../../entities/auth/user.entity';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { UserSettingsService } from 'app/modules/shared/services/user-settings.service';
import { HomeScreenOption, LocalStorageKeys, PreferredSpriteOption } from '../../../../../entities/common/enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.nodeJsApi;
  private sessionDataSubject = new BehaviorSubject<UserData | null>(this.getSessionData());
  private userConfigSubject = new BehaviorSubject<UserConfigData | null>(this.getUserConfigData());
  sessionData$ = this.sessionDataSubject.asObservable();
  userConfig$ = this.userConfigSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private languageService: LanguageService,
    private userSettingsService: UserSettingsService,
  ) {}

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
      tap(() => {
        this.setLanguage(userConfigData.language);
      })
    );
  }

  updateUserConfig(language: string, preferredSprite: PreferredSpriteOption, homeScreen: HomeScreenOption): Observable<UserConfigResponse> {
    const current = this.getUserConfigData();
    const payload = { id: current?.id, language, preferredSprite, homeScreen };
    return this.http.put<UserConfigResponse>(`${this.apiUrl}/api/userConfig/updateUserConfig`, payload).pipe(
      tap(response => {
        this.setUserConfigData(response.config);
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
      ...(loginResponse.profileImgUrl ? { profileImgUrl: loginResponse.profileImgUrl } : {}),
    };
    this.setSessionData(userData);
    this.setUserConfigData(loginResponse.userConfig);
    return userData;
  }

  updateProfileImgUrl(url: string): void {
    const current = this.getSessionData();
    if (!current) return;
    this.setSessionData({ ...current, profileImgUrl: url });
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
    this.userSettingsService.setHomeScreen(userConfigData.home_screen as HomeScreenOption);
    this.userSettingsService.setPreferredSprite(userConfigData.preferred_sprite as PreferredSpriteOption);
    this.setLanguage(userConfigData.language);
  }

  clearSessionData(): void {
    localStorage.removeItem(LocalStorageKeys.SESSION_DATA);
    this.sessionDataSubject.next(null);
  }

  clearUserConfigData(): void {
    localStorage.removeItem(LocalStorageKeys.USER_CONFIG_DATA);
    this.userConfigSubject.next(null);
    const fallbackLanguage = localStorage.getItem(LocalStorageKeys.APP_LANGUAGE) || 'es';
    this.languageService.setCurrentLanguage(fallbackLanguage);
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
