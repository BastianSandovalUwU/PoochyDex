import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPokemonComponent } from './components/list-pokemon/list-pokemon.component';
import { RouterModule } from '@angular/router';
import { pokedexRoute } from './pokedex.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pokedexRoute),
  ],
  declarations: [ListPokemonComponent]
})
export class PokedexModule { }
