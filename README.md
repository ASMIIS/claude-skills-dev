# claude-code-methodology

Kit méthodologique pour [Claude Code](https://claude.com/claude-code) : un `CLAUDE.md`, 19 Skills et 14 Commands qui transforment Claude Code en agent de développement méthodique — il comprend une demande, analyse l'existant, planifie, implémente, teste, sécurise, documente et garde l'humain aux commandes des décisions qui lui appartiennent.

## Pourquoi ce kit — la logique de réflexion

L'idée de base : **Claude ne doit jamais coder à partir d'une demande ambiguë, ni charger plus de contexte que nécessaire, ni prendre seul les décisions qui appartiennent à l'humain.**

Concrètement, chaque tâche traverse une série de **Quality Gates** :

Understanding → Analysis → Planning → Implementation → Testing
→ Security → Review → Documentation → Production Readiness


Chaque gate renvoie `PASS`, `WARNING`, ou `BLOCKED`. Un `BLOCKED` déclenche une **Stop Condition** — Claude s'arrête et demande une décision humaine plutôt que de deviner (information critique inconnue, migration destructive, faille de sécurité, action réelle sur la production, etc.).

Autres principes structurants :

- **Routing intelligent** — une tâche n'active jamais les 19 Skills par défaut. Une modif CSS déclenche `ui-ux`/`accessibility`/`responsive-design`/`testing`, jamais `database` ni `legal-compliance`.
- **Context Engineering** — Claude charge le minimum de contexte suffisant (pas le minimum absolu) : les `SKILL.md` restent courts et orientés décision, le détail vit dans `references/` chargées seulement quand le sujet précis est concerné.
- **Git Safety** — Claude analyse `git status`/`diff`/`log` librement, mais n'exécute **jamais** `commit`, `push`, `pull`, `merge`, `rebase`, `reset`, `checkout`, etc. L'humain garde la main sur Git.
- **Source de vérité unique** — en cas de doute : code réel > configuration > contrats exposés > doc spécialisée > `PROJECT_CONTEXT.md` > `CLAUDE.md`.
- **KNOWN / INFERRED / ASSUMED / UNKNOWN** — toute information incertaine est qualifiée ; un `UNKNOWN` critique n'est jamais transformé silencieusement en hypothèse.
- **Enterprise-grade, pas Enterprise-bloat** — les bonnes pratiques s'appliquent au niveau réellement nécessaire pour le projet, jamais par réflexe "pro".

## Les 19 Skills

**Core** — s'appliquent à presque toute tâche :

| Skill | Rôle |
|---|---|
| `clarification` | Lève les ambiguïtés d'une demande avant tout code |
| `project-analysis` | Analyse l'existant avant toute modification |
| `feature-development` | Orchestrateur : sélectionne les Skills pertinents, planifie, implémente |
| `testing` | Tests de régression + de la nouveauté |
| `code-review` | Relecture classée par sévérité (CRITICAL → INFO) |
| `documentation` | Maintient toute la documentation à jour |

**Engineering** :

| Skill | Rôle |
|---|---|
| `security` | Checklist de vulnérabilités (injection, XSS, IDOR, secrets...) |
| `api-contract` | Traite une API comme un contrat : consommateurs, versionnage, compatibilité |
| `database` | Migrations, performance, transactions, intégrité, rollback |
| `dependencies` | Ajout/mise à jour de dépendances, sécurité supply chain, licences |
| `incident-debugging` | Investigation méthodique d'un bug complexe ou d'un incident |
| `performance` | Frontend/backend/DB/infra — jamais d'optimisation par intuition seule |

**Frontend** :

| Skill | Rôle |
|---|---|
| `ui-ux` | Qualité UX : cohérence, Direction Artistique, composants existants |
| `accessibility` | Accessibilité technique : WCAG, ARIA, clavier, focus, lecteurs d'écran |
| `responsive-design` | Mobile first : layout, tactile, typographie, composants responsive |
| `seo` | Uniquement pour les pages destinées à l'indexation, jamais une app privée |

**Production** :

| Skill | Rôle |
|---|---|
| `production-readiness` | Jamais de modèle d'infra supposé (PaaS/cloud/serverless/K8s...) |
| `production-logging` | Observabilité : logs, métriques, traces, health checks, alertes |

**Compliance** :

| Skill | Rôle |
|---|---|
| `legal-compliance` | RGPD, cookies, consommation, IA (France/UE) — jamais de certification juridique |

## Les 14 Commands

| Commande | Rôle |
|---|---|
| `/init-context` | Initialise/reconstruit la connaissance du projet (`--audit` = rapport seul) |
| `/clarify-feature` | Lève les ambiguïtés d'une demande |
| `/add-feature` | Ajoute une fonctionnalité (workflow complet, supporte `--plan`) |
| `/modify-feature` | Modifie une fonctionnalité existante sans régression (`--plan`) |
| `/fix-feature` | Corrige un bug à la cause racine (`--plan`) |
| `/audit-feature` | Audit lecture seule d'une feature |
| `/audit-project` | Audit lecture seule du projet entier, Executive Summary + Health Report |
| `/review-ui` | Audit + correction du frontend (DA, UX, accessibilité, responsive) |
| `/review-responsive` | Audit + correction focalisés sur le responsive |
| `/audit-compliance` | Audit légal/réglementaire du projet |
| `/review-compliance-feature` | Implications légales d'une feature précise |
| `/audit-logs` | Audit de l'observabilité (logs, métriques, alertes) |
| `/context-audit` | Audit lecture seule de l'efficacité de contexte du kit lui-même |
| `/production-ready` | Vérifie/prépare la mise en production réelle (`--plan`) |

## Installation dans un projet

Depuis la racine de n'importe quel repository :

```bash
npx github:ASMIIS/claude-skills-dev
```

Ça copie `CLAUDE.md`, `.claude/skills/`, `.claude/commands/`, `docs/` et `frontend/docs/` dans le projet — rien n'est installé de façon permanente (pas de `node_modules`, pas de dépendance ajoutée), et **aucun fichier déjà présent n'est écrasé**.

Mode simulation (rien n'est écrit) :

```bash
npx github:ASMIIS/claude-skills-dev --dry-run
```

## Initialiser le contexte du projet

Une fois les fichiers copiés, ouvrez Claude Code dans le projet et lancez :

/init-context


Cette commande analyse le repository réel (stack, architecture, tests, CI/CD, sécurité, topologie de production...), pose uniquement les questions dont la réponse n'est pas déductible du code, puis complète `CLAUDE.md` et `docs/PROJECT_CONTEXT.md` avec le contexte réel du projet — jamais de secret ni de donnée sensible demandé.

Elle peut être relancée à tout moment pour mettre à jour le contexte, ou avec `/init-context --audit` pour un rapport sans modification.

## Usage courant

/clarify-feature <description> # demande floue → questions ciblées
/add-feature <description> # nouvelle fonctionnalité, workflow complet
/modify-feature <description> # modification sans régression
/fix-feature <description> # bug → cause racine → correctif + test
/audit-project # état de santé du projet, lecture seule
/production-ready # readiness production, lecture seule + corrections sûres


## Installer une fois pour tous vos projets (optionnel)

`.claude/skills/` et `.claude/commands/` sont génériques — vous pouvez les installer une seule fois dans votre dossier global Claude Code plutôt que projet par projet :

```bash
npx github:ASMIIS/claude-skills-dev
cp -r .claude/skills/*   ~/.claude/skills/
cp -r .claude/commands/* ~/.claude/commands/
```

Seuls `CLAUDE.md` et `docs/` restent à générer par projet via `/init-context`, puisqu'ils sont spécifiques à chaque repository.