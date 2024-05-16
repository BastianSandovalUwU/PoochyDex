import { Species } from "./pokemon.entity";

export type Move = {
  move:                Species;
  versionGroupDetails: VersionGroupDetail[];
}

export type VersionGroupDetail = {
  levelLearnedAt:  number;
  moveLearnMethod: Species;
  versionGroup:    Species;
}
