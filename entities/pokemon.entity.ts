import { Move } from "./moves.entity";
import { Sprites } from "./sprites.entity";

export type Pokemon = {
  abilities:              Ability[];
  baseExperience:         number;
  cries:                  Cries;
  forms:                  Species[];
  gameIndices:            any[];
  height:                 number;
  heldItems:              any[];
  id:                     number;
  isDefault:              boolean;
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

export type Ability = {
  ability:  Species;
  isHidden: boolean;
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
  baseStat: number;
  effort:   number;
  stat:     Species;
}

export type Type = {
  slot: number;
  type: Species;
}
