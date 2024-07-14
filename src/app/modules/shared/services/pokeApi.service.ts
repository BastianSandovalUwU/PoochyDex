import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pokemon } from '../../../../../entities/pokemon.entity';
import { PokemonTypes } from '../../../../../entities/types.entity';
import { PokemonSpecie } from '../../../../../entities/pokemon-specie.entity';
import { MachineMove } from '../../../../../entities/machine-move.entity';
import { DetailMove } from '../../../../../entities/moves.entity';
import { PokemonAbility } from '../../../../../entities/pokemon-ability.entity';
import { HelperService } from './helper.service';
import { EvolutionChain } from '../../../../../entities/evolution-chain.entity.';
import { Localization } from '../../../../../entities/localitzation.entity';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private movementsCache = new Map<string, any>();
  private pokemonListcache = new Map<string, any>();

  apiUrl = 'https://pokeapi.co/api/v2'

  constructor(private http: HttpClient) { }

  getAllPokemon(): Observable<any> {
    const url = `${this.apiUrl}/pokemon/?limit=1302`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error al obtener los pokémon:', error);
        return throwError(error);
      })
    );
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    if (this.pokemonListcache.has(name)) {
      return of(this.pokemonListcache.get(name));
    }
    const url = `${this.apiUrl}/pokemon/${name}/`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el pokémon:', name, error);
        return throwError(error);
      }),
      map(response => {
        this.pokemonListcache.set(name, response);
        return response;
      })
    );
  }

  getPokemonByUrl(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el pokémon:', error);
        return throwError(error);
      })
    );
  }

  getPokemonSpecieById(id: string): Observable<PokemonSpecie> {
    const url = `${this.apiUrl}/pokemon-species/${id}/`;
    return this.http.get<PokemonSpecie>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la especie pokémon:', id, error);
        return throwError(error);
      })
    );
  }
  getPokemonSpecieByUrl(url: string): Observable<PokemonSpecie> {
    return this.http.get<PokemonSpecie>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la especie pokémon:', error);
        return throwError(error);
      })
    );
  }

  getPokemonByGeneration(generationNumber: number): Observable<any> {
    const url = `${this.apiUrl}/generation/${generationNumber}/`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error al obtener los pokémon de la generacion número:', generationNumber, error);
        return throwError(error);
      })
    );
  }

  getPokemonTypeByName(typeName: string): Observable<PokemonTypes> {
    const url = `${this.apiUrl}/type/${typeName}/`;
    return this.http.get<PokemonTypes>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el tipo:', typeName, error);
        return throwError(error);
      })
    );
  }

  getLanguageById(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el lenguaje:', error);
        return throwError(error);
      })
    );
  }

  // getMoveByUrl(url: string, name: string, gameName: string): Observable<DetailMove> {
  //   return this.http.get<DetailMove>(url).pipe(
  //     catchError(error => {
  //       // Devolver un objeto placeholder en lugar de lanzar un error
  //       const placeHolderMove = this.createPlaceHolderMove(name, gameName);
  //       return of(placeHolderMove);
  //     })
  //   );
  // }

  getMoveByUrl(url: string, name: string, gameName: string): Observable<DetailMove> {
    if (this.movementsCache.has(url)) {
      return of(this.movementsCache.get(url));
    }
    return this.http.get<DetailMove>(url).pipe(
      catchError(error => {
        const placeHolderMove = this.createPlaceHolderMove(name, gameName);
        return of(placeHolderMove);
      }),
      map(response => {
        this.movementsCache.set(url, response);
        return response;
      })
    );
  }
  getMoveByName(name: string, gameName: string): Observable<DetailMove> {
    const url = `${this.apiUrl}/move/${name}/`;
    return this.http.get<DetailMove>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el movimiento:', error);
        // Devolver un objeto placeholder en lugar de lanzar un error
        const placeHolderMove = this.createPlaceHolderMove(name, gameName);
        return of(placeHolderMove);
      })
    );
  }

  getMachineMoveByUrl(url: string): Observable<MachineMove> {
    if (this.movementsCache.has(url)) {
      return of(this.movementsCache.get(url));
    }
    return this.http.get<MachineMove>(url).pipe(
      catchError(error => {
        return of(null);
      }),
      map(response => {
        this.movementsCache.set(url, response);
        return response;
      })
    );
  }

  getAbilityById(id: string): Observable<PokemonAbility> {
    const url = `${this.apiUrl}/ability/${id}/`;
    return this.http.get<PokemonAbility>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la habilidad:', id, error);
        return throwError(error);
      })
    );
  }

  getEvolutionChainByUrl(url: string): Observable<EvolutionChain> {
    return this.http.get<EvolutionChain>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la cadena evolutiva:', error);
        return throwError(error);
      })
    );
  }

  getAbilityByUrl(url: string): Observable<PokemonAbility> {
    return this.http.get<PokemonAbility>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la habilidad:', error);
        return throwError(error);
      })
    );
  }

  getPokedex(pokdexNumber: number): Observable<any> {
    const url = `${this.apiUrl}/pokedex/${pokdexNumber}/`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la Pokédex:', error);
        return throwError(error);
      })
    );
  }
  getPokemonLocalization(pokdexNumber: number): Observable<any> {
    const url = `${this.apiUrl}/pokemon/${pokdexNumber}/encounters/`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la localización:', error);
        return throwError(error);
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
