import { Component, OnInit } from '@angular/core';
import { ALL_POKEMON } from '../../../../entities/common/const.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: []
})
export class PokedexComponent implements OnInit {

  randomPokemon: string = '';
  pokemonList = ALL_POKEMON;

  constructor(private router: Router) { }

  ngOnInit() {
    this.randomPokemon = this.getRandomPokemon();
    this.router.navigate(['/pokedex/show-pokemon/', this.randomPokemon]);
  }

  getRandomPokemon(): any {
    const index = Math.floor(Math.random() * this.pokemonList.length);
    return this.pokemonList[index].name;
  }

}
