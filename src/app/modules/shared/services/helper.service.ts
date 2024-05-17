import { Injectable } from '@angular/core';
import { PokeApiService } from './pokeApi.service';
import { Observable, forkJoin, map } from 'rxjs';
import { PokemonTypes } from '../../../../../entities/types.entity';
import { Type } from '../../../../../entities/pokemon.entity';
import { Languages } from '../../../../../entities/common/const.interface';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private pokeApiService: PokeApiService) { }

  getPokemonTypes(types: Type[]): Observable<{ language: string, typeName: string }[][]> {
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

  getTypeColorClass(typeName: string, language: string): string {
    if (language === 'en') {
      switch (typeName.toLowerCase()) {
        case 'grass': return 'bg-grass';
        case 'fire': return 'bg-fire';
        case 'water': return 'bg-water';
        case 'bug': return 'bg-bug';
        case 'normal': return 'bg-normal';
        case 'poison': return 'bg-poison';
        case 'electric': return 'bg-electric';
        case 'ground': return 'bg-ground';
        case 'fairy': return 'bg-fairy';
        case 'fighting': return 'bg-fighting';
        case 'psychic': return 'bg-psychic';
        case 'rock': return 'bg-rock';
        case 'ghost': return 'bg-ghost';
        case 'ice': return 'bg-ice';
        case 'dragon': return 'bg-dragon';
        case 'dark': return 'bg-dark';
        case 'steel': return 'bg-steel';
        case 'flying': return 'bg-flying';
        default: return 'bg-default';
      }
    } else if (language === 'es') {
      switch (typeName.toLowerCase()) {
        case 'planta': return 'bg-grass';
        case 'fuego': return 'bg-fire';
        case 'agua': return 'bg-water';
        case 'bicho': return 'bg-bug';
        case 'normal': return 'bg-normal';
        case 'veneno': return 'bg-poison';
        case 'eléctrico': return 'bg-electric';
        case 'tierra': return 'bg-ground';
        case 'hada': return 'bg-fairy';
        case 'lucha': return 'bg-fighting';
        case 'psíquico': return 'bg-psychic';
        case 'roca': return 'bg-rock';
        case 'fantasma': return 'bg-ghost';
        case 'hielo': return 'bg-ice';
        case 'dragón': return 'bg-dragon';
        case 'siniestro': return 'bg-dark';
        case 'acero': return 'bg-steel';
        case 'volador': return 'bg-flying';
        default: return 'bg-default';
      }
    } else {
      return 'bg-default';
    }
  }

}
