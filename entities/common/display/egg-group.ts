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
  }
  return groupName;
}
