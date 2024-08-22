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
          case 'Unova':
            return 'Teselia';
          case 'Route':
            return 'Ruta';
          // case 'Safari':
          //   return 'Zona';
          // case 'Zone':
          //   return 'Safari';
          case 'Area':
            return '';
          case 'Forest':
            return 'Bosque';
          case 'Lake':
            return 'Lago';
          case 'Sea':
            return 'Mar';
          case 'Falls':
            return 'Cataratas';
          case 'Islands':
            return 'Islas';
          case 'Garden':
            return 'Jardín';
          case 'Town':
            return 'Pueblo';
          case 'City':
            return 'Ciudad';
          case 'Cave':
            return 'Cueva';
          case 'Bike':
            return 'Bici';
          case 'Bridge':
            return 'Puente';
          case 'Well':
            return 'Pozo';
          case 'Mt':
            return 'Monte';
          case 'Silver':
            return 'Plateado';
          case '1f':
            return 'Primer Piso';
          case '2f':
            return 'Segundo Piso';
          case '3f':
            return 'Tercer Piso';
          case '4f':
            return 'Cuarto Piso';
          case 'Top':
            return 'Cima';
          case 'Gauntlet':
            return 'Pendiente';
          case 'Canyon':
            return 'Cañon';
          case 'Northwest':
            return 'Noroeste';
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
