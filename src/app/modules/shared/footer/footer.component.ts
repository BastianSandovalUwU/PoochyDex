import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear = new Date().getFullYear();
  currentLanguage: string;

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  setLanguage(language: string): void {
    this.languageService.setLanguage(language);
  }

}
