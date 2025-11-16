export interface PokemonSprites {
  homeUrl: string;
  homeShinyUrl: string;
  iconUrl: string;
  sugimoriArt?: string;
  globalLinkArt?: string;
}

export interface Pokemon {
  id?: number;
  number: number;
  name: string;
  type: string;
  type2?: string;
  generationId: number;
  sprites: PokemonSprites;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PokemonAllResponse {
  success: boolean;
  message: string;
  data: Pokemon[];
}

export interface PokemonResponse {
  success: boolean;
  message: string;
  data: Pokemon;
}

// Formas alternativas: misma estructura que Pokemon
export interface PokemonForm extends Pokemon {}

export interface PokemonFormAllResponse {
  success: boolean;
  message: string;
  data: PokemonForm[];
}

export interface PokemonFormResponse {
  success: boolean;
  message: string;
  data: PokemonForm;
}

export interface CreatePokemonRequest {
  number: number;
  name: string;
  type: string;
  type2?: string;
  generationId: number;
  sprites: PokemonSprites;
}

export interface UpdatePokemonRequest {
  number?: number;
  name?: string;
  type?: string;
  type2?: string;
  generationId?: number;
  sprites?: PokemonSprites;
}


