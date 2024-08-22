import { Data } from "./pokemon-specie.entity";

export type GenerationInfo = {
  abilities:      any[];
  id:             number;
  mainRegion:     Data;
  moves:          Data[];
  name:           string;
  names:          Name[];
  pokemonSpecies: Data[];
  types:          Data[];
  versionGroups:  Data[];
}

export type Name = {
  language: Data;
  name:     string;
}
