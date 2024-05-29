import { Data } from "./pokemon-specie.entity";
import { Ability } from "./pokemon.entity";

export interface PokemonAbility {
  effectChanges:     EffectChange[];
  effectEntries:     PokemonAbilityEffectEntry[];
  flavorTextEntries: FlavorTextEntry[];
  generation:        Data;
  id:                number;
  isMainSeries:      boolean;
  name:              string;
  names:             Name[];
  pokemon:           Pokemon[];
}

export interface EffectChange {
  effectEntries: EffectChangeEffectEntry[];
  versionGroup:  Data;
}

export interface EffectChangeEffectEntry {
  effect:   string;
  language: Data;
}

export interface PokemonAbilityEffectEntry {
  effect:      string;
  language:    Data;
  shortEffect: string;
}

export interface FlavorTextEntry {
  flavorText:   string;
  language:     Data;
  versionGroup: Data;
}

export interface Name {
  language: Data;
  name:     string;
}

export interface Pokemon {
  isHidden: boolean;
  pokemon:  Data;
  slot:     number;
}

export interface AbilityName {
  language: string;
  abilityName: string;
}

export interface PokemonAbilityDetails {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export interface NameResponse {
  language: {
    name: string;
  };
  name: string;
}

export interface AbilityResponse {
  names: NameResponse[];
}
