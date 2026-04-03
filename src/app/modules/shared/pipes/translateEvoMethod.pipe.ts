import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { translateWithEsMap } from '../../../../../entities/common/i18n/lookup';
import { EVO_METHOD_ES } from '../../../../../entities/common/i18n/ui-string-maps';

@Pipe({
  name: 'translateEvoMethod'
})
export class TranslateEvoMethodPipe implements PipeTransform {
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
    return translateWithEsMap(this.language, value, EVO_METHOD_ES);
  }

}
