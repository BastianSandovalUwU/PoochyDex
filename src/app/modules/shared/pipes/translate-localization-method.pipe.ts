import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translateLocalizationMethod'
})
export class TranslateLocalizationMethodPipe implements PipeTransform {
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
    if(this.language === 'es') {
      switch (value) {
        case 'surf': return 'Salvaje, haciendo Surf';
        case 'walk': return 'Salvaje';
        case 'gift': return 'Regalo';
        case 'sos-encounter': return 'Encuentro SOS';
        case 'island-scan': return 'Escáner Insular';
        case 'only-one': return 'Solo uno';
        case 'gift-egg': return 'Regalado en Huevo';
        case 'old-rod': return 'Caña Vieja';
        case 'good-rod': return 'Caña Buena';
        case 'super-rod': return 'Super Caña';
        default: return value;
      }
    } else {
      return value;
    }

  }

}
