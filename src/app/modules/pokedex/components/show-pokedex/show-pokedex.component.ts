import { Component, OnInit, DestroyRef, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { PokeApiService } from 'app/modules/shared/services/poke-api.service';
import { Pokemon } from '../../../../../../entities/poochydex-api/pokemon.type';
import { LoadingService } from 'app/modules/shared/services/loading.service';
import { PoochyDexApiService } from 'app/modules/poochyDexApi/services/poochy-dex-api.service';
import { Pokedex } from '../../../../../../entities/poke-api.entity';
import { detailFadeInAnimations } from 'app/modules/shared/animations/detail-fade-in.animation';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-show-pokedex',
    templateUrl: './show-pokedex.component.html',
    styleUrls: ['./show-pokedex.component.scss'],
    animations: detailFadeInAnimations,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ShowPokedexComponent implements OnInit {
  private pokeApiService = inject(PokeApiService);
  private languageService = inject(LanguageService);
  private helperService = inject(HelperService);
  private activatedRoute = inject(ActivatedRoute);
  private loadingService = inject(LoadingService);
  private poochyDexApiService = inject(PoochyDexApiService);

  private destroyRef = inject(DestroyRef);
  language: string;
  pokedexNumber: number;
  pokedexName: string;
  pokedex: Pokedex | null = null;
  allPokemon: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  loading: boolean = false;

  ngOnInit() {
    this.activatedRoute.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ number }) => {
      this.pokedexName = number;
      this.pokedexNumber = this.helperService.getPokedexNumber(number);
      this.getPokedex(this.pokedexNumber);
    });
    this.getLanguage();
  }

  getLanguage() {
    this.languageService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(language => {
      this.language = language;
    });
  }

  getPokedex(num: number): void {
    this.pokeApiService.getPokedex(num).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (pokemon) => {
        this.pokedex = pokemon;
        this.getPokemon();
      },
      error: (error) => {
        console.error('Error fetching Pokédex:', error);
        this.loadingService.hide();
        this.loading = false;
      }
    });
  }

  getPokemon() {
    this.loading = true;
    this.loadingService.show();
    this.poochyDexApiService.getAllPokemon().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.allPokemon = response.data;
        this.filteredPokemon = this.createFilteredPokemonList();
        this.loadingService.hide();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching Pokémon from custom API:', error);
        this.loadingService.hide();
        this.loading = false;
      }
    });
  }

  createFilteredPokemonList(): Pokemon[] {
    if (!this.pokedex || !this.pokedex.pokemon_entries || !this.allPokemon) {
      return [];
    }

    const pokemonMap = new Map<string, Pokemon>();
    this.allPokemon.forEach(pokemon => {
      pokemonMap.set(pokemon.name.toLowerCase(), pokemon);
    });

    const filteredList: Pokemon[] = [];

    for (const entry of this.pokedex.pokemon_entries) {
      const pokemonName = this.helperService.getCorrectPokemonName(entry.pokemon_species.name);
      const pokemonData = pokemonMap.get(pokemonName.toLowerCase());

      if (pokemonData) {
        filteredList.push({
          ...pokemonData,
          number: entry.entry_number
        });
      }
    }

    return filteredList.sort((a, b) => a.number - b.number);
  }

  addZerosToNumber(number: number): string {
    return this.helperService.addZerosToNumber(number);
  }

  getGameIconNameForLanguage(typeName: string, language: string): string {
    return this.helperService.getGameIconNameForLanguage(typeName, language);
  }


}
