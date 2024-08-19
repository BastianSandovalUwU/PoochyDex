import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translateLocalizationName'
})
export class TranslateLocalizationNamePipe implements PipeTransform {
  language: string;

  constructor(private languageService: LanguageService) {
    this.getLanguage();
  }
  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  transform(value: string): string {
    if (!value) return value;

    const words = value.split(' ');

    const replacedWords = words.map(word => {
      if(this.language === 'es') {
        switch (word) {
          case 'Route':
            return 'Ruta';
          case 'Safari Zone':
            return 'Zona Safari';
          case 'Area':
            return '';
          case 'Forest':
            return 'Bosque';
          case 'Garden':
            return 'Jardín';
          case 'Town':
            return 'Pueblo';
          case 'City':
            return 'Ciudad';
          case 'Cave':
            return 'Cueva';
          case 'Bridge':
            return 'Puente';
            default:
              return word;
            }
      } else {
        return word;
      }
    });

    return replacedWords.join(' ');
  }

}
