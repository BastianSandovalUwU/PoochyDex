import { Component, HostListener, OnInit } from '@angular/core';
import { ALL_POKEMON } from '../../../../../entities/common/const.interface';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { debounceTime } from 'rxjs';
import { ALL_POKEMON_KANTO, ALL_POKEMON_JOTHO, ALL_POKEMON_HOENN, ALL_POKEMON_SINNOH, ALL_POKEMON_UNOVA, ALL_POKEMON_KALOS, ALL_POKEMON_ALOLA, ALL_POKEMON_GALAR, ALL_POKEMON_PALDEA } from '../../../../../entities/common/poochyApiData';

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.scss']
})
export class SearchButtonComponent implements OnInit {

  showSearch = false;
  searchQuery = '';
  data = [...ALL_POKEMON_KANTO, ...ALL_POKEMON_JOTHO,
    ...ALL_POKEMON_HOENN, ...ALL_POKEMON_SINNOH, ...ALL_POKEMON_UNOVA,
    ...ALL_POKEMON_KALOS, ...ALL_POKEMON_ALOLA, ...ALL_POKEMON_GALAR, ...ALL_POKEMON_PALDEA];
  filteredData: any[] = [];
  limitedFilteredData: any[] = [];
  language: string;

  constructor(private router: Router,
              private languageService: LanguageService) { }

  ngOnInit() {
    this.getLanguage();
    setTimeout(() => {
      const searchButton = document.querySelector("#searchButton") as HTMLElement;
      if (searchButton) {
        searchButton.style.transform = "scale(1)";
        searchButton.setAttribute("class", "scale-in-center");
      }
    }, 200);
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    this.searchQuery = '';
    this.limitedFilteredData = [];
  }

  filterData() {
    const query = this.searchQuery.toLowerCase();
    this.filteredData = this.data.filter(item => item.name.toLowerCase().includes(query));
    this.limitedFilteredData = this.filteredData.slice(0, 6);
  }

  navigateToPokemon(pokemonName: string) {
    this.router.navigate(['/pokedex/show-pokemon/', pokemonName]);
    this.toggleSearch();
  }

}
