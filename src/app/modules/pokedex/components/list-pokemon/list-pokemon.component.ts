import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon } from '../../../../../../entities/pokemon.entity';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { ALL_POKEMON, AllPokemon } from '../../../../../../entities/common/const.interface';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

  allPokemon: AllPokemon[] = ALL_POKEMON;
  filteredPokemon: AllPokemon[] = ALL_POKEMON;
  language: string;

  constructor(private pokeApiService: PokeApiService,
              private languageService: LanguageService,
              ) { }

  ngOnInit() {
    this.getLanguage();
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  getPokemonByGeneration(generationNumber: number) {
    switch (generationNumber) {
      case 1:
          this.filteredPokemon = this.allPokemon.filter(f => f.number > 0 && f.number < 152);
        break;
      case 2:
          this.filteredPokemon = this.allPokemon.filter(f => f.number > 151 && f.number < 252);
        break;
      case 3:
          this.filteredPokemon = this.allPokemon.filter(f => f.number > 251 && f.number < 387);
        break;
      case 4:
          this.filteredPokemon = this.allPokemon.filter(f => f.number >= 387 && f.number < 494);
        break;
      case 5:
          this.filteredPokemon = this.allPokemon.filter(f => f.number > 493 && f.number < 650);
        break;
      case 6:
          this.filteredPokemon = this.allPokemon.filter(f => f.number > 649 && f.number < 722);
        break;
      case 7:
          this.filteredPokemon = this.allPokemon.filter(f => f.number > 721 && f.number < 810);
        break;
      case 8:
          this.filteredPokemon = this.allPokemon.filter(f => f.number > 809 && f.number < 906);
        break;
      case 9:
          this.filteredPokemon = this.allPokemon.filter(f => f.number > 905 && f.number < 1026);
        break;

      default:
        break;
    }

  }


}
