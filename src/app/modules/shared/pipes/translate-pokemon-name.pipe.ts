import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { translatePokemonName } from '../../../../../entities/common/enum';

@Pipe({
  name: 'translatePokemonName',
  pure: false
})
export class TranslatePokemonNamePipe implements PipeTransform {
  private language: string;

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  transform(value: string): string {
    return translatePokemonName(value, this.language);
  }
}
