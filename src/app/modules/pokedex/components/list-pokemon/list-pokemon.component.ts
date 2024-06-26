import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon } from '../../../../../../entities/pokemon.entity';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { ALL_POKEMON } from '../../../../../../entities/common/const.interface';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

  allPokemon = ALL_POKEMON;
  language: string;

  constructor(private pokeApiService: PokeApiService,
              private languageService: LanguageService,
              ) { }

  ngOnInit() {
    this.getLanguage();
    // this.pokeApiService.getAllPokemon().subscribe((pokeData) => {
    //   const pokemon: Pokemon[] = []
    //   for (let i = 0; i < pokeData.results.length; i++) {
    //     this.pokeApiService.getPokemonByName(pokeData.results[i].name).subscribe((pokeInfo) => {
    //       if(pokeInfo.is_default === true) {
    //         pokemon.push(pokeInfo);
    //       }
    //     });
    //   }
    //   this.allPokemon = pokemon;
    // });
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  getPokemonByGeneration(generationNumber: number) {
    this.allPokemon = [];
    this.pokeApiService.getPokemonByGeneration(generationNumber).subscribe((pokeData) => {
      const pokemon = []
      for (let i = 0; i < pokeData.pokemon_species.length; i++) {
        this.pokeApiService.getPokemonByName(pokeData.pokemon_species[i].name).subscribe((pokeInfo) => {
        });
      }
      this.allPokemon = pokemon.sort((a,b) => b.order - a.order);
    });

  }


}
