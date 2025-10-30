export type PokemonSpecie = {
  base_happiness:         number;
  capture_rate:           number;
  color:                  Data;
  egg_groups:             Data[];
  evolution_chain:        EvolutionChain;
  evolves_from_species:   Data;
  flavor_text_entries:    FlavorTextEntry[];
  form_descriptions:      any[];
  forms_switchable:       boolean;
  gender_rate:            number;
  genera:                 Genus[];
  generation:             Data;
  growth_rate:            Data;
  habitat:                Data;
  has_gender_differences: boolean;
  hatch_counter:          number;
  id:                     number;
  is_baby:                boolean;
  is_legendary:           boolean;
  is_mythical:            boolean;
  name:                   string;
  names:                  Name[];
  order:                  number;
  pal_park_encounters:    PalParkEncounter[];
  pokedex_numbers:        PokedexNumber[];
  shape:                  Data;
  varieties:              Variety[];
}

export type Data = {
  name: string;
  url:  string;
}

export type EvolutionChain = {
  url: string;
}

export type FlavorTextEntry = {
  flavor_text: string;
  language:    Data;
  version:     Data;
}

export type Genus = {
  genus:    string;
  language: Data;
}

export type Name = {
  language: Data;
  name:     string;
}

export type PalParkEncounter = {
  area:       Data;
  base_score: number;
  rate:       number;
}

export type PokedexNumber = {
  entry_number: number;
  pokedex:      Data;
}

export type Variety = {
  is_default: boolean;
  pokemon:    Data;
}
