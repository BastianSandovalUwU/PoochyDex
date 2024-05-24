import { Data } from "./pokemon-specie.entity";

export type Move = {
  move:                Data;
  detailMove?:         DetailMove;
  version_group_details: VersionGroupDetail[];
}
export interface ShowMove extends Move {
  moveName?: string;
  types?: [{
    language: string;
    typeName: string;
  }];
}

export type DetailMove = {
  accuracy:             number;
  contest_combos:       ContestCombos;
  contest_effect:       ContestEffect;
  contest_type:         Data;
  damage_class:         Data;
  effect_chance:        null;
  effect_changes:       any[];
  effect_entries:       EffectEntry[];
  flavor_text_entries:  FlavorTextEntry[];
  generation:           Data;
  id:                   number;
  learned_by_pokemon:   Data[];
  machines:             any[];
  meta:                 Meta;
  name:                 string;
  names:                Name[];
  past_values:          any[];
  power:                number;
  pp:                   number;
  priority:             number;
  stat_changes:         any[];
  super_contest_effect: ContestEffect;
  target:               Data;
  type:                 Data;
}

export type VersionGroupDetail = {
  level_learned_at:  number;
  move_learn_method: Data;
  version_group:    Data;
}

export interface TypeDetail {
  language: string;
  typeName: string;
}

export type ContestCombos = {
  normal: Normal;
  super:  Normal;
}

export type Normal = {
  use_after:  null;
  use_before: Data[] | null;
}

export type ContestEffect = {
  url: string;
}

export type EffectEntry = {
  effect:       string;
  language:     Data;
  short_effect: string;
}

export type FlavorTextEntry = {
  flavor_text:   string;
  language:      Data;
  version_group: Data;
}

export type Meta = {
  ailment:        Data;
  ailment_chance: number;
  category:       Data;
  crit_rate:      number;
  drain:          number;
  flinch_chance:  number;
  healing:        number;
  max_hits:       null;
  max_turns:      null;
  min_hits:       null;
  min_turns:      null;
  stat_chance:    number;
}

export type Name = {
  language: Data;
  name:     string;
}
