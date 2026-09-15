# API client services (Angular)

This document describes **Angular injectables** that perform **HTTP** calls to external backends. Paths are as implemented in code; base URLs come from `environment` or constants.

| Backend | Base URL | Main service(s) |
|---------|----------|-------------------|
| **PokéAPI** (public REST) | `https://pokeapi.co/api/v2` | `PokeApiService` |
| **PoochyDex Node API** (custom) | `environment.nodeJsApi` | `PoochyDexApiService`, `AuthService`, `PokemonHuntService` |

**Auth:** requests to the Node API typically include the session token via **`AuthInterceptor`** (`app/modules/auth/auth.interceptor.ts`), except where the backend allows anonymous access (check server rules).

---

## `PokeApiService`

**File:** `src/app/modules/shared/services/pokeApi.service.ts`  
**Base:** `apiUrl = 'https://pokeapi.co/api/v2'` (no trailing path in constant; endpoints append paths).

**Behaviour:**

- **`lastDataSource$`:** emits `'network'` or `'cache'` depending on whether Pokémon data came from HTTP or `localStorage` (`pokemon_cache`).
- **Pokémon cache:** `getPokemonByName` / `getPokemonById` can read/write `localStorage` key `pokemon_cache` (lite `Pokemon` objects, max ~2000 entries). Offline behaviour ties into `NetworkService.isOnline$`.

**HTTP methods (relative to `apiUrl`):**

| Method | Approx. PokéAPI path / pattern | Notes |
|--------|----------------------------------|--------|
| `getPokemonMoves` | `GET /pokemon/{id}/` | Moves from full Pokémon payload |
| `getAllPokemon` | `GET /pokemon/?limit=1302` | National list |
| `getPokemonByName` | `GET /pokemon/{name}/` | May use cache |
| `getPokemonById` | `GET /pokemon/{id}/` | May use cache |
| `getPokemonByUrl` | `GET` absolute URL | |
| `getPokemonSpecieById` | `GET /pokemon-species/{id}/` | |
| `getPokemonSpecieByUrl` | `GET` URL from API | |
| `getPokemonByGeneration` | `GET /generation/{n}/` | |
| `getLanguageById` | `GET` URL | |
| `getMoveByUrl` | `GET` URL | Fallback placeholder move on error |
| `getMoveByName` | `GET /move/{name}/` | Fallback placeholder on error |
| `getMachineMoveByUrl` | `GET` URL | |
| `getAbilityById` | `GET /ability/{id}/` | |
| `getAbilityByUrl` | `GET` URL | |
| `getEvolutionChainByUrl` | `GET` URL | |
| `getPokedex` | `GET /pokedex/{id}/` | |
| `getAllPokedex` | `GET /pokedex?offset=0&limit=50` | |
| `getPokemonLocalization` | `GET /pokemon/{id}/encounters/` | |
| `getGenerationInfo` | `GET /generation/{name}/` | |
| `getGameVersionInfo` | `GET /version/{name}/` | |
| `getVersionGroupInfo` | `GET /version-group/{name}/` | |

**Related (no direct `HttpClient` in these files):** `PokemonMoveAbilityService` calls `getAbilityById`; `PokemonCacheService` uses `getPokemonById`; `CustomPokemonCatalogService` uses Node API, not PokéAPI.

---

## `PoochyDexApiService`

**File:** `src/app/modules/poochyDexApi/services/poochyDexApi.service.ts`  
**Base:** `private apiUrlCore = environment.nodeJsApi` — all paths below are `{apiUrlCore}/...`.

| Method | HTTP | Path |
|--------|------|------|
| `getAllPokemon` | GET | `/api/pokemon` |
| `getPokemonById` | GET | `/api/pokemon/{id}` |
| `getPokemonByNumber` | GET | `/api/pokemon/number/{number}` |
| `getPokemonByName` | GET | `/api/pokemon/name/{name}` |
| `createPokemon` | POST | `/api/pokemon` |
| `updatePokemon` | PUT | `/api/pokemon/{id}` |
| `deletePokemon` | DELETE | `/api/pokemon/{id}` |
| `getAllPokemonForms` | GET | `/api/pokemon-forms` |
| `getPokemonFormById` | GET | `/api/pokemon-forms/{id}` |
| `getPokemonFormsByNumber` | GET | `/api/pokemon-forms/number/{number}` |
| `getPokemonFormByName` | GET | `/api/pokemon-forms/name/{name}` |
| `createPokemonForm` | POST | `/api/pokemon-forms` |
| `updatePokemonForm` | PUT | `/api/pokemon-forms/{id}` |
| `deletePokemonForm` | DELETE | `/api/pokemon-forms/{id}` |

