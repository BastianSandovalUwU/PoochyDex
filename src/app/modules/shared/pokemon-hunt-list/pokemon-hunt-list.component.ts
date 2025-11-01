import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PokeApiService } from '../services/pokeApi.service';
import { LanguageService } from '../services/language.service';
import { PokemonList } from '../../../../../entities/pokemon-list.entity';
import { ALL_POKEMON_ALOLA } from '../../../../../entities/common/alola-pokemon-data';
import { ALL_POKEMON_GALAR } from '../../../../../entities/common/galar-pokemon-data';
import { ALL_POKEMON_HOENN } from '../../../../../entities/common/hoenn-pokemon-data';
import { ALL_POKEMON_JOTHO } from '../../../../../entities/common/jotho-pokemon-data';
import { ALL_POKEMON_KALOS } from '../../../../../entities/common/kalos-pokemon-data';
import { ALL_POKEMON_KANTO } from '../../../../../entities/common/kanto-pokemon-data';
import { ALL_POKEMON_PALDEA } from '../../../../../entities/common/paldea-pokemon-data';
import { ALL_POKEMON_ALOLA_REGIONAL_FORMS, ALL_POKEMON_GALAR_REGIONAL_FORMS, ALL_POKEMON_PALDEA_REGIONAL_FORMS, ALL_POKEMON_HISUI_REGIONAL_FORMS } from '../../../../../entities/common/poochyApiData';
import { ALL_POKEMON_SINNOH } from '../../../../../entities/common/sinnoh-pokemon-data';
import { ALL_POKEMON_UNOVA } from '../../../../../entities/common/unova-pokemon-data';
import { HelperService } from '../services/helper.service';
import { ErrorMessageService } from 'app/services/error-message.service';

interface RegisteredPokemon {
  number: number;
  name: string;
  registered: boolean;
  pokedexId: number;
}

@Component({
  selector: 'app-pokemon-hunt-list',
  templateUrl: './pokemon-hunt-list.component.html',
  styleUrls: ['./pokemon-hunt-list.component.scss']
})
export class PokemonHuntListComponent implements OnInit, OnChanges {
  @Input() pokedexNumber: number = 34;

  private allPokemonData: PokemonList[] = [
    ...ALL_POKEMON_KANTO,
    ...ALL_POKEMON_JOTHO,
    ...ALL_POKEMON_HOENN,
    ...ALL_POKEMON_SINNOH,
    ...ALL_POKEMON_UNOVA,
    ...ALL_POKEMON_KALOS,
    ...ALL_POKEMON_ALOLA,
    ...ALL_POKEMON_GALAR,
    ...ALL_POKEMON_PALDEA,
    ...ALL_POKEMON_ALOLA_REGIONAL_FORMS,
    ...ALL_POKEMON_GALAR_REGIONAL_FORMS,
    ...ALL_POKEMON_PALDEA_REGIONAL_FORMS,
    ...ALL_POKEMON_HISUI_REGIONAL_FORMS
  ];

  private pokemonDataMap: Map<string, PokemonList> = new Map();

  filteredPokemon: PokemonList[] = [];
  language: string;
  private localStorageKey = 'pokemon-hunt-registered';
  registeredPokemonMap: Map<string, boolean> = new Map();
  isLoading: boolean = false;

  constructor(
    private pokeApiService: PokeApiService,
    private languageService: LanguageService,
    private helperService: HelperService,
    private errorMessageService: ErrorMessageService
  ) {
    this.allPokemonData.forEach(pokemon => {
      this.pokemonDataMap.set(pokemon.name.toLowerCase(), pokemon);
    });
  }

