import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { LoadingService } from 'app/modules/shared/services/loading.service';
import { Router } from '@angular/router';

interface PokedexListItem {
  name: string;
  url: string;
  id: number;
}

interface PokedexListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokedexListItem[];
}

@Component({
  selector: 'app-list-pokedex',
  templateUrl: './list-pokedex.component.html',
  styleUrls: ['./list-pokedex.component.scss']
})
export class ListPokedexComponent implements OnInit {
  pokedexList: PokedexListItem[] = [];
  language: string = 'es';
  loading: boolean = false;

  constructor(
    private pokeApiService: PokeApiService,
    private languageService: LanguageService,
    private loadingService: LoadingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getLanguage();
    this.getAllPokedex();
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  getAllPokedex() {
    this.loading = true;
    this.loadingService.show();
    this.pokeApiService.getAllPokedex().subscribe({
      next: (response: PokedexListResponse) => {
        this.pokedexList = response.results.map(pokedex => {
          const urlParts = pokedex.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 2] || '0', 10);
          return {
            ...pokedex,
            id
          };
        }).sort((a, b) => a.id - b.id);
        this.loadingService.hide();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching Pokédex list:', error);
        this.loadingService.hide();
        this.loading = false;
      }
    });
  }

  navigateToPokedex(pokedexName: string) {
    if(pokedexName === 'national') {
      this.router.navigate(['/pokedex/list']);
    } else {
      this.router.navigate(['/pokedex/show-pokedex', pokedexName]);
    }
  }
}
