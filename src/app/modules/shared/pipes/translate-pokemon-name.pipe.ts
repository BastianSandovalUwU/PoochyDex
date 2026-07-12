import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { translatePokemonName } from '../../../../../entities/common/enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Pipe({
    name: 'translatePokemonName',
    pure: false,
    standalone: false
})
export class TranslatePokemonNamePipe implements PipeTransform {
  private languageService = inject(LanguageService);

  private language: string;

  constructor() {
    this.languageService.currentLanguage$
      .pipe(takeUntilDestroyed())
      .subscribe(language => {
      this.language = language;
    });
  }

  transform(value: string): string {
    return translatePokemonName(value, this.language);
  }
}
