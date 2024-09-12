import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { ALL_GMAX_POKEMON_FORMS, ALL_POKEMON, ALL_POKEMON_ALOLA_REGIONAL_FORMS, ALL_POKEMON_GALAR_REGIONAL_FORMS, ALL_POKEMON_HISUI_REGIONAL_FORMS, ALL_POKEMON_MEGA_FORMS, ALL_POKEMON_PALDEA_REGIONAL_FORMS, AllPokemon } from '../../../../../../entities/common/const.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PoochyDexApiService } from 'app/modules/poochyDexApi/services/poochyDexApi.service';
import { PokemonApi } from 'app/modules/poochyDexApi/interfaces/pokemon.interface';
import { HelperService } from 'app/modules/shared/services/helper.service';
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

  allPokemon: AllPokemon[] = ALL_POKEMON;
  allAlolaFormsPokemon: AllPokemon[] = ALL_POKEMON_ALOLA_REGIONAL_FORMS;
  allGalarFormsPokemon: AllPokemon[] = ALL_POKEMON_GALAR_REGIONAL_FORMS;
  allPaldeaPokemon: AllPokemon[] = ALL_POKEMON_PALDEA_REGIONAL_FORMS;
  allHisuiPokemon: AllPokemon[] = ALL_POKEMON_HISUI_REGIONAL_FORMS;
  allGmaxPokemon: AllPokemon[] = ALL_GMAX_POKEMON_FORMS;
  allMegaPokemon: AllPokemon[] = ALL_POKEMON_MEGA_FORMS;
  filteredPokemon: PokemonApi[] = [];
  allPokemonAPI: PokemonApi[] = [];
  language: string;
  generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  selectedGenerations: number[] = [];
  selectedForms: string[] = [];
  filtersVisible = false;

  constructor(private pokeApiService: PokeApiService,
              private helperService: HelperService,
              private poochyDexApiService: PoochyDexApiService,
              private languageService: LanguageService,
              ) { }

  ngOnInit() {
    this.selectedGenerations = [...this.generations];
    this.getAllPokemon();
    this.getLanguage();
  }

  getAllPokemon(): void {
    this.poochyDexApiService.getAllPokemon().subscribe((resp) => {
      this.allPokemonAPI = resp;
      this.filteredPokemon = resp;
      console.log(this.allPokemonAPI.filter(f => f.generationId === 6).map((poke) => {
        return {
          name: poke.name,
          imageURL: poke.imageURL,
          number: poke.number,
          type: poke.type,
          type2: poke.type2,
          generationId: poke.generationId
        }
      }));
    }, (error => {
      console.log(error);
    }));
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
    // Filtrar los Pokémon por generación usando el generationId
    let filtered = this.allPokemonAPI.filter(pokemon =>
      generations.includes(pokemon.generationId)
    );

    // Helper para verificar si un Pokémon está dentro de las generaciones seleccionadas
    const isWithinSelectedGenerations = (pokemon: PokemonApi) =>
      generations.includes(pokemon.generationId);

    // if (forms.includes('alola')) {
    //   filtered = filtered.concat(this.allAlolaFormsPokemon.filter(isWithinSelectedGenerations));
    // }
    // if (forms.includes('galar')) {
    //   filtered = filtered.concat(this.allGalarFormsPokemon.filter(isWithinSelectedGenerations));
    // }
    // if (forms.includes('paldea')) {
    //   filtered = filtered.concat(this.allPaldeaPokemon.filter(isWithinSelectedGenerations));
    // }
    // if (forms.includes('hisui')) {
    //   filtered = filtered.concat(this.allHisuiPokemon.filter(isWithinSelectedGenerations));
    // }
    // if (forms.includes('gmax')) {
    //   filtered = filtered.concat(this.allGmaxPokemon.filter(isWithinSelectedGenerations));
    // }
    // if (forms.includes('mega')) {
    //   filtered = filtered.concat(this.allMegaPokemon.filter(isWithinSelectedGenerations));
    // }

    // Eliminar duplicados y ordenar
    this.filteredPokemon = Array.from(new Set(filtered)).sort((a, b) => a.number - b.number);
    console.log(this.filteredPokemon.map((x) => {
      return {
        name: x.name,
        imageURL: x.imageURL,
        number: x.number,
        type: x.type,
        type2: x.type2,
        generationId: x.generationId
      }
    }));
  }

//   getPokemonByGenerationsAndForms(generations: number[], forms: string[]) {
//     const generationRanges = {
//       1: { min: 1, max: 151 },
//       2: { min: 152, max: 251 },
//       3: { min: 252, max: 386.3 },
//       4: { min: 387, max: 493 },
//       5: { min: 494, max: 649 },
//       6: { min: 650, max: 721 },
//       7: { min: 722, max: 809 },
//       8: { min: 810, max: 905 },
//       9: { min: 906, max: 1025 }
//     };

//     // Filtrar los Pokémon por generación
//     let filtered = this.allPokemon.filter(pokemon =>
//       generations.some(gen =>
//         pokemon.number >= generationRanges[gen].min &&
//         pokemon.number <= generationRanges[gen].max
//       )
//     );

//     // Helper para verificar si un Pokémon está dentro de las generaciones seleccionadas
// const isWithinSelectedGenerations = (pokemon: AllPokemon) =>
//   generations.some(gen => {
//     const min = generationRanges[gen].min;
//     const max = generationRanges[gen].max;

//     // Permitir un margen de decimales
//     const tolerance = 0.1; // Ajusta según sea necesario

//     // Verificar si el número del Pokémon está dentro del rango con tolerancia para decimales
//     return pokemon.number >= min - tolerance && pokemon.number <= max + tolerance;
//   });

//     // Filtrar y agregar formas adicionales si están dentro de las generaciones seleccionadas
//     if (forms.includes('alola')) {
//       filtered = filtered.concat(this.allAlolaFormsPokemon.filter(isWithinSelectedGenerations));
//     }
//     if (forms.includes('galar')) {
//       filtered = filtered.concat(this.allGalarFormsPokemon.filter(isWithinSelectedGenerations));
//     }
//     if (forms.includes('paldea')) {
//       filtered = filtered.concat(this.allPaldeaPokemon.filter(isWithinSelectedGenerations));
//     }
//     if (forms.includes('hisui')) {
//       filtered = filtered.concat(this.allHisuiPokemon.filter(isWithinSelectedGenerations));
//     }
//     if (forms.includes('gmax')) {
//       filtered = filtered.concat(this.allGmaxPokemon.filter(isWithinSelectedGenerations));
//     }
//     if (forms.includes('mega')) {
//       filtered = filtered.concat(this.allMegaPokemon.filter(isWithinSelectedGenerations));
//     }

//     // Eliminar duplicados y ordenar
//     this.filteredPokemon = Array.from(new Set(filtered)).sort((a, b) => a.number - b.number);
//     console.log(this.filteredPokemon);
//   }

  translatePokemonType(typeName: string) {
    return this.helperService.getTranslateTypeName(typeName, this.language);
  }

}
