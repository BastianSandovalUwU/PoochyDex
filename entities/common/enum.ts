export enum GameName {
  RED = 'red',
  BLUE = 'blue',
  YELLOW = 'yellow',
  GOLD = 'gold',
  SILVER = 'silver',
  CRYSTAL = 'crystal',
  COLOSSEUM = 'colosseum',
  RUBY = 'ruby',
  SAPPHIRE = 'sapphire',
  EMERALD = 'emerald',
  FIRERED = 'firered',
  LEAFGREEN = 'leafgreen',
  DIAMOND = 'diamond',
  PEARL = 'pearl',
  PLATINUM = 'platinum',
  HEARTGOLD = 'heartgold',
  SOULSILVER = 'soulsilver',
  BLACK = 'black',
  WHITE = 'white',
  BLACK_2 = 'black-2',
  WHITE_2 = 'white-2',
  X = 'x',
  Y = 'y',
  OMEGA_RUBY = 'omega-ruby',
  ALPHA_SAPPHIRE = 'alpha-sapphire',
  SUN = 'sun',
  MOON = 'moon',
  ULTRA_SUN = 'ultra-sun',
  ULTRA_MOON = 'ultra-moon',
  LETS_GO_PIKACHU = 'lets-go-pikachu',
  LETS_GO_EEVEE = 'lets-go-eevee',
  SWORD = 'sword',
  SHIELD = 'shield',
  BRILLIANT_DIAMOND = 'brilliant-diamond',
  SHINING_PEARL = 'shining-pearl',
  SCARLET = 'scarlet',
  VIOLET = 'violet',
  RED_BLUE = 'red-blue',
  GOLD_SILVER = 'gold-silver',
  RUBY_SAPPHIRE = 'ruby-sapphire',
  FIRERED_LEAFGREEN = 'firered-leafgreen',
  DIAMOND_PEARL = 'diamond-pearl',
  HEARTGOLD_SOULSILVER = 'heartgold-soulsilver',
  BLACK_WHITE = 'black-white',
  BLACK_2_WHITE_2 = 'black-2-white-2',
  X_Y = 'x-y',
  OMEGA_RUBY_ALPHA_SAPPHIRE = 'omega-ruby-alpha-sapphire',
  SUN_MOON = 'sun-moon',
  ULTRA_SUN_ULTRA_MOON = 'ultra-sun-ultra-moon',
  LETS_GO_PIKACHU_LETS_GO_EEVEE = 'lets-go-pikachu-lets-go-eevee',
  SWORD_SHIELD = 'sword-shield',
  SCARLET_VIOLET = 'scarlet-violet',
  BRILLIANT_DIAMOND_AND_SHINING_PEARL = 'brilliant-diamond-and-shining-pearl',
  LEGENDS_ARCEUS = 'legends-arceus'
}

export const GAME_NAME_TRANSLATIONS: Record<GameName, string> = {
  [GameName.RED]: 'Rojo',
  [GameName.BLUE]: 'Azul',
  [GameName.YELLOW]: 'Amarillo',
  [GameName.GOLD]: 'Oro',
  [GameName.SILVER]: 'Plata',
  [GameName.CRYSTAL]: 'Cristal',
  [GameName.COLOSSEUM]: 'Colosseum',
  [GameName.RUBY]: 'Rubí',
  [GameName.SAPPHIRE]: 'Zafiro',
  [GameName.EMERALD]: 'Esmeralda',
  [GameName.FIRERED]: 'Rojo Fuego',
  [GameName.LEAFGREEN]: 'Verde Hoja',
  [GameName.DIAMOND]: 'Diamante',
  [GameName.PEARL]: 'Perla',
  [GameName.PLATINUM]: 'Platino',
  [GameName.HEARTGOLD]: 'Oro HeartGold',
  [GameName.SOULSILVER]: 'Plata SoulSilver',
  [GameName.BLACK]: 'Negro',
  [GameName.WHITE]: 'Blanco',
  [GameName.BLACK_2]: 'Negro 2',
  [GameName.WHITE_2]: 'Blanco 2',
  [GameName.X]: 'Pokémon X',
  [GameName.Y]: 'Pokémon Y',
  [GameName.OMEGA_RUBY]: 'Rubí Omega',
  [GameName.ALPHA_SAPPHIRE]: 'Zafiro Alfa',
  [GameName.SUN]: 'Sol',
  [GameName.MOON]: 'Luna',
  [GameName.ULTRA_SUN]: 'Ultrasol',
  [GameName.ULTRA_MOON]: 'Ultraluna',
  [GameName.LETS_GO_PIKACHU]: "Let's Go, Pikachu!",
  [GameName.LETS_GO_EEVEE]: "Let's Go, Eevee!",
  [GameName.SWORD]: 'Espada',
  [GameName.SHIELD]: 'Escudo',
  [GameName.BRILLIANT_DIAMOND]: 'Diamante Brillante',
  [GameName.SHINING_PEARL]: 'Perla Reluciente',
  [GameName.SCARLET]: 'Escarlata',
  [GameName.VIOLET]: 'Purpura',
  [GameName.RED_BLUE]: 'Rojo - Azul',
  [GameName.GOLD_SILVER]: 'Oro - Plata',
  [GameName.RUBY_SAPPHIRE]: 'Rubí - Zafiro',
  [GameName.FIRERED_LEAFGREEN]: 'Rojo Fuego - Verde Hoja',
  [GameName.DIAMOND_PEARL]: 'Diamante - Perla',
  [GameName.HEARTGOLD_SOULSILVER]: 'Oro HeartGold - Plata SoulSilver',
  [GameName.BLACK_WHITE]: 'Negro - Blanco',
  [GameName.BLACK_2_WHITE_2]: 'Negro 2 - Blanco 2',
  [GameName.X_Y]: 'Pokémon X - Pokémon Y',
  [GameName.OMEGA_RUBY_ALPHA_SAPPHIRE]: 'Rubí Omega - Zafiro Alfa',
  [GameName.SUN_MOON]: 'Sol - Luna',
  [GameName.ULTRA_SUN_ULTRA_MOON]: 'Ultrasol - Ultraluna',
  [GameName.LETS_GO_PIKACHU_LETS_GO_EEVEE]: "Let's Go, Pikachu! - Let's Go, Eevee!",
  [GameName.SWORD_SHIELD]: 'Espada - Escudo',
  [GameName.SCARLET_VIOLET]: 'Escarlata - Purpura',
  [GameName.BRILLIANT_DIAMOND_AND_SHINING_PEARL]: 'Diamante B. - Perla R.',
  [GameName.LEGENDS_ARCEUS]: 'Legendas Arceus'
};

