import { DetailMove } from '../../../../../entities/moves.entity';

export function createPlaceHolderMove(id: string, gameName: string): DetailMove {
  return {
    id: -1,
    name: id,
    accuracy: null,
    contest_combos: { normal: { use_after: null, use_before: null }, super: { use_after: null, use_before: null } },
    contest_effect: { url: '' },
    contest_type: { name: 'unknown', url: '' },
    damage_class: { name: 'unknown', url: '' },
    effect_chance: null,
    effect_changes: [],
    effect_entries: [{ effect: 'No encontrado', language: { name: 'es', url: '' }, short_effect: 'No encontrado' }],
    flavor_text_entries: [{ flavor_text: 'No encontrado', language: { name: 'es', url: '' }, version_group: { name: gameName, url: '' } }],
    generation: { name: 'unknown', url: '' },
    learned_by_pokemon: [],
    machines: [],
    meta: {
      ailment: { name: 'unknown', url: '' },
      ailment_chance: 0,
      category: { name: 'unknown', url: '' },
      crit_rate: 0,
      drain: 0,
      flinch_chance: 0,
      healing: 0,
      max_hits: null,
      max_turns: null,
      min_hits: null,
      min_turns: null,
      stat_chance: 0
    },
    names: [{ language: { name: 'es', url: '' }, name: id }],
    past_values: [],
    power: 0,
    pp: 0,
    priority: 0,
    stat_changes: [],
    super_contest_effect: { url: '' },
    target: { name: 'unknown', url: '' },
    type: { name: 'unknown', url: '' }
  };
}
