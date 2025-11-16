import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import {
  CreatePokemonRequest,
  PokemonAllResponse,
  PokemonFormAllResponse,
  PokemonFormResponse,
  PokemonResponse,
  UpdatePokemonRequest
} from '../../../../../entities/poochydex-api/pokemon.type';

@Injectable({
  providedIn: 'root'
})
export class PoochyDexApiService {

  private apiUrlCore = environment.nodeJsApi;

  constructor(private http: HttpClient) { }

  // =========================
  // Pokémon base
  // =========================

  getAllPokemon(): Observable<PokemonAllResponse> {
    const url = `${this.apiUrlCore}/api/pokemon`;
    return this.http.get<PokemonAllResponse>(url).pipe(
      catchError(error => {
        console.error('Error al obtener los Pokémon:', error);
        return throwError(error);
      })
    );
  }

  getPokemonById(id: number): Observable<PokemonResponse> {
    const url = `${this.apiUrlCore}/api/pokemon/${id}`;
    return this.http.get<PokemonResponse>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el Pokémon por ID:', error);
        return throwError(error);
      })
    );
  }


  getPokemonByNumber(number: number): Observable<PokemonResponse> {
    const url = `${this.apiUrlCore}/api/pokemon/number/${number}`;
    return this.http.get<PokemonResponse>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el Pokémon por número:', error);
        return throwError(error);
      })
    );
  }

  getPokemonByName(name: string): Observable<PokemonResponse> {
    const url = `${this.apiUrlCore}/api/pokemon/name/${name}`;
    return this.http.get<PokemonResponse>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el Pokémon por nombre:', error);
        return throwError(error);
      })
    );
  }

  createPokemon(pokemonObjet: CreatePokemonRequest): Observable<PokemonResponse> {
    const url = `${this.apiUrlCore}/api/pokemon`;
    return this.http.post<PokemonResponse>(url, pokemonObjet).pipe(
      catchError(error => {
        console.error('Error al crear el Pokémon:', error);
        return throwError(error);
      })
    );
  }

  updatePokemon(id: number, pokemonObjet: UpdatePokemonRequest): Observable<PokemonResponse> {
    const url = `${this.apiUrlCore}/api/pokemon/${id}`;
    return this.http.put<PokemonResponse>(url, pokemonObjet).pipe(
      catchError(error => {
        console.error('Error al actualizar el Pokémon:', error);
        return throwError(error);
      })
    );
  }

  deletePokemon(id: number): Observable<PokemonResponse> {
    const url = `${this.apiUrlCore}/api/pokemon/${id}`;
    return this.http.delete<PokemonResponse>(url).pipe(
      catchError(error => {
        console.error('Error al eliminar el Pokémon:', error);
        return throwError(error);
      })
    );
  }

  // =========================
  // Formas alternativas
  // =========================

  getAllPokemonForms(): Observable<PokemonFormAllResponse> {
    const url = `${this.apiUrlCore}/api/pokemon-forms`;
    return this.http.get<PokemonFormAllResponse>(url).pipe(
      catchError(error => {
        console.error('Error al obtener las formas de Pokémon:', error);
        return throwError(error);
      })
    );
  }

  getPokemonFormById(id: number): Observable<PokemonFormResponse> {
    const url = `${this.apiUrlCore}/api/pokemon-forms/${id}`;
    return this.http.get<PokemonFormResponse>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la forma de Pokémon por ID:', error);
        return throwError(error);
      })
    );
  }

  getPokemonFormsByNumber(number: number): Observable<PokemonFormAllResponse> {
    const url = `${this.apiUrlCore}/api/pokemon-forms/number/${number}`;
    return this.http.get<PokemonFormAllResponse>(url).pipe(
      catchError(error => {
        console.error('Error al obtener las formas por número:', error);
        return throwError(error);
      })
    );
  }

  getPokemonFormByName(name: string): Observable<PokemonFormResponse> {
    const url = `${this.apiUrlCore}/api/pokemon-forms/name/${name}`;
    return this.http.get<PokemonFormResponse>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la forma de Pokémon por nombre:', error);
        return throwError(error);
      })
    );
  }

  createPokemonForm(pokemonObjet: CreatePokemonRequest): Observable<PokemonFormResponse> {
    const url = `${this.apiUrlCore}/api/pokemon-forms`;
    return this.http.post<PokemonFormResponse>(url, pokemonObjet).pipe(
      catchError(error => {
        console.error('Error al crear la forma de Pokémon:', error);
        return throwError(error);
      })
    );
  }

  updatePokemonForm(id: number, pokemonObjet: UpdatePokemonRequest): Observable<PokemonFormResponse> {
    const url = `${this.apiUrlCore}/api/pokemon-forms/${id}`;
    return this.http.put<PokemonFormResponse>(url, pokemonObjet).pipe(
      catchError(error => {
        console.error('Error al actualizar la forma de Pokémon:', error);
        return throwError(error);
      })
    );
  }

  deletePokemonForm(id: number): Observable<PokemonFormResponse> {
    const url = `${this.apiUrlCore}/api/pokemon-forms/${id}`;
    return this.http.delete<PokemonFormResponse>(url).pipe(
      catchError(error => {
        console.error('Error al eliminar la forma de Pokémon:', error);
        return throwError(error);
      })
    );
  }
}

