import { Versions } from "./versions.entity";

export type Sprites = {
  back_default:      null;
  back_female:       null;
  back_shiny:        null;
  back_shiny_female:  null;
  front_default:     string;
  front_female:      null;
  front_shiny:       string;
  front_shiny_female: null;
  other:            Other;
  versions:         Versions;
}

export interface Other {
  "dream_world": DreamWorld;
  "home": Home;
  "official-artwork": OfficialArtwork;
  "showdown": Showdown;
}
export type DreamWorld = {
  front_default: null;
  front_female:  null;
}

export type Home = {
  front_default:     string;
  front_female:      null;
  front_shiny:       string;
  front_shiny_female: null;
}

export type OfficialArtwork = {
  front_default: string;
  front_shiny:   string;
}

export type Showdown = {
  back_default:      null;
  back_female:       null;
  back_shiny:        null;
  back_shiny_female:  null;
  front_default:     null;
  front_female:      null;
  front_shiny:       null;
  front_shiny_female: null;
}
