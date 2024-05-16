import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  apiUrl = 'https://pokeapi.co/api/v2/'

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

  getPokemonByName(name: string): Observable<any> {
    const url = `${this.apiUrl}/pokemon/${name}/`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el pokémon:', name, error);
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
}
