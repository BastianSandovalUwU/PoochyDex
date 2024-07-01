import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';

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

  constructor(private helperService: HelperService) { }

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
    console.log(this.flavorTextEntries);
  }

  getGameVersionColor(gameVersion: string): string {
    return this.helperService.getGameVersionColor(gameVersion);
  }

  getGameName(gameName: string): string {
    return this.helperService.getGameName(gameName, this.language);
  }

  getPokemonColor() {
    if (this.pokemonSpecie && this.pokemonSpecie.color) {
      this.backgroundColor = this.helperService.getPokemonColor(this.pokemonSpecie.color.name);
    } else {
      this.backgroundColor = ''; // Asigna una cadena vacía si no hay color
    }
  }


}
