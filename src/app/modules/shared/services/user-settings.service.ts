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
    this.homeScreenSubject.next(option);
  }

  getPreferredSprite(): PreferredSpriteOption {
    return this.preferredSpriteSubject.getValue();
  }

  setPreferredSprite(option: PreferredSpriteOption): void {
    this.preferredSpriteSubject.next(option);
  }

  getHomeRoute(): string {
    switch (this.getHomeScreen()) {
      case HomeScreenOption.PROFILE:      return '/profile/show';
      case HomeScreenOption.POKEMON_LIST: return '/pokedex/list';
      case HomeScreenOption.RANDOM_POKEMON:
      default:                            return '/pokedex';
    }
  }

  private readHomeScreen(): HomeScreenOption {
    const configData = localStorage.getItem(LocalStorageKeys.USER_CONFIG_DATA);
    if (configData) {
      const config = JSON.parse(configData);
      const stored = config.home_screen;
      if (Object.values(HomeScreenOption).includes(stored as HomeScreenOption)) {
        return stored as HomeScreenOption;
      }
    }
    return HomeScreenOption.RANDOM_POKEMON;
  }

  private readPreferredSprite(): PreferredSpriteOption {
    const configData = localStorage.getItem(LocalStorageKeys.USER_CONFIG_DATA);
    if (configData) {
      const config = JSON.parse(configData);
      const stored = config.preferred_sprite;
      if (Object.values(PreferredSpriteOption).includes(stored as PreferredSpriteOption)) {
        return stored as PreferredSpriteOption;
      }
    }
    return PreferredSpriteOption.HOME;
  }
}
