import { Inject, Injectable, forwardRef } from '@angular/core';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageKeys } from '../../../../../entities/common/enum';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject: BehaviorSubject<string>;
  public currentLanguage$: Observable<string>;

  constructor() {
    const savedLanguage = this.resolveInitialLanguage();
    this.currentLanguageSubject = new BehaviorSubject<string>(savedLanguage);
    this.currentLanguage$ = this.currentLanguageSubject.asObservable();
  }

  private resolveInitialLanguage(): string {
    const configData = localStorage.getItem(LocalStorageKeys.USER_CONFIG_DATA);
    if (configData) {
      const config = JSON.parse(configData);
      if (config?.language) return config.language;
    }
    return localStorage.getItem(LocalStorageKeys.APP_LANGUAGE) || 'es';
  }

  get currentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  setCurrentLanguage(language: string): void {
    this.currentLanguageSubject.next(language);
  }


}
