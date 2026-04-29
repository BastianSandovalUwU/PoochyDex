import { Versions } from "./versions.entity";

/**
 * Top-level `sprites` from PokéAPI. Any URL may be `null` if the asset does not exist.
 * @see https://pokeapi.co/docs/v2#pokemon
 */
export type Sprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: Other;
  versions: Versions;
}

export interface Other {
  "dream_world": DreamWorld;
  "home": Home;
  "official-artwork": OfficialArtwork;
  "showdown": Showdown;
}

export type DreamWorld = {
  front_default: string | null;
  front_female: string | null;
}

export type Home = {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export type OfficialArtwork = {
  front_default: string | null;
  front_shiny: string | null;
}

/** 3D / battle-style sprites; keys mirror standard sprite names. */
export type Showdown = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}
