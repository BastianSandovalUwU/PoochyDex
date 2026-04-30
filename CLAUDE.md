# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start              # ng serve -o (dev server at localhost:4200)
npm run build          # production build (runs generate-env.js first via prebuild)
npm run watch          # build --watch in development mode
npm test               # Karma + Jasmine
npm run lint           # ESLint via ng lint
npm run build:tailwind # regenerate src/tailwind.css from src/styles/styles.scss
```

## Environment

`npm run build` automatically runs `node generate-env.js` (prebuild), which reads `NODE_JS_API` from the system environment or a `.env` file in the root and generates `src/environments/environment*.ts`. Do not hardcode secrets in those files.

## Architecture

**Angular 17 with NgModules** (not standalone components by default). Lazy-loaded feature modules are declared under `src/app/modules/` and wired via `app.routing.ts`.

### Module map

| Module | Lazy route | Purpose |
|--------|-----------|---------|
| `pokedex` | `/pokedex` | Main Pokédex: list, Pokémon detail, abilities, regional Pokédex, hunt |
| `movements` | `/movement` | Move browser |
| `poochyDexApi` | `/apiDex` | CRUD UI for the custom Node API |
| `auth` | `/auth` | Login / register |
| `profile` | `/profile/show` | User profile; settings open in a modal from here |
| `shared` | (no route) | Shared components, pipes, services — imported by all feature modules |

### SharedModule

`SharedModule` is the internal library. Key exports:

- **Components:** `app-ui-button` (`UiButtonComponent`), `app-ui-modal`, `app-ui-skeleton`, `app-poke-sprites`, `MenuComponent`, `FooterComponent`, `PokemonCardComponent`, `PokemonMovesTableComponent`, `CustomTabsComponent`, `MusicPlayerComponent`, `ThemeToggleComponent`, `ErrorMessageViewComponent`
- **Pipes:** `ReplaceDashPipe`, `TranslatePokemonNamePipe`, `TranslatePokedexNamePipe`, `TranslateEvoMethodPipe`, `TranslateLocalizationNamePipe`, `TranslateLocalizationMethodPipe`
- **Animations:** `detailFadeInAnimations` / `[@detailFadeIn]` — `src/app/modules/shared/animations/detail-fade-in.animation.ts`
- **Reexports:** `CommonModule`, `FormsModule`, `RouterModule`, `MatButtonModule`, `MatIconModule`, `MatTabsModule`

### Key services (all in `shared/services/`)

| Service | Responsibility |
|---------|---------------|
| `PokeApiService` | All PokéAPI HTTP calls; Pokémon cache in `localStorage` (`pokemon_cache`, ~2000 entry limit) |
| `LanguageService` | `currentLanguage$` (`'es'` \| `'en'`), `setCurrentLanguage` |
| `ThemeService` | Light / dark theme toggle |
| `AuthService` | Login, register, user config — calls `environment.nodeJsApi` |
| `PokemonHuntService` | Hunt list; localStorage when unauthenticated, Node API when logged in |
| `HelperService` | Facade that delegates to `PokemonDisplayService`, `CustomPokemonCatalogService`, `PokemonCacheService`, `PokemonMoveAbilityService` — kept for backwards compatibility |

`AuthInterceptor` (`modules/auth/auth.interceptor.ts`) attaches the session token to all Node API requests.

### Entities

`entities/` holds TypeScript interfaces/types shared across the app. `entities/common/` contains:
- `enum.ts` — re-exports from `display/` (game enums, Tailwind maps, label helpers)
- `i18n/lookup.ts` + `ui-string-maps.ts` — translation maps for pipes and PokéAPI slugs
- Per-generation Pokémon data files (`kanto-pokemon-data.ts`, `hoenn-pokemon-data.ts`, …)

## Conventions

### Buttons
Always use `app-ui-button` (`SharedModule`) for UI actions. Available variants: `primary`, `secondary`, `outline`, `ghost`, `icon`, `cry-play`, `cry-pause`. If a new variant is needed, extend `UiButtonComponent` in `shared/ui-button/` — do not add one-off button styles per view.

### Fade-in animation
Every route component and every top-level container that shows data via `*ngIf` must apply `detailFadeInAnimations`:

```typescript
import { detailFadeInAnimations } from 'app/modules/shared/animations/detail-fade-in.animation';
// in @Component:
animations: detailFadeInAnimations
```
```html
<div *ngIf="loaded" [@detailFadeIn]>...</div>
```
Exception: sub-components, tabs, list cells, modals, toasts.

### Navigation
Use `routerLink` / `RouterModule` (never bare `<a href>`) to avoid full-page reloads and preserve state (e.g. audio).

### Language (code vs. UI)
- **Source code:** identifiers, comments, log strings → **English**.
- **User-facing text:** always branch on `language === 'es'` / `'en'` from `LanguageService`; provide both variants. Do not hardcode a single language.

### New shared elements
New components, pipes, or services reused across features → declare and export in `SharedModule`.

## Development workflow

Every piece of work — feature, fix, refactor, anything — follows this flow:

1. **`/start <description>`** — creates a branch from latest master with automatic naming (`feature/`, `fix/`, `refactor/`, etc.) and switches to it. Always run this before writing any code.
2. **Write and commit** the work on that branch following the commit conventions below.
3. **`/ship`** — reviews the branch against all project conventions, then pushes and opens a PR to `master`. Prints the GitHub URL at the end.

Never work directly on `master`. Never open a PR manually — use `/ship`.

If `/ship` finds blockers, fix them and run `/ship` again. Warnings are included in the PR notes for review.

## Commits

Every commit message: one emoji + short imperative description **in English**.

| Emoji | Type |
|-------|------|
| ✨ | New feature |
| 🐛 | Bug fix |
| ♻️ | Refactor |
| 🎨 | UI / styling |
| 🌐 | i18n |
| ⚡️ | Performance |
| ✅ | Tests |
| 📝 | Docs |
| 🔧 | Config / tooling |
| 🔒 | Security |

Example: `✨ Add shiny toggle to Pokemon card`

After finishing a **new feature**, open a PR to `master` using `.github/pull_request_template.md`.

## Keeping docs in sync

When routes or responsibilities change in a module, update the corresponding `.cursor/rules/module-<name>.mdc`. For app-wide changes, update `AGENTS.md`. When HTTP endpoints are added or changed, update `docs/api-services.md`.
