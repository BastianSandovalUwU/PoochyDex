import { Injectable } from '@angular/core';
import { PokeApiService } from './pokeApi.service';
import { Observable, forkJoin, map } from 'rxjs';
import { PokemonTypes } from '../../../../../entities/types.entity';
import { Type } from '../../../../../entities/pokemon.entity';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

constructor(private pokeApiService: PokeApiService) { }

translatePokemonTypes(types: Type[]): Observable<{ language: string, typeName: string }[][]> {
  const observables = types.map(type => this.pokeApiService.getPokemonTypeByName(type.type.name));

  return forkJoin(observables).pipe(
    map((results: any[]) => {
      return results.map(type => {
        return type.names.map(nameInfo => ({
          language: nameInfo.language.name,
          typeName: nameInfo.name
        }));
      });
    })
  );
}

}
