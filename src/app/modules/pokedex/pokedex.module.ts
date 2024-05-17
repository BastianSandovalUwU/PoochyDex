import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPokemonComponent } from './components/list-pokemon/list-pokemon.component';
import { RouterModule } from '@angular/router';
import { pokedexRoute } from './pokedex.routing';
import { ShowPokemonComponent } from './components/show-pokemon/show-pokemon.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pokedexRoute),
    SharedModule
  ],
  declarations: [
    ListPokemonComponent,
    ShowPokemonComponent
  ],
})
export class PokedexModule { }
