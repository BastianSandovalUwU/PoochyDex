import { PokemonSpecie } from "./pokemon-specie.entity";
import { Pokemon } from "./pokemon.entity";

export type EvolutionChain = {
  baby_trigger_item: null;
  chain:             Chain;
  id:                number;
}

export type Chain = {
  evolution_details: EvolutionDetail[];
  evolves_to:        Chain[];
  is_baby:           boolean;
  species:           NameUrl;
  pokemonName?:       string;
  imageName?:        string;
}

export type EvolutionDetail = {
  gender:                  NameUrl | null;
  held_item:               NameUrl | null;
  item:                    NameUrl | null;
  known_move:              NameUrl | null;
  known_move_type:         NameUrl | null;
  location:                NameUrl | null;
  min_affection:           null;
  min_beauty:              null;
  min_happiness:           null;
  min_level:               number;
  needs_overworld_rain:    boolean;
  party_species:           null;
  party_type:              null;
  relative_physical_stats: null;
  time_of_day:             string;
  trade_species:           NameUrl | null;
  trigger:                 NameUrl;
  turn_upside_down:        boolean;
}

export type NameUrl = {
  name: string;
  url:  string;
}
export interface DetailChain extends EvolutionChain {
  detailPokemon: Pokemon[];
}
