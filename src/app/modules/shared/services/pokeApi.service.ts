import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pokemon } from '../../../../../entities/pokemon.entity';
import { PokemonTypes } from '../../../../../entities/types.entity';
import { PokemonSpecie } from '../../../../../entities/pokemon-specie.entity';

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

  getPokemonByName(name: string): Observable<Pokemon> {
    const url = `${this.apiUrl}/pokemon/${name}/`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el pokémon:', name, error);
        return throwError(error);
      })
    );
  }
  getPokemonSpecieById(id: number): Observable<PokemonSpecie> {
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
}
