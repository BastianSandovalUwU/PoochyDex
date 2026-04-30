---
description: Review pull request changes against PoochyDex conventions before merging to master
---

Review the pending changes on this branch (or PR number passed as `$ARGUMENTS`) against PoochyDex conventions. Report issues grouped by severity: **blocker**, **warning**, **suggestion**.

## Setup

If `$ARGUMENTS` is a PR number, fetch the diff with:
```
gh pr diff $ARGUMENTS
gh pr view $ARGUMENTS
```

Otherwise review the current branch vs master:
```
git diff master...HEAD
git log master...HEAD --oneline
```

## Checklist

### Angular conventions
- [ ] No standalone components — project uses NgModules
- [ ] New shared elements are declared and exported in `SharedModule`
- [ ] Navigation uses `routerLink`, not `<a href>` (would cause full reload + lose audio state)
- [ ] No new UI libraries introduced when Angular Material or `shared` components already solve the need

### Buttons
- [ ] UI actions use `app-ui-button` (`UiButtonComponent`), not raw `<button class="...">` or direct `mat-raised-button`
- [ ] If a new variant is needed, it was added to `UiButtonComponent` in `shared/ui-button/`, not inlined per view

### Animations
- [ ] Route components and top-level containers with `*ngIf` data guard use `detailFadeInAnimations` + `[@detailFadeIn]`
- [ ] Sub-components, modals, tabs, cells do NOT force `detailFadeIn` (only top-level shells need it)

### i18n
- [ ] All identifiers, comments, and non-UI strings are in **English**
- [ ] Every user-visible string has both **Spanish and English** variants driven by `LanguageService` (`currentLanguage$ / 'es' | 'en'`)
- [ ] No new UI text hardcoded to a single language

### Security
- [ ] No secrets or API keys committed — env vars go in `.env` / `NODE_JS_API` → `generate-env.js`
- [ ] No `innerHTML` or `DomSanitizer.bypassSecurityTrust*` without documented justification
- [ ] External links include `rel="noopener noreferrer"` with `target="_blank"`
- [ ] No tokens, passwords, or personal data logged to the console

### Docs sync
- [ ] If module routes or responsibilities changed → corresponding `.cursor/rules/module-<name>.mdc` updated
- [ ] If HTTP endpoints were added or changed → `docs/api-services.md` updated
- [ ] If architecture or cross-module flows changed → `AGENTS.md` updated

### Commits
- [ ] Every commit starts with an emoji + short English imperative description

## Output format

Report findings as:

```
## Review — <branch or PR>

### Blockers
- [file:line] Issue description

### Warnings
- [file:line] Issue description

### Suggestions
- [file:line] Issue description

### Looks good
- <items that specifically follow conventions correctly, worth noting>
```

If everything passes, say so clearly. Do not invent issues.
