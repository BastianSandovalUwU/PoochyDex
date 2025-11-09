export interface RegisteredPokemon {
  number: number;
  name: string;
  registered: boolean;
  pokedexId: number;
}

export interface PokemonHuntData {
  userId?: string;
  registeredPokemon: RegisteredPokemon[];
  lastUpdated?: Date;
}

export interface PokemonHuntResponse {
  success: boolean;
  data?: PokemonHuntData;
  message?: string;
}

export interface PokemonHuntSyncStatus {
  isSynced: boolean;
  lastSync: Date | null;
  hasPendingChanges: boolean;
}

