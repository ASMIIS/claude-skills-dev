#!/usr/bin/env node
/**
 * Copie le kit méthodologique Claude Code (CLAUDE.md, .claude/, docs/, frontend/docs/)
 * dans le repository courant.
 *
 * Mode install (par défaut) : ne modifie JAMAIS un fichier déjà présent dans le projet cible —
 * en cas de conflit, le fichier est ignoré et listé en fin d'exécution pour fusion manuelle.
 *
 * Mode --update : met à jour uniquement les fichiers génériques du kit (.claude/skills/ et
 * .claude/commands/), qui ne sont pas censés être édités dans le projet — ils sont donc
 * écrasés par la dernière version du kit. Tout le reste (CLAUDE.md, docs/, frontend/docs/)
 * reste un fichier spécifique au projet : jamais écrasé, même en --update.
 */
const fs = require("fs");
const path = require("path");

const TEMPLATE_DIR = path.join(__dirname, "..", "template");
const TARGET_DIR = process.cwd();
const DRY_RUN = process.argv.includes("--dry-run");
const UPDATE = process.argv.includes("--update");

// Dossiers génériques du kit : seuls ceux-ci sont écrasés en mode --update.
const UPDATABLE_DIRS = [
  path.join("template", ".claude", "skills"),
  path.join("template", ".claude", "commands"),
];

function isUpdatable(relPath) {
  return UPDATABLE_DIRS.some((dir) => relPath === dir || relPath.startsWith(dir + path.sep));
}

let added = [];
let updated = [];
let unchanged = [];
let skipped = [];

function copyRecursive(srcDir, destDir) {
  if (!DRY_RUN) fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    const relFromRoot = path.relative(path.join(__dirname, ".."), srcPath);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
      continue;
    }

    const destExists = fs.existsSync(destPath);

    if (!destExists) {
      if (!DRY_RUN) {
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.copyFileSync(srcPath, destPath);
      }
      added.push(path.relative(TARGET_DIR, destPath));
      continue;
    }

    // Le fichier existe déjà dans le projet cible.
    if (UPDATE && isUpdatable(relFromRoot)) {
      const same = fs.readFileSync(srcPath).equals(fs.readFileSync(destPath));
      if (same) {
        unchanged.push(path.relative(TARGET_DIR, destPath));
      } else {
        if (!DRY_RUN) fs.copyFileSync(srcPath, destPath);
        updated.push(path.relative(TARGET_DIR, destPath));
      }
      continue;
    }

    // Hors périmètre --update (ou mode install normal) : jamais écrasé.
    skipped.push(path.relative(TARGET_DIR, destPath));
  }
}

console.log(`\nInstallation du kit méthodologique Claude Code dans : ${TARGET_DIR}`);
if (UPDATE) {
  console.log(
    "(mode --update : met à jour .claude/skills/ et .claude/commands/ ; CLAUDE.md, docs/ et\n" +
      " frontend/docs/ restent spécifiques au projet et ne sont jamais écrasés)"
  );
}
if (DRY_RUN) console.log("(mode --dry-run : aucune écriture réelle)\n");

copyRecursive(TEMPLATE_DIR, TARGET_DIR);

console.log(`\n${added.length} fichier(s) ajouté(s).`);
if (UPDATE) {
  console.log(`${updated.length} fichier(s) mis à jour (.claude/skills/, .claude/commands/).`);
  if (updated.length) {
    console.log("Fichiers mis à jour :");
    for (const f of updated) console.log(`  - ${f}`);
  }
  console.log(`${unchanged.length} fichier(s) déjà à jour (inchangés).`);
}

if (skipped.length) {
  const label = UPDATE
    ? `${skipped.length} fichier(s) spécifique(s) au projet — NON touché(s) (CLAUDE.md, docs/, frontend/docs/) :`
    : `${skipped.length} fichier(s) déjà présent(s) — NON écrasé(s) :`;
  console.log(`\n${label}`);
  for (const f of skipped) console.log(`  - ${f}`);
  if (!UPDATE) {
    console.log(
      "\nCes fichiers existaient déjà dans le projet. Comparez-les manuellement avec la\n" +
        "version du kit (voir node_modules/claude-code-methodology/template/ ou le repo source)\n" +
        "et fusionnez ce qui est pertinent — rien n'a été écrasé automatiquement."
    );
  }
}

if (!DRY_RUN) {
  if (UPDATE) {
    console.log(
      "\nSkills et Commands à jour. CLAUDE.md et docs/ n'ont pas été modifiés automatiquement :\n" +
        "si cette version du kit a changé une règle ou une section de CLAUDE.md (voir le CHANGELOG\n" +
        "ou le diff du repo source), reportez manuellement ce qui est pertinent pour ce projet.\n" +
        "Lancez `git diff` pour voir précisément ce qui a changé avant de committer.\n"
    );
  } else {
    console.log(
      "\nProchaine étape : ouvrez Claude Code dans ce projet et lancez /init-context\n" +
        "pour analyser le repository réel et compléter CLAUDE.md + docs/PROJECT_CONTEXT.md.\n"
    );
  }
}
