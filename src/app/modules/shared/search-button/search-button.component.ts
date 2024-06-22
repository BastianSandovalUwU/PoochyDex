import { Component, HostListener, OnInit } from '@angular/core';
import { ALL_POKEMON } from '../../../../../entities/common/const.interface';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.scss']
})
export class SearchButtonComponent implements OnInit {

  showSearch = false;
  searchQuery = '';
  data = ALL_POKEMON;
  filteredData: string[] = [];
  limitedFilteredData: string[] = [];
  language: string;

  constructor(private router: Router,
              private languageService: LanguageService) { }

  @HostListener("window:scroll", ['$event'])
  doSomethingOnWindowsScroll(){
    const scroll = document.documentElement.scrollTop;
    const searchButton = document.querySelector("#searchButton");
    document.getElementById('searchButton').style.transform = "scale(0)";
    searchButton.setAttribute("class","scale-in-center ");

    if(scroll === 0 || scroll > 0){
        document.getElementById('searchButton').style.transform = "scale(1)";
        searchButton.setAttribute("class","scale-in-center ");
    }
  }

  ngOnInit() {
    this.getLanguage();
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
    this.filteredData = this.data.filter(item => item.toLowerCase().includes(query));
    this.limitedFilteredData = this.filteredData.slice(0, 6);
  }

  navigateToPokemon(pokemonName: string) {
    this.router.navigate(['/pokedex/show-pokemon/', pokemonName]);
    this.toggleSearch();
  }

}
