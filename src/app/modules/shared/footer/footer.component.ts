import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { AuthService } from 'app/modules/auth/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear = new Date().getFullYear();
  currentLanguage: string;

  constructor(private languageService: LanguageService, private authService: AuthService) { }

  ngOnInit() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  setLanguage(language: string): void {
    this.authService.setLanguageFromUser(language);
  }

  languageToggleExtraClasses(lang: 'en' | 'es'): string {
    const active = this.currentLanguage === lang;
    const base =
      '!min-h-0 shrink-0 !px-2 !py-1.5 rounded-lg transition-opacity transition-shadow duration-200';
    return active
      ? `${base} ring-2 ring-blue-500/55 ring-offset-1 ring-offset-transparent dark:ring-blue-400/60 bg-gray-100/95 dark:bg-gray-700/70`
      : `${base} opacity-70 hover:opacity-100`;
  }

}
