import { DreamWorld, Showdown } from "./sprites.entity";

export interface Versions {
  "generation-i": GenerationI;
  "generation-ii": GenerationIi;
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-v": GenerationV;
  "generation-vi": GenerationVi;
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}

export type GenerationI = {
  "red-blue": RedBlue;
  "yellow":  RedBlue;
}

export type RedBlue = {
  back_default:      null;
  back_gray:         null;
  back_transparent:  null;
  front_default:     null;
  front_gray:        null;
  front_transparent: null;
}

export type GenerationIi = {
  crystal: Crystal;
  gold:    GoldSilver;
  silver:  GoldSilver;
}

export type Crystal = {
  back_default:           null;
  back_shiny:             null;
  back_shiny_transparent:  null;
  back_transparent:       null;
  front_default:          null;
  front_shiny:            null;
  front_shiny_transparent: null;
  front_transparent:      null;
}

export type GoldSilver = {
  back_default:      null;
  back_shiny:        null;
  front_default:     null;
  front_shiny:       null;
  front_transparent: null;
}

export type GenerationIii = {
  "emerald":          Emerald;
  "firered-Leafgreen": FireredLeafgreen;
  "ruby-sapphire":     FireredLeafgreen;
}

export type Emerald = {
  front_default: null;
  front_shiny:   null;
}

export type FireredLeafgreen = {
  back_default:  null;
  back_shiny:    null;
  front_default: null;
  front_shiny:   null;
}

export type GenerationIv = {
  "diamond-pearl":        Showdown;
  "heartgold-soulsilver": Showdown;
  "platinum":            Showdown;
}

export type GenerationV = {
  "black-white": BlackWhite;
}

export type BlackWhite = {
  animated:         Showdown;
  back_default:      null;
  back_female:       null;
  back_shiny:        null;
  back_shiny_female:  null;
  front_default:     null;
  front_female:      null;
  front_shiny:       null;
  front_shiny_female: null;
}

export type GenerationVi = {
  "omegaruby-alphasapphire": OmegarubyAlphasapphire;
  "x-y":                     OmegarubyAlphasapphire;
}

export type OmegarubyAlphasapphire = {
  front_default:     null;
  front_female:      null;
  front_shiny:       null;
  front_shiny_female: null;
}

export type GenerationVii = {
  "icons":             DreamWorld;
  "ultra-sun-ultra-moon": OmegarubyAlphasapphire;
}

export type GenerationViii = {
  icons: DreamWorld;
}
