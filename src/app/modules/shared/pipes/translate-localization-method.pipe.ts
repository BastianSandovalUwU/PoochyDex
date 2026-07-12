import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { translateWithEsMap } from '../../../../../entities/common/i18n/lookup';
import { LOCALIZATION_METHOD_ES } from '../../../../../entities/common/i18n/ui-string-maps';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Pipe({
    name: 'translateLocalizationMethod',
    standalone: false
})
export class TranslateLocalizationMethodPipe implements PipeTransform {
  language: string;

  constructor(private languageService: LanguageService) {
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
    return translateWithEsMap(this.language, value, LOCALIZATION_METHOD_ES);
  }

}
