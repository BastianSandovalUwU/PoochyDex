import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

  allPokemon = [];

  constructor(private pokeApi: PokeApiService) { }

  ngOnInit() {
    this.pokeApi.getAllPokemon().subscribe((pokeData) => {
      console.log(pokeData);
      pokeData.results;
      for (let i = 0; i < pokeData.results.length; i++) {
        this.pokeApi.getPokemonById(pokeData.results[i].name).subscribe((pokeInfo) => {
          this.allPokemon.push(pokeInfo);
        });
      }
      console.log(this.allPokemon);
    });
  }


}
