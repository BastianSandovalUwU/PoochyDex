import { Move } from "./moves.entity";
import { Data } from "./pokemon-specie.entity";
import { Sprites } from "./sprites.entity";

// Versión completa del Pokémon con todos los datos de la API
export type PokemonFull = {
  abilities:              Ability[];
  baseExperience:         number;
  cries:                  Cries;
  forms:                  Data[];
  game_indices:           GameIndex[];
  height:                 number;
  held_items:             HeldItem[];
  id:                     number;
  is_default:             boolean;
  location_area_encounters: string;
  moves:                  Move[];
  name:                   string;
  order:                  number;
  past_abilities:         PastAbility[];
  past_types:             any[];
  species:                Data;
  stats:                  Stat[];
  types:                  Type[];
  weight:                 number;
}

// Versión lite del Pokémon con solo los datos esenciales
export type Pokemon = Omit<PokemonFull, 'order' | 'held_items' | 'past_abilities' | 'past_types' | 'location_area_encounters'>;

export type PastAbility = {
  ability: AbilityDetail;
  generation: Data;
}

export type AbilityDetail = {
  ability: Data;
  is_hidden: boolean;
  slot: number;
}

export type HeldItem = {
  item: Data;
  version_details: VersionDetail[];
}

export type VersionDetail = {
  rarity: number;
  version: Data;
}

export type GameIndex = {
  game_index: number;
  version: Data;
}

export type Ability = {
  ability:  Data;
  is_hidden: boolean;
  slot:     number;
}

export type Cries = {
  latest: string;
  legacy: null;
}

export type Stat = {
  base_stat: number;
  effort:   number;
  stat:     Data;
}

export type Type = {
  slot: number;
  type: Data;
}
