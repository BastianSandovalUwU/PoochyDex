import { Route } from "@angular/router";
import { ListPokemonComponent } from "./components/list-pokemon/list-pokemon.component";

export const pokedexRoute: Route[] = [
  { path: 'list',
    component: ListPokemonComponent
  },
]

