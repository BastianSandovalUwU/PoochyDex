import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AllPokemon } from '../../../../../entities/common/const.interface';
import { Games } from '../../../../../entities/common/game-data';

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

  apiUrlCore = 'https://localhost:7194'


constructor(private http: HttpClient) { }

postPokemonApi(pokemonObjet: CreatePokemon): Observable<any> {
  const url = `${this.apiUrlCore}/api/pokemon`;
  return this.http.post<any>(url, pokemonObjet).pipe(
    catchError(error => {
      console.error('Error al subir los pokémon:', error);
      return throwError(error);
    })
  );
}
postPokemonVideogame(videogameObject: Games): Observable<any> {
  const url = `${this.apiUrlCore}/api/Games`;
  return this.http.post<any>(url, videogameObject).pipe(
    catchError(error => {
      console.error('Error al subir los juegos:', error);
      return throwError(error);
    })
  );
}
getAllPokemon(): Observable<any> {
  const url = `${this.apiUrlCore}/api/pokemon/getAll`;
  return this.http.get<any>(url).pipe(
    catchError(error => {
      console.error('error:', error);
      return throwError(error);
    })
  );
}
}