export const GAME_ICON_MAP: Record<GameName, string[]> = {
  [GameName.RED]: ['red'],
  [GameName.BLUE]: ['blue'],
  [GameName.YELLOW]: ['yellow'],
  [GameName.GOLD]: ['gold'],
  [GameName.SILVER]: ['silver'],
  [GameName.CRYSTAL]: ['crystal'],
  [GameName.COLOSSEUM]: [],
  [GameName.RUBY]: ['ruby'],
  [GameName.SAPPHIRE]: ['sapphire'],
  [GameName.EMERALD]: ['emerald'],
  [GameName.FIRERED]: ['red'],
  [GameName.LEAFGREEN]: ['green'],
  [GameName.DIAMOND]: ['diamond'],
  [GameName.PEARL]: ['pearl'],
  [GameName.PLATINUM]: ['platinum'],
  [GameName.HEARTGOLD]: ['gold'],
  [GameName.SOULSILVER]: ['silver'],
  [GameName.BLACK]: ['black'],
  [GameName.WHITE]: ['white'],
  [GameName.BLACK_2]: ['black-2'],
  [GameName.WHITE_2]: ['white-2'],
  [GameName.X]: ['x'],
  [GameName.Y]: ['y'],
  [GameName.OMEGA_RUBY]: ['omega-ruby'],
  [GameName.ALPHA_SAPPHIRE]: ['alpha-sapphire'],
  [GameName.SUN]: ['sun'],
  [GameName.MOON]: ['moon'],
  [GameName.ULTRA_SUN]: ['ultra-sun'],
  [GameName.ULTRA_MOON]: ['ultra-moon'],
  [GameName.LETS_GO_PIKACHU]: ['yellow'],
  [GameName.LETS_GO_EEVEE]: ['lets-go-eevee'],
  [GameName.SWORD]: ['sword'],
  [GameName.SHIELD]: ['shield'],
  [GameName.BRILLIANT_DIAMOND]: ['brilliant-diamond'],
  [GameName.SHINING_PEARL]: ['shining-pearl'],
  [GameName.SCARLET]: ['scarlet'],
  [GameName.VIOLET]: ['violet'],
  [GameName.RED_BLUE]: ['red', 'blue'],
  [GameName.GOLD_SILVER]: ['gold', 'silver'],
  [GameName.RUBY_SAPPHIRE]: ['ruby', 'sapphire'],
  [GameName.FIRERED_LEAFGREEN]: ['red', 'green'],
  [GameName.DIAMOND_PEARL]: ['diamond', 'pearl'],
  [GameName.HEARTGOLD_SOULSILVER]: ['gold', 'silver'],
  [GameName.BLACK_WHITE]: ['black', 'white'],
  [GameName.BLACK_2_WHITE_2]: ['black-2', 'white-2'],
  [GameName.X_Y]: ['x', 'y'],
  [GameName.OMEGA_RUBY_ALPHA_SAPPHIRE]: ['omega-ruby', 'alpha-sapphire'],
  [GameName.SUN_MOON]: ['sun', 'moon'],
  [GameName.ULTRA_SUN_ULTRA_MOON]: ['ultra-sun', 'ultra-moon'],
  [GameName.LETS_GO_PIKACHU_LETS_GO_EEVEE]: ['yellow', 'lets-go-eevee'],
  [GameName.SWORD_SHIELD]: ['sword', 'shield'],
  [GameName.SCARLET_VIOLET]: ['scarlet', 'violet'],
  [GameName.BRILLIANT_DIAMOND_AND_SHINING_PEARL]: ['diamond', 'pearl'],
  [GameName.LEGENDS_ARCEUS]: ['legends-arceus']
};

