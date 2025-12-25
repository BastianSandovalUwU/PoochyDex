import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { ErrorMessageService } from 'app/services/error-message.service';
import { Pokemon } from '../../../../../../entities/poochydex-api/pokemon.type';
import { LoadingService } from 'app/modules/shared/services/loading.service';
import { PoochyDexApiService } from 'app/modules/poochyDexApi/services/poochyDexApi.service';
import { Pokedex } from '../../../../../../entities/poke-api.entity';
@Component({
  selector: 'app-show-pokedex',
  templateUrl: './show-pokedex.component.html',
  styleUrls: ['./show-pokedex.component.scss']
})
export class ShowPokedexComponent implements OnInit {
  language: string;
  pokedexNumber: number;
  pokedexName: string;
  pokedex: Pokedex | null = null;
  allPokemon: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  loading: boolean = false;

  constructor(private pokeApiService: PokeApiService,
              private languageService: LanguageService,
              private helperService: HelperService,
              private activatedRoute: ActivatedRoute,
              private errorMessageService: ErrorMessageService,
              private loadingService: LoadingService,
              private poochyDexApiService: PoochyDexApiService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ number }) => {
      this.pokedexName = number;
      this.pokedexNumber = this.helperService.getPokedexNumber(number);
      this.getPokedex(this.pokedexNumber);
    });
    this.getLanguage();
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  getPokedex(num: number): void {
    this.pokeApiService.getPokedex(num).subscribe({
      next: (pokemon) => {
        this.pokedex = pokemon;
        this.getPokemon();
      },
      error: (error) => {
        console.error('Error al obtener los Pokémon:', error);
        this.loadingService.hide();
        this.loading = false;
      }
    });
  }

  getPokemon() {
    this.loading = true;
    this.loadingService.show();
    this.poochyDexApiService.getAllPokemon().subscribe({
      next: (response) => {
        this.allPokemon = response.data;
        this.filteredPokemon = this.createFilteredPokemonList();
        this.loadingService.hide();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los Pokémon:', error);
        this.loadingService.hide();
        this.loading = false;
      }
    });
  }

  createFilteredPokemonList(): Pokemon[] {
    if (!this.pokedex || !this.pokedex.pokemon_entries || !this.allPokemon) {
      return [];
    }

    const pokemonMap = new Map<string, Pokemon>();
    this.allPokemon.forEach(pokemon => {
      pokemonMap.set(pokemon.name.toLowerCase(), pokemon);
    });

    const filteredList: Pokemon[] = [];

    for (const entry of this.pokedex.pokemon_entries) {
      const pokemonName = this.helperService.getCorrectPokemonName(entry.pokemon_species.name);
      const pokemonData = pokemonMap.get(pokemonName.toLowerCase());

      if (pokemonData) {
        filteredList.push({
          ...pokemonData,
          number: entry.entry_number
        });
      }
    }

    return filteredList.sort((a, b) => a.number - b.number);
  }

  addZerosToNumber(number: number): string {
    return this.helperService.addZerosToNumber(number);
  }

  getGameIconNameForLanguage(typeName: string, language: string): string {
    return this.helperService.getGameIconNameForLanguage(typeName, language);
  }


}
