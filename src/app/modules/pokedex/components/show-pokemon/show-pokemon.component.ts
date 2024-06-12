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
      this.getPokemonByName(name);
    });
  }

  getPokemonByName(name: string) {
    this.pokeApiService.getPokemonByName(name).subscribe((pokeInfo) => {
      console.log(pokeInfo);
      this.pokemon = pokeInfo;
      this.getPokemonSpecie(pokeInfo.species.name);
    });
  }

  getPokemonSpecie(name: string) {
    this.pokeApiService.getPokemonSpecieById(name).subscribe((specie) => {
      console.log(specie);
      this.pokemonSpecie = specie;
    });
  }

}