export function getGameName(gameName: string, language: string): string {
  if (language === 'es') {
    const normalizedName = gameName.toLowerCase() as GameName;
    return GAME_NAME_TRANSLATIONS[normalizedName] || '';
  } else {
    return gameName;
  }
}

export function getGameIconGame(gameName: string): string[] {
  const normalizedName = gameName.toLowerCase() as GameName;
  return GAME_ICON_MAP[normalizedName] || [];
}

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

// Mapeo inverso: traducción en español -> tipo en inglés
const SPANISH_TO_ENGLISH_TYPE: Record<string, PokemonType> = {
  'planta': PokemonType.GRASS,
  'fuego': PokemonType.FIRE,
  'agua': PokemonType.WATER,
  'bicho': PokemonType.BUG,
  'normal': PokemonType.NORMAL,
  'veneno': PokemonType.POISON,
  'eléctrico': PokemonType.ELECTRIC,
  'tierra': PokemonType.GROUND,
  'hada': PokemonType.FAIRY,
  'lucha': PokemonType.FIGHTING,
  'psíquico': PokemonType.PSYCHIC,
  'roca': PokemonType.ROCK,
  'fantasma': PokemonType.GHOST,
  'hielo': PokemonType.ICE,
  'dragón': PokemonType.DRAGON,
  'siniestro': PokemonType.DARK,
  'acero': PokemonType.STEEL,
  'volador': PokemonType.FLYING
};

