import { Route } from "@angular/router";
import { ShowGameComponent } from "./components/show-game/show-game.component";
import { ListGamesComponent } from "./components/list-games/list-games.component";

export const gameRoute: Route[] = [
  {
    path: 'show-game/:game',
    component: ShowGameComponent
  },
  {
    path: 'list-games',
    component: ListGamesComponent
  },
];
