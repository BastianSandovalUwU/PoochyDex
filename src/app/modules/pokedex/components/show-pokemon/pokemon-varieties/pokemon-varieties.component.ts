import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { Router } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-pokemon-varieties',
  templateUrl: './pokemon-varieties.component.html',
  styleUrls: ['./pokemon-varieties.component.scss'],
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
export class PokemonVarietiesComponent implements OnInit, OnChanges {
  @Input() language: string = 'es';
  @Input() pokemonSpecie: PokemonSpecie;

  backgroundColor: string = '';
  pokemonVarieties: any[];
  pokemonId: string;
  filtersVisible = true;

  constructor(private helperService: HelperService,
              private pokeApiService: PokeApiService,
              private router: Router) { }

  ngOnInit() {
    this.getPokemonColor();
    this.getVarietiesInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.getVarietiesInfo();
      this.getPokemonColor();
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  getVarietiesInfo() {

    const pokemonVarieties = [];
    for (let i = 0; i < this.pokemonSpecie.varieties.length; i++) {
      const sprite = this.helperService.getPokemonSpriteImg(this.pokemonSpecie.varieties[i].pokemon.name, "home");
      const pokeInfo = {
        sprite: sprite,
        name: this.pokemonSpecie.varieties[i].pokemon.name
      }
      pokemonVarieties.push(pokeInfo);
    }
    this.pokemonVarieties = pokemonVarieties;
  }

  getPokemonColor() {
    if (this.pokemonSpecie && this.pokemonSpecie.color) {
      this.backgroundColor = this.helperService.getPokemonColor(this.pokemonSpecie.color.name);
    } else {
      this.backgroundColor = '';
    }
  }

  goToPokemonPage(pokemonName: string) {
    this.router.navigate(['/pokedex/show-pokemon/', pokemonName]);
  }

}