export function getTypeColorClass(typeName: string, language: string): string {
  const normalizedName = typeName.toLowerCase();
  let pokemonType: PokemonType | undefined;

  if (language === 'en') {
    // En inglés, el nombre ya coincide con el enum
    pokemonType = normalizedName as PokemonType;
  } else if (language === 'es') {
    // En español, necesitamos convertir a inglés primero
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

export const GAME_VERSION_COLOR_CLASSES: Partial<Record<GameName, string>> & Record<string, string> = {
  [GameName.RED]: 'bg-pokemon-red',
  [GameName.BLUE]: 'bg-pokemon-blue',
  [GameName.YELLOW]: 'bg-pokemon-yellow text-black',
  [GameName.GOLD]: 'bg-pokemon-gold',
  [GameName.SILVER]: 'bg-pokemon-silver',
  [GameName.CRYSTAL]: 'bg-pokemon-crystal',
  [GameName.RUBY]: 'bg-pokemon-ruby',
  [GameName.SAPPHIRE]: 'bg-pokemon-sapphire',
  [GameName.EMERALD]: 'bg-pokemon-emerald',
  [GameName.FIRERED]: 'bg-pokemon-fire-red',
  [GameName.LEAFGREEN]: 'bg-pokemon-leaf-green',
  [GameName.DIAMOND]: 'bg-pokemon-diamond text-black',
  [GameName.PEARL]: 'bg-pokemon-pearl text-black',
  [GameName.PLATINUM]: 'bg-pokemon-platinum text-black',
  [GameName.HEARTGOLD]: 'bg-pokemon-heartgold',
  [GameName.SOULSILVER]: 'bg-pokemon-soulsilver',
  [GameName.BLACK]: 'bg-pokemon-black',
  [GameName.WHITE]: 'bg-pokemon-white text-black',
  [GameName.BLACK_2]: 'bg-pokemon-black-2',
  [GameName.WHITE_2]: 'bg-pokemon-white-2 text-black',
  [GameName.X]: 'bg-pokemon-x',
  [GameName.Y]: 'bg-pokemon-y',
  [GameName.OMEGA_RUBY]: 'bg-pokemon-omega-ruby',
  [GameName.ALPHA_SAPPHIRE]: 'bg-pokemon-alpha-sapphire',
  [GameName.SUN]: 'bg-pokemon-sun',
  [GameName.MOON]: 'bg-pokemon-moon',
  [GameName.ULTRA_SUN]: 'bg-pokemon-ultra-sun',
  [GameName.ULTRA_MOON]: 'bg-pokemon-ultra-moon',
  [GameName.LETS_GO_PIKACHU]: 'bg-pokemon-letsGo-pikachu text-black',
  [GameName.LETS_GO_EEVEE]: 'bg-pokemon-letsGo-eevee text-black',
  [GameName.SWORD]: 'bg-pokemon-sword',
  [GameName.SHIELD]: 'bg-pokemon-shield',
  [GameName.BRILLIANT_DIAMOND]: 'bg-pokemon-brilliant-diamond',
  [GameName.SHINING_PEARL]: 'bg-pokemon-shining-pearl',
  [GameName.SCARLET]: 'bg-pokemon-scarlet',
  [GameName.VIOLET]: 'bg-pokemon-violet',
  [GameName.RED_BLUE]: 'bg-pokemon-red',
  [GameName.GOLD_SILVER]: 'bg-pokemon-gold text-black',
  [GameName.RUBY_SAPPHIRE]: 'bg-pokemon-ruby',
  [GameName.FIRERED_LEAFGREEN]: 'bg-pokemon-fire-red',
  [GameName.DIAMOND_PEARL]: 'bg-pokemon-diamond text-black',
  [GameName.HEARTGOLD_SOULSILVER]: 'bg-pokemon-heartgold text-black',
  [GameName.BLACK_WHITE]: 'bg-pokemon-black',
  [GameName.BLACK_2_WHITE_2]: 'bg-pokemon-black-2',
  [GameName.X_Y]: 'bg-pokemon-x',
  [GameName.OMEGA_RUBY_ALPHA_SAPPHIRE]: 'bg-pokemon-omega-ruby',
  [GameName.SUN_MOON]: 'bg-pokemon-sun',
  [GameName.ULTRA_SUN_ULTRA_MOON]: 'bg-pokemon-ultra-sun',
  [GameName.LETS_GO_PIKACHU_LETS_GO_EEVEE]: 'bg-pokemon-letsGo-pikachu text-black',
  [GameName.SWORD_SHIELD]: 'bg-pokemon-sword',
  [GameName.SCARLET_VIOLET]: 'bg-pokemon-scarlet',
  [GameName.BRILLIANT_DIAMOND_AND_SHINING_PEARL]: 'bg-pokemon-brilliant-diamond text-black',
  [GameName.LEGENDS_ARCEUS]: 'bg-white text-black',
};

export function getGameVersionColor(gameVersion: string): string {
  const normalizedVersion = gameVersion.toLowerCase();
  const gameName = normalizedVersion as GameName;

  // Primero intentar con el enum
  if (GAME_VERSION_COLOR_CLASSES[gameName]) {
    return GAME_VERSION_COLOR_CLASSES[gameName];
  }

  // Si no está en el enum, buscar directamente (para casos como 'brilliant-diamond', 'shining-pearl')
  if (GAME_VERSION_COLOR_CLASSES[normalizedVersion]) {
    return GAME_VERSION_COLOR_CLASSES[normalizedVersion];
  }

  return '';
}

export enum Generation {
  I = 'generation-i',
  II = 'generation-ii',
  III = 'generation-iii',
  IV = 'generation-iv',
  V = 'generation-v',
  VI = 'generation-vi',
  VII = 'generation-vii',
  VIII = 'generation-viii',
  IX = 'generation-ix',
  X = 'generation-x'
}

export const GENERATION_TRANSLATIONS_ES: Record<Generation, string> = {
  [Generation.I]: 'Primera Generación',
  [Generation.II]: 'Segunda Generación',
  [Generation.III]: 'Tercera Generación',
  [Generation.IV]: 'Cuarta Generación',
  [Generation.V]: 'Quinta Generación',
  [Generation.VI]: 'Sexta Generación',
  [Generation.VII]: 'Séptima Generación',
  [Generation.VIII]: 'Octava Generación',
  [Generation.IX]: 'Novena Generación',
  [Generation.X]: 'Décima Generación'
};

export const GENERATION_TRANSLATIONS_EN: Record<Generation, string> = {
  [Generation.I]: 'First Generation',
  [Generation.II]: 'Second Generation',
  [Generation.III]: 'Third Generation',
  [Generation.IV]: 'Fourth Generation',
  [Generation.V]: 'Fifth Generation',
  [Generation.VI]: 'Sixth Generation',
  [Generation.VII]: 'Seventh Generation',
  [Generation.VIII]: 'Eighth Generation',
  [Generation.IX]: 'Ninth Generation',
  [Generation.X]: 'Tenth Generation'
};

export function getGenerationName(generationName: string, language: string): string {
  const normalizedName = generationName.toLowerCase() as Generation;

  if (language === 'es') {
    return GENERATION_TRANSLATIONS_ES[normalizedName] || '';
  } else if (language === 'en') {
    return GENERATION_TRANSLATIONS_EN[normalizedName] || '';
  }

  return '';
}

// Mapeo de nombres en minúsculas a valores del enum
const LOWERCASE_TO_POKEMON_TYPE: Record<string, PokemonType> = {
  'grass': PokemonType.GRASS,
  'fire': PokemonType.FIRE,
  'water': PokemonType.WATER,
  'bug': PokemonType.BUG,
  'normal': PokemonType.NORMAL,
  'poison': PokemonType.POISON,
  'electric': PokemonType.ELECTRIC,
  'ground': PokemonType.GROUND,
  'fairy': PokemonType.FAIRY,
  'fighting': PokemonType.FIGHTING,
  'psychic': PokemonType.PSYCHIC,
  'rock': PokemonType.ROCK,
  'ghost': PokemonType.GHOST,
  'ice': PokemonType.ICE,
  'dragon': PokemonType.DRAGON,
  'dark': PokemonType.DARK,
  'steel': PokemonType.STEEL,
  'flying': PokemonType.FLYING
};

export function getTypeNameByLanguage(typeName: string, language: string): string {
  const normalizedName = typeName.toLowerCase();
  const pokemonType = LOWERCASE_TO_POKEMON_TYPE[normalizedName];

  if (language === 'en') {
    // En inglés, capitalizar la primera letra (el enum ya tiene el formato correcto)
    if (pokemonType) {
      return pokemonType.charAt(0) + pokemonType.slice(1).toLowerCase();
    }
    return typeName.charAt(0).toUpperCase() + typeName.slice(1);
  } else {
    // En español, usar las traducciones
    if (pokemonType) {
      return POKEMON_TYPE_TRANSLATIONS[pokemonType];
    }
    return typeName;
  }
}

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
  } else if (language === 'en') {
    // En inglés, reemplazar guiones con espacios
    return targetType.replace(/-/g, ' ');
  } else {
    return targetType;
  }
}

