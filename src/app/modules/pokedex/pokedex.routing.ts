import { Route } from "@angular/router";
import { ListPokemonComponent } from "./components/list-pokemon/list-pokemon.component";
import { ShowPokemonComponent } from "./components/show-pokemon/show-pokemon.component";
import { ShowAbilityComponent } from "./components/show-ability/show-ability.component";
import { PokedexComponent } from "./pokedex.component";
import { ShowPokedexComponent } from "./components/show-pokedex/show-pokedex.component";
import { PokemonHuntComponent } from "./components/pokemon-hunt/pokemon-hunt.component";

export const pokedexRoute: Route[] = [
  {
    path: '',
    component: PokedexComponent
  },
  {
    path: 'list',
    component: ListPokemonComponent
  },
  {
    path: 'hunt',
    component: PokemonHuntComponent
  },
  {
    path: 'show-pokemon/:name',
    component: ShowPokemonComponent
  },
  {
    path: 'show-ability/:ability',
    component: ShowAbilityComponent
  },
  {
    path: 'show-pokedex/:number',
    component: ShowPokedexComponent
  },
]

