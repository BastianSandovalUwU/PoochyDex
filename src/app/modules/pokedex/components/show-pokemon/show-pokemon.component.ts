import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon } from '../../../../../../entities/pokemon.entity';
import { PokemonSpecie } from '../../../../../../entities/pokemon-specie.entity';

@Component({
  selector: 'app-show-pokemon',
  templateUrl: './show-pokemon.component.html',
  styleUrls: ['./show-pokemon.component.scss']
})
export class ShowPokemonComponent implements OnInit {

  language: string = 'es';
  pokemonName: string;
  pokemon: Pokemon;
  pokemonSpecie: PokemonSpecie;

  constructor(private pokeApiService: PokeApiService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ name }) => {
      this.pokemonName = name;
      this.getPokemonByName();
    });
  }

  getPokemonByName() {
    this.pokeApiService.getPokemonByName(this.pokemonName).subscribe((pokeInfo) => {
      this.pokemon = pokeInfo;
      this.getPokemonSpecie();
    });
  }

  getPokemonSpecie() {
    this.pokeApiService.getPokemonSpecieById(this.pokemon.species.name).subscribe((specie) => {
      this.pokemonSpecie = specie;
    });
  }

}
