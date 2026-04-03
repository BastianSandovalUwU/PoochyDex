import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { LOCALIZATION_WORD_ES } from '../../../../../entities/common/i18n/ui-string-maps';

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
      if (this.language === 'es') {
        return LOCALIZATION_WORD_ES[word] ?? word;
      }
      return word;
    });

    return replacedWords.join(' ');
  }

}
