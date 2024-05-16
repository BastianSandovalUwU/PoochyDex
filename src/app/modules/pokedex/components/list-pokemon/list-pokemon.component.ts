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

  constructor(private pokeApi: PokeApiService,
              ) { }

  ngOnInit() {
    this.pokeApi.getAllPokemon().subscribe((pokeData) => {
      console.log(pokeData);
      const pokemon = []
      for (let i = 0; i < pokeData.results.length; i++) {
        this.pokeApi.getPokemonByName(pokeData.results[i].name).subscribe((pokeInfo) => {
          pokemon.push(pokeInfo);
        });
      }
      this.allPokemon = pokemon;
      console.log(this.allPokemon);
    });
  }

  getPokemonByGeneration(generationNumber: number) {
    this.allPokemon = [];
    this.pokeApi.getPokemonByGeneration(generationNumber).subscribe((pokeData) => {
      console.log(pokeData);
      const pokemon = []
      for (let i = 0; i < pokeData.pokemon_species.length; i++) {
        this.pokeApi.getPokemonByName(pokeData.pokemon_species[i].name).subscribe((pokeInfo) => {
          pokemon.push(pokeInfo);
        });
      }
      this.allPokemon = pokemon.sort((a,b) => b.order - a.order);
      console.log(this.allPokemon);
    });

  }


}