export function getTranslateTypeName(typeName: string, language: string): string {
  const normalizedName = typeName.toLowerCase();
  const pokemonType = LOWERCASE_TO_POKEMON_TYPE[normalizedName];

  if (language === 'es') {
    if (pokemonType) {
      return POKEMON_TYPE_TRANSLATIONS[pokemonType];
    }
    return 'bg-default';
  } else {
    return typeName;
  }
}

export enum EggGroup {
  NO_EGGS = 'no-eggs',
  DRAGON = 'dragon',
  DITTO = 'ditto',
  WATER2 = 'water2',
  INDETERMINATE = 'indeterminate',
  MINERAL = 'mineral',
  WATER3 = 'water3',
  HUMANSHAPE = 'humanshape',
  PLANT = 'plant',
  FAIRY = 'fairy',
  GROUND = 'ground',
  FLYING = 'flying',
  BUG = 'bug',
  WATER1 = 'water1',
  MONSTER = 'monster'
}

export const EGG_GROUP_TRANSLATIONS_ES: Record<EggGroup, string> = {
  [EggGroup.NO_EGGS]: 'Desconocido',
  [EggGroup.DRAGON]: 'Dragón',
  [EggGroup.DITTO]: 'Ditto',
  [EggGroup.WATER2]: 'Agua 2',
  [EggGroup.INDETERMINATE]: 'Amorfo',
  [EggGroup.MINERAL]: 'Mineral',
  [EggGroup.WATER3]: 'Agua 3',
  [EggGroup.HUMANSHAPE]: 'Humanoide',
  [EggGroup.PLANT]: 'Planta',
  [EggGroup.FAIRY]: 'Hada',
  [EggGroup.GROUND]: 'Campo',
  [EggGroup.FLYING]: 'Volador',
  [EggGroup.BUG]: 'Bicho',
  [EggGroup.WATER1]: 'Agua 1',
  [EggGroup.MONSTER]: 'Monstruo'
};

export function getEggGroupName(groupName: string, language: string): string {
  const normalizedName = groupName.toLowerCase() as EggGroup;

  if (language === 'es') {
    return EGG_GROUP_TRANSLATIONS_ES[normalizedName] || '';
  } else {
    return groupName;
  }
}

export enum PokedexName {
  NATIONAL = 'national',
  KANTO = 'kanto',
  ORIGINAL_JOHTO = 'original-johto',
  JOHTO = 'johto',
  HOENN = 'hoenn',
  ORIGINAL_SINNOH = 'original-sinnoh',
  SINNOH = 'sinnoh',
  EXTENDED_SINNOH = 'extended-sinnoh',
  PLATINUM_SINNOH = 'platinum-sinnoh',
  UPDATED_JOHTO = 'updated-johto',
  UNOVA = 'unova',
  UNOVA_2 = 'unova-2',
  ORIGINAL_UNOVA = 'original-unova',
  UPDATED_UNOVA = 'updated-unova',
  CONQUEST_GALLERY = 'conquest-gallery',
  KALOS_CENTRAL = 'kalos-central',
  KALOS_COASTAL = 'kalos-coastal',
  KALOS_MOUNTAIN = 'kalos-mountain',
  UPDATED_HOENN = 'updated-hoenn',
  ALOLA = 'alola',
  ALOLA_ULTRA = 'alola-ultra',
  ORIGINAL_ALOLA = 'original-alola',
  ORIGINAL_MELEMELE = 'original-melemele',
  ORIGINAL_AKALA = 'original-akala',
  ORIGINAL_ULAULA = 'original-ulaula',
  ORIGINAL_PONI = 'original-poni',
  UPDATED_ALOLA = 'updated-alola',
  UPDATED_MELEMELE = 'updated-melemele',
  UPDATED_AKALA = 'updated-akala',
  UPDATED_ULAULA = 'updated-ulaula',
  UPDATED_PONI = 'updated-poni',
  LETSGO = 'letsgo',
  LETSGO_KANTO = 'letsgo-kanto',
  GALAR = 'galar',
  ISLE_OF_ARMOR = 'isle-of-armor',
  CROWN_TUNDRA = 'crown-tundra',
  HISUI = 'hisui',
  PALDEA = 'paldea',
  KITAKAMI = 'kitakami',
  BLUEBERRY = 'blueberry',
  LUMIOSE_CITY = 'lumiose-city',
  HYPERSPACE = 'hyperspace'
}

