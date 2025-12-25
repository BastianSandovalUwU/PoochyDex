import { Data } from "./pokemon-specie.entity";

export interface Pokedex {
  descriptions:    Description[];
  id:              number;
  is_main_series:  boolean;
  name:            string;
  names:           Name[];
  pokemon_entries: PokemonEntry[];
  region:          Data;
  version_groups:  Data[];
}

export interface Description {
  description: string;
  language:    Data;
}

export interface Name {
  language: Data;
  name:     string;
}

export interface PokemonEntry {
  entry_number:    number;
  pokemon_species: Data;
}

export interface PokedexList {
    count:    number;
    next:     string | null;
    previous: string | null;
    results:  Data[];
}
