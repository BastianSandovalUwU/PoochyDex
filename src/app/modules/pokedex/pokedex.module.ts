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
import { PokedexEntriesComponent } from './components/show-pokemon/pokedex-entries/pokedex-entries.component';
import { ChainEvolutionComponent } from './components/show-pokemon/chain-evolution/chain-evolution.component';
import { PokedexNumbersComponent } from './components/show-pokemon/pokedex-numbers/pokedex-numbers.component';
import { PokemonMovesComponent } from './components/show-pokemon/pokemon-moves/pokemon-moves.component';
import { PokemonCryComponent } from './components/show-pokemon/pokemon-cry/pokemon-cry.component';
import { PokemonStatsComponent } from './components/show-pokemon/pokemon-stats/pokemon-stats.component';
import { ShowAbilityComponent } from './components/show-ability/show-ability.component';
import { PokemonVarietiesComponent } from './components/show-pokemon/pokemon-varieties/pokemon-varieties.component';
import { PokedexComponent } from './pokedex.component';
import { ShowPokedexComponent } from './components/show-pokedex/show-pokedex.component';
import { PokedexDescriptionComponent } from './components/show-pokedex/pokedex-description/pokedex-description.component';
import { PokemonLocalizationComponent } from './components/show-pokemon/pokemon-localization/pokemon-localization.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxLoadingModule } from 'ngx-loading';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(pokedexRoute),
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    NgxLoadingModule
  ],
  declarations: [
    PokedexComponent,
    ShowPokedexComponent,
    ListPokemonComponent,
    ShowPokemonComponent,
    PokemonInfoComponent,
    PokedexEntriesComponent,
    ChainEvolutionComponent,
    PokedexNumbersComponent,
    PokemonMovesComponent,
    PokemonCryComponent,
    PokemonStatsComponent,
    ShowAbilityComponent,
    PokemonVarietiesComponent,
    PokedexDescriptionComponent,
    PokemonLocalizationComponent
  ],
})
export class PokedexModule { }
