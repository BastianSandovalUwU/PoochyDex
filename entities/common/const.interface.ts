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
