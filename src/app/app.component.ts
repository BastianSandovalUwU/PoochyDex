import { Component } from '@angular/core';
import { LanguageService } from './modules/shared/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poochydex';

  isMenuOpen = false;
  currentLanguage: string;

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  setLanguage(language: string): void {
    this.languageService.setLanguage(language);
  }

}
