import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { PokemonAbility } from '../../../../../../entities/pokemon-ability.entity';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { ErrorMessageService } from 'app/services/error-message.service';
@Component({
  selector: 'app-show-ability',
  templateUrl: './show-ability.component.html',
  styleUrls: ['./show-ability.component.scss']
})
export class ShowAbilityComponent implements OnInit {
  language: string = 'es';
  ability: PokemonAbility;
  abilityDescription: any;

  constructor(
    private pokeApiService: PokeApiService,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
    private helperService: HelperService,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit() {
    this.getLanguage();
    this.activatedRoute.params.subscribe(({ ability }) => {
      if (ability) {
        this.getAbilityWithPokemonDetails(ability);
      } else {
        const errorMessage = this.language === 'es' ? 'Error al cargar la habilidad' : 'Error loading ability';
        this.errorMessageService.showError(errorMessage, 'Invalid route parameter');
      }
    });
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  getAbilitDescriptionLanguage(): void {
    this.abilityDescription = this.ability.flavor_text_entries.filter(f => f.language.name === this.language)
  }

  getAbilityWithPokemonDetails(abilityName: string) {
    this.pokeApiService.getAbilityById(abilityName).pipe(
      switchMap((ability) => {
        if (ability && ability.pokemon) {
          const pokemonObservables = ability.pokemon.map(entry => {
            return this.pokeApiService.getPokemonByName(entry.pokemon.name).pipe(
              map(pokemonDetail => ({
                ...entry,
                pokemonDetail,
                pokemonSprite: this.helperService.getPokemonSpriteImg(entry.pokemon.name, "home")
              }))
            );
          });
          return forkJoin(pokemonObservables).pipe(
            map(detailedPokemonList => ({
              ...ability,
              pokemon: detailedPokemonList
            }))
          );
        } else {
          return [];
        }
      })
    ).subscribe({
      next: (abilityWithDetails) => {
        this.ability = abilityWithDetails;
        this.getAbilitDescriptionLanguage();
      },
      error: (error) => {
        const errorMessage = this.language === 'es' ? 'Error al cargar la habilidad' : 'Error loading ability';
        this.errorMessageService.showError(errorMessage, error.message);
      }
    });
  }

  getGenerationName(generationName: string): string {
    return this.helperService.getGenerationName(generationName, this.language);
  }
}
