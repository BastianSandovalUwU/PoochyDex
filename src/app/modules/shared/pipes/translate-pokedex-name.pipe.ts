import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { translateWithEsMap } from '../../../../../entities/common/i18n/lookup';
import { POKEDEX_NAME_ES } from '../../../../../entities/common/i18n/ui-string-maps';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Pipe({
    name: 'translatePokedexName',
    standalone: false
})
export class TranslatePokedexNamePipe implements PipeTransform {
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
    return translateWithEsMap(this.language, value, POKEDEX_NAME_ES);
  }

}
