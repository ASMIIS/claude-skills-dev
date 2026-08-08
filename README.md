# claude-code-methodology — installeur

Ce petit package copie le kit méthodologique (`CLAUDE.md`, `.claude/skills/`,
`.claude/commands/`, `docs/`, `frontend/docs/`) dans le repository courant, sans jamais écraser un
fichier déjà présent.

## Option A — sans rien publier (le plus simple)

1. Mettez ce dossier (`npm-installer/`) dans un repo Git (public ou privé), par exemple
   `github.com/votre-compte/claude-code-methodology`.
2. Dans n'importe quel projet, à sa racine :

```bash
npx github:votre-compte/claude-code-methodology
```

`npx` télécharge le repo, exécute `bin/install.js`, copie les fichiers, et ne garde rien
d'installé après (pas de `node_modules`, pas de dépendance ajoutée à votre projet). Aucune
publication sur le registre npm n'est nécessaire.

Pour un repo privé, `npx` fonctionne aussi si votre `git`/SSH local a déjà accès au repo :
```bash
npx github:votre-compte/claude-code-methodology#main
```

## Option B — publier sur npm (nom court, découvrable)

```bash
cd npm-installer
npm login
npm publish --access public   # ou private si vous avez un compte payant / registre d'entreprise
```

Ensuite, dans n'importe quel projet :

```bash
npx claude-code-methodology
```

À faire une seule fois. Toute mise à jour du kit nécessite de republier une nouvelle version
(`npm version patch && npm publish`).

## Option C — script local, sans npm du tout

Si vous ne voulez ni GitHub public ni compte npm : gardez simplement `template/` quelque part
(clé USB, dossier partagé, repo interne) et copiez-le à la main ou via un script shell :

```bash
cp -r /chemin/vers/template/. ./
```

C'est strictement équivalent à ce que fait `bin/install.js`, sans passer par npm/npx.

## Ce que fait vraiment ce package

- Il ne s'installe pas dans le projet (pas de `node_modules`, pas d'entrée dans
  `package.json` du projet cible).
- Il copie une fois, puis n'a plus aucun rôle — Claude Code lit directement les fichiers copiés,
  il n'a pas besoin de Node.js ni de ce package pour fonctionner ensuite.
- `--dry-run` : `npx github:votre-compte/claude-code-methodology --dry-run` pour voir ce qui
  serait copié sans rien écrire.

## Mise à jour du kit dans un projet existant

Ré-exécuter la commande ne touchera aucun fichier déjà présent (donc ne réappliquera pas les
mises à jour automatiquement) — c'est volontaire, pour ne jamais écraser vos adaptations locales
de `CLAUDE.md`/`docs/`. Pour les Skills/Commands génériques (`.claude/skills/`,
`.claude/commands/`), qui eux ne contiennent rien de spécifique au projet, vous pouvez les
supprimer puis relancer l'installeur pour les remettre à jour, ou les gérer en global (voir plus
bas).

## Alternative : installer une fois pour tous vos projets

Si le contenu de `.claude/skills/` et `.claude/commands/` est générique (ce qui est le cas ici),
vous n'êtes pas obligé de le réinstaller à chaque repo. Claude Code lit aussi un dossier global
utilisateur :

```bash
npx github:votre-compte/claude-code-methodology --global
```

(à ajouter dans `bin/install.js` si vous voulez cette option — non implémentée par défaut ici ;
sinon copiez simplement `template/.claude/skills/*` et `template/.claude/commands/*` vers
`~/.claude/skills/` et `~/.claude/commands/` une bonne fois pour toutes). Seuls `CLAUDE.md` et
`docs/` restent à générer par projet via `/init-context`, puisqu'ils sont spécifiques à chaque
repository.
