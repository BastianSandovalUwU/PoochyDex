import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon } from '../../../../../../entities/pokemon.entity';
import { PokemonSpecie } from '../../../../../../entities/pokemon-specie.entity';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { LoadingService } from 'app/modules/shared/services/loading.service';
import { Move, ShowMove, TypeDetail } from '../../../../../../entities/moves.entity';
import { forkJoin, of, Subject, takeUntil } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ErrorMessageService } from 'app/services/error-message.service';

@Component({
  selector: 'app-show-pokemon',
  templateUrl: './show-pokemon.component.html',
  styleUrls: ['./show-pokemon.component.scss']
})
export class ShowPokemonComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  language: string;
  pokemonName: string;
  pokemon: Pokemon;
  pokemonSpecie: PokemonSpecie;
  loading: boolean = true;
  pokemonSprite: string;
  pokemonSpriteShiny: string;
  movesWithTypes: { moveName: string, move: Move, types: TypeDetail[] }[] = [];
  movesWithTypesEn: { moveName: string, move: Move, types: TypeDetail[] }[] = [];
  movesWithTypesEs: { moveName: string, move: Move, types: TypeDetail[] }[] = [];

  constructor(
    private pokeApiService: PokeApiService,
    private languageService: LanguageService,
    private helperService: HelperService,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit() {
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(language => {
        this.language = language;
        if (this.pokemon) {
          this.updateMovesForCurrentLanguage();
        }
      });

    this.helperService.isCacheLoading$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(isLoading =>
          isLoading ? of(null) : this.activatedRoute.params
        )
      )
      .subscribe(params => {
        if (params?.["name"]) {
          this.pokemonName = params["name"];
          this.getPokemonByName(params["name"]);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPokemonByName(name: string) {
    this.loading = true;
    this.loadingService.show();
    this.pokeApiService.getPokemonByName(name)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (pokeInfo) => {
          this.pokemon = pokeInfo;
          this.pokemonSprite = this.helperService.getPokemonSpriteImg(this.pokemon["name"], "home");
          this.pokemonSpriteShiny = this.helperService.getPokemonSpriteImg(this.pokemon["name"], "homeShiny");
          this.getPokemonSpecie(this.pokemon.species.name);
        },
        error: (error) => {
          const errorMessage = this.language === 'es' ? 'Error al cargar el Pokémon' : 'Error loading Pokémon';
          this.errorMessageService.showError(errorMessage, error.message);
          this.loading = false;
          this.loadingService.hide();
        }
      });
  }

  getPokemonSpecie(name: string) {
    this.pokeApiService.getPokemonSpecieById(name)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (specie) => {
          this.pokemonSpecie = specie;
          this.getPokemonMoves();
        },
        error: (error) => {
          const errorMessage = this.language === 'es' ? 'Error al cargar la información de la especie' : 'Error loading species information';
          this.errorMessageService.showError(errorMessage, error.message);
          this.loading = false;
          this.loadingService.hide();
        }
      });
  }

  updateMovesForCurrentLanguage(): void {
    if (this.language === 'es' && this.movesWithTypesEs.length > 0) {
      this.movesWithTypes = this.movesWithTypesEs;
    } else if (this.language === 'en' && this.movesWithTypesEn.length > 0) {
      this.movesWithTypes = this.movesWithTypesEn;
    } else if (this.pokemon) {
      this.getPokemonMoves();
    }
  }

  getPokemonMoves(): void {
    const pokemonId = this.checkForm(this.pokemon.name) ?
      (this.pokemon.id - 10000).toString() :
      this.pokemon.id.toString();

    this.pokeApiService.getPokemonMoves(pokemonId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(moves => {
        const observables = moves.map(move =>
          this.pokeApiService.getMoveByUrl(move.move.url, move.move.name, move.version_group_details[0].version_group.name)
        );

        forkJoin(observables)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (details) => {
              const movesArray = moves.map((move, index) => ({
                ...move,
                detailMove: details[index]
              }));

              const typeNamesObservables = movesArray.map(move =>
                move.detailMove.type.name !== 'unknown'
                  ? this.helperService.getMoveType(move.detailMove.type.name)
                  : of([{ language: this.language, typeName: 'No Encontrado' }])
              );

              forkJoin(typeNamesObservables)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                  next: (typeNamesArray) => {
                    this.movesWithTypesEn = typeNamesArray.map((typeNames, index) => {
                      const filteredTypeNames = typeNames.filter(f => f.language === 'en');
                      const moveName = movesArray[index].detailMove.names.find(name => name.language.name === 'en')?.name || movesArray[index].move.name;

                      return {
                        move: movesArray[index],
                        types: filteredTypeNames,
                        moveName
                      };
                    });

                    this.movesWithTypesEs = typeNamesArray.map((typeNames, index) => {
                      const filteredTypeNames = typeNames.filter(f => f.language === 'es');
                      const moveName = movesArray[index].detailMove.names.find(name => name.language.name === 'es')?.name || movesArray[index].move.name;

                      return {
                        move: movesArray[index],
                        types: filteredTypeNames,
                        moveName
                      };
                    });

                    this.movesWithTypes = this.language === 'es' ? this.movesWithTypesEs : this.movesWithTypesEn;
                    this.loading = false;
                    this.loadingService.hide();
                  },
                  error: (error) => {
                    const errorMessage = this.language === 'es' ? 'Error al cargar los movimientos' : 'Error loading moves';
                    this.errorMessageService.showError(errorMessage, error.message);
                    this.loading = false;
                    this.loadingService.hide();
                  }
                });
            },
            error: (error) => {
              const errorMessage = this.language === 'es' ? 'Error al cargar los movimientos' : 'Error loading moves';
              this.errorMessageService.showError(errorMessage, error.message);
              this.loading = false;
              this.loadingService.hide();
            }
          });
      });
  }

  checkForm(name: string): boolean {
    return this.pokeApiService.checkPokemonForm(name);
  }

  getBasePokemonNameFromForm(name: string): string {
    return this.pokeApiService.getBasePokemonNameFromForm(name);
  }
}
