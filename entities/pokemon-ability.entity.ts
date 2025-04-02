import { Data } from "./pokemon-specie.entity";
import { Ability, Pokemon } from "./pokemon.entity";

export interface PokemonAbility {
  effectChanges:     EffectChange[];
  effectEntries:     PokemonAbilityEffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation:        Data;
  id:                number;
  isMainSeries:      boolean;
  name:              string;
  names:             Name[];
  pokemon:           {
    pokemon: {
      name: string,
      url: string
    },
    pokemonDetail?: Pokemon,
    pokemonSprite?: string
  }[];
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
  flavor_text:   string;
  language:     Data;
  version_group: Data;
}

export interface Name {
  language: Data;
  name:     string;
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
