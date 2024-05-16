export interface PokemonTypes {
  damageRelations:     DamageRelations;
  gameIndices:         GameIndex[];
  generation:          Generation;
  id:                  number;
  moveDamageClass:     DamageClass;
  moves:               Moves[];
  name:                string;
  names:               Name[];
  pastDamageRelations: any[];
  pokemon:             Pokemon[];
}

export interface Moves {
  name: string;
  url:  string;
}

export interface DamageClass {
  name: string;
  url:  string;
}

export interface Generation {
  name: string;
  url:  string;
}

export interface DamageRelations {
  doubleDamageFrom: Damage[];
  doubleDamageTo:   Damage[];
  halfDamageFrom:   Damage[];
  halfDamageTo:     Damage[];
  noDamageFrom:     any[];
  noDamageTo:       any[];
}

export interface Damage {
  name: string;
  url:  string;
}

export interface GameIndex {
  gameIndex:  number;
  generation: Generation;
}

export interface Name {
  language: Generation;
  name:     string;
}

export interface Pokemon {
  pokemon: Generation;
  slot:    number;
}
