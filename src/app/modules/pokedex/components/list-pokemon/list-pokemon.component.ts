import { Component, OnInit, HostListener } from '@angular/core';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { PokemonList } from '../../../../../../entities/pokemon-list.entity';
import { ALL_POKEMON_ALOLA } from '../../../../../../entities/common/alola-pokemon-data';
import { ALL_POKEMON_GALAR } from '../../../../../../entities/common/galar-pokemon-data';
import { ALL_POKEMON_HOENN } from '../../../../../../entities/common/hoenn-pokemon-data';
import { ALL_POKEMON_JOTHO } from '../../../../../../entities/common/jotho-pokemon-data';
import { ALL_POKEMON_KALOS } from '../../../../../../entities/common/kalos-pokemon-data';
import { ALL_POKEMON_KANTO } from '../../../../../../entities/common/kanto-pokemon-data';
import { ALL_POKEMON_PALDEA } from '../../../../../../entities/common/paldea-pokemon-data';
import { ALL_POKEMON_ALOLA_REGIONAL_FORMS, ALL_POKEMON_GALAR_REGIONAL_FORMS, ALL_POKEMON_PALDEA_REGIONAL_FORMS, ALL_POKEMON_HISUI_REGIONAL_FORMS, ALL_POKEMON_GIGAMAX_FORMS, ALL_POKEMON_MEGA_FORMS } from '../../../../../../entities/common/poochyApiData';
import { ALL_POKEMON_SINNOH } from '../../../../../../entities/common/sinnoh-pokemon-data';
import { ALL_POKEMON_UNOVA } from '../../../../../../entities/common/unova-pokemon-data';
import { HelperService } from 'app/modules/shared/services/helper.service';
@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

  allPokemon: PokemonList[] = [...ALL_POKEMON_KANTO, ...ALL_POKEMON_JOTHO,
    ...ALL_POKEMON_HOENN, ...ALL_POKEMON_SINNOH, ...ALL_POKEMON_UNOVA,
    ...ALL_POKEMON_KALOS, ...ALL_POKEMON_ALOLA, ...ALL_POKEMON_GALAR, ...ALL_POKEMON_PALDEA];

  allAlolaFormsPokemon: PokemonList[] = ALL_POKEMON_ALOLA_REGIONAL_FORMS;
  allGalarFormsPokemon: PokemonList[] = ALL_POKEMON_GALAR_REGIONAL_FORMS;
  allPaldeaPokemon: PokemonList[] = ALL_POKEMON_PALDEA_REGIONAL_FORMS;
  allHisuiPokemon: PokemonList[] = ALL_POKEMON_HISUI_REGIONAL_FORMS;
  allGmaxPokemon: PokemonList[] = ALL_POKEMON_GIGAMAX_FORMS;
  allMegaPokemon: PokemonList[] = ALL_POKEMON_MEGA_FORMS;
  filteredPokemon: any[] = this.allPokemon;
  language: string;
  filtersVisible = false;
  showFloatingFilter: boolean = false;
  private scrollThreshold: number = 200;

  pokemonListGridClass: string = 'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-11 gap-1';

  constructor(private pokeApiService: PokeApiService,
              private languageService: LanguageService,
              private helperService: HelperService
              ) { }

  ngOnInit() {
    this.getLanguage();
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  applyFilters(filters: { generations: number[], forms: string[] }) {
    this.getPokemonByGenerationsAndForms(filters.generations, filters.forms);
  }

  getPokemonByGenerationsAndForms(generations: number[], forms: string[]) {
    const generationRanges = {
      1: { min: 1, max: 151 },
      2: { min: 152, max: 251 },
      3: { min: 252, max: 386.3 },
      4: { min: 387, max: 493 },
      5: { min: 494, max: 649 },
      6: { min: 650, max: 721 },
      7: { min: 722, max: 809 },
      8: { min: 810, max: 905 },
      9: { min: 906, max: 1025 }
    };

    let filtered = this.allPokemon.filter(pokemon =>
      generations.some(gen =>
        pokemon.number >= generationRanges[gen].min &&
        pokemon.number <= generationRanges[gen].max
      )
    );

const isWithinSelectedGenerations = (pokemon: PokemonList) =>
  generations.some(gen => {
    const min = generationRanges[gen].min;
    const max = generationRanges[gen].max;

    const tolerance = 0.1;

    return pokemon.number >= min - tolerance && pokemon.number <= max + tolerance;
  });

    if (forms.includes('alola')) {
      filtered = filtered.concat(this.allAlolaFormsPokemon.filter(isWithinSelectedGenerations));
    }
    if (forms.includes('galar')) {
      filtered = filtered.concat(this.allGalarFormsPokemon.filter(isWithinSelectedGenerations));
    }
    if (forms.includes('paldea')) {
      filtered = filtered.concat(this.allPaldeaPokemon.filter(isWithinSelectedGenerations));
    }
    if (forms.includes('hisui')) {
      filtered = filtered.concat(this.allHisuiPokemon.filter(isWithinSelectedGenerations));
    }
    if (forms.includes('gmax')) {
      filtered = filtered.concat(this.allGmaxPokemon.filter(isWithinSelectedGenerations));
    }
    if (forms.includes('mega')) {
      filtered = filtered.concat(this.allMegaPokemon.filter(isWithinSelectedGenerations));
    }

    this.filteredPokemon = Array.from(new Set(filtered)).sort((a, b) => a.number - b.number);
  }

  getGameIconNameForLanguage(typeName: string, language: string): string {
    return this.helperService.getGameIconNameForLanguage(typeName, language);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showFloatingFilter = scrollPosition > this.scrollThreshold;
  }

  changeView(view: string) {
    switch(view) {
      case 'compact':
        this.pokemonListGridClass = 'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-2';
        break;
      case 'comfortable':
        this.pokemonListGridClass = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3';
        break;
      case 'spacious':
        this.pokemonListGridClass = 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4';
        break;
      default:
        this.pokemonListGridClass = 'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-2';
    }
  }

  addZerosToNumber(number: number): string {
    return number.toString().padStart(4, '0');
  }
}
