# Contexto del proyecto — PoochyDex

Documento de referencia para personas y asistentes de IA que trabajan en este repositorio. La instalación, scripts y descripción funcional están en [README.md](README.md).

## Qué es

PoochyDex es una Pokédex web que consume [PokéAPI](https://pokeapi.co/) y, cuando está configurada, una API Node propia (`nodeJsApi`). Incluye autenticación contra esa API, perfil, ajustes, movimientos, módulo de API personalizada y empaquetado móvil con Capacitor.

## Stack

| Área | Tecnología |
|------|------------|
| Framework | Angular **17** (NgModules, no standalone por defecto) |
| Lenguaje | TypeScript **~5.4** |
| Estilos | **SCSS** por componente + Tailwind (`src/styles/`, `src/tailwind.css`; script `build:tailwind`) |
| UI | Angular Material (tema prebuilt `purple-green` en `angular.json`) |
| HTTP / estado | `HttpClient`, RxJS |
| Auth / backend cliente | API Node (`nodeJsApi`), sesión vía `AuthService` |
| PWA | `@angular/service-worker` (registrado en `app.module.ts`; `ngsw-config.json` presente) |
| Móvil | Capacitor 7 |

## Comandos útiles

- `npm start` — `ng serve -o` (desarrollo).
- `npm run build` — ejecuta antes `prebuild`: `node generate-env.js` (lee `NODE_JS_API` desde entorno o `.env` vía `dotenv` si existe) y genera `src/environments/environment*.ts`.
- `npm test` — Karma + Jasmine.
- `npm run build:tailwind` — regenera `src/tailwind.css` desde `src/styles/styles.scss` / configuración Tailwind.
- `npm run lint` — **ESLint** (`ng lint`) con `@angular-eslint`; configuración en `.eslintrc.json` (reglas estrictas relajadas para el código existente; muchos avisos, 0 errores si pasa el comando).

## Entidades compartidas (`entities/common`)

- **`enum.ts`** — reexporta módulos bajo **`display/`** (enums de juego, mapas Tailwind, helpers de etiquetas) para no mezclar miles de líneas en un solo archivo.
- **`i18n/`** — `lookup.ts` (resolución por idioma) y **`ui-string-maps.ts`** (mapas ES solo para pipes / slugs de PokéAPI), separados de la lógica de dominio.

## Estructura de código (`src/app`)

- **`app.routing.ts`** — Rutas raíz; la mayoría de features son **lazy loading** (`loadChildren`).
- **`app.module.ts`** — `HttpClient`, `SharedModule`, `AuthInterceptor`, `ServiceWorkerModule`, snackbar global.
- **`modules/pokedex/`** — Listado y ficha de Pokémon (ruta `/pokedex`).
- **`modules/movements/`** — Movimientos (`/movement`).
- **`modules/poochyDexApi/`** — Integración con la API propia (`/apiDex`).
- **`modules/auth/`** — Autenticación (`/auth`).
- **`modules/profile/`** — Perfil (`/profile/show`); ajustes Pokédex en modal (`SharedModule` → `app-ui-modal` + `app-settings`).
- **`modules/shared/`** — `SharedModule`: componentes reutilizables (menú, cards, tablas, pipes de traducción, tema, etc.) y **servicios compartidos** (`modules/shared/services/`), p. ej. `PokeApiService`, `LanguageService`, `ThemeService`. La lógica de Pokémon/UI que antes concentraba `HelperService` está en `PokemonDisplayService`, `CustomPokemonCatalogService`, `PokemonCacheService` y `PokemonMoveAbilityService`; `HelperService` delega en ellos como fachada retrocompatible.

Las **reglas por módulo** están en **`.cursor/rules/module-*.mdc`**: Cursor las asocia al editar archivos bajo `src/app/modules/<módulo>/`.

**Convención de selectores:** prefijo `app` (definido en `angular.json`).

## Entornos y secretos

- Variables sensibles o por entorno: preferir **variables de sistema** o archivo **`.env`** en la raíz con `NODE_JS_API` para el script `generate-env.js`.
- No commitear credenciales; `environment.ts` / `environment.prod.ts` se generan en `prebuild`.

## Convenciones al cambiar código

- **Contexto del módulo:** en cada desarrollo sustantivo dentro de `src/app/modules/<módulo>/`, actualiza **`.cursor/rules/module-<módulo>.mdc`** para reflejar rutas, dependencias y notas útiles (misma PR o commit). Si el cambio afecta la app al completo o varios features, revisa también **`AGENTS.md`**.
- Mantener el estilo existente: mismos patrones de módulos, nombres de archivos (`*.component.ts|html|scss`) y pipes bajo `shared/pipes/`.
- Reutilizar `SharedModule` y servicios ya expuestos antes de duplicar lógica.
- **Idioma en código:** identificadores y comentarios en **inglés**. **Texto de UI:** español e inglés según el idioma activo (`language` / `currentLanguage` en `'es'` | `'en'`, vía `LanguageService` y pipes o ramas existentes).
- Cambios de UI: coherencia con Material + estilos globales en `src/styles/`.
- **Botones:** usar **`app-ui-button`** (`SharedModule`, `shared/ui-button/`); si hace falta un estilo nuevo, ampliar **`UiButtonComponent`** en shared, no duplicar clases en cada vista (véase **`.cursor/rules/ui-button.mdc`**).
- **Seguridad:** no commitear secretos; cuidado con HTML dinámico y enlaces externos; la autorización real es en el backend (ver **`.cursor/rules/security.mdc`**).

## Commits (Git)

- Un **emoji** al inicio que indique el tipo de cambio; **descripción en inglés**, imperativo (p. ej. `✨ Add profile banner`).
- Detalle en **`.cursor/rules/commits.mdc`**.

## Dónde buscar qué

| Necesidad | Sitio típico |
|-----------|----------------|
| **Clientes HTTP y endpoints** (PokéAPI + API Node) | [docs/api-services.md](docs/api-services.md) |
| Rutas de un feature | `*.routing.ts` dentro del módulo |
| Perfil de usuario (sesión, rol, idioma guardado) | `modules/profile/` (`/profile` → `show`) |
| Login y registro | `modules/auth/` (`/auth/login`, `/auth/sign-up`) |
| Llamadas a PokéAPI / caché | `shared/services/pokeApi.service.ts` y relacionados |
| Botones reutilizables (variantes compartidas) | `shared/ui-button/` (`app-ui-button`) |
| Tema claro/oscuro | `ThemeService`, `theme-toggle` |
| Errores HTTP / mensajes | `ErrorMessageService`, vistas en `shared` |

## Reglas para el asistente (Cursor)

Tras un **feature nuevo** o **desarrollo nuevo** pedido por el usuario, al cerrar el trabajo: **commit** (véase `commits.mdc`), **push + PR** hacia `master` con descripción detallada (plantilla en `.github/pull_request_template.md`) para revisión; si no hay acceso a GitHub, el asistente debe dejar **mensaje de commit y cuerpo del PR** listos para pegar (véase `context-sources.mdc`).

En **`.cursor/rules/`**:

| Archivo | Cuándo aplica |
|---------|----------------|
| **`context-sources.mdc`** | Siempre: orden de lectura (`AGENTS.md` + reglas por módulo). |
| **`poochydex.mdc`** | Siempre: stack Angular, build, APIs. |
| **`commits.mdc`** | Siempre: formato de mensajes de commit (emoji + inglés). |
| **`english-code-i18n-ui.mdc`** | Siempre: código en inglés; UI bilingüe con `language` / `LanguageService`. |
| **`security.mdc`** | Siempre: secretos, XSS, almacenamiento, APIs, dependencias. |
| **`ui-button.mdc`** | Siempre: usar `app-ui-button`; personalizar en `shared/ui-button/`. |
| **`module-pokedex.mdc`** … **`module-shared.mdc`** | Al trabajar en `src/app/modules/<módulo>/**` (rutas y dependencias de ese feature). |
| **`angular-templates.mdc`** | Archivos `*.html`. |

Si cambian rutas o responsabilidades de un módulo, actualiza el **`module-*.mdc`** correspondiente. Con cada **desarrollo nuevo** relevante en un módulo, mantén ese **`module-*.mdc`** al día (ver convenciones arriba).

---

*Si actualizas arquitectura o flujos importantes, sincroniza este archivo o las reglas en `.cursor/rules/` para no desalinear el contexto.*
