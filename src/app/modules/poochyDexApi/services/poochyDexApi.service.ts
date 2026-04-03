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
  // Base Pokémon CRUD
  // =========================

  getAllPokemon(): Observable<PokemonAllResponse> {
    const url = `${this.apiUrlCore}/api/pokemon`;
    return this.http.get<PokemonAllResponse>(url).pipe(
      catchError(error => {
        console.error('Error fetching Pokémon list:', error);
        return throwError(error);
      })
    );
  }

  getPokemonById(id: number): Observable<PokemonResponse> {
    const url = `${this.apiUrlCore}/api/pokemon/${id}`;
    return this.http.get<PokemonResponse>(url).pipe(
      catchError(error => {
        console.error('Error fetching Pokémon by id:', error);
        return throwError(error);
      })
    );
  }


  getPokemonByNumber(number: number): Observable<PokemonResponse> {
    const url = `${this.apiUrlCore}/api/pokemon/number/${number}`;
    return this.http.get<PokemonResponse>(url).pipe(
      catchError(error => {
        console.error('Error fetching Pokémon by number:', error);
        return throwError(error);
      })
    );
  }

  getPokemonByName(name: string): Observable<PokemonResponse> {
    const url = `${this.apiUrlCore}/api/pokemon/name/${name}`;
    return this.http.get<PokemonResponse>(url).pipe(
      catchError(error => {
        console.error('Error fetching Pokémon by name:', error);
        return throwError(error);
      })
    );
  }

  createPokemon(pokemonObjet: CreatePokemonRequest): Observable<PokemonResponse> {
    const url = `${this.apiUrlCore}/api/pokemon`;
    return this.http.post<PokemonResponse>(url, pokemonObjet).pipe(
      catchError(error => {
        console.error('Error creating Pokémon:', error);
        return throwError(error);
      })
    );
  }

  updatePokemon(id: number, pokemonObjet: UpdatePokemonRequest): Observable<PokemonResponse> {
    const url = `${this.apiUrlCore}/api/pokemon/${id}`;
    return this.http.put<PokemonResponse>(url, pokemonObjet).pipe(
      catchError(error => {
        console.error('Error updating Pokémon:', error);
        return throwError(error);
      })
    );
  }

  deletePokemon(id: number): Observable<PokemonResponse> {
    const url = `${this.apiUrlCore}/api/pokemon/${id}`;
    return this.http.delete<PokemonResponse>(url).pipe(
      catchError(error => {
        console.error('Error deleting Pokémon:', error);
        return throwError(error);
      })
    );
  }

  // =========================
  // Alternate forms
  // =========================

  getAllPokemonForms(): Observable<PokemonFormAllResponse> {
    const url = `${this.apiUrlCore}/api/pokemon-forms`;
    return this.http.get<PokemonFormAllResponse>(url).pipe(
      catchError(error => {
        console.error('Error fetching Pokémon forms:', error);
        return throwError(error);
      })
    );
  }

  getPokemonFormById(id: number): Observable<PokemonFormResponse> {
    const url = `${this.apiUrlCore}/api/pokemon-forms/${id}`;
    return this.http.get<PokemonFormResponse>(url).pipe(
      catchError(error => {
        console.error('Error fetching Pokémon form by id:', error);
        return throwError(error);
      })
    );
  }

  getPokemonFormsByNumber(number: number): Observable<PokemonFormAllResponse> {
    const url = `${this.apiUrlCore}/api/pokemon-forms/number/${number}`;
    return this.http.get<PokemonFormAllResponse>(url).pipe(
      catchError(error => {
        console.error('Error fetching forms by number:', error);
        return throwError(error);
      })
    );
  }

  getPokemonFormByName(name: string): Observable<PokemonFormResponse> {
    const url = `${this.apiUrlCore}/api/pokemon-forms/name/${name}`;
    return this.http.get<PokemonFormResponse>(url).pipe(
      catchError(error => {
        console.error('Error fetching Pokémon form by name:', error);
        return throwError(error);
      })
    );
  }

  createPokemonForm(pokemonObjet: CreatePokemonRequest): Observable<PokemonFormResponse> {
    const url = `${this.apiUrlCore}/api/pokemon-forms`;
    return this.http.post<PokemonFormResponse>(url, pokemonObjet).pipe(
      catchError(error => {
        console.error('Error creating Pokémon form:', error);
        return throwError(error);
      })
    );
  }

  updatePokemonForm(id: number, pokemonObjet: UpdatePokemonRequest): Observable<PokemonFormResponse> {
    const url = `${this.apiUrlCore}/api/pokemon-forms/${id}`;
    return this.http.put<PokemonFormResponse>(url, pokemonObjet).pipe(
      catchError(error => {
        console.error('Error updating Pokémon form:', error);
        return throwError(error);
      })
    );
  }

  deletePokemonForm(id: number): Observable<PokemonFormResponse> {
    const url = `${this.apiUrlCore}/api/pokemon-forms/${id}`;
    return this.http.delete<PokemonFormResponse>(url).pipe(
      catchError(error => {
        console.error('Error deleting Pokémon form:', error);
        return throwError(error);
      })
    );
  }
}

