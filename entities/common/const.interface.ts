const LANGUAGES = [
  {
    name: "Japonés",
    id: "ja-Hrkt"
  },
  {
    name: "Coreano",
    id: "ko"
  },
  {
    name: "Chino",
    id: "zh-Hant"
  },
  {
    name: "Francés",
    id: "fr"
  },
  {
    name: "Alemán",
    id: "de"
  },
  {
    name: "Español",
    id: "es"
  },
  {
    name: "Italiano",
    id: "it"
  },
  {
    name: "Inglés",
    id: "en"
  }
] as const;
export type Languages = (typeof LANGUAGES)[number];

const TARGET_TYPES = [
  "specific-move",
  "selected-pokemon-me-first",
  "ally",
  "users-field",
  "user-or-ally",
  "opponents-field",
  "user",
  "random-opponent",
  "all-other-pokemon",
  "selected-pokemon",
  "all-opponents",
  "entire-field",
  "user-and-allies",
  "all-pokemon",
  "all-allies",
  "fainting-pokemon"
];
export type TargetTypes = (typeof TARGET_TYPES)[number];
