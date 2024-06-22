import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon } from '../../../../../../entities/pokemon.entity';
import { PokemonSpecie } from '../../../../../../entities/pokemon-specie.entity';
import { LanguageService } from 'app/modules/shared/services/language.service';

@Component({
  selector: 'app-show-pokemon',
  templateUrl: './show-pokemon.component.html',
  styleUrls: ['./show-pokemon.component.scss']
})
export class ShowPokemonComponent implements OnInit {

  language: string;
  pokemonName: string;
  pokemon: Pokemon;
  pokemonSpecie: PokemonSpecie;

  constructor(private pokeApiService: PokeApiService,
              private languageService: LanguageService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getLanguage();
    this.activatedRoute.params.subscribe(({ name }) => {
      this.pokemonName = name;
      this.getPokemonByName(name);
    });
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  getPokemonByName(name: string) {
    this.pokeApiService.getPokemonByName(name).subscribe((pokeInfo) => {
      this.pokemon = pokeInfo;
      this.getPokemonSpecie(pokeInfo.species.name);
    });
  }

  getPokemonSpecie(name: string) {
    this.pokeApiService.getPokemonSpecieById(name).subscribe((specie) => {
      this.pokemonSpecie = specie;
    });
  }

}
