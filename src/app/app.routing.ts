import { inject } from '@angular/core';
import { Route, UrlTree, Router } from "@angular/router";
import { UserSettingsService } from './modules/shared/services/user-settings.service';

function homeRedirectGuard(): UrlTree {
  return inject(Router).parseUrl(inject(UserSettingsService).getHomeRoute());
}

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', canActivate: [homeRedirectGuard], component: class {} as any },

  {
    path: '',
    children: [
        { path: 'pokedex', loadChildren: () => import('./modules/pokedex/pokedex.module').then(m => m.PokedexModule) },
        { path: 'movement', loadChildren: () => import('./modules/movements/movement.module').then(m => m.MovementModule) },
        { path: 'apiDex', loadChildren: () => import('./modules/poochyDexApi/poochy-dex-api.module').then(m => m.PoochyDexApiModule) },
        { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
        { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule) },
    ]
  },
]
