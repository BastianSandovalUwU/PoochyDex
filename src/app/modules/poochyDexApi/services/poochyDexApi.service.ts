import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AllPokemon } from '../../../../../entities/common/const.interface';

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

  apiUrlCore = 'http://localhost:5132'


constructor(private http: HttpClient) { }

postPokemonAzure(pokemonObjet: CreatePokemon): Observable<any> {
  const url = `${this.apiUrlCore}/api/pokemon`;
  return this.http.post<any>(url, pokemonObjet).pipe(
    catchError(error => {
      console.error('Error al subir los pokémon:', error);
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
