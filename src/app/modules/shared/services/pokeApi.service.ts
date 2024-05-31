import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pokemon } from '../../../../../entities/pokemon.entity';
import { PokemonTypes } from '../../../../../entities/types.entity';
import { PokemonSpecie } from '../../../../../entities/pokemon-specie.entity';
import { MachineMove } from '../../../../../entities/machine-move.entity';
import { DetailMove } from '../../../../../entities/moves.entity';
import { PokemonAbility } from '../../../../../entities/pokemon-ability.entity';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

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
    const url = `${this.apiUrl}/pokemon/${name}/`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el pokémon:', name, error);
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

  getMoveByUrl(url: string, name: string, gameName: string): Observable<DetailMove> {
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
    return this.http.get<MachineMove>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el movimiento:', error);
        return throwError(error);
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
