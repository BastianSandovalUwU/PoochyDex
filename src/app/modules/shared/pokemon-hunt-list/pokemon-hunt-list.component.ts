import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PokeApiService } from '../services/pokeApi.service';
import { LanguageService } from '../services/language.service';
import { HelperService } from '../services/helper.service';
import { ErrorMessageService } from 'app/services/error-message.service';
import { PokemonHuntService } from '../services/pokemon-hunt.service';
import { RegisteredPokemon } from '../../../../../entities/pokemon-hunt.entity';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { PoochyDexApiService } from 'app/modules/poochyDexApi/services/poochyDexApi.service';
import { Pokemon } from '../../../../../entities/poochydex-api/pokemon.type';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-pokemon-hunt-list',
  templateUrl: './pokemon-hunt-list.component.html',
  styleUrls: ['./pokemon-hunt-list.component.scss']
})
export class PokemonHuntListComponent implements OnInit, OnChanges {
  @Input() pokedexNumber: number = 34;

  private allPokemon: Pokemon[] = [];
  private pokemonDataMap: Map<string, Pokemon> = new Map();
  pokemonLoaded: boolean = false;

  filteredPokemon: Pokemon[] = [];
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
    private authService: AuthService,
    private poochyDexApiService: PoochyDexApiService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.getLanguage();
    this.loadRegisteredPokemon();
    this.loadAllPokemon();

    // Solo sincronizar con el servidor si el usuario está autenticado
    if (this.isUserAuthenticated() && this.pokemonHuntService.needsSync()) {
      this.syncWithServer();
    }

    // Actualizar la última sincronización solo si está autenticado
    if (this.isUserAuthenticated()) {
      this.lastSync = this.pokemonHuntService.getLastSync();
    }
  }

  loadAllPokemon() {
    this.loadingService.show();
    this.poochyDexApiService.getAllPokemon().subscribe({
      next: (response) => {
        this.allPokemon = response.data;
        // Crear mapa de pokemon por nombre para búsqueda rápida
        this.allPokemon.forEach(pokemon => {
          this.pokemonDataMap.set(pokemon.name.toLowerCase(), pokemon);
        });

        this.pokemonLoaded = true;

        // Una vez cargados todos los pokemon, obtener la pokedex
        if (this.pokedexNumber) {
          this.getPokedex(this.pokedexNumber);
        }
      },
      error: (error) => {
        console.error('Error al obtener los Pokémon:', error);
        const errorMessage = this.language === 'es' ? 'Error al cargar los Pokémon' : 'Error loading Pokémon';
        this.errorMessageService.showError(errorMessage, error.message);
        this.loadingService.hide();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokedexNumber'] && !changes['pokedexNumber'].firstChange) {
      // Solo obtener la pokedex si los pokemon ya están cargados
      if (this.pokemonLoaded) {
        this.getPokedex(this.pokedexNumber);
      }
    }
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  getPokedex(num: number): void {
    // Si aún no se han cargado todos los pokemon, esperar
    if (!this.pokemonLoaded || this.allPokemon.length === 0) {
      return;
    }

    this.isLoading = true;
    // Limpiar después de establecer isLoading para evitar mostrar "No hay pokemon"
    this.filteredPokemon = [];

    this.pokeApiService.getPokedex(num).subscribe({
      next: (pokedexData) => {
        const pokemonList: Pokemon[] = [];

        for (let index = 0; index < pokedexData.pokemon_entries.length; index++) {
          const entry = pokedexData.pokemon_entries[index];
          const pokemonName = this.helperService.getCorrectPokemonName(entry.pokemon_species.name);
          const entryNumber = entry.entry_number;

          const pokemonData = this.pokemonDataMap.get(pokemonName.toLowerCase());

          if (pokemonData) {
            // Usar el pokemon directamente y actualizar el número de entrada
            pokemonList.push({
              ...pokemonData,
              number: entryNumber
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


  loadRegisteredPokemon() {
    this.loadingService.show();
    if (!this.isUserAuthenticated()) {
      this.loadFromLocalStorage();
      this.loadingService.hide();
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
        this.loadingService.hide();
      },
      error: (error) => {
        console.error('Error loading registered pokemon:', error);
        this.loadFromLocalStorage();
        this.loadingService.hide();
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

  isPokemonRegistered(pokemon: Pokemon): boolean {
    const key = `${this.pokedexNumber}-${pokemon.number}-${pokemon.name}`;
    return this.registeredPokemonMap.get(key) || false;
  }

  togglePokemonRegistration(pokemon: Pokemon, event: Event) {
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
    this.loadingService.show();
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
      this.loadingService.hide();
      return;
    }

    // Si está autenticado, guardar en el servidor (el servicio también guarda en localStorage como backup)
    this.pokemonHuntService.saveRegisteredPokemon(registeredList).subscribe({
      next: (response) => {
        if (response.success) {
          this.lastSync = this.pokemonHuntService.getLastSync();
        }
        this.loadingService.hide();
      },
      error: (error) => {
        console.error('Error saving registered pokemon to server:', error);
        // Si falla el servidor, asegurarse de que esté guardado en localStorage
        this.saveToLocalStorage(registeredList);
        const errorMessage = this.language === 'es'
          ? 'Error al sincronizar con el servidor, datos guardados localmente'
          : 'Error syncing with server, data saved locally';
        this.errorMessageService.showError(errorMessage, error.message);
        this.loadingService.hide();
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

