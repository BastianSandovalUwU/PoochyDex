import { Route } from "@angular/router";
import { ListPokemonComponent } from "./components/list-pokemon/list-pokemon.component";
import { ShowPokemonComponent } from "./components/show-pokemon/show-pokemon.component";

export const pokedexRoute: Route[] = [
  { path: 'list',
    component: ListPokemonComponent
  },
  { path: 'show-pokemon/:name',
    component: ShowPokemonComponent
  },
]

