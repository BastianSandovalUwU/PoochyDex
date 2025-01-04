export type PokemonList = {
  name: string;
  sprites: Sprites;
  type: string;
  type2?: string;
  generationId: number;
  number: number;
}

export type Sprites = {
  homeUrl: string;
  homeShinyUrl: string;
  iconUrl: string;
}
