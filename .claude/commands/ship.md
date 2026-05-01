---
description: Finish work on the current branch — lint, review conventions, then open a PR to master
---

Ship the current branch: run lint, review project conventions, then create a PR to `master`. Run this when all the work is committed and ready.

## Steps

### 1 — Pre-flight checks

Run in parallel:
```
git status
git diff master...HEAD
git log master...HEAD --oneline
git branch --show-current
```

- If `git status` shows uncommitted changes, stop and tell the user to commit or stash first.
- If the branch is `master`, stop — work must be on a feature/fix branch.
- If there are no commits ahead of `master`, stop — nothing to ship.

Expected branch naming convention:
- `feature/<kebab-description>` — new feature
- `fix/<kebab-description>` — bug fix
- `refactor/<kebab-description>` — refactoring
- `style/<kebab-description>` — UI / styling
- `docs/<kebab-description>` — documentation
- `chore/<kebab-description>` — config / tooling

### 2 — Lint

```
npm run lint
```

- If lint **fails**: stop. Show the errors and tell the user to fix them before running `/ship` again.
- If lint **passes**: continue.

### 3 — Convention review

Check the diff against every item in this list and report findings as **blocker**, **warning**, or **suggestion**:

**Angular**
- No standalone components — project uses NgModules
- New shared elements declared and exported in `SharedModule`
- Navigation uses `routerLink`, not bare `<a href>` (bare href causes full reload and loses audio state)
- No new UI libraries introduced when Angular Material or `shared/` already covers the need

**Buttons**
- UI actions use `app-ui-button` (`UiButtonComponent`), not raw `<button class="...">` or direct `mat-raised-button`
- New variants added to `UiButtonComponent` in `shared/ui-button/` — not inlined per view

**Animations**
- Route components and top-level `*ngIf` data containers use `detailFadeInAnimations` + `[@detailFadeIn]`
- Sub-components, modals, tabs, and list cells do NOT apply `detailFadeIn`

**i18n**
- Identifiers, comments, and non-UI strings are in English
- Every user-visible string has both Spanish and English variants via `LanguageService`
- No UI text hardcoded to a single language

**Security**
- No secrets committed — env vars go in `.env` / `NODE_JS_API` processed by `generate-env.js`
- No `innerHTML` or `bypassSecurityTrust*` without clear documented justification
- External links have `rel="noopener noreferrer"` when `target="_blank"` is present
- No tokens, passwords, or PII logged to the console

**Docs sync**
- Module routes or responsibilities changed → `.cursor/rules/module-<name>.mdc` updated
- HTTP endpoints added or changed → `docs/api-services.md` updated
- Cross-module architecture changed → `AGENTS.md` updated

**Commits**
- Every commit starts with an emoji + short English imperative (e.g. `✨ Add shiny toggle`)

### 4 — Decision

- **Blockers found:** report them, stop. Do not create the PR. Tell the user to fix blockers and run `/ship` again.
- **Only warnings/suggestions:** create the PR and include the findings in the "Notas adicionales" section.
- **All clear:** create the PR normally.

### 5 — Push and open PR

Push the branch:
```
git push -u origin <branch>
```

Then create the PR with `gh`:

```
gh pr create --base master \
  --title "<emoji> <short English imperative description>" \
  --body "..."
```

PR body — follow this template exactly:

```markdown
# Descripción pull request

## Resumen

(Describe qué se construyó y por qué, inferido a partir de los commits y el diff.)

## Cambios principales

(Explica los cambios técnicos relevantes: archivos clave, servicios nuevos, decisiones de diseño identificadas en el diff.)

## Screenshots (si aplica)

(Adjunta capturas o GIFs si hay cambios visuales.)

## Cómo verificar

```bash
npm install
npm run lint
npm start
```
(Pasos específicos para probar el feature — rutas afectadas, interacciones a validar, etc.)

## Notas adicionales

(Warnings del convention review, breaking changes, dependencias de otros PRs, o cualquier cosa relevante al hacer merge.)

---
*Rama: `<branch>` → `master`.*
```

PR title emoji guide:

| Emoji | Use |
|-------|-----|
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

### 6 — Done

Print the PR URL returned by `gh pr create` so the user can open it directly in GitHub.

If `gh` fails or is not found, output the full PR title, body, and the compare URL in the format:
`https://github.com/BastianSandovalUwU/PoochyDex/compare/master...<branch>`