export const POKEDEX_NAME_TO_NUMBER: Record<PokedexName, number> & Record<string, number> = {
  [PokedexName.NATIONAL]: 1,
  [PokedexName.KANTO]: 2,
  [PokedexName.ORIGINAL_JOHTO]: 3,
  [PokedexName.JOHTO]: 3,
  [PokedexName.HOENN]: 4,
  [PokedexName.ORIGINAL_SINNOH]: 5,
  [PokedexName.SINNOH]: 5,
  [PokedexName.EXTENDED_SINNOH]: 6,
  [PokedexName.PLATINUM_SINNOH]: 6,
  [PokedexName.UPDATED_JOHTO]: 7,
  [PokedexName.UNOVA]: 8,
  [PokedexName.UNOVA_2]: 9,
  [PokedexName.ORIGINAL_UNOVA]: 8,
  [PokedexName.UPDATED_UNOVA]: 9,
  [PokedexName.CONQUEST_GALLERY]: 11,
  [PokedexName.KALOS_CENTRAL]: 12,
  [PokedexName.KALOS_COASTAL]: 13,
  [PokedexName.KALOS_MOUNTAIN]: 14,
  [PokedexName.UPDATED_HOENN]: 15,
  [PokedexName.ALOLA]: 16,
  [PokedexName.ALOLA_ULTRA]: 21,
  [PokedexName.ORIGINAL_ALOLA]: 16,
  [PokedexName.ORIGINAL_MELEMELE]: 17,
  [PokedexName.ORIGINAL_AKALA]: 18,
  [PokedexName.ORIGINAL_ULAULA]: 19,
  [PokedexName.ORIGINAL_PONI]: 20,
  [PokedexName.UPDATED_ALOLA]: 21,
  [PokedexName.UPDATED_MELEMELE]: 22,
  [PokedexName.UPDATED_AKALA]: 23,
  [PokedexName.UPDATED_ULAULA]: 24,
  [PokedexName.UPDATED_PONI]: 25,
  [PokedexName.LETSGO]: 26,
  [PokedexName.LETSGO_KANTO]: 26,
  [PokedexName.GALAR]: 27,
  [PokedexName.ISLE_OF_ARMOR]: 28,
  [PokedexName.CROWN_TUNDRA]: 29,
  [PokedexName.HISUI]: 30,
  [PokedexName.PALDEA]: 31,
  [PokedexName.KITAKAMI]: 32,
  [PokedexName.BLUEBERRY]: 33,
  [PokedexName.LUMIOSE_CITY]: 34,
  [PokedexName.HYPERSPACE]: 35
};

export function getPokedexNumber(pokedexName: string): number {
  const normalizedName = pokedexName.toLowerCase() as PokedexName;
  return POKEDEX_NAME_TO_NUMBER[normalizedName] || 0;
}

export enum PokemonBaseName {
  DEOXYS = 'deoxys',
  WORMDAM = 'wormadam',
  GIRATINA = 'giratina',
  SHAYMIN = 'shaymin',
  BASCULIN = 'basculin',
  BASCULEGION = 'basculegion',
  DARMANITAN = 'darmanitan',
  KELDEO = 'keldeo',
  MELOETTA = 'meloetta',
  TORNADUS = 'tornadus',
  THUNDURUS = 'thundurus',
  LANDORUS = 'landorus',
  ENAMORUS = 'enamorus',
  AEGISLASH = 'aegislash',
  MEOWSTIC = 'meowstic',
  PUMPKABOO = 'pumpkaboo',
  GOURGEIST = 'gourgeist',
  ZYGARDE = 'zygarde',
  LYCANROC = 'lycanroc',
  MINIOR = 'minior',
  MORPEKO = 'morpeko',
  ORICORIO = 'oricorio',
  MIMIKYU = 'mimikyu',
  INDEEDEE = 'indeedee',
  WISHIWASHI = 'wishiwashi',
  TOXTRICITY = 'toxtricity',
  EISCUE = 'eiscue',
  SQUAWKABILLY = 'squawkabilly',
  TATSUGIRI = 'tatsugiri'
}

