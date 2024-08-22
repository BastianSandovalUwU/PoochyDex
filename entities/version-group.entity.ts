import { Data } from "./pokemon-specie.entity";

export type VersionGroup = {
  generation:       Data;
  id:               number;
  move_learn_methods: Data[];
  name:             string;
  order:            number;
  pokedexes:        Data[];
  regions:          Data[];
  versions:         Data[];
}
