import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon } from '../../../../../../entities/pokemon.entity';
import { PokemonSpecie } from '../../../../../../entities/pokemon-specie.entity';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { HelperService } from 'app/modules/shared/services/helper.service';

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
  loading: boolean = false;
  pokemonSprite: string;
  pokemonSpriteShiny: string;

  constructor(private pokeApiService: PokeApiService,
              private languageService: LanguageService,
              private helperService: HelperService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getLanguage();
    this.activatedRoute.params.subscribe(({ name }) => {
      if (name) {
        this.pokemonName = name;
        this.fetchPokemonData(name);
      }
    });
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  fetchPokemonData(name: string) {
    this.loading = true;

    this.getPokemonByName(name);
  }

  getPokemonByName(name: string) {
    this.pokeApiService.getPokemonByName(name).subscribe(
      (pokeInfo) => {
        this.pokemon = pokeInfo;
        this.pokemonSprite = this.helperService.getPokemonSpriteImg(this.pokemon.name, "home");
        this.pokemonSpriteShiny = this.helperService.getPokemonSpriteImg(this.pokemon.name, "homeShiny");
        this.getPokemonSpecie(pokeInfo.species.name);
      },
      (error) => {
        console.error('Error al obtener el Pokémon:', error);
        this.loading = false;
      }
    );
  }

  getPokemonSpecie(name: string) {
    this.pokeApiService.getPokemonSpecieById(name).subscribe(
      (specie) => {
        this.pokemonSpecie = specie;
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener la especie del Pokémon:', error);
        this.loading = false;
      }
    );
  }

}
