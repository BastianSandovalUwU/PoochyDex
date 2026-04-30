---
description: Finish work on the current branch — review conventions, then open a PR to master
---

Ship the current branch: run the PoochyDex convention review, then create a PR to master. Run this when all the work is committed and ready.

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
- If there are no commits ahead of master, stop — nothing to ship.

### 2 — Convention review

Check the diff against every item in this list and report findings as **blocker**, **warning**, or **suggestion**:

**Angular**
- No standalone components (project uses NgModules)
- New shared elements declared and exported in `SharedModule`
- Navigation uses `routerLink`, not `<a href>`
- No new UI libraries when Angular Material / `shared` already covers it

**Buttons**
- UI actions use `app-ui-button`, not raw `<button class="...">` or direct `mat-raised-button`
- New variants added to `UiButtonComponent` in `shared/ui-button/`, not inlined

**Animations**
- Route components and top-level `*ngIf` containers use `detailFadeInAnimations` + `[@detailFadeIn]`
- Sub-components, modals, tabs, cells do NOT use it

**i18n**
- Identifiers, comments, non-UI strings in English
- Every user-visible string has both Spanish and English variants via `LanguageService`
- No UI text hardcoded to a single language

**Security**
- No secrets committed; env vars go in `.env` / `NODE_JS_API`
- No `innerHTML` or `bypassSecurityTrust*` without justification
- External links have `rel="noopener noreferrer"` with `target="_blank"`

**Docs sync**
- Module routes/responsibilities changed → `.cursor/rules/module-<name>.mdc` updated
- HTTP endpoints added/changed → `docs/api-services.md` updated
- Cross-module architecture changed → `AGENTS.md` updated

**Commits**
- Every commit starts with emoji + English imperative

### 3 — Decision

- **Blockers found:** report them, stop. Do not create the PR. Tell the user to fix blockers and run `/ship` again.
- **Only warnings/suggestions:** create the PR and include the findings in the Notes section so the user sees them in GitHub.
- **All clear:** create the PR normally.

### 4 — Push and open PR

Push the branch:
```
git push -u origin <branch>
```

Then create the PR with `gh`:
```
gh pr create --base master \
  --title "<emoji> <English imperative title>" \
  --body "..."
```

PR body format:
```
## Resumen
<!-- 1-2 frases sobre qué se construyó y por qué -->

## Cambios principales
<!-- Viñetas: archivos clave, servicios, decisiones de diseño relevantes -->

## Cómo verificar
npm install
npm run lint
npm start
<!-- Pasos específicos para probar el feature -->

## Notas
<!-- Warnings del review, breaking changes, dependencias de otros PRs -->

---
*Rama: `<branch>` → `master`.*
```

### 5 — Done

Print the PR URL returned by `gh pr create` so the user can open it directly in GitHub.

If `gh` fails or is not found, output the full PR title, body, and compare URL ready to paste.
