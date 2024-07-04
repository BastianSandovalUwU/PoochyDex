import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: '/pokedex' },

  {
    path: '',
    children: [
        { path: 'pokedex', loadChildren: () => import('./modules/pokedex/pokedex.module').then(m => m.PokedexModule) },
        { path: 'movement', loadChildren: () => import('./modules/movements/movement.module').then(m => m.MovementModule) },
        { path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule) },
    ]
},



]

