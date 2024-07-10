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

  pokedexNumber: number;
  pokedex: any;

  constructor(private pokeApiService: PokeApiService,
              private languageService: LanguageService,
              private helperService: HelperService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ number }) => {
      console.log('ActivatedRoute params:', number); // Debugging
      this.pokedexNumber = this.getPokedexNumber(number);
      console.log('Pokedex number:', this.pokedexNumber); // Debugging
      this.getPokedex(this.pokedexNumber);
    });
  }

  getPokedex(num: number): void {
    console.log('Fetching Pokedex for number:', num); // Debugging
    this.pokeApiService.getPokedex(num).subscribe((pokemon) => {
      console.log('Pokedex data:', pokemon); // Debugging
      const pokemonVarieties = [];

      for (let index = 0; index < pokemon.pokemon_entries.length; index++) {
        const pokeImgname = this.helperService.getPokemonSpriteImg(pokemon.pokemon_entries[index].pokemon_species.name);
        const pokeInfo = {
          ...pokemon.pokemon_entries[index],
          name: this.getCorrectPokemonName(pokemon.pokemon_entries[index].pokemon_species.name),
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

  getPokedexNumber(pokedexName: string): number {
    switch (pokedexName) {
      case "national" : return 1;
      case "kanto" : return 2;
      case "original-johto" : return 3;
      case "johto" : return 3;
      case "hoenn" : return 4;
      case "original-sinnoh" : return 5;
      case "sinnoh" : return 5;
      case "extended-sinnoh" : return 6;
      case "platinum-sinnoh" : return 6;
      case "updated-johto" : return 7;
      case "original-unova" : return 8;
      case "updated-unova" : return 9;
      case "conquest-gallery" : return 11;
      case "kalos-central" : return 12;
      case "kalos-coastal" : return 13;
      case "kalos-mountain" : return 14;
      case "updated-hoenn" : return 15;
      case "original-alola" : return 16;
      case "original-melemele" : return 17;
      case "original-akala" : return 18;
      case "original-ulaula" : return 19;
      case "original-poni" : return 20;
      case "updated-alola" : return 21;
      case "updated-melemele" : return 22;
      case "updated-akala" : return 23;
      case "updated-ulaula" : return 24;
      case "updated-poni" : return 25;
      case "letsgo-kanto" : return 26;
      case "galar" : return 27;
      case "isle-of-armor" : return 28;
      case "crown-tundra" : return 29;
      case "hisui" : return 30;
      case "paldea" : return 31;
      case "kitakami" : return 32;
      case "blueberry" : return 33;
    default: return 0;
  }
  }

  getCorrectPokemonName(pokemonName): string {
    switch (pokemonName) {
      case 'deoxys':
        return 'deoxys-normal'
      case 'wormadam':
          return 'wormadam-plant'
      case 'giratina':
        return 'giratina-altered'
      case 'shaymin':
        return 'shaymin-land'
      case 'basculin':
        return 'basculin-red-striped'
      case 'basculegion':
        return 'basculegion-male'
      case 'darmanitan':
        return 'darmanitan-standard'
      case 'keldeo':
        return 'keldeo-ordinary'
      case 'meloetta':
        return 'meloetta-aria'
      case 'tornadus':
        return 'tornadus-incarnate'
      case 'thundurus':
        return 'thundurus-incarnate'
      case 'landorus':
        return 'landorus-incarnate'
      case 'enamorus':
        return 'enamorus-incarnate'
      case 'aegislash':
        return 'aegislash-shield'
      case 'meowstic':
        return 'meowstic-male'
      case 'pumpkaboo':
        return 'pumpkaboo-average'
      case 'gourgeist':
        return 'gourgeist-average'
      case 'zygarde':
        return 'zygarde-50'
      default:
        return pokemonName;
    }
  }

}
