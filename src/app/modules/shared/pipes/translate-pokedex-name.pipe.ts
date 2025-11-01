import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translatePokedexName'
})
export class TranslatePokedexNamePipe implements PipeTransform {
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
          case "national" : return 'Nacional';
          case "kanto" : return 'Kanto';
          case "original-johto" : return 'Johto';
          case "hoenn" : return 'Hoenn';
          case "original-sinnoh" : return 'Sinnoh';
          case "extended-sinnoh" : return 'Sinnoh (Platino)';
          case "updated-johto" : return 'Johto (Remakes)';
          case "original-unova" : return 'Teselia';
          case "updated-unova" : return 'Teselia (Secuela)';
          case "conquest-gallery" : return 'Conquest';
          case "kalos-central" : return 'Kalos Centro';
          case "kalos-coastal" : return 'Kalos Costa';
          case "kalos-mountain" : return 'Kalos Montaña';
          case "updated-hoenn" : return 'Hoenn (Remakes)';
          case "original-alola" : return 'Alola';
          case "original-melemele" : return 'Mele Mele';
          case "original-akala" : return 'Akala';
          case "original-ulaula" : return 'Ula Ula';
          case "original-poni" : return 'Poni';
          case "updated-alola" : return 'Alola (Ultra)';
          case "updated-melemele" : return 'Melemele (Ultra)';
          case "updated-akala" : return 'Akala (Ultra)';
          case "updated-ulaula" : return 'Ula Ula (Ultra)';
          case "updated-poni" : return 'Poni (Ultra)';
          case "letsgo-kanto" : return "Kanto (Let's Go)";
          case "galar" : return 'Galar';
          case "isle-of-armor" : return 'Isla de la Amradura';
          case "crown-tundra" : return 'Nieves de la Corona';
          case "hisui" : return 'Hisui';
          case "paldea" : return 'Paldea';
          case "kitakami" : return 'Kitakami';
          case "blueberry" : return 'Arandano';
          case "lumiose-city" : return 'Ciudad Luminalia';
        default: return value;
      }
    } else {
      return value;
    }

  }

}
