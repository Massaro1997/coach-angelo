#!/usr/bin/env bash
# Vercel - Ignored Build Step
#
# Da incollare in: Vercel > Project > Settings > Git > Ignored Build Step
#   bash scripts/vercel-ignore-build.sh
#
# Convenzione Vercel (contro-intuitiva):
#   exit 0 = SALTA la build  (non consuma build minutes)
#   exit 1 = ESEGUI la build
#
# Perche' esiste: ad agosto 2026 l'account ha bruciato 17.508 CPU-minuti di
# build ($42,84) su ~690 deploy. Una fetta era fatta di deploy che non
# cambiavano nulla di pubblicato (documentazione, registri, appunti).
set -uo pipefail

msg="${VERCEL_GIT_COMMIT_MESSAGE:-}"

# Override espliciti, hanno la precedenza su tutto.
case "$msg" in
  *"[deploy]"*|*"[force build]"*)
    echo "override [deploy] -> build"; exit 1 ;;
  *"[skip build]"*|*"[skip ci]"*)
    echo "override [skip build] -> salto"; exit 0 ;;
esac

# Primo commit o clone shallow senza padre: non so cosa e' cambiato, build.
if ! git rev-parse HEAD^ >/dev/null 2>&1; then
  echo "nessun commit padre -> build"; exit 1
fi

changed=$(git diff --name-only HEAD^ HEAD)
if [ -z "$changed" ]; then
  echo "nessun file cambiato -> salto"; exit 0
fi

# File che non finiscono mai nell'output del sito.
# NB: esclude i .md solo alla radice. I .md dentro content/ sono contenuto
# pubblicato e devono far ripartire la build.
rilevanti=$(printf '%s\n' "$changed" | grep -Ev \
  '^(docs/|REGISTRO|registro/|\.claude/|\.vscode/|\.github/|[^/]*\.md$|[^/]*\.ps1$|\.gitignore$|LICENSE)' || true)

if [ -z "$rilevanti" ]; then
  echo "solo documentazione/appunti -> salto la build"
  printf '%s\n' "$changed" | sed 's/^/  - /'
  exit 0
fi

echo "file rilevanti cambiati -> build"
printf '%s\n' "$rilevanti" | head -20 | sed 's/^/  + /'
exit 1