export const POKEMON_BASE_TO_FORM: Record<PokemonBaseName, string> = {
  [PokemonBaseName.DEOXYS]: 'deoxys-normal',
  [PokemonBaseName.WORMDAM]: 'wormadam-plant',
  [PokemonBaseName.GIRATINA]: 'giratina-altered',
  [PokemonBaseName.SHAYMIN]: 'shaymin-land',
  [PokemonBaseName.BASCULIN]: 'basculin-red-striped',
  [PokemonBaseName.BASCULEGION]: 'basculegion-male',
  [PokemonBaseName.DARMANITAN]: 'darmanitan-standard',
  [PokemonBaseName.KELDEO]: 'keldeo-ordinary',
  [PokemonBaseName.MELOETTA]: 'meloetta-aria',
  [PokemonBaseName.TORNADUS]: 'tornadus-incarnate',
  [PokemonBaseName.THUNDURUS]: 'thundurus-incarnate',
  [PokemonBaseName.LANDORUS]: 'landorus-incarnate',
  [PokemonBaseName.ENAMORUS]: 'enamorus-incarnate',
  [PokemonBaseName.AEGISLASH]: 'aegislash-shield',
  [PokemonBaseName.MEOWSTIC]: 'meowstic-male',
  [PokemonBaseName.PUMPKABOO]: 'pumpkaboo-average',
  [PokemonBaseName.GOURGEIST]: 'gourgeist-average',
  [PokemonBaseName.ZYGARDE]: 'zygarde-50',
  [PokemonBaseName.LYCANROC]: 'lycanroc-midday',
  [PokemonBaseName.MINIOR]: 'minior-red-meteor',
  [PokemonBaseName.MORPEKO]: 'morpeko-full-belly',
  [PokemonBaseName.ORICORIO]: 'oricorio-baile',
  [PokemonBaseName.MIMIKYU]: 'mimikyu-disguised',
  [PokemonBaseName.INDEEDEE]: 'indeedee-male',
  [PokemonBaseName.WISHIWASHI]: 'wishiwashi-solo',
  [PokemonBaseName.TOXTRICITY]: 'toxtricity-amped',
  [PokemonBaseName.EISCUE]: 'eiscue-ice',
  [PokemonBaseName.SQUAWKABILLY]: 'squawkabilly-green-plumage',
  [PokemonBaseName.TATSUGIRI]: 'tatsugiri-curly'
};

export function getCorrectPokemonName(pokemonName: string): string {
  const normalizedName = pokemonName.toLowerCase() as PokemonBaseName;
  return POKEMON_BASE_TO_FORM[normalizedName] || pokemonName;
}

export enum PokemonFormName {
  NIDORAN_F = 'nidoran-f',
  NIDORAN_M = 'nidoran-m',
  HO_OH = 'ho-oh',
  GIRATINA_ALTERED = 'giratina-altered',
  GIRATINA_ORIGIN = 'giratina-origin',
  TOXTRICITY_AMPED = 'toxtricity-amped',
  PUMPKABOO_AVERAGE = 'pumpkaboo-average',
  GOURGEIST_AVERAGE = 'gourgeist-average',
  URSHIFU_SINGLE_STRIKE = 'urshifu-single-strike',
  ENAMORUS_INCARNATE = 'enamorus-incarnate',
  BASCULEGION_MALE = 'basculegion-male',
  SQUAWKABILLY_GREEN_PLUMAGE = 'squawkabilly-green-plumage',
  SQUAWKABILLY_BLUE_PLUMAGE = 'squawkabilly-blue-plumage',
  SQUAWKABILLY_YELLOW_PLUMAGE = 'squawkabilly-yellow-plumage',
  SQUAWKABILLY_WHITE_PLUMAGE = 'squawkabilly-white-plumage',
  MAUSHOLD_FAMILY_OF_FOUR = 'maushold-family-of-four',
  PALAFIN_ZERO = 'palafin-zero',
  DUDUNSPARCE_TWO_SEGMENT = 'dudunsparce-two-segment',
  TATSUGIRI_CURLYT = 'tatsugiri-curlyt',
  SLITHER_WING = 'slither-wing',
  SLITHER_WING_SPACE = 'slither wing',
  GOUGING_FIRE = 'gouging-fire',
  RAGING_BOLT = 'raging-bolt',
  IRON_BOULDER = 'iron-boulder',
  IRON_CROWN = 'iron-crown',
  WALKING_WAKE = 'walking-wake',
  IRON_LEAVES = 'iron-leaves',
  GREAT_TUSK = 'great-tusk',
  SCREAM_TAIL = 'scream-tail',
  BRUTE_BONNET = 'brute-bonnet',
  FLUTTER_MANE = 'flutter-mane',
  SANDY_SHOCKS = 'sandy-shocks',
  IRON_TREADS = 'iron-treads',
  IRON_BUNDLE = 'iron-bundle',
  IRON_HANDS = 'iron-hands',
  IRON_JUGULIS = 'iron-jugulis',
  IRON_MOTH = 'iron-moth',
  IRON_THORNS = 'iron-thorns',
  ROARING_MOON = 'roaring-moon',
  IRON_VALIANT = 'iron-valiant',
  OGERPON_HEARTHFLAME_MASK = 'ogerpon-hearthflame-mask',
  OGERPON_WELLSPRING_MASK = 'ogerpon-wellspring-mask',
  OGERPON_CORNERSTONE_MASK = 'ogerpon-cornerstone-mask',
  OGERPON_TEAL_MASK = 'ogerpon-teal-mask',
  TERAPAGOS_TERASTAL = 'terapagos-terastal',
  TERAPAGOS_STELLAR = 'terapagos-stellar'
}

