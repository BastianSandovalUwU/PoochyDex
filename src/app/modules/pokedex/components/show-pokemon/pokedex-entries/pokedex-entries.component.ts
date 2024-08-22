import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokedex-entries',
  templateUrl: './pokedex-entries.component.html',
  styleUrls: ['./pokedex-entries.component.scss']
})
export class PokedexEntriesComponent implements OnInit, OnChanges {
  @Input() language: string;
  @Input() pokemonSpecie: PokemonSpecie;

  flavorTextEntries: { flavor_text: string, version: string }[] = [];
  backgroundColor: string = '';

  constructor(private helperService: HelperService,
              private router: Router) { }

  ngOnInit() {
    this.getPokemonColor();
    this.filterFlavorTextEntries();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getPokemonColor();
    this.filterFlavorTextEntries();
  }

  filterFlavorTextEntries(): void {
    this.flavorTextEntries = this.pokemonSpecie.flavor_text_entries
      .filter(entry => entry.language.name === this.language)
      .map(entry => ({
        flavor_text: entry.flavor_text,
        version: entry.version.name
      }));
  }

  getGameVersionColor(gameVersion: string): string {
    return this.helperService.getGameVersionColor(gameVersion);
  }

  getGameName(gameName: string): string {
    return this.helperService.getGameName(gameName, this.language);
  }

  getGameIconGame(gameName: string): string[] {
    return this.helperService.getGameIconGame(gameName);
  }

  getPokemonColor() {
    if (this.pokemonSpecie && this.pokemonSpecie.color) {
      this.backgroundColor = this.helperService.getPokemonColor(this.pokemonSpecie.color.name);
    } else {
      this.backgroundColor = '';
    }
  }

  navigateToGame(gameName: string) {
    const gameMap: { [key: string]: string } = {
      'red': 'red-blue',
      'blue': 'red-blue',
      'yellow': 'yellow',
      'gold': 'gold-silver',
      'silver': 'gold-silver',
      'crystal': 'crystal',
      'ruby': 'ruby-sapphire',
      'sapphire': 'ruby-sapphire',
      'emerald': 'emerald',
      'firered': 'firered-leafgreen',
      'leafgreen': 'firered-leafgreen',
      'diamond': 'diamond-pearl',
      'pearl': 'diamond-pearl',
      'platinum': 'platinum',
      'heartgold': 'heartgold-soulsilver',
      'soulsilver': 'heartgold-soulsilver',
      'black': 'black-white',
      'white': 'black-white',
      'black-2': 'black-2-white-2',
      'white-2': 'black-2-white-2',
      'x': 'x-y',
      'y': 'x-y',
      'omega-ruby': 'omega-ruby-alpha-sapphire',
      'alpha-sapphire': 'omega-ruby-alpha-sapphire',
      'sun': 'sun-moon',
      'moon': 'sun-moon',
      'ultra-sun': 'ultra-sun-ultra-moon',
      'ultra-moon': 'ultra-sun-ultra-moon',
      'lets-go-pikachu': 'lets-go-pikachu-lets-go-eevee',
      'lets-go-eevee': 'lets-go-pikachu-lets-go-eevee',
      'sword': 'sword-shield',
      'shield': 'sword-shield',
      'scarlet': 'scarlet-violet',
      'violet': 'scarlet-violet',
    };

    const name = gameMap[gameName];

    if (name) {
      this.router.navigate(['/game/show-game', name]);
    }
  }


}
