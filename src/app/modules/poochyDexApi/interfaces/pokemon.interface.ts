export interface PokemonApi {
  name:         string;
  imageURL:     string;
  number:       number;
  type:         string;
  type2?:       string;
  generationId: number;
  generation?: any;
}