export const POKEMON_FORM_TRANSLATIONS_ES: Record<PokemonFormName, string> & Record<string, string> = {
  [PokemonFormName.NIDORAN_F]: 'Nidoran♀',
  [PokemonFormName.NIDORAN_M]: 'Nidoran♂',
  [PokemonFormName.HO_OH]: 'Ho-Oh',
  [PokemonFormName.GIRATINA_ALTERED]: 'Giratina',
  [PokemonFormName.GIRATINA_ORIGIN]: 'Giratina',
  [PokemonFormName.TOXTRICITY_AMPED]: 'Toxtricity',
  [PokemonFormName.PUMPKABOO_AVERAGE]: 'Pumpkaboo',
  [PokemonFormName.GOURGEIST_AVERAGE]: 'Gourgeist',
  [PokemonFormName.URSHIFU_SINGLE_STRIKE]: 'Urshifu',
  [PokemonFormName.ENAMORUS_INCARNATE]: 'Enamorus',
  [PokemonFormName.BASCULEGION_MALE]: 'Basculegion',
  [PokemonFormName.SQUAWKABILLY_GREEN_PLUMAGE]: 'Squawkabilly',
  [PokemonFormName.SQUAWKABILLY_BLUE_PLUMAGE]: 'Squawkabilly',
  [PokemonFormName.SQUAWKABILLY_YELLOW_PLUMAGE]: 'Squawkabilly',
  [PokemonFormName.SQUAWKABILLY_WHITE_PLUMAGE]: 'Squawkabilly',
  [PokemonFormName.MAUSHOLD_FAMILY_OF_FOUR]: 'Maushold',
  [PokemonFormName.PALAFIN_ZERO]: 'Palafin',
  [PokemonFormName.DUDUNSPARCE_TWO_SEGMENT]: 'Dudunsparce',
  [PokemonFormName.TATSUGIRI_CURLYT]: 'Tatsugiri',
  [PokemonFormName.SLITHER_WING]: 'Reptalada',
  [PokemonFormName.SLITHER_WING_SPACE]: 'Reptalada',
  [PokemonFormName.GOUGING_FIRE]: 'Flamariete',
  [PokemonFormName.RAGING_BOLT]: 'Electrofuria',
  [PokemonFormName.IRON_BOULDER]: 'Ferromole',
  [PokemonFormName.IRON_CROWN]: 'Ferrotesta',
  [PokemonFormName.WALKING_WAKE]: 'Ondulagua',
  [PokemonFormName.IRON_LEAVES]: 'Ferroverdor',
  [PokemonFormName.GREAT_TUSK]: 'Colmilargo',
  [PokemonFormName.SCREAM_TAIL]: 'Colagrito',
  [PokemonFormName.BRUTE_BONNET]: 'Furioseta',
  [PokemonFormName.FLUTTER_MANE]: 'Melenaleteo',
  [PokemonFormName.SANDY_SHOCKS]: 'Pelarena',
  [PokemonFormName.IRON_TREADS]: 'Ferrodada',
  [PokemonFormName.IRON_BUNDLE]: 'Ferrosaco',
  [PokemonFormName.IRON_HANDS]: 'Ferropalmas',
  [PokemonFormName.IRON_JUGULIS]: 'Ferrocuello',
  [PokemonFormName.IRON_MOTH]: 'Ferropolilla',
  [PokemonFormName.IRON_THORNS]: 'Ferropúas',
  [PokemonFormName.ROARING_MOON]: 'Bramaluna',
  [PokemonFormName.IRON_VALIANT]: 'Ferropaladin',
  [PokemonFormName.OGERPON_HEARTHFLAME_MASK]: 'Ogerpon Máscara Horno',
  [PokemonFormName.OGERPON_WELLSPRING_MASK]: 'Ogerpon Máscara Fuente',
  [PokemonFormName.OGERPON_CORNERSTONE_MASK]: 'Ogerpon Máscara Cimiento',
  [PokemonFormName.OGERPON_TEAL_MASK]: 'Ogerpon Máscara Turquesa',
  [PokemonFormName.TERAPAGOS_TERASTAL]: 'Terapagos Teracristal',
  [PokemonFormName.TERAPAGOS_STELLAR]: 'Terapagos Astral'
};

export function translatePokemonName(value: string, language: string): string {
  if (language === 'es') {
    const normalizedValue = value.toLowerCase();
    return POKEMON_FORM_TRANSLATIONS_ES[normalizedValue] || value;
  } else {
    return value;
  }
}
