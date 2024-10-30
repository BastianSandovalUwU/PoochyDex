import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-pokedex-entries',
  templateUrl: './pokedex-entries.component.html',
  styleUrls: ['./pokedex-entries.component.scss'],
  animations: [
    trigger('toggleFilters', [
      state('visible', style({
        height: '*',
        opacity: 1
      })),
      state('hidden', style({
        height: '0px',
        opacity: 0
      })),
      transition('visible <=> hidden', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
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
