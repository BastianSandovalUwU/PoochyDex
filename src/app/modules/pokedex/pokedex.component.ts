import { Component, OnInit, inject } from '@angular/core';
import { ALL_POKEMON } from '../../../../entities/common/const.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pokedex',
    templateUrl: './pokedex.component.html',
    styleUrls: [],
    standalone: false
})
export class PokedexComponent implements OnInit {
  private router = inject(Router);


  randomPokemon: string = '';
  pokemonList = ALL_POKEMON;

  ngOnInit() {
    const currentUrl = this.router.url;
    if (currentUrl === '/pokedex' || currentUrl === '/pokedex/') {
      this.randomPokemon = this.getRandomPokemon();
      this.router.navigate(['/pokedex/show-pokemon/', this.randomPokemon], {
        replaceUrl: true,
        skipLocationChange: false
      });
    }
  }

  getRandomPokemon(): any {
    const index = Math.floor(Math.random() * this.pokemonList.length);
    return this.pokemonList[index].name;
  }

}
