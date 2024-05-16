import { DreamWorld, Showdown } from "./sprites.entity";

export type Versions = {
  generationI:    GenerationI;
  generationIi:   GenerationIi;
  generationIii:  GenerationIii;
  generationIv:   GenerationIv;
  generationV:    GenerationV;
  generationVi:   GenerationVi;
  generationVii:  GenerationVii;
  generationViii: GenerationViii;
}


export type GenerationI = {
  redBlue: RedBlue;
  yellow:  RedBlue;
}

export type RedBlue = {
  backDefault:      null;
  backGray:         null;
  backTransparent:  null;
  frontDefault:     null;
  frontGray:        null;
  frontTransparent: null;
}

export type GenerationIi = {
  crystal: Crystal;
  gold:    Gold;
  silver:  Gold;
}

export type Crystal = {
  backDefault:           null;
  backShiny:             null;
  backShinyTransparent:  null;
  backTransparent:       null;
  frontDefault:          null;
  frontShiny:            null;
  frontShinyTransparent: null;
  frontTransparent:      null;
}

export type Gold = {
  backDefault:      null;
  backShiny:        null;
  frontDefault:     null;
  frontShiny:       null;
  frontTransparent: null;
}

export type GenerationIii = {
  emerald:          Emerald;
  fireredLeafgreen: FireredLeafgreen;
  rubySapphire:     FireredLeafgreen;
}

export type Emerald = {
  frontDefault: null;
  frontShiny:   null;
}

export type FireredLeafgreen = {
  backDefault:  null;
  backShiny:    null;
  frontDefault: null;
  frontShiny:   null;
}

export type GenerationIv = {
  diamondPearl:        Showdown;
  heartgoldSoulsilver: Showdown;
  platinum:            Showdown;
}

export type GenerationV = {
  blackWhite: BlackWhite;
}

export type BlackWhite = {
  animated:         Showdown;
  backDefault:      null;
  backFemale:       null;
  backShiny:        null;
  backShinyFemale:  null;
  frontDefault:     null;
  frontFemale:      null;
  frontShiny:       null;
  frontShinyFemale: null;
}

export type GenerationVi = {
  omegarubyAlphasapphire: OmegarubyAlphasapphire;
  xY:                     OmegarubyAlphasapphire;
}

export type OmegarubyAlphasapphire = {
  frontDefault:     null;
  frontFemale:      null;
  frontShiny:       null;
  frontShinyFemale: null;
}

export type GenerationVii = {
  icons:             DreamWorld;
  ultraSunUltraMoon: OmegarubyAlphasapphire;
}

export type GenerationViii = {
  icons: DreamWorld;
}
