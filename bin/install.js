#!/usr/bin/env node
/**
 * Copie le kit méthodologique Claude Code (CLAUDE.md, .claude/, docs/, frontend/docs/)
 * dans le repository courant.
 *
 * Ne modifie JAMAIS un fichier déjà présent dans le projet cible : en cas de conflit,
 * le fichier est ignoré et listé en fin d'exécution pour fusion manuelle.
 */
const fs = require("fs");
const path = require("path");

const TEMPLATE_DIR = path.join(__dirname, "..", "template");
const TARGET_DIR = process.cwd();
const DRY_RUN = process.argv.includes("--dry-run");

let copied = 0;
let skipped = [];

function copyRecursive(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      if (fs.existsSync(destPath)) {
        skipped.push(path.relative(TARGET_DIR, destPath));
        continue;
      }
      if (!DRY_RUN) {
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.copyFileSync(srcPath, destPath);
      }
      copied++;
    }
  }
}

console.log(`\nInstallation du kit méthodologique Claude Code dans : ${TARGET_DIR}`);
if (DRY_RUN) console.log("(mode --dry-run : aucune écriture réelle)\n");

copyRecursive(TEMPLATE_DIR, TARGET_DIR);

console.log(`\n${copied} fichier(s) copié(s).`);

if (skipped.length) {
  console.log(`\n${skipped.length} fichier(s) déjà présent(s) — NON écrasé(s) :`);
  for (const f of skipped) console.log(`  - ${f}`);
  console.log(
    "\nCes fichiers existaient déjà dans le projet. Comparez-les manuellement avec la\n" +
      "version du kit (voir node_modules/claude-code-methodology/template/ ou le repo source)\n" +
      "et fusionnez ce qui est pertinent — rien n'a été écrasé automatiquement."
  );
}

if (!DRY_RUN) {
  console.log(
    "\nProchaine étape : ouvrez Claude Code dans ce projet et lancez /init-context\n" +
      "pour analyser le repository réel et compléter CLAUDE.md + docs/PROJECT_CONTEXT.md.\n"
  );
}
