import { Route } from "@angular/router";
import { ShowProfileComponent } from "./components/show-profile/show-profile.component";
import { SettingsComponent } from "./components/settings/settings.component";

export const profileRoute: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'show' },
  {
    path: 'show',
    component: ShowProfileComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];
