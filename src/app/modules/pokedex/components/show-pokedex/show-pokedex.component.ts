import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';

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
              private activatedRoute: ActivatedRoute) { }

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
    this.pokeApiService.getPokedex(num).subscribe((pokemon) => {
      console.log('Pokedex data:', pokemon); // Debugging
      const pokemonVarieties = [];

      for (let index = 0; index < pokemon.pokemon_entries.length; index++) {
        const pokeImgname = this.helperService.getPokemonSpriteImg(pokemon.pokemon_entries[index].pokemon_species.name, "home");
        const pokeInfo = {
          ...pokemon.pokemon_entries[index],
          name: this.helperService.getCorrectPokemonName(pokemon.pokemon_entries[index].pokemon_species.name),
          imageName: pokeImgname,
        }
        pokemonVarieties.push(pokeInfo);
      }
      console.log(pokemonVarieties);
      this.pokedex = pokemonVarieties;
    }, error => {
      console.error('Error fetching Pokedex:', error); // Debugging
    });
  }


}
