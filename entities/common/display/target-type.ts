export enum TargetType {
  SPECIFIC_MOVE = 'specific-move',
  SELECTED_POKEMON_ME_FIRST = 'selected-pokemon-me-first',
  ALLY = 'ally',
  USERS_FIELD = 'users-field',
  USER_OR_ALLY = 'user-or-ally',
  OPPONENTS_FIELD = 'opponents-field',
  USER = 'user',
  RANDOM_OPPONENT = 'random-opponent',
  ALL_OTHER_POKEMON = 'all-other-pokemon',
  SELECTED_POKEMON = 'selected-pokemon',
  ALL_OPPONENTS = 'all-opponents',
  ENTIRE_FIELD = 'entire-field',
  USER_AND_ALLIES = 'user-and-allies',
  ALL_POKEMON = 'all-pokemon',
  ALL_ALLIES = 'all-allies',
  FAINTING_POKEMON = 'fainting-pokemon'
}

export const TARGET_TYPE_TRANSLATIONS_ES: Record<TargetType, string> = {
  [TargetType.SPECIFIC_MOVE]: 'Usuario',
  [TargetType.SELECTED_POKEMON_ME_FIRST]: 'Pokémon Seleccionado',
  [TargetType.ALLY]: 'Aliado Adyacente',
  [TargetType.USERS_FIELD]: 'Campo del Usuario',
  [TargetType.USER_OR_ALLY]: 'Usuario o Aliado',
  [TargetType.OPPONENTS_FIELD]: 'Campo Rival',
  [TargetType.USER]: 'Usuario',
  [TargetType.RANDOM_OPPONENT]: 'Aleatorio',
  [TargetType.ALL_OTHER_POKEMON]: 'Pokémon Adyacentes',
  [TargetType.SELECTED_POKEMON]: 'Pokémon Seleccionado',
  [TargetType.ALL_OPPONENTS]: 'Todos',
  [TargetType.ENTIRE_FIELD]: 'Campo Entero',
  [TargetType.USER_AND_ALLIES]: 'Usuario y Aliados',
  [TargetType.ALL_POKEMON]: 'Todos los Pokémon',
  [TargetType.ALL_ALLIES]: 'Todos los Aliados',
  [TargetType.FAINTING_POKEMON]: 'Pokémon Debilitado'
};

export function getTargetTypeName(targetType: string, language: string): string {
  const normalizedType = targetType as TargetType;

  if (language === 'es') {
    return TARGET_TYPE_TRANSLATIONS_ES[normalizedType] || '';
  }
  if (language === 'en') {
    return targetType.replace(/-/g, ' ');
  }
  return targetType;
}
