import { Route } from "@angular/router";
import { ShowGameComponent } from "./components/show-game/show-game.component";

export const gameRoute: Route[] = [
  {
    path: 'show-game/:game',
    component: ShowGameComponent
  },
];
