export enum PokemonType {
  GRASS = 'Grass',
  FIRE = 'Fire',
  WATER = 'Water',
  BUG = 'Bug',
  NORMAL = 'Normal',
  POISON = 'Poison',
  ELECTRIC = 'Electric',
  GROUND = 'Ground',
  FAIRY = 'Fairy',
  FIGHTING = 'Fighting',
  PSYCHIC = 'Psychic',
  ROCK = 'Rock',
  GHOST = 'Ghost',
  ICE = 'Ice',
  DRAGON = 'Dragon',
  DARK = 'Dark',
  STEEL = 'Steel',
  FLYING = 'Flying'
}

export const POKEMON_TYPE_TRANSLATIONS: Record<PokemonType, string> = {
  [PokemonType.GRASS]: 'Planta',
  [PokemonType.FIRE]: 'Fuego',
  [PokemonType.WATER]: 'Agua',
  [PokemonType.BUG]: 'Bicho',
  [PokemonType.NORMAL]: 'Normal',
  [PokemonType.POISON]: 'Veneno',
  [PokemonType.ELECTRIC]: 'Eléctrico',
  [PokemonType.GROUND]: 'Tierra',
  [PokemonType.FAIRY]: 'Hada',
  [PokemonType.FIGHTING]: 'Lucha',
  [PokemonType.PSYCHIC]: 'Psíquico',
  [PokemonType.ROCK]: 'Roca',
  [PokemonType.GHOST]: 'Fantasma',
  [PokemonType.ICE]: 'Hielo',
  [PokemonType.DRAGON]: 'Dragón',
  [PokemonType.DARK]: 'Siniestro',
  [PokemonType.STEEL]: 'Acero',
  [PokemonType.FLYING]: 'Volador'
};

export const POKEMON_TYPE_COLOR_CLASSES: Record<PokemonType, string> = {
  [PokemonType.GRASS]: 'bg-grass',
  [PokemonType.FIRE]: 'bg-fire',
  [PokemonType.WATER]: 'bg-water',
  [PokemonType.BUG]: 'bg-bug',
  [PokemonType.NORMAL]: 'bg-normal text-black',
  [PokemonType.POISON]: 'bg-poison',
  [PokemonType.ELECTRIC]: 'bg-electric',
  [PokemonType.GROUND]: 'bg-ground',
  [PokemonType.FAIRY]: 'bg-fairy',
  [PokemonType.FIGHTING]: 'bg-fighting',
  [PokemonType.PSYCHIC]: 'bg-psychic',
  [PokemonType.ROCK]: 'bg-rock',
  [PokemonType.GHOST]: 'bg-ghost',
  [PokemonType.ICE]: 'bg-ice',
  [PokemonType.DRAGON]: 'bg-dragon',
  [PokemonType.DARK]: 'bg-dark',
  [PokemonType.STEEL]: 'bg-steel',
  [PokemonType.FLYING]: 'bg-flying'
};

const LOWERCASE_TO_POKEMON_TYPE: Record<string, PokemonType> = Object.values(PokemonType).reduce(
  (acc, pt) => {
    acc[pt.toLowerCase()] = pt;
    return acc;
  },
  {} as Record<string, PokemonType>
);

const SPANISH_TO_ENGLISH_TYPE: Record<string, PokemonType> = Object.values(PokemonType).reduce(
  (acc, pt) => {
    acc[POKEMON_TYPE_TRANSLATIONS[pt].toLowerCase()] = pt;
    return acc;
  },
  {} as Record<string, PokemonType>
);

export function getTypeColorClass(typeName: string, language: string): string {
  const normalizedName = typeName.toLowerCase();
  let pokemonType: PokemonType | undefined;

  if (language === 'en') {
    pokemonType = LOWERCASE_TO_POKEMON_TYPE[normalizedName];
  } else if (language === 'es') {
    pokemonType = SPANISH_TO_ENGLISH_TYPE[normalizedName];
  }

  if (pokemonType && POKEMON_TYPE_COLOR_CLASSES[pokemonType]) {
    return POKEMON_TYPE_COLOR_CLASSES[pokemonType];
  }

  return 'bg-default';
}

export function getGameIconNameForLanguage(typeName: string, language: string): string {
  if (language === 'es') {
    const normalizedType = typeName as PokemonType;
    return POKEMON_TYPE_TRANSLATIONS[normalizedType] || typeName;
  }
  return typeName;
}

export function getTypeNameByLanguage(typeName: string, language: string): string {
  const normalizedName = typeName.toLowerCase();
  const pokemonType = LOWERCASE_TO_POKEMON_TYPE[normalizedName];

  if (language === 'en') {
    if (pokemonType) {
      return pokemonType.charAt(0) + pokemonType.slice(1).toLowerCase();
    }
    return typeName.charAt(0).toUpperCase() + typeName.slice(1);
  }
  if (pokemonType) {
    return POKEMON_TYPE_TRANSLATIONS[pokemonType];
  }
  return typeName;
}

export function getTranslateTypeName(typeName: string, language: string): string {
  const normalizedName = typeName.toLowerCase();
  const pokemonType = LOWERCASE_TO_POKEMON_TYPE[normalizedName];

  if (language === 'es') {
    if (pokemonType) {
      return POKEMON_TYPE_TRANSLATIONS[pokemonType];
    }
    return 'bg-default';
  }
  return typeName;
}
