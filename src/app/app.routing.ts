import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: '/pokedex' },

  {
    path: '',
    children: [
        { path: 'pokedex', loadChildren: () => import('./modules/pokedex/pokedex.module').then(m => m.PokedexModule) },
        { path: 'movement', loadChildren: () => import('./modules/movements/movement.module').then(m => m.MovementModule) },
        { path: 'game', loadChildren: () => import('./modules/game/game.module').then(m => m.GameModule) },
        { path: 'apiDex', loadChildren: () => import('./modules/poochyDexApi/poochyDexApi.module').then(m => m.PoochyDexApiModule) },
        { path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule) },
    ]
},



]

