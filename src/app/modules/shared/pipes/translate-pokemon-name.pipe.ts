import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translatePokemonName'
})
export class TranslatePokemonNamePipe implements PipeTransform {
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
        case 'gouging-fire': return 'Flamariete';
        case 'raging-bolt': return 'Electrofuria';
        case 'iron-boulder': return 'Ferromole';
        case 'iron-crown': return 'Ferrotesta';
        case 'walking-wake': return 'Ondulagua';
        case 'iron-leaves': return 'Ferroverdor';
        case 'great-tusk': return 'Colmilargo';
        case 'scream-tail': return 'Colagrito';
        case 'brute-bonnet': return 'Furioseta';
        case 'flutter-mane': return 'Melenaleteo';
        case 'slither wing': return 'Reptalada';
        case 'sandy-shocks': return 'Pelarena';
        case 'iron-treads': return 'Ferrodada';
        case 'iron-bundle': return 'Ferrosaco';
        case 'iron-hands': return 'Ferropalmas';
        case 'iron-jugulis': return 'Ferrocuello';
        case 'iron-moth': return 'Ferropolilla';
        case 'iron-thorns': return 'Ferropúas';
        case 'roaring-moon': return 'Bramaluna';
        case 'iron-valiant': return 'Ferropaladin';
        case 'ogerpon-hearthflame-mask': return 'Ogerpon Máscara Horno';
        case 'ogerpon-wellspring-mask': return 'Ogerpon Máscara Fuente';
        case 'ogerpon-cornerstone-mask': return 'Ogerpon Máscara Cimiento';
        case 'ogerpon-teal-mask': return 'Ogerpon Máscara Turquesa';
        default: return value;
      }
    } else {
      return value;
    }

  }
}
