import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PokemonList } from '../../../../../../entities/pokemon-list.entity';
import { AllPokemon } from '../../../../../../entities/common/const.interface';
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
@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss'],
  animations: [
    trigger('toggleFilters', [
      state('visible', style({
        height: '*',
        opacity: 1
      })),
      state('hidden', style({
        height: '0px',
        opacity: 0
      })),
      transition('visible <=> hidden', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
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
  generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  selectedGenerations: number[] = [];
  selectedForms: string[] = [];
  filtersVisible = false;

  constructor(private pokeApiService: PokeApiService,
              private languageService: LanguageService,
              ) { }

  ngOnInit() {
    this.selectedGenerations = [...this.generations];
    this.getLanguage();
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  toggleGeneration(gen: number, event: any) {
    if (event.target.checked) {
      this.selectedGenerations.push(gen);
    } else {
      const index = this.selectedGenerations.indexOf(gen);
      if (index > -1) {
        this.selectedGenerations.splice(index, 1);
      }
    }
  }

  toggleForm(form: string, event: any) {
    if (event.target.checked) {
      this.selectedForms.push(form);
    } else {
      const index = this.selectedForms.indexOf(form);
      if (index > -1) {
        this.selectedForms.splice(index, 1);
      }
    }
  }

  applyFilters() {
    this.getPokemonByGenerationsAndForms(this.selectedGenerations, this.selectedForms);
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

    // Filtrar los Pokémon por generación
    let filtered = this.allPokemon.filter(pokemon =>
      generations.some(gen =>
        pokemon.number >= generationRanges[gen].min &&
        pokemon.number <= generationRanges[gen].max
      )
    );

    // Helper para verificar si un Pokémon está dentro de las generaciones seleccionadas
const isWithinSelectedGenerations = (pokemon: PokemonList) =>
  generations.some(gen => {
    const min = generationRanges[gen].min;
    const max = generationRanges[gen].max;

    // Permitir un margen de decimales
    const tolerance = 0.1; // Ajusta según sea necesario

    // Verificar si el número del Pokémon está dentro del rango con tolerancia para decimales
    return pokemon.number >= min - tolerance && pokemon.number <= max + tolerance;
  });

    // Filtrar y agregar formas adicionales si están dentro de las generaciones seleccionadas
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

    // Eliminar duplicados y ordenar
    this.filteredPokemon = Array.from(new Set(filtered)).sort((a, b) => a.number - b.number);
    console.log(this.filteredPokemon);
  }

}
