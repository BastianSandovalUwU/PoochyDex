---
description: Create a pull request to master for this PoochyDex branch
---

Create a pull request for the current branch following PoochyDex conventions. Use `$ARGUMENTS` as an optional hint about what was built (e.g. `/create-pr Add shiny toggle`).

## Steps

1. Run these in parallel to understand the current state:
   - `git status` — uncommitted changes (never use -uall)
   - `git diff main...HEAD` — full diff vs master
   - `git log main...HEAD --oneline` — commits on this branch
   - `git branch --show-current` — current branch name

2. Analyze all commits and diffs. Do NOT summarize only the latest commit.

3. Draft the PR using the project template:

```
## Resumen
<!-- 1-2 frases sobre qué se construyó y por qué -->

## Cambios principales
<!-- Viñetas: archivos clave, servicios nuevos, decisiones de diseño relevantes -->

## Cómo verificar
```bash
npm install
npm run lint
npm start
```
<!-- Pasos específicos para verificar el feature -->

## Notas
<!-- Módulos afectados, dependencias, breaking changes si las hay -->

---
*Rama: `<branch>` → `master`.*
```

4. Push the branch if it has no remote yet (`git push -u origin <branch>`).

5. Create the PR with:
```
gh pr create --base master --title "<emoji> <English imperative title>" --body "$(cat <<'EOF'
<body>
EOF
)"
```

## Constraints

- PR title: emoji prefix + short English imperative (same convention as commits). Example: `✨ Add shiny toggle to Pokemon card`
- Target branch is always `master`
- Body in Spanish (matches existing template language)
- If `gh` is not authenticated or push fails, output the full commit message and PR body ready to paste, plus the compare URL

## Emoji guide for PR title

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
