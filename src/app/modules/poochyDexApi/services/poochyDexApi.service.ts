import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AllPokemon } from '../../../../../entities/common/const.interface';
import { Games } from '../../../../../entities/common/game-data';
import { PokemonApi } from '../interfaces/pokemon.interface';

export interface CreatePokemon {
  name: string;
  imageURL: string;
  type: string;
  type2?: string;
  generationId: number;
  number: number;

}
@Injectable({
  providedIn: 'root'
})
export class PoochyDexApiService {

  poochyDexApiUrl = 'https://aspnetclusters-182703-0.cloudclusters.net'


constructor(private http: HttpClient) { }

postPokemonApi(pokemonObjet: CreatePokemon): Observable<any> {
  const url = `${this.poochyDexApiUrl}/api/pokemon`;
  return this.http.post<any>(url, pokemonObjet).pipe(
    catchError(error => {
      console.error('Error al subir los pokémon:', error);
      return throwError(error);
    })
  );
}
postPokemonVideogame(videogameObject: Games): Observable<any> {
  const url = `${this.poochyDexApiUrl}/api/Games`;
  return this.http.post<any>(url, videogameObject).pipe(
    catchError(error => {
      console.error('Error al subir los juegos:', error);
      return throwError(error);
    })
  );
}
getAllPokemon(): Observable<PokemonApi[]> {
  const url = `${this.poochyDexApiUrl}/api/pokemon/getAll`;
  return this.http.get<PokemonApi[]>(url).pipe(
    catchError(error => {
      console.error('error:', error);
      return throwError(error);
    })
  );
}
getPokemonById(id: number): Observable<PokemonApi> {
  const url = `${this.poochyDexApiUrl}/api/pokemon/${id}`;
  return this.http.get<PokemonApi>(url).pipe(
    catchError(error => {
      console.error('error:', error);
      return throwError(error);
    })
  );
}
updatePokemon(id: number, pokemon: PokemonApi): Observable<PokemonApi> {
  const url = `${this.poochyDexApiUrl}/api/pokemon/update/${id}`;
  return this.http.put<PokemonApi>(url, pokemon).pipe(
    catchError(error => {
      console.error('error:', error);
      return throwError(error);
    })
  );
}
}
