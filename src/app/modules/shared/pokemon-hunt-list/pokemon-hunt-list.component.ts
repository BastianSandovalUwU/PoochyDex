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
import { PokemonHuntService } from '../services/pokemon-hunt.service';
import { RegisteredPokemon } from '../../../../../entities/pokemon-hunt.entity';
import { AuthService } from 'app/modules/auth/services/auth.service';

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
  registeredPokemonMap: Map<string, boolean> = new Map();
  isLoading: boolean = false;
  isSyncing: boolean = false;
  lastSync: Date | null = null;

  constructor(
    private pokeApiService: PokeApiService,
    private languageService: LanguageService,
    private helperService: HelperService,
    private errorMessageService: ErrorMessageService,
    private pokemonHuntService: PokemonHuntService,
    private authService: AuthService
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

    // Solo sincronizar con el servidor si el usuario está autenticado
    if (this.isUserAuthenticated() && this.pokemonHuntService.needsSync()) {
      this.syncWithServer();
    }

    // Actualizar la última sincronización solo si está autenticado
    if (this.isUserAuthenticated()) {
      this.lastSync = this.pokemonHuntService.getLastSync();
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
    if (!this.isUserAuthenticated()) {
      this.loadFromLocalStorage();
      return;
    }

    this.pokemonHuntService.getRegisteredPokemon().subscribe({
      next: (registeredList) => {
        this.registeredPokemonMap = new Map(
          registeredList
            .filter(p => p.registered === true)
            .map(p => [`${p.pokedexId}-${p.number}-${p.name}`, true])
        );
        this.lastSync = this.pokemonHuntService.getLastSync();
      },
      error: (error) => {
        console.error('Error loading registered pokemon:', error);
        this.loadFromLocalStorage();
      }
    });
  }

  /**
   * Carga los pokemon registrados directamente desde localStorage
   * Se usa cuando el usuario no está autenticado
   */
  private loadFromLocalStorage() {
    const stored = localStorage.getItem('pokemon-hunt-registered');
    if (stored) {
      try {
        const registeredList: RegisteredPokemon[] = JSON.parse(stored);
        this.registeredPokemonMap = new Map(
          registeredList
            .filter(p => p.registered === true)
            .map(p => [`${p.pokedexId}-${p.number}-${p.name}`, true])
        );
      } catch (error) {
        console.error('Error loading from localStorage:', error);
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

    // Si no está autenticado, guardar solo en localStorage
    if (!this.isUserAuthenticated()) {
      this.saveToLocalStorage(registeredList);
      return;
    }

    // Si está autenticado, guardar en el servidor (el servicio también guarda en localStorage como backup)
    this.pokemonHuntService.saveRegisteredPokemon(registeredList).subscribe({
      next: (response) => {
        if (response.success) {
          this.lastSync = this.pokemonHuntService.getLastSync();
        }
      },
      error: (error) => {
        console.error('Error saving registered pokemon to server:', error);
        // Si falla el servidor, asegurarse de que esté guardado en localStorage
        this.saveToLocalStorage(registeredList);
        const errorMessage = this.language === 'es'
          ? 'Error al sincronizar con el servidor, datos guardados localmente'
          : 'Error syncing with server, data saved locally';
        this.errorMessageService.showError(errorMessage, error.message);
      }
    });
  }

  /**
   * Guarda directamente en localStorage
   */
  private saveToLocalStorage(registeredList: RegisteredPokemon[]) {
    try {
      localStorage.setItem('pokemon-hunt-registered', JSON.stringify(registeredList));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Verifica si el usuario está autenticado
   */
  private isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  /**
   * Sincroniza los datos con el servidor
   * Solo funciona si el usuario está autenticado
   */
  syncWithServer() {
    if (!this.isUserAuthenticated()) {
      console.warn('Cannot sync: user not authenticated');
      return;
    }

    this.isSyncing = true;
    this.pokemonHuntService.syncWithServer().subscribe({
      next: (response) => {
        if (response.success) {
          this.loadRegisteredPokemon();
        }
        this.isSyncing = false;
      },
      error: (error) => {
        console.error('Error syncing with server:', error);
        this.isSyncing = false;
        const errorMessage = this.language === 'es'
          ? 'Error al sincronizar con el servidor'
          : 'Error syncing with server';
        this.errorMessageService.showError(errorMessage, error.message);
      }
    });
  }

  /**
   * Limpia todos los pokémon registrados
   */
  clearAllRegisteredPokemon() {
    // Si no está autenticado, limpiar solo localStorage
    if (!this.isUserAuthenticated()) {
      this.registeredPokemonMap.clear();
      localStorage.removeItem('pokemon-hunt-registered');
      return;
    }

    // Si está autenticado, limpiar del servidor también
    this.pokemonHuntService.clearRegisteredPokemon().subscribe({
      next: (response) => {
        if (response.success) {
          this.registeredPokemonMap.clear();
          this.lastSync = this.pokemonHuntService.getLastSync();
        }
      },
      error: (error) => {
        console.error('Error clearing registered pokemon from server:', error);
        // Aunque falle el servidor, limpiar localmente
        this.registeredPokemonMap.clear();
        localStorage.removeItem('pokemon-hunt-registered');
        const errorMessage = this.language === 'es'
          ? 'Error al limpiar del servidor, datos locales eliminados'
          : 'Error clearing from server, local data cleared';
        this.errorMessageService.showError(errorMessage, error.message);
      }
    });
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

