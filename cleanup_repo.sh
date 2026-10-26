#!/usr/bin/env bash
# Limpia el repo patitas-veterinarias: deja de versionar node_modules, .next, .DS_Store,
# __pycache__ y logs, y agrega .gitignore + README.md. NO borra nada de tu disco.
# Uso: ejecutarlo desde la raíz de tu clon:   bash cleanup_repo.sh
set -euo pipefail

[ -d .git ] || { echo "Ejecutá este script desde la raíz del repo (donde está la carpeta .git)."; exit 1; }
[ -z "$(git status --porcelain)" ] || { echo "Tenés cambios sin commitear. Hacé commit o stash primero."; exit 1; }

git checkout -b limpieza-repo

# 1) Dejar de versionar archivos generados (se mantienen en tu disco)
git rm -r -q --cached --ignore-unmatch \
  vet-app-es/node_modules vet-app-es/.next vet-app-es/tsconfig.tsbuildinfo vet-app-es/next-env.d.ts \
  patitas-veterinarias-main/__pycache__ patitas-veterinarias-main/patitas_sanas.log
git ls-files | grep -E '(^|/)\.DS_Store$' | xargs -r git rm -q --cached

# 2) Agregar .gitignore y README (los archivos .gitignore y README.md deben estar junto a este script)
HERE="$(cd "$(dirname "$0")" && pwd)"
cp "$HERE/.gitignore" .gitignore
cp "$HERE/README.md" README.md

# 3) El README del backend se llamaba README-4.md: renombrarlo
[ -f patitas-veterinarias-main/README-4.md ] && git mv patitas-veterinarias-main/README-4.md patitas-veterinarias-main/README.md

git add .gitignore README.md
git commit -q -m "chore: dejar de versionar node_modules/.next/.DS_Store, agregar .gitignore y README"

echo
echo "Listo. Archivos versionados ahora: $(git ls-files | wc -l)"
echo "Para publicar:  git push -u origin limpieza-repo   (y mergear el PR en GitHub)"
