import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

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
    if(this.language === 'es') {
      switch (value) {
        case 'water-stone': return 'Piedra Agua';
        case 'fire-stone': return 'Piedra Fuego';
        case 'leaf-stone': return 'Piedra Hoja';
        case 'thunder-stone': return 'Piedra Trueno';
        case 'sun-stone': return 'Piedra Solar';
        case 'moon-stone': return 'Piedra Lunar';
        case 'dawn-stone': return 'Piedra Alba';
        case 'shiny-stone': return 'Piedra Día';
        case 'dusk-stone': return 'Piedra Noche';
        case 'ice-stone': return 'Piedra Hielo';
        case 'level-up': return 'Subir de Nivel';
        case 'day': return 'Día';
        case 'night': return 'Noche';
        case 'fairy': return 'Hada';
        case 'use-item': return 'Usar Objeto';
        case 'trade': return 'Intercambiar';
        case 'take-damage': return 'Recibir Daño';
        case 'spin': return 'Girar';
        default: return value;
      }
    } else {
      return value;
    }

  }

}
