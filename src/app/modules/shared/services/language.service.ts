import { Inject, Injectable, forwardRef } from '@angular/core';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject: BehaviorSubject<string>;
  public currentLanguage$: Observable<string>;

  constructor() {
    const savedLanguage = localStorage.getItem('appLanguage') || 'es';
    this.currentLanguageSubject = new BehaviorSubject<string>(savedLanguage);
    this.currentLanguage$ = this.currentLanguageSubject.asObservable();
  }

  get currentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  setCurrentLanguage(language: string): void {
    this.currentLanguageSubject.next(language);
  }


}
