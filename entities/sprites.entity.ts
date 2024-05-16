import { Versions } from "./versions.entity";

export type Sprites = {
  backDefault:      null;
  backFemale:       null;
  backShiny:        null;
  backShinyFemale:  null;
  frontDefault:     string;
  frontFemale:      null;
  frontShiny:       string;
  frontShinyFemale: null;
  other:            Other;
  versions:         Versions;
}


export type Other = {
  dreamWorld:      DreamWorld;
  home:            Home;
  officialArtwork: OfficialArtwork;
  showdown:        Showdown;
}

export type DreamWorld = {
  frontDefault: null;
  frontFemale:  null;
}

export type Home = {
  front_default:     string;
  front_female:      null;
  front_shiny:       string;
  front_shinyFemale: null;
}

export type OfficialArtwork = {
  frontDefault: string;
  frontShiny:   string;
}

export type Showdown = {
  backDefault:      null;
  backFemale:       null;
  backShiny:        null;
  backShinyFemale:  null;
  frontDefault:     null;
  frontFemale:      null;
  frontShiny:       null;
  frontShinyFemale: null;
}
