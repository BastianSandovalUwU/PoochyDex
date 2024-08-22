import { Data } from "./pokemon-specie.entity";

export type GameVersion = {
  id:           number;
  name:         string;
  names:        Name[];
  version_group: Data;
}

export type Name = {
  language: Data;
  name:     string;
}
