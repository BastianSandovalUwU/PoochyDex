import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HomeScreenOption, LocalStorageKeys, PreferredSpriteOption } from '../../../../../entities/common/enum';

@Injectable({ providedIn: 'root' })
export class UserSettingsService {

  private homeScreenSubject = new BehaviorSubject<HomeScreenOption>(this.readHomeScreen());
  private preferredSpriteSubject = new BehaviorSubject<PreferredSpriteOption>(this.readPreferredSprite());

  homeScreen$ = this.homeScreenSubject.asObservable();
  preferredSprite$ = this.preferredSpriteSubject.asObservable();

  getHomeScreen(): HomeScreenOption {
    return this.homeScreenSubject.getValue();
  }

  setHomeScreen(option: HomeScreenOption): void {
    localStorage.setItem(LocalStorageKeys.HOME_SCREEN, option);
    this.homeScreenSubject.next(option);
  }

  getPreferredSprite(): PreferredSpriteOption {
    return this.preferredSpriteSubject.getValue();
  }

  setPreferredSprite(option: PreferredSpriteOption): void {
    localStorage.setItem(LocalStorageKeys.PREFERRED_SPRITE, option);
    this.preferredSpriteSubject.next(option);
  }

  getHomeRoute(): string {
    switch (this.getHomeScreen()) {
      case HomeScreenOption.PROFILE:     return '/profile/show';
      case HomeScreenOption.POKEMON_LIST: return '/pokedex/list';
      case HomeScreenOption.RANDOM_POKEMON:
      default:                           return '/pokedex';
    }
  }

  private readHomeScreen(): HomeScreenOption {
    const stored = localStorage.getItem(LocalStorageKeys.HOME_SCREEN);
    return (Object.values(HomeScreenOption).includes(stored as HomeScreenOption))
      ? stored as HomeScreenOption
      : HomeScreenOption.RANDOM_POKEMON;
  }

  private readPreferredSprite(): PreferredSpriteOption {
    const stored = localStorage.getItem(LocalStorageKeys.PREFERRED_SPRITE);
    return (Object.values(PreferredSpriteOption).includes(stored as PreferredSpriteOption))
      ? stored as PreferredSpriteOption
      : PreferredSpriteOption.HOME;
  }
}
