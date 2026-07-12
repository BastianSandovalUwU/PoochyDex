import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { LOCALIZATION_WORD_ES } from '../../../../../entities/common/i18n/ui-string-maps';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Pipe({
    name: 'translateLocalizationName',
    standalone: false
})
export class TranslateLocalizationNamePipe implements PipeTransform {
  private languageService = inject(LanguageService);

  language: string;

  constructor() {
    this.getLanguage();
  }
  getLanguage() {
    this.languageService.currentLanguage$
      .pipe(takeUntilDestroyed())
      .subscribe(language => {
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
