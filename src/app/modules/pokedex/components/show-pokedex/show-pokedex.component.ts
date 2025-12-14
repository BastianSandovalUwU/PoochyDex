import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { ErrorMessageService } from 'app/services/error-message.service';
@Component({
  selector: 'app-show-pokedex',
  templateUrl: './show-pokedex.component.html',
  styleUrls: ['./show-pokedex.component.scss']
})
export class ShowPokedexComponent implements OnInit {
  language: string;
  pokedexNumber: number;
  pokedexName: string;
  pokedex: any;

  constructor(private pokeApiService: PokeApiService,
              private languageService: LanguageService,
              private helperService: HelperService,
              private activatedRoute: ActivatedRoute,
              private errorMessageService: ErrorMessageService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ number }) => {
      this.pokedexName = number;
      this.pokedexNumber = this.helperService.getPokedexNumber(number);
      this.getPokedex(this.pokedexNumber);
    });
    this.getLanguage();
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  getPokedex(num: number): void {
    this.pokeApiService.getPokedex(num).subscribe({
      next: (pokemon) => {
        const pokemonVarieties = [];

      for (let index = 0; index < pokemon.pokemon_entries.length; index++) {
        const pokeInfo = {
          ...pokemon.pokemon_entries[index],
          name: this.helperService.getCorrectPokemonName(pokemon.pokemon_entries[index].pokemon_species.name),
        }
        pokemonVarieties.push(pokeInfo);
        this.helperService.getPokemonSpriteImg(pokemon.pokemon_entries[index].pokemon_species.name, "home")
          .subscribe(pokeImgname => pokeInfo.imageName = pokeImgname);
      }
      this.pokedex = pokemonVarieties;
    },
    error: (error) => {
      const errorMessage = this.language === 'es' ? 'Error al cargar la Pokédex' : 'Error loading Pokedex';
      this.errorMessageService.showError(errorMessage, error.message);
    }
  });
  }


}
