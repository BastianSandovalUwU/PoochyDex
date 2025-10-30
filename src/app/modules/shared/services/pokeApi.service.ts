import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, timeout, tap } from 'rxjs/operators';
import { Pokemon, PokemonFull } from '../../../../../entities/pokemon.entity';
import { PokemonTypes } from '../../../../../entities/types.entity';
import { PokemonSpecie } from '../../../../../entities/pokemon-specie.entity';
import { MachineMove } from '../../../../../entities/machine-move.entity';
import { DetailMove, Move } from '../../../../../entities/moves.entity';
import { PokemonAbility } from '../../../../../entities/pokemon-ability.entity';
import { NetworkService } from './network.service';
import { EvolutionChain } from '../../../../../entities/evolution-chain.entity';
import { GameVersion } from '../../../../../entities/game-version.entity';
import { GenerationInfo } from '../../../../../entities/generation.entity';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private readonly POKEMON_CACHE_KEY = 'pokemon_cache';
  private readonly MAX_CACHE_SIZE = 2000;

  apiUrl = 'https://pokeapi.co/api/v2'

  // 'network' | 'cache'
  private lastDataSourceSubject = new BehaviorSubject<'network' | 'cache'>('network');
  lastDataSource$ = this.lastDataSourceSubject.asObservable();

  private isOnline = true;

  constructor(private http: HttpClient,
              private networkService: NetworkService) {
    this.networkService.isOnline$.subscribe(v => this.isOnline = v);
  }

  private convertToLitePokemon(pokemon: PokemonFull): Pokemon {
    return {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types,
      stats: pokemon.stats,
      abilities: pokemon.abilities,
      height: pokemon.height,
      weight: pokemon.weight,
      baseExperience: pokemon.baseExperience,
      forms: pokemon.forms,
      game_indices: pokemon.game_indices,
      species: pokemon.species,
      is_default: pokemon.is_default,
      cries: pokemon.cries,
    };
  }

  private getPokemonFromCache(name: string): Pokemon | null {
    try {
      const cache = localStorage.getItem(this.POKEMON_CACHE_KEY);
      if (cache) {
        const pokemonCache = JSON.parse(cache) as { [key: string]: Pokemon };
        return Object.values(pokemonCache).find(pokemon =>
          pokemon.name.toLowerCase() === name.toLowerCase()
        ) || null;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  private setPokemonInCache(name: string, pokemon: PokemonFull): void {
    try {
      const cache = localStorage.getItem(this.POKEMON_CACHE_KEY);
      let pokemonCache = cache ? JSON.parse(cache) : {};

      const cacheKeys = Object.keys(pokemonCache);
      if (cacheKeys.length >= this.MAX_CACHE_SIZE) {
        delete pokemonCache[cacheKeys[0]];
      }

      const litePokemon = this.convertToLitePokemon(pokemon);
      pokemonCache[pokemon.id] = litePokemon;
      localStorage.setItem(this.POKEMON_CACHE_KEY, JSON.stringify(pokemonCache));
    } catch (error) {
      console.error('Error al escribir en el caché de Pokémon:', error);
      try {
        localStorage.removeItem(this.POKEMON_CACHE_KEY);
        const pokemonCache = { [pokemon.id]: this.convertToLitePokemon(pokemon) };
        localStorage.setItem(this.POKEMON_CACHE_KEY, JSON.stringify(pokemonCache));
      } catch (retryError) {
        console.error('Error al limpiar y reescribir el caché de Pokémon:', retryError);
      }
    }
  }

  // Métodos de cache de movimientos eliminados - no se guardan movimientos en cache

  getPokemonMoves(pokemonId: string): Observable<Move[]> {
    // No usar cache de movimientos para reducir el uso de localStorage
    const url = `${this.apiUrl}/pokemon/${pokemonId}/`;
    return this.http.get<PokemonFull>(url).pipe(
      map(pokemon => {
        return pokemon.moves;
      }),
      catchError(error => {
        console.error('Error al obtener los movimientos del Pokémon:', error);
        return throwError(() => error);
      })
    );
  }

  getAllPokemon(): Observable<any> {
    const url = `${this.apiUrl}/pokemon/?limit=1302`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error al obtener los pokémon:', error);
        return throwError(() => error);
      })
    );
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    const cachedPokemon = this.getPokemonFromCache(name);
    if (!this.isOnline && cachedPokemon) {
      this.lastDataSourceSubject.next('cache');
      return of(cachedPokemon);
    }

    if (this.checkPokemonForm(name)) {
      return this.getMegaFormPokemon(name);
    }

    const url = `${this.apiUrl}/pokemon/${name}/`;
    return this.http.get<PokemonFull>(url).pipe(
      timeout(3000),
      tap(response => {
        this.lastDataSourceSubject.next(navigator.onLine ? 'network' : 'cache');
        this.setPokemonInCache(name, response);
      }),
      map(response => this.convertToLitePokemon(response)),
      catchError(error => {
        console.error('Error al obtener el pokémon:', name, error);
        const cached = this.getPokemonFromCache(name);
        if (cached) {
          this.lastDataSourceSubject.next('cache');
          return of(cached);
        }
        return throwError(() => error);
      })
    );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    const cachedPokemon = this.getPokemonFromCache(id.toString());
    if (!this.isOnline && cachedPokemon) {
      this.lastDataSourceSubject.next('cache');
      return of(cachedPokemon);
    }
    const url = `${this.apiUrl}/pokemon/${id}/`;
    return this.http.get<PokemonFull>(url).pipe(
      timeout(3000),
      tap(response => {
        this.lastDataSourceSubject.next(navigator.onLine ? 'network' : 'cache');
        this.setPokemonInCache(id.toString(), response);
      }),
      map(response => this.convertToLitePokemon(response)),
      catchError(error => {
        console.error('Error al obtener el pokémon:', id, error);
        const cached = this.getPokemonFromCache(id.toString());
        if (cached) {
          this.lastDataSourceSubject.next('cache');
          return of(cached);
        }
        return throwError(() => error);
      })
    );
  }

  getPokemonByUrl(url: string): Observable<Pokemon> {
    return this.http.get<PokemonFull>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el pokémon:', error);
        return throwError(() => error);
      }),
      map(response => this.convertToLitePokemon(response))
    );
  }

  getPokemonSpecieById(id: string): Observable<PokemonSpecie> {
    const url = `${this.apiUrl}/pokemon-species/${id}/`;
    return this.http.get<PokemonSpecie>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la especie pokémon:', id, error);
        return throwError(() => error);
      })
    );
  }
  getPokemonSpecieByUrl(url: string): Observable<PokemonSpecie> {
    return this.http.get<PokemonSpecie>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la especie pokémon:', error);
        return throwError(() => error);
      })
    );
  }

  getPokemonByGeneration(generationNumber: number): Observable<any> {
    const url = `${this.apiUrl}/generation/${generationNumber}/`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error al obtener los pokémon de la generacion número:', generationNumber, error);
        return throwError(() => error);
      })
    );
  }

  getPokemonTypeByName(typeName: string): Observable<PokemonTypes> {
    const url = `${this.apiUrl}/type/${typeName}/`;
    return this.http.get<PokemonTypes>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el tipo:', typeName, error);
        return throwError(() => error);
      })
    );
  }

  getLanguageById(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el lenguaje:', error);
        return throwError(() => error);
      })
    );
  }

  getMoveByUrl(url: string, name: string, gameName: string): Observable<DetailMove> {
    return this.http.get<DetailMove>(url).pipe(
      catchError(error => {
        const placeHolderMove = this.createPlaceHolderMove(name, gameName);
        return of(placeHolderMove);
      })
    );
  }

  getMoveByName(name: string, gameName: string): Observable<DetailMove> {
    const url = `${this.apiUrl}/move/${name}/`;
    return this.http.get<DetailMove>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el movimiento:', error);
        const placeHolderMove = this.createPlaceHolderMove(name, gameName);
        return of(placeHolderMove);
      })
    );
  }

  getMachineMoveByUrl(url: string): Observable<MachineMove> {
    return this.http.get<MachineMove>(url).pipe(
      catchError(error => {
        return of(null);
      })
    );
  }

  getAbilityById(id: string): Observable<PokemonAbility> {
    const url = `${this.apiUrl}/ability/${id}/`;
    return this.http.get<PokemonAbility>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la habilidad:', id, error);
        return throwError(() => error);
      })
    );
  }

  getEvolutionChainByUrl(url: string): Observable<EvolutionChain> {
    return this.http.get<EvolutionChain>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la cadena evolutiva:', error);
        return throwError(() => error);
      })
    );
  }

  getAbilityByUrl(url: string): Observable<PokemonAbility> {
    return this.http.get<PokemonAbility>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la habilidad:', error);
        return throwError(() => error);
      })
    );
  }

  getPokedex(pokdexNumber: number): Observable<any> {
    const url = `${this.apiUrl}/pokedex/${pokdexNumber}/`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la Pokédex:', error);
        return throwError(() => error);
      })
    );
  }
  getPokemonLocalization(pokdexNumber: number): Observable<any> {
    const url = `${this.apiUrl}/pokemon/${pokdexNumber}/encounters/`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la localización:', error);
        return throwError(() => error);
      })
    );
  }
  getGenerationInfo(generationName: string): Observable<GenerationInfo> {
    const url = `${this.apiUrl}/generation/${generationName}/`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la generación:', error);
        return throwError(() => error);
      })
    );
  }
  getGameVersionInfo(versionName: string): Observable<GameVersion> {
    const url = `${this.apiUrl}/version/${versionName}/`;
    return this.http.get<GameVersion>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la Versión:', error);
        return throwError(() => error);
      })
    );
  }
  getVersionGroupInfo(versionGroupName: string): Observable<any> {
    const url = `${this.apiUrl}/version-group/${versionGroupName}/`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la Versión:', error);
        return throwError(() => error);
      })
    );
  }

  createPlaceHolderMove(id: string, gameName: string): DetailMove {
    const placeHolderMove: DetailMove = {
      id: -1,
      name: id,
      accuracy: null,
      contest_combos: { normal: { use_after: null, use_before: null }, super: { use_after: null, use_before: null } },
      contest_effect: { url: '' },
      contest_type: { name: 'unknown', url: '' },
      damage_class: { name: 'unknown', url: '' },
      effect_chance: null,
      effect_changes: [],
      effect_entries: [{ effect: 'No encontrado', language: { name: 'es', url: '' }, short_effect: 'No encontrado' }],
      flavor_text_entries: [{ flavor_text: 'No encontrado', language: { name: 'es', url: '' }, version_group: { name: gameName, url: '' } }],
      generation: { name: 'unknown', url: '' },
      learned_by_pokemon: [],
      machines: [],
      meta: {
        ailment: { name: 'unknown', url: '' },
        ailment_chance: 0,
        category: { name: 'unknown', url: '' },
        crit_rate: 0,
        drain: 0,
        flinch_chance: 0,
        healing: 0,
        max_hits: null,
        max_turns: null,
        min_hits: null,
        min_turns: null,
        stat_chance: 0
      },
      names: [{ language: { name: 'es', url: '' }, name: id }],
      past_values: [],
      power: 0,
      pp: 0,
      priority: 0,
      stat_changes: [],
      super_contest_effect: { url: '' },
      target: { name: 'unknown', url: '' },
      type: { name: 'unknown', url: '' }
    };
    return placeHolderMove;
  }

  checkPokemonForm(name: string): boolean {
    return name.includes('-mega') || name.includes('-gmax') || name.includes('-primal');
  }

  getBasePokemonNameFromForm(name: string): string {
    return name.replace(/-mega.*$/, '').replace(/-gmax$/, '').replace(/-primal$/, '');
  }

  private getMegaFormPokemon(name: string): Observable<Pokemon> {

    const baseName = this.getBasePokemonNameFromForm(name);
    return this.http.get<PokemonFull>(`${this.apiUrl}/pokemon/${baseName}/`).pipe(
      map(basePokemon => {
        const megaPokemon: Pokemon = {
          ...this.convertToLitePokemon(basePokemon),
          name: name,
          id: basePokemon.id + 10000
        };

        const fullMegaPokemon: PokemonFull = {
          ...basePokemon,
          name: name,
          id: basePokemon.id + 10000
        };
        this.setPokemonInCache(name, fullMegaPokemon);

        return megaPokemon;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  clearCache(): void {
    try {
      localStorage.removeItem(this.POKEMON_CACHE_KEY);
      console.log('Cache de Pokémon limpiado exitosamente');
    } catch (error) {
      console.error('Error al limpiar el cache:', error);
    }
  }

  getCacheSize(): { pokemon: number } {
    try {
      const pokemonCache = localStorage.getItem(this.POKEMON_CACHE_KEY);
      const pokemonCount = pokemonCache ? Object.keys(JSON.parse(pokemonCache)).length : 0;

      return { pokemon: pokemonCount };
    } catch (error) {
      console.error('Error al obtener el tamaño del cache:', error);
      return { pokemon: 0 };
    }
  }
}
