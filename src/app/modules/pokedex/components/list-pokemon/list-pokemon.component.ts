import { Component, OnInit, HostListener } from '@angular/core';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { Pokemon, PokemonForm } from '../../../../../../entities/poochydex-api/pokemon.type';
import { PoochyDexApiService } from 'app/modules/poochyDexApi/services/poochyDexApi.service';
@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

  allPokemon: Pokemon[] = [];
  allPokemonForms: PokemonForm[] = [];
  filteredPokemon: Pokemon[] = [];
  language: string;
  filtersVisible = false;
  showFloatingFilter: boolean = false;
  private scrollThreshold: number = 200;

  constructor(
              private languageService: LanguageService,
              private helperService: HelperService,
              private poochyDexApiService: PoochyDexApiService
              ) { }

  ngOnInit() {
    this.getLanguage();
    this.getPokemon();
    this.getPokemonForms();
  }

  getPokemon() {
    this.poochyDexApiService.getAllPokemon().subscribe({
      next: (response) => {
        this.allPokemon = response.data;
        this.filteredPokemon = this.allPokemon;
      },
      error: (error) => {
        console.error('Error al obtener los Pokémon:', error);
      }
    });
  }

  getPokemonForms() {
    this.poochyDexApiService.getAllPokemonForms().subscribe({
      next: (response) => {
        this.allPokemonForms = response.data;
      },
      error: (error) => {
        console.error('Error al obtener las formas de Pokémon:', error);
      }
    });
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
    const gensToUse = generations.length > 0
      ? generations
      : Array.from(new Set(this.allPokemon.map(p => p.generationId)));

    const baseByNumber = new Map<number, Pokemon>(
      this.allPokemon.map(p => [p.number, p])
    );

    const isBaseInSelectedGenerations = (pokemon: Pokemon) =>
      gensToUse.includes(pokemon.generationId);

    const isFormInSelectedGenerations = (form: PokemonForm) => {
      const base = baseByNumber.get(form.number);
      return !!base && gensToUse.includes(base.generationId);
    };

    const formFilters: { [key: string]: (f: PokemonForm) => boolean } = {
      alola: (f) => f.name.includes('-alola'),
      galar: (f) => f.name.includes('-galar'),
      paldea: (f) => f.name.includes('-paldea'),
      hisui: (f) => f.name.includes('-hisui'),
      gmax: (f) => f.name.includes('-gmax'),
      mega: (f) => f.name.includes('-mega'),
    };

    let result: (Pokemon | PokemonForm)[] = this.allPokemon.filter(isBaseInSelectedGenerations);

    if (forms.length > 0) {
      forms.forEach(formKey => {
        const predicate = formFilters[formKey];
        if (!predicate) {
          return;
        }
        const formsForKey = this.allPokemonForms
          .filter(predicate)
          .filter(isFormInSelectedGenerations);
        result = result.concat(formsForKey);
      });
    }

    const uniqueMap = new Map<string, Pokemon>();
    for (const p of result) {
      const key = `${p.number}-${p.name}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, p as Pokemon);
      }
    }

    this.filteredPokemon = Array.from(uniqueMap.values()).sort((a, b) => a.number - b.number);
  }

  getGameIconNameForLanguage(typeName: string, language: string): string {
    return this.helperService.getGameIconNameForLanguage(typeName, language);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showFloatingFilter = scrollPosition > this.scrollThreshold;
  }

  addZerosToNumber(number: number): string {
    return this.helperService.addZerosToNumber(number);
  }
}
