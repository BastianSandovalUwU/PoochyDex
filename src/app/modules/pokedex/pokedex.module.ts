import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPokemonComponent } from './components/list-pokemon/list-pokemon.component';
import { RouterModule } from '@angular/router';
import { pokedexRoute } from './pokedex.routing';
import { ShowPokemonComponent } from './components/show-pokemon/show-pokemon.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PokemonInfoComponent } from './components/show-pokemon/pokemon-info/pokemon-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(pokedexRoute),
    SharedModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    ListPokemonComponent,
    ShowPokemonComponent,
    PokemonInfoComponent
  ],
})
export class PokedexModule { }