  ngOnInit() {
    this.getLanguage();
    this.loadRegisteredPokemon();
    if (this.pokedexNumber) {
      this.getPokedex(this.pokedexNumber);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokedexNumber'] && !changes['pokedexNumber'].firstChange) {
      this.getPokedex(this.pokedexNumber);
    }
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  getPokedex(num: number): void {
    this.isLoading = true;
    this.filteredPokemon = [];

    this.pokeApiService.getPokedex(num).subscribe({
      next: (pokedexData) => {
        const pokemonList: PokemonList[] = [];

        for (let index = 0; index < pokedexData.pokemon_entries.length; index++) {
          const entry = pokedexData.pokemon_entries[index];
          const pokemonName = this.helperService.getCorrectPokemonName(entry.pokemon_species.name);
          const entryNumber = entry.entry_number;

          const pokemonData = this.pokemonDataMap.get(pokemonName.toLowerCase());

          if (pokemonData) {
            pokemonList.push({
              ...pokemonData,
              number: entryNumber
            });
          } else {
            const pokeImgname = this.helperService.getPokemonSpriteImg(entry.pokemon_species.name, "home");
            pokemonList.push({
              name: pokemonName,
              number: entryNumber,
              sprites: {
                homeUrl: pokeImgname,
                homeShinyUrl: pokeImgname,
                iconUrl: pokeImgname
              },
              type: 'normal',
              type2: undefined,
              generationId: 1
            });
          }
        }

        this.filteredPokemon = pokemonList.sort((a, b) => a.number - b.number);
        this.isLoading = false;
      },
      error: (error) => {
        const errorMessage = this.language === 'es' ? 'Error al cargar la Pokédex' : 'Error loading Pokedex';
        this.errorMessageService.showError(errorMessage, error.message);
        this.isLoading = false;
      }
    });
  }

  getGameIconNameForLanguage(typeName: string, language: string): string {
    return this.helperService.getGameIconNameForLanguage(typeName, language);
  }

  addZerosToNumber(number: number): string {
    return this.helperService.addZerosToNumber(number);
  }

  loadRegisteredPokemon() {
    const stored = localStorage.getItem(this.localStorageKey);
    if (stored) {
      try {
        const registeredList: RegisteredPokemon[] = JSON.parse(stored);
        this.registeredPokemonMap = new Map(
          registeredList
            .filter(p => p.registered === true)
            .map(p => [`${p.pokedexId}-${p.number}-${p.name}`, true])
        );
      } catch (error) {
        console.error('Error loading registered pokemon:', error);
        this.registeredPokemonMap = new Map();
      }
    }
  }

  isPokemonRegistered(pokemon: PokemonList): boolean {
    const key = `${this.pokedexNumber}-${pokemon.number}-${pokemon.name}`;
    return this.registeredPokemonMap.get(key) || false;
  }

  togglePokemonRegistration(pokemon: PokemonList, event: Event) {
    event.stopPropagation();
    event.preventDefault();

    const key = `${this.pokedexNumber}-${pokemon.number}-${pokemon.name}`;
    const currentStatus = this.registeredPokemonMap.get(key) || false;

    if (currentStatus) {
      this.registeredPokemonMap.delete(key);
    } else {
      this.registeredPokemonMap.set(key, true);
    }

    this.saveRegisteredPokemon();
  }

  saveRegisteredPokemon() {
    const registeredList: RegisteredPokemon[] = [];

    this.registeredPokemonMap.forEach((registered, key) => {
      if (registered) {
        const [pokedexId, number, ...nameParts] = key.split('-');
        const name = nameParts.join('-');
        registeredList.push({
          pokedexId: parseInt(pokedexId),
          number: parseFloat(number),
          name: name,
          registered: true
        });
      }
    });

    localStorage.setItem(this.localStorageKey, JSON.stringify(registeredList));
  }

  getRegisteredCount(): number {
    let count = 0;
    this.registeredPokemonMap.forEach(registered => {
      if (registered) count++;
    });
    return count;
  }

  getTotalCount(): number {
    return this.filteredPokemon.length;
  }

  getRegisteredCountForCurrentPokedex(): number {
    let count = 0;
    this.filteredPokemon.forEach(pokemon => {
      if (this.isPokemonRegistered(pokemon)) {
        count++;
      }
    });
    return count;
  }
}

