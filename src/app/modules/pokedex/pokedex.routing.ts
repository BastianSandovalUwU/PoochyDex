import { Route } from "@angular/router";
import { ListPokemonComponent } from "./components/list-pokemon/list-pokemon.component";
import { ShowPokemonComponent } from "./components/show-pokemon/show-pokemon.component";
import { ShowAbilityComponent } from "./components/show-ability/show-ability.component";
import { PokedexComponent } from "./pokedex.component";

export const pokedexRoute: Route[] = [
  { path: '',
    component: PokedexComponent
  },
  { path: 'list',
    component: ListPokemonComponent
  },
  { path: 'show-pokemon/:name',
    component: ShowPokemonComponent
  },
  { path: 'show-ability/:ability',
    component: ShowAbilityComponent
  },
]

