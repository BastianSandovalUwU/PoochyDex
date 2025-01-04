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

}