**Types:** `entities/poochydex-api/pokemon.type.ts` (`CreatePokemonRequest`, `UpdatePokemonRequest`, response wrappers).

---

## `AuthService`

**File:** `src/app/modules/auth/services/auth.service.ts`  
**Base:** `private apiUrl = environment.nodeJsApi`

| Method | HTTP | Path |
|--------|------|------|
| `register` | POST | `/api/auth/register` |
| `login` | POST | `/api/auth/login` |
| `getUserConfigs` | GET | `/api/userConfig/getUserConfig` |
| `createUserConfig` | POST | `/api/userConfig/createUserConfig` |
| `updateUserConfig` | PUT | `/api/userConfig/updateUserConfig` |

**Types:** `entities/auth/auth.entity.ts`, `entities/auth/user.entity.ts`.

---

## `PokemonHuntService`

**File:** `src/app/modules/shared/services/pokemon-hunt.service.ts`  
**Base:** `private apiUrl = environment.nodeJsApi`  
**Note:** If the user is **not** authenticated, hunt data is read/written locally (localStorage); HTTP is used when logged in.

| Method | HTTP | Path |
|--------|------|------|
| `getRegisteredPokemon` (server path) | GET | `/api/pokemon-hunt/get` |
| Save flow | POST | `/api/pokemon-hunt/save` |
| Update flow | PUT | `/api/pokemon-hunt/update` |
| Clear | DELETE | `/api/pokemon-hunt/clear` |

**Types:** `entities/pokemon-hunt.entity.ts`.

---

## Environment

- **`environment.nodeJsApi`:** set by `generate-env.js` / `.env` (`NODE_JS_API`). See `AGENTS.md` and `README.md`.
- **PokéAPI:** fixed public URL in `PokeApiService`; no env key required for the base URL.

---

## `PokemonRecognitionService` (planned — front-end mock, backend not implemented yet)

**File:** `src/app/modules/shared/services/pokemon-recognition.service.ts`
**Base:** `environment.nodeJsApi` (same Node API as the rest of this document).

Feeds the camera-based scan screen (`/pokedex/camera-scan`, `CameraScanComponent`). Today `identifyPokemon` returns a **mocked** `PokemonRecognitionResult` (random entry from `ALL_POKEMON`, simulated network delay) — the `MOCK_RECOGNITION` flag at the top of the file switches it to a real HTTP call once the endpoint below exists; no other front-end code needs to change.

**Planned endpoint (not implemented server-side yet):**

| Method | Path | Notes |
|--------|------|-------|
| `identifyPokemon` | POST | `/api/pokemon-recognition/identify` |

**Request body:**

```json
{ "image": "data:image/jpeg;base64,..." }
```

`image` is the captured photo as a data URL (base64), read from the device camera via a `<input type="file" capture="environment">` and `FileReader`.

**Expected response (`PokemonRecognitionResult`, `entities/pokemon-recognition.entity.ts`):**

```json
{
  "pokemonName": "pikachu",
  "confidence": 0.93,
  "candidates": [
    { "pokemonName": "pikachu", "confidence": 0.93 },
    { "pokemonName": "raichu", "confidence": 0.41 }
  ]
}
```

`pokemonName` values must be valid PokéAPI name slugs — the front looks up the recognized Pokémon via the existing `PokeApiService.getPokemonByName` to render its sprite/details, so no additional fields (sprites, stats, etc.) need to come from this endpoint.

---

## Maintenance

When you add or change HTTP endpoints in these services, update this file and the relevant **`module-*.mdc`** / **`AGENTS.md`** if behaviour crosses features.
