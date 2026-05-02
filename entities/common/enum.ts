/**
 * Barrel: game/display enums, Tailwind maps, and label helpers.
 * Implementation lives in `display/`; pipe-only Spanish maps live in `i18n/ui-string-maps.ts`.
 */
export * from './display/game-version';
export * from './display/pokemon-type';
export * from './display/generation';
export * from './display/target-type';
export * from './display/egg-group';
export * from './display/pokedex-name';
export * from './display/pokemon-forms';

export enum LocalStorageKeys {
  SESSION_DATA = 'sessionData',
  USER_CONFIG_DATA = 'userConfigData',
  APP_LANGUAGE = 'appLanguage',
  HOME_SCREEN = 'homeScreen',
  PREFERRED_SPRITE = 'preferredSprite',
  PROFILE_AVATAR = 'profileAvatar'
}

export enum HomeScreenOption {
  POKEMON_LIST = 'pokemonList',
  RANDOM_POKEMON = 'randomPokemon',
  PROFILE = 'profile'
}

export enum PreferredSpriteOption {
  HOME = 'home',
  GLOBAL_LINK = 'globalLink'
}

export enum LanguageOption {
  SPANISH = 'es',
  ENGLISH = 'en'
}

export enum LanguageLabel {
  SPANISH = 'Español',
  ENGLISH = 'English'
}

export enum RoleName {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum RoleSpanishLabel {
  ADMIN = 'Administrador',
  USER = 'Usuario'
}

export enum RoleEnglishLabel {
  ADMIN = 'Administrator',
  USER = 'User'
}
