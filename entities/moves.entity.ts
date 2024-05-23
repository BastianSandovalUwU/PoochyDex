import { Species } from "./pokemon.entity";

export type Move = {
  move:                Species;
  version_group_details: VersionGroupDetail[];
}

export type VersionGroupDetail = {
  level_learned_at:  number;
  move_learn_method: Species;
  version_group:    Species;
}

export interface DetailMove extends Move {
  detailMove?: any;
}
export interface TypeDetail {
  language: string;
  typeName: string;
}
