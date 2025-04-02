import { Move } from "./moves.entity";
import { Sprites } from "./sprites.entity";

// Versión completa del Pokémon con todos los datos de la API
export type PokemonFull = {
  abilities:              Ability[];
  baseExperience:         number;
  cries:                  Cries;
  forms:                  Species[];
  gameIndices:            any[];
  height:                 number;
  heldItems:              any[];
  id:                     number;
  is_default:             boolean;
  locationAreaEncounters: string;
  moves:                  Move[];
  name:                   string;
  order:                  number;
  pastAbilities:          any[];
  pastTypes:              any[];
  species:                Species;
  sprites:                Sprites;
  stats:                  Stat[];
  types:                  Type[];
  weight:                 number;
}

// Versión lite del Pokémon con solo los datos esenciales
export type Pokemon = {
  id:                     number;
  name:                   string;
  types:                  Type[];
  stats:                  Stat[];
  species:                Species;
  abilities:              Ability[];
  height:                 number;
  weight:                 number;
  is_default:             boolean;
  cries:                  Cries;
}

export type Ability = {
  ability:  Species;
  is_hidden: boolean;
  slot:     number;
}

export type Species = {
  name: string;
  url:  string;
}

export type Cries = {
  latest: string;
  legacy: null;
}

export type Stat = {
  base_stat: number;
  effort:   number;
  stat:     Species;
}

export type Type = {
  slot: number;
  type: Species;
}
