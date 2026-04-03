import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of } from 'rxjs';
import { PokeApiService } from './pokeApi.service';
import { Ability } from '../../../../../entities/pokemon.entity';
import { AbilityName, AbilityResponse, Name } from '../../../../../entities/pokemon-ability.entity';
import { DetailMove } from '../../../../../entities/moves.entity';

/**
 * PokéAPI ability and move text resolved by language (HTTP).
 */
@Injectable({
  providedIn: 'root'
})
export class PokemonMoveAbilityService {

  constructor(private pokeApiService: PokeApiService) {}

  getAbilityNames(abilities: Ability[]): Observable<{ ability: Ability, names: AbilityName[] }[]> {
    const observables = abilities.map(ability =>
      this.pokeApiService.getAbilityById(ability.ability.name)
    );

    return forkJoin(observables).pipe(
      map((results: AbilityResponse[]) => {
        return results.map((result, i) => {
          const names = result.names.map((nameInfo: Name) => ({
            language: nameInfo.language.name,
            abilityName: nameInfo.name
          }));
          return { ability: abilities[i], names };
        });
      })
    );
  }

  getMoveNameByLanguage(move: DetailMove, language: string): Observable<{ language: string, moveName: string }> {
    return of(move).pipe(
      map(moveDetail => {
        const nameInfo = moveDetail.names.find(name => name.language.name === language);
        return {
          language: language,
          moveName: nameInfo ? nameInfo.name : 'Not Available'
        };
      })
    );
  }

  getMoveEffectEntryByLanguage(move: DetailMove, language: string): Observable<{ language: string, moveName: string, effect: string, shortEffect: string }> {
    return of(move).pipe(
      map(moveDetail => {
        const nameInfo = moveDetail.names.find(name => name.language.name === language);
        let effectInfo = moveDetail.effect_entries.find(effect => effect.language.name === language);

        if (!effectInfo) {
          effectInfo = moveDetail.effect_entries.find(effect => effect.language.name === 'en');
        }

        return {
          language: language,
          moveName: nameInfo ? nameInfo.name : 'Not Available',
          effect: effectInfo ? effectInfo.effect : 'Effect not available',
          shortEffect: effectInfo ? effectInfo.short_effect : 'Short effect not available'
        };
      })
    );
  }
}
