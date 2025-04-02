import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pokemon, PokemonFull } from '../../../../../entities/pokemon.entity';
import { PokemonTypes } from '../../../../../entities/types.entity';
import { PokemonSpecie } from '../../../../../entities/pokemon-specie.entity';
import { MachineMove } from '../../../../../entities/machine-move.entity';
import { DetailMove, Move } from '../../../../../entities/moves.entity';
import { PokemonAbility } from '../../../../../entities/pokemon-ability.entity';
import { EvolutionChain } from '../../../../../entities/evolution-chain.entity';
import { GameVersion } from '../../../../../entities/game-version.entity';
import { GenerationInfo } from '../../../../../entities/generation.entity';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private readonly POKEMON_CACHE_KEY = 'pokemon_cache';
  private readonly MOVES_CACHE_KEY = 'moves_cache';
  private readonly MAX_CACHE_SIZE = 2000; // Número máximo de Pokémon en caché
  private readonly MAX_MOVES_CACHE_SIZE = 2000; // Número máximo de movimientos en caché

  apiUrl = 'https://pokeapi.co/api/v2'

  constructor(private http: HttpClient) { }

  private convertToLitePokemon(pokemon: PokemonFull): Pokemon {
    return {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types,
      stats: pokemon.stats,
      abilities: pokemon.abilities,
      height: pokemon.height,
      weight: pokemon.weight,
      species: pokemon.species,
      is_default: pokemon.is_default,
      cries: pokemon.cries
    };
  }

  private getPokemonFromCache(name: string): Pokemon | null {
    try {
      const cache = localStorage.getItem(this.POKEMON_CACHE_KEY);
      if (cache) {
        const pokemonCache = JSON.parse(cache) as { [key: string]: Pokemon };
        // Buscar por nombre en los valores del caché
        return Object.values(pokemonCache).find(pokemon =>
          pokemon.name.toLowerCase() === name.toLowerCase()
        ) || null;
      }
      return null;
    } catch (error) {
      console.error('Error al leer el caché de Pokémon:', error);
      return null;
    }
  }

  private setPokemonInCache(name: string, pokemon: PokemonFull): void {
    try {
      const cache = localStorage.getItem(this.POKEMON_CACHE_KEY);
      let pokemonCache = cache ? JSON.parse(cache) : {};

      // Si el caché está lleno, eliminar el Pokémon más antiguo
      const cacheKeys = Object.keys(pokemonCache);
      if (cacheKeys.length >= this.MAX_CACHE_SIZE) {
        delete pokemonCache[cacheKeys[0]];
      }

      // Convertir a versión lite antes de guardar y usar el ID como clave
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

  private getMovesFromCache(pokemonId: string): Move[] | null {
    try {
      const cache = localStorage.getItem(this.MOVES_CACHE_KEY);
      if (cache) {
        const movesCache = JSON.parse(cache);
        return movesCache[pokemonId] || null;
      }
      return null;
    } catch (error) {
      console.error('Error al leer el caché de movimientos:', error);
      return null;
    }
  }

  private setMovesInCache(pokemonId: string, moves: Move[]): void {
    try {
      const cache = localStorage.getItem(this.MOVES_CACHE_KEY);
      let movesCache = cache ? JSON.parse(cache) : {};

      // Si el caché está lleno, eliminar los movimientos más antiguos
      const cacheKeys = Object.keys(movesCache);
      if (cacheKeys.length >= this.MAX_MOVES_CACHE_SIZE) {
        // Eliminar los primeros 10 movimientos más antiguos
        for (let i = 0; i < 10; i++) {
          delete movesCache[cacheKeys[i]];
        }
      }

      movesCache[pokemonId] = moves;
      localStorage.setItem(this.MOVES_CACHE_KEY, JSON.stringify(movesCache));
    } catch (error) {
      console.error('Error al escribir en el caché de movimientos:', error);
      try {
        localStorage.removeItem(this.MOVES_CACHE_KEY);
        const movesCache = { [pokemonId]: moves };
        localStorage.setItem(this.MOVES_CACHE_KEY, JSON.stringify(movesCache));
      } catch (retryError) {
        console.error('Error al limpiar y reescribir el caché de movimientos:', retryError);
      }
    }
  }

  getPokemonMoves(pokemonId: string): Observable<Move[]> {
    const cachedMoves = this.getMovesFromCache(pokemonId);
    if (cachedMoves) {
      return of(cachedMoves);
    }

    const url = `${this.apiUrl}/pokemon/${pokemonId}/`;
    return this.http.get<PokemonFull>(url).pipe(
      map(pokemon => {
        const moves = pokemon.moves;
        this.setMovesInCache(pokemonId, moves);
        return moves;
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
    if (cachedPokemon) {
      return of(cachedPokemon);
    }
    const url = `${this.apiUrl}/pokemon/${name}/`;
    return this.http.get<PokemonFull>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el pokémon:', name, error);
        return throwError(() => error);
      }),
      map(response => {
        this.setPokemonInCache(name, response);
        return this.convertToLitePokemon(response);
      })
    );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    const cachedPokemon = this.getPokemonFromCache(id.toString());
    if (cachedPokemon) {
      return of(cachedPokemon);
    }
    const url = `${this.apiUrl}/pokemon/${id}/`;
    return this.http.get<PokemonFull>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el pokémon:', id, error);
        return throwError(() => error);
      }),
      map(response => {
        this.setPokemonInCache(id.toString(), response);
        return this.convertToLitePokemon(response);
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
}
