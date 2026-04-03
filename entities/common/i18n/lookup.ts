/**
 * Shared helpers for UI strings keyed by PokéAPI slugs or English tokens.
 * Spanish maps live in `ui-string-maps.ts`; domain enums stay under `display/`.
 */

export function translateWithEsMap(
  language: string,
  value: string,
  esMap: Record<string, string>
): string {
  if (language !== 'es') {
    return value;
  }
  return esMap[value] ?? value;
}
