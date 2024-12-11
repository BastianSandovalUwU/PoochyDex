import { Route } from "@angular/router";
import { ShowProfileComponent } from "./components/show-profile/show-profile.component";

export const profileRoute: Route[] = [
  {
    path: 'show',
    component: ShowProfileComponent
  }
];
