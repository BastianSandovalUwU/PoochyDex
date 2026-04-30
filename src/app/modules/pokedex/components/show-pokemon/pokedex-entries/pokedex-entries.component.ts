import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { Router } from '@angular/router';
import { toggleSectionCollapseAnimations } from 'app/modules/shared/animations/toggle-section-collapse.animation';

@Component({
  selector: 'app-pokedex-entries',
  templateUrl: './pokedex-entries.component.html',
  styleUrls: ['./pokedex-entries.component.scss'],
  animations: toggleSectionCollapseAnimations
})
export class PokedexEntriesComponent implements OnInit, OnChanges {
  @Input() language: string;
  @Input() pokemonSpecie: PokemonSpecie;

  flavorTextEntries: { flavor_text: string, version: string }[] = [];
  backgroundColor: string = '';
  filtersVisible = false;

  constructor(private helperService: HelperService,
              private router: Router
  ) { }

  ngOnInit() {
    this.getPokemonColor();
    this.filterFlavorTextEntries();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getPokemonColor();
    this.filterFlavorTextEntries();
  }


  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
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

}
