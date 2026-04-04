import { Route } from "@angular/router";
import { ShowProfileComponent } from "./components/show-profile/show-profile.component";

export const profileRoute: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'show' },
  {
    path: 'show',
    component: ShowProfileComponent
  }
];
