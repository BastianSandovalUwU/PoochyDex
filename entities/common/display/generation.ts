export enum Generation {
  I = 'generation-i',
  II = 'generation-ii',
  III = 'generation-iii',
  IV = 'generation-iv',
  V = 'generation-v',
  VI = 'generation-vi',
  VII = 'generation-vii',
  VIII = 'generation-viii',
  IX = 'generation-ix',
  X = 'generation-x'
}

/** Single source for localized generation titles (avoids duplicate ES/EN tables). */
export const GENERATION_LABELS: Record<Generation, { es: string; en: string }> = {
  [Generation.I]: { es: 'Primera Generación', en: 'First Generation' },
  [Generation.II]: { es: 'Segunda Generación', en: 'Second Generation' },
  [Generation.III]: { es: 'Tercera Generación', en: 'Third Generation' },
  [Generation.IV]: { es: 'Cuarta Generación', en: 'Fourth Generation' },
  [Generation.V]: { es: 'Quinta Generación', en: 'Fifth Generation' },
  [Generation.VI]: { es: 'Sexta Generación', en: 'Sixth Generation' },
  [Generation.VII]: { es: 'Séptima Generación', en: 'Seventh Generation' },
  [Generation.VIII]: { es: 'Octava Generación', en: 'Eighth Generation' },
  [Generation.IX]: { es: 'Novena Generación', en: 'Ninth Generation' },
  [Generation.X]: { es: 'Décima Generación', en: 'Tenth Generation' }
};

/** @deprecated Prefer `GENERATION_LABELS` for new code. */
export const GENERATION_TRANSLATIONS_ES: Record<Generation, string> = Object.values(Generation).reduce(
  (acc, g) => {
    acc[g] = GENERATION_LABELS[g].es;
    return acc;
  },
  {} as Record<Generation, string>
);

/** @deprecated Prefer `GENERATION_LABELS` for new code. */
export const GENERATION_TRANSLATIONS_EN: Record<Generation, string> = Object.values(Generation).reduce(
  (acc, g) => {
    acc[g] = GENERATION_LABELS[g].en;
    return acc;
  },
  {} as Record<Generation, string>
);

export function getGenerationName(generationName: string, language: string): string {
  const normalizedName = generationName.toLowerCase() as Generation;
  const entry = GENERATION_LABELS[normalizedName];
  if (!entry) {
    return '';
  }
  if (language === 'es') {
    return entry.es;
  }
  if (language === 'en') {
    return entry.en;
  }
  return '';
}
