import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { PokemonAbility } from '../../../../../../entities/pokemon-ability.entity';
import { LanguageService } from 'app/modules/shared/services/language.service';

@Component({
  selector: 'app-show-ability',
  templateUrl: './show-ability.component.html',
  styleUrls: ['./show-ability.component.scss']
})
export class ShowAbilityComponent implements OnInit {
  language: string = 'es';
  ability: PokemonAbility;

  constructor(
    private pokeApiService: PokeApiService,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.getLanguage();
    this.activatedRoute.params.subscribe(({ ability }) => {
      if (ability) {
        this.getAbilityWithPokemonDetails(ability);
      } else {
        console.error('Invalid route parameter:', ability);
      }
    });
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  getAbilityWithPokemonDetails(abilityName: string) {
    this.pokeApiService.getAbilityById(abilityName).pipe(
      switchMap((ability) => {
        console.log('Received Ability data:', ability);
        if (ability && ability.pokemon) {
          // Map array of Pokémon URLs/names to an array of observables
          const pokemonObservables = ability.pokemon.map(entry => {
            return this.pokeApiService.getPokemonByName(entry.pokemon.name).pipe(
              map(pokemonDetail => ({
                ...entry,
                pokemonDetail
              }))
            );
          });
          // Use forkJoin to wait for all requests to complete and combine results
          return forkJoin(pokemonObservables).pipe(
            map(detailedPokemonList => ({
              ...ability,
              pokemon: detailedPokemonList
            }))
          );
        } else {
          console.error('Invalid ability data:', ability);
          return [];
        }
      })
    ).subscribe(
      (abilityWithDetails) => {
        console.log('Ability with enriched Pokémon data:', abilityWithDetails);
        this.ability = abilityWithDetails;
      },
      (error) => {
        console.error('Error fetching Pokémon details:', error);
      }
    );
  }

  getGenerationName(generationName: string): string {
    return this.helperService.getGenerationName(generationName, this.language);
  }
}
