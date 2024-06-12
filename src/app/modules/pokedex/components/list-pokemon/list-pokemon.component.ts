import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon } from '../../../../../../entities/pokemon.entity';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

  allPokemon: Pokemon[] = [];

  constructor(private pokeApiService: PokeApiService,
              ) { }

  ngOnInit() {
    this.pokeApiService.getAllPokemon().subscribe((pokeData) => {
      console.log(pokeData);
      const pokemon: Pokemon[] = []
      for (let i = 0; i < pokeData.results.length; i++) {
        this.pokeApiService.getPokemonByName(pokeData.results[i].name).subscribe((pokeInfo) => {
          if(pokeInfo.is_default === true) {
            pokemon.push(pokeInfo);
          }
        });
      }
      this.allPokemon = pokemon;
      console.log(this.allPokemon);
    });
  }

  getPokemonByGeneration(generationNumber: number) {
    this.allPokemon = [];
    this.pokeApiService.getPokemonByGeneration(generationNumber).subscribe((pokeData) => {
      console.log(pokeData);
      const pokemon = []
      for (let i = 0; i < pokeData.pokemon_species.length; i++) {
        this.pokeApiService.getPokemonByName(pokeData.pokemon_species[i].name).subscribe((pokeInfo) => {
          pokemon.push(pokeInfo);
        });
      }
      this.allPokemon = pokemon.sort((a,b) => b.order - a.order);
      console.log(this.allPokemon);
    });

  }


}
