import { Component, Input } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { Pokemon } from '../../../../../entities/poochydex-api/pokemon.type';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  @Input() language: string = 'es';
  @Input() routerLinkPath: string[] = ['/pokedex/show-pokemon'];

  constructor(private helperService: HelperService) {}

  getGameIconNameForLanguage(typeName: string, language: string): string {
    return this.helperService.getGameIconNameForLanguage(typeName, language);
  }

  addZerosToNumber(number: number): string {
    return this.helperService.addZerosToNumber(number);
  }

  getPokemonRouterLink(): string[] {
    return [...this.routerLinkPath, this.pokemon.name];
  }
}

