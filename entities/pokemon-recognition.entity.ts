// Contract for the (future) camera-based Pokémon recognition endpoint.
// See docs/api-services.md for the planned request/response shape.

export interface PokemonRecognitionCandidate {
  pokemonName: string;
  confidence: number; // 0–1
}

export interface PokemonRecognitionResult {
  pokemonName: string;
  confidence: number; // 0–1, same as candidates[0].confidence
  candidates: PokemonRecognitionCandidate[]; // ranked alternatives, includes the top match
}
