---
description: Start a new feature, fix, or task on a fresh branch before writing any code
---

Start a new branch for the work described in `$ARGUMENTS`. Always run this before writing any code.

## Steps

1. Make sure the working tree is clean:
   ```
   git status
   ```
   If there are uncommitted changes, warn the user and stop — do not create a branch over dirty state.

2. Pull latest master:
   ```
   git checkout master && git pull origin master
   ```

3. Infer the branch prefix from `$ARGUMENTS`:

   | Keywords in description | Prefix |
   |------------------------|--------|
   | fix, bug, error, broken, crash | `fix/` |
   | refactor, clean, extract, move | `refactor/` |
   | style, ui, css, layout, design | `style/` |
   | docs, readme, agents, claude | `docs/` |
   | chore, config, tooling, deps, env | `chore/` |
   | test, spec, coverage | `test/` |
   | i18n, translation, lang, idioma | `i18n/` |
   | anything else (new feature, add, implement, create) | `feature/` |

4. Build the branch name:
   - Take the first 4–6 meaningful words from `$ARGUMENTS`
   - Lowercase, replace spaces and special chars with `-`
   - Prefix with the inferred type
   - Example: "Add shiny toggle to Pokemon card" → `feature/add-shiny-toggle-pokemon-card`

5. Create and switch to the branch:
   ```
   git checkout -b <branch-name>
   ```

6. Confirm to the user:
   ```
   Branch created: <branch-name>
   Ready to work. Run /ship when done to review and open the PR.
   ```

## Constraints
- Never create a branch if already on a non-master branch with uncommitted work — ask first.
- Never use generic names like `feature/changes` or `fix/bug`. The name must reflect `$ARGUMENTS`.
