# CLAUDE.md

Ce fichier définit les règles globales que Claude Code doit respecter dans ce projet.
Il ne doit contenir que l'essentiel : la connaissance détaillée vit dans les Skills et dans `docs/`.

> ⚠️ **À compléter après la première analyse du repository**, idéalement via `/init-context`.
> Les sections marquées `[À REMPLIR]` doivent être mises à jour dès la première utilisation, puis maintenues à jour.

---

## 1. Workflow et Quality Gates

Aucune modification de code ne doit être effectuée à partir d'une demande ambiguë. Le workflow
global est représenté par une série de gates séquentielles, chacune produisant un statut :

```
GATE 1 — Understanding        (Skill clarification)
GATE 2 — Analysis             (Skill project-analysis + §2 Change Impact Analysis)
GATE 3 — Planning             (Skill feature-development + §3 Risk Level)
GATE 4 — Implementation       (Skills spécialisés pertinents — voir §9 routing)
GATE 5 — Testing              (Skill testing)
GATE 6 — Security              (Skill security + legal-compliance/accessibility si pertinent)
GATE 7 — Review                (Skill code-review)
GATE 8 — Documentation         (Skill documentation)
GATE 9 — Production Readiness  (Skill production-readiness, si la tâche touche au déploiement)
```

Chaque gate produit un statut :

- **PASS** — rien à signaler, on passe à la gate suivante.
- **WARNING** — un problème est signalé mais ne bloque pas nécessairement la suite (ex:
  documentation légèrement incomplète, optimisation non critique, TODO technique, amélioration UX
  non bloquante). À rapporter clairement à l'utilisateur.
- **BLOCKED** — une situation critique empêche de continuer sans confirmation ou correction
  explicite. Voir §4 Stop Conditions pour la liste des situations qui déclenchent ce statut.

Ne jamais sauter une gate, même pour une demande qui semble simple — une demande courte n'est pas
une demande simple, c'est souvent une demande sous-spécifiée. Pour un changement mineur et évident
(renommage local, correction isolée), les gates restent traversées mais peuvent être rapides — la
gate n'est pas ignorée, elle est simplement vite validée.

## 2. Change Impact Analysis

Avant de planifier une modification (GATE 2), analyser explicitement sa portée réelle plutôt que
son périmètre apparent :

```
CHANGE → impact potentiel sur : Frontend, Backend, API, Database, Tests, Security,
Compliance, Documentation, Deployment, External services
```

Adapter cette liste à la tâche réelle — toutes les catégories ne sont pas pertinentes à chaque
fois. Exemples de chaînes d'impact à dérouler selon la nature du changement :

```
API       : Backend → Consumers → Frontend → Tests → Documentation → External integrations
Database  : Schema → ORM → Queries → API → Consumers → Migrations → Production
Frontend  : UI → Responsive → Accessibility → SEO si applicable → Tests
```

Cette analyse alimente directement le niveau de risque (§3) et la sélection des Skills (§9) — ne
pas la traiter comme une formalité séparée du plan produit par `feature-development`.

## 3. Risk Level, gestion des risques et Rollback Strategy

### Niveau de risque

Qualifier chaque changement significatif selon un niveau de risque justifié par son impact réel
— jamais déclaré arbitrairement :

| Niveau | Exemple | Workflow associé |
|---|---|---|
| `LOW` | Changer un texte UI | Modification + tests |
| `MEDIUM` | Ajouter une dépendance | Analyse + plan + tests |
| `HIGH` | Modifier une API publique | Analyse approfondie + plan détaillé + review |
| `CRITICAL` | Migration destructive | Analyse + plan + rollback strategy + confirmation humaine explicite |

Le niveau de risque découle de l'analyse d'impact (§2) et de la nature du changement (voir aussi
§17 Non-régression). Pour un changement à impact important, estimer : impact, probabilité, risque
résultant, mitigation possible, plan de rollback. Pour une décision architecturale importante,
documenter une ADR (`docs/architecture/decisions/`, template `ADR-TEMPLATE.md`) : contexte,
décision, alternatives, conséquences, implications de sécurité.

### Rollback Strategy

Toute modification `HIGH` ou `CRITICAL` doit considérer explicitement son rollback avant d'être
appliquée — ne pas inventer une procédure non supportée par l'environnement réel.

- **Code** — version précédente disponible, stratégie de redéploiement, stratégie de revert.
- **Database** — privilégier une séquence *expand → migrate → contract* plutôt qu'une migration
  immédiatement destructive lorsqu'une alternative rétrocompatible existe (voir Skill `database` →
  `references/rollback.md`).
- **API** — compatibilité ascendante, versionnage, fenêtre de compatibilité, migration des
  consommateurs, plan de rollback (Skill `api-contract` → `references/backward-compatibility.md`).
- **Infrastructure** — configuration précédente, déploiement précédent, procédure de restauration
  réellement disponible sur la plateforme (Skill `production-readiness`).

## 4. Stop Conditions et confirmation obligatoire

Claude doit interrompre son workflow et demander une décision humaine (statut `BLOCKED`) dans les
situations suivantes :

- deux interprétations fonctionnelles plausibles sans élément permettant de trancher ;
- une information critique reste `UNKNOWN` (voir §15) ;
- une modification ou migration destructive est nécessaire ;
- une perte de données est possible ;
- une API publique risque d'être cassée sans stratégie de migration ;
- un contrat externe (fournisseur, partenaire) est inconnu et impacté ;
- la cible de production est inconnue alors que la tâche la concerne ;
- une faille critique dont la correction implique une décision métier (pas seulement technique) ;
- une action réelle sur l'infrastructure de production est nécessaire ;
- une suppression de ressource importante ou une modification irréversible est en jeu ;
- suppression importante, changement d'architecture majeur, breaking change d'API, suppression de
  feature, changement de permissions, modification d'un mécanisme de sécurité, dépendance à
  impact important ;
- un test de sécurité actif (`/pentest-feature`) est demandé sans que la propriété/autorisation de
  la cible, l'environnement exact ou le périmètre soient établis avec certitude (voir Skill
  `security-testing` → `references/scope-and-authorization.md`).

**Une information `UNKNOWN` ne doit jamais être transformée silencieusement en `ASSUMED`** pour
contourner une Stop Condition. Dans ces situations, informer clairement l'utilisateur du blocage,
de la raison, et des options disponibles — puis attendre sa décision avant de continuer.

## 5. Git Safety — l'humain garde le contrôle de Git

**Cette règle est prioritaire sur toutes les autres règles de ce fichier.**

Claude peut lire et analyser librement : `git status`, `git diff`, `git log`, `git branch`,
`git show` — inspecter les branches, l'historique, détecter des changements non liés, signaler
des conflits potentiels, recommander une stratégie Git.

**Claude ne doit jamais exécuter automatiquement** une commande Git qui modifie l'historique, la
branche ou l'état de travail de façon significative — notamment : `commit`, `push`, `pull`,
`merge`, `rebase`, `reset` (dont `--hard`), `checkout`, `restore`, `clean`, `stash`,
`cherry-pick`, suppression de branche, création de tag, force push. Même si l'action semble
évidente, sans risque, ou "logique après la tâche effectuée", Claude ne prend pas la main sur ce
workflow.

```
Claude → analyse Git → informe l'utilisateur → propose éventuellement une action
→ l'utilisateur décide → l'utilisateur exécute Git
```

Si l'utilisateur demande explicitement une action Git dans son message, Claude peut expliquer les
commandes à utiliser, mais ne les exécute que si l'instruction est explicite et porte
spécifiquement sur cette action — une instruction générale ("fais le nécessaire") ne vaut pas
autorisation d'exécuter des commandes Git modifiant l'état du dépôt.

Si des modifications non liées à la tâche sont détectées dans l'espace de travail (fichiers
modifiés, staging non vide) : les identifier, ne jamais les écraser ni les annuler, signaler
qu'elles peuvent interférer avec la tâche en cours plutôt que de les "nettoyer" automatiquement.

## 6. Definition of Done

Une tâche n'est terminée que lorsque les vérifications **pertinentes** ont été effectuées — la
règle est de vérifier ce qui est pertinent, jamais d'exiger artificiellement toutes les cases pour
chaque tâche :

```
[ ] Code implémenté
[ ] Impact analysé (§2)
[ ] Tests ajoutés
[ ] Tests existants exécutés
[ ] Sécurité vérifiée
[ ] Accessibilité vérifiée si frontend
[ ] Responsive vérifié si frontend
[ ] SEO vérifié si page indexable
[ ] Contrat API mis à jour si nécessaire
[ ] Migrations/documentation base de données vérifiées si nécessaire
[ ] Conformité légale vérifiée si nécessaire
[ ] Documentation mise à jour
[ ] TODO/FIX documentés si nécessaire
[ ] Impact production vérifié si pertinent
[ ] Rollback strategy identifiée si le changement est HIGH/CRITICAL (§3)
```

Cette checklist est indicative, pas un formulaire à remplir mécaniquement — voir aussi
`docs/development/definition-of-done.md` pour la version adaptée à ce projet.

## 7. Commandes disponibles

| Commande | Rôle |
|---|---|
| `/init-context` | Initialise/reconstruit la connaissance complète du projet (`--audit` = rapport seul) |
| `/clarify-feature` | Lève les ambiguïtés d'une demande avant tout code |
| `/add-feature` | Ajoute une nouvelle fonctionnalité (workflow complet, toutes les gates) |
| `/modify-feature` | Modifie une fonctionnalité existante sans régression |
| `/fix-feature` | Corrige un bug : cause racine, test de non-régression, correction |
| `/audit-feature` | Audit lecture seule d'une feature (bugs, sécurité, dette, doc) |
| `/audit-project` | Audit lecture seule du projet entier, Executive Summary + Health Report |
| `/review-ui` | Audit + correction du frontend entier (DA, UX, accessibilité, responsive) |
| `/review-responsive` | Audit + correction focalisés sur le responsive (mobile/tablette/desktop) |
| `/audit-compliance` | Audit légal/réglementaire du projet entier (France/UE), lecture seule |
| `/review-compliance-feature` | Implications légales d'une feature précise, avant ou après implémentation |
| `/audit-logs` | Audit du système de logs/observabilité — configuration, niveaux, secrets, correlation IDs |
| `/context-audit` | Audit lecture seule de l'efficacité de contexte du kit lui-même (taille, duplications, chargement) |
| `/production-ready` | Vérifie si le projet est prêt pour la production réelle, corrige ce qui est sûr |
| `/pentest-feature` | Test de sécurité **actif**, autorisé et borné, contre une cible explicitement désignée — rapport seul, ne corrige rien |
| `/update-kit` | Met à jour `.claude/skills/` et `.claude/commands/` vers la dernière version du kit (jamais `CLAUDE.md`/`docs/`) |

Organisation logique de ces commandes : **Context** (`/init-context`, `/clarify-feature`) —
**Build** (`/add-feature`, `/modify-feature`, `/fix-feature`) — **Audit** (`/audit-feature`,
`/audit-project`, `/audit-compliance`, `/audit-logs`, `/context-audit`) — **Review** (`/review-ui`,
`/review-responsive`, `/production-ready`) — **Security active** (`/pentest-feature`, à part :
nécessite une cible et une autorisation explicites, contrairement aux audits lecture-seule
ci-dessus qui portent sur le code du projet courant) — **Maintenance du kit** (`/update-kit`, à
part : agit sur les fichiers du kit lui-même, pas sur le code du projet).

`/add-feature`, `/modify-feature`, `/fix-feature` et `/production-ready` supportent un argument
`--plan` : Claude produit l'analyse complète (clarification, impact, Skills nécessaires, fichiers
concernés, risques, tests prévus, documentation impactée, rollback strategy si pertinent) puis
**s'arrête** — aucune modification de code, aucun changement Git, aucun déploiement. Ce mode sert
à faire valider une stratégie par l'utilisateur avant exécution.

Ne pas créer de nouvelle commande d'audit spécialisée (`/audit-api`, `/audit-database`,
`/audit-performance`, ...) : ces responsabilités sont couvertes par `/audit-feature` et
`/audit-project`, qui sélectionnent eux-mêmes les Skills pertinents — voir §9. `/pentest-feature`
n'est pas un audit de ce type : c'est un test **actif** nécessitant une cible et une autorisation
explicites (gate dédiée), ce qu'`/audit-feature`/`/audit-project` ne couvrent pas. `/update-kit`
n'est pas non plus un audit : c'est une opération de maintenance sur les fichiers génériques du
kit (`.claude/skills/`, `.claude/commands/`), jamais sur `CLAUDE.md`/`docs/` qui restent
spécifiques au projet — voir §5 : cette commande ne committe/ne push jamais automatiquement.

## 8. Skills disponibles

Les 20 Skills sont des unités indépendantes dans `.claude/skills/`, organisées ici en catégories
logiques (classification, pas une réorganisation physique des dossiers) :

**Core** — s'appliquent à presque toute tâche :

| Skill | Quand l'utiliser |
|---|---|
| `clarification` | Avant toute implémentation non triviale |
| `project-analysis` | Avant toute modification, pour comprendre l'existant |
| `feature-development` | Orchestrateur : planifie, sélectionne les Skills spécialisés pertinents, implémente |
| `testing` | Après toute modification de code |
| `code-review` | Avant de considérer une modification terminée |
| `documentation` | Après toute modification, pour maintenir la doc à jour |

**Engineering** — activés selon la nature technique de la tâche :

| Skill | Quand l'utiliser |
|---|---|
| `security` | Sur toute modification touchant données, auth, entrées utilisateur, fichiers, réseau |
| `security-testing` | Uniquement via `/pentest-feature` — test actif et autorisé contre une cible explicitement désignée, jamais implicite |
| `api-contract` | Sur toute modification d'une API, d'un endpoint, d'un webhook, d'un événement ou d'un contrat frontend/backend |
| `database` | Sur toute modification de schéma, migration, requête, index, modèle, relation, contrainte ou transaction |
| `dependencies` | Avant d'ajouter, remplacer ou mettre à jour une dépendance |
| `incident-debugging` | Pour un bug complexe, une régression, une erreur de production ou un comportement inexpliqué |
| `performance` | Sur toute tâche où la performance frontend, backend, base de données ou infrastructure est en jeu — jamais d'optimisation par intuition seule |

**Frontend** — activés quand la tâche touche l'interface :

| Skill | Quand l'utiliser |
|---|---|
| `ui-ux` | Sur toute tâche touchant le frontend (page, composant, formulaire, navigation) — qualité UX |
| `accessibility` | Sur toute tâche touchant le frontend — accessibilité technique (WCAG, ARIA, clavier, focus, lecteurs d'écran) |
| `responsive-design` | Sur toute création/modification d'interface — mobile, tablette, desktop, large desktop |
| `seo` | Sur les pages destinées à être indexées par les moteurs de recherche (jamais sur une app privée) |

**Production** — activés quand la tâche touche l'exploitation en production :

| Skill | Quand l'utiliser |
|---|---|
| `production-readiness` | Sur toute tâche touchant déploiement, config production, secrets, stockage persistant, workers/cron, monitoring, domaines — jamais de modèle d'infra supposé |
| `production-logging` | Observabilité applicative — logs, métriques, traces, correlation ID, health checks, error tracking, alertes ; évite la multiplication d'outils |

**Compliance** :

| Skill | Quand l'utiliser |
|---|---|
| `legal-compliance` | Sur toute tâche touchant données personnelles, cookies, prospection, IA, ou consommateurs (France/UE) — jamais de certification juridique, toujours distinguer du technique |

`ui-ux`, `accessibility` et `legal-compliance` ont des responsabilités distinctes même lorsqu'ils
se recoupent sur le frontend : `ui-ux` juge la qualité UX, `accessibility` l'accessibilité
technique, `legal-compliance` les obligations légales. **Une conformité légale n'est jamais une
garantie d'accessibilité complète**, et inversement. Les trois peuvent partager leurs constats
(ex: un problème de contraste est à la fois `accessibility` et potentiellement `legal-compliance`
si une obligation légale d'accessibilité s'applique) sans que l'un se substitue à l'autre.

Chaque Skill est autonome et référence les autres uniquement quand nécessaire — éviter la
duplication de règles. Avant de créer un nouveau Skill, démontrer qu'il a une responsabilité
indépendante, un workflow spécifique, des critères de validation propres et une valeur
réutilisable — qui ne peuvent pas être résolus par une référence d'un Skill existant, une
commande, ou une règle d'orchestration dans ce fichier.

## 9. Routing — quels Skills activer

**Ne jamais dérouler les 20 Skills systématiquement.** `feature-development` (et les commandes
d'audit) sélectionnent uniquement les Skills pertinents pour la tâche réelle, à partir de cette
matrice indicative — à adapter au contexte réel, pas appliquée mécaniquement :

| Nature de la tâche | Skills activés |
|---|---|
| Frontend UI | `ui-ux` → `accessibility` → `responsive-design` si pertinent → `seo` si page indexable |
| Page publique / stratégie SEO-GEO | `seo` (stratégie → contenu → technique → mesure) → `ui-ux` → `responsive-design` → `performance` |
| Auth / session / login / reset / CORS / en-têtes | `security` (références anti-abus, sessions, transport) → `testing` → `production-logging` |
| Formulaire | `ui-ux` → `accessibility` → `testing` |
| Navigation | `ui-ux` → `accessibility` → `responsive-design` → `testing` |
| API / endpoint | `api-contract` → `security` → `testing` |
| Base de données / migration | `database` → `security` → `testing` |
| Nouvelle dépendance | `dependencies` → `security` → `testing` |
| Performance frontend | `performance` → `ui-ux` si UX concernée → `responsive-design` si mobile concerné → `seo` si pertinent |
| Performance backend | `performance` → `database` si DB concernée → `api-contract` si contrat impacté → `testing` |
| Performance base de données | `performance` → `database` |
| Déploiement / infra / config prod | `production-readiness` → `production-logging` → `security` |
| Bug / comportement inexpliqué | `incident-debugging` → `testing` → `code-review` |
| Données personnelles / cookies / IA | `legal-compliance` → `security` |
| Test de sécurité actif demandé (`/pentest-feature`) | `security-testing` (gate d'autorisation d'abord) → `security` pour le détail des classes testées |

Exemple : une modification CSS active `ui-ux`, `accessibility`, `responsive-design` si pertinent,
`testing`, `code-review` — jamais `database`, `api-contract`, `legal-compliance`, `dependencies`
ou `seo` sans raison réelle. Ne pas activer `accessibility` pour une tâche backend sans impact
frontend. Le Core (`clarification`, `project-analysis`, `feature-development`, `testing`,
`code-review`, `documentation`) s'applique presque toujours ; les Skills
Engineering/Frontend/Production/Compliance ne s'activent que si la tâche les concerne réellement.

## 10. Context Engineering — charger le minimum suffisant

**Objectif : le plus petit ensemble de contexte permettant de prendre une décision correcte, sûre
et vérifiable — pas le contexte minimal à tout prix.** Ne jamais optimiser le contexte au
détriment de la sécurité, de la correction, des tests, de la conformité, de l'intégrité des
données, de la sûreté de production, du contrôle humain (§5), ou des Stop Conditions (§4) — si une
optimisation risque de faire oublier une règle critique, ne pas l'appliquer.

### Principe — charger sur besoin, pas par défaut

**Ne jamais charger un document uniquement parce qu'il existe — le charger parce que la tâche le
requiert.** Exemple : "corriger le padding d'un bouton mobile" charge `project-analysis`, `ui-ux`,
`responsive-design`, `testing` et le composant concerné — jamais `database`, `legal-compliance`,
`production-readiness` ni l'historique complet des ADR.

### Context Budget — quatre niveaux

| Niveau | Contexte | Exemple |
|---|---|---|
| 0 — Minimal | `CLAUDE.md`, tâche courante, fichiers concernés | Corriger un texte, un style isolé |
| 1 — Simple | + contexte projet pertinent, 1-3 Skills, code concerné | Petite feature isolée |
| 2 — Medium | + 3-6 Skills, documentation et tests pertinents | Feature avec impact modéré |
| 3 — Complex | + architecture, contrats, tests, contexte production si pertinent | Feature à impact large, changement HIGH (§3) |
| 4 — Critical | Contexte complet, chargé uniquement quand nécessaire | Incident sécurité/production, migration majeure, changement compliance-critique, breaking change d'API |

Ne jamais charger le niveau supérieur par défaut — le niveau se détermine par l'analyse d'impact
(§2) et le niveau de risque (§3), pas par prudence excessive.

### Context Tiers

```
TIER 0 — Always     : CLAUDE.md, demande utilisateur courante
TIER 1 — Project     : PROJECT_CONTEXT.md, architecture, conventions pertinentes
TIER 2 — Task        : contexte de la feature, plan courant, fichiers affectés, contrats concernés
TIER 3 — Specialist   : Skills réellement concernés (voir routing §9)
TIER 4 — Deep Reference : références détaillées d'un Skill, ADR spécifiques, documentation très ciblée
```

Ne jamais charger un Tier supérieur lorsque les Tiers inférieurs suffisent déjà à la décision.

### Progressive disclosure

Chaque Skill suit la même structure à deux niveaux : `SKILL.md` contient les règles essentielles
(quand l'activer, responsabilités, workflow, stop conditions, sortie attendue) et reste
consultable rapidement ; `references/` contient le détail, chargé uniquement quand le sujet
précis qu'elle couvre est concerné. Si un Skill a plusieurs références (ex: `security` a des
sous-sujets injection/XSS/IDOR...), ne charger que celle(s) réellement pertinente(s) pour le
problème détecté — pas l'ensemble du dossier `references/` par réflexe.

### Routing par profondeur

```
L0 — Detect     : identifier la nature de la tâche
L1 — Analyze    : Skill(s) et référence(s) pertinents identifiés
L2 — Implement  : exécution avec le contexte Tier 2-3
L3 — Audit      : relecture, vérifications croisées
L4 — Deep investigation : contexte Tier 4, réservé aux situations Niveau 4/CRITICAL
```

Une tâche simple s'arrête généralement à L0-L2. Un incident de sécurité ou de production peut
légitimement atteindre L4 — la profondeur suit la nature réelle de la tâche, jamais un réflexe
systématique.

### Context Pruning et Stop Charging

Pendant une tâche longue, réévaluer périodiquement ce qui reste pertinent : `STILL RELEVANT` /
`NO LONGER RELEVANT` / `SUPERSEDED` / `DUPLICATED` / `COMPLETED`. Dès qu'un Skill ou une référence
n'est plus utile à l'étape courante (ex: la migration de base de données est terminée et
validée), cesser de le porter dans le contexte actif — sauf si les tests ou la review en ont
encore besoin. Ne jamais continuer à transporter le contexte d'étapes déjà terminées et
validées.

### Compression plutôt que narration

Quand une analyse devient longue, la réduire à l'essentiel exploitable — résumé, décisions,
risques, inconnues, prochaine étape — plutôt que de conserver le raisonnement complet qui y a
mené. Ne jamais compresser au point de perdre une information critique (secret détecté, risque
CRITICAL, décision de sécurité).

### Contexte de tâche persistant — `docs/.context/`

Pour une tâche complexe ou longue, utiliser des fichiers courts et synthétiques (jamais des logs
qui s'accumulent — ils sont réécrits, pas complétés indéfiniment) : `docs/.context/CURRENT_TASK.md`,
`CURRENT_PLAN.md`, `CURRENT_DECISIONS.md`, `CURRENT_RISKS.md`, `ACTIVE_CONTEXT.md`. Voir les
templates fournis dans `docs/.context/`. Une décision déjà validée (`CURRENT_DECISIONS.md`) ne
doit pas être redemandée à l'utilisateur tant qu'elle reste valide — voir §15 K/I/A/U.

### Source de vérité — ne jamais dupliquer, toujours référencer

Quand un Skill ou une commande a besoin d'une règle globale déjà définie ailleurs (sécurité, Git
Safety, Definition of Done...), il y renvoie (`voir CLAUDE.md §X` ou `voir Skill security`) plutôt
que de la recopier. Une nuance spécifique à un Skill reste dans ce Skill ; la règle générale
elle-même n'a qu'une seule source.

### Outil d'audit

`/context-audit` (lecture seule) mesure la taille structurelle du kit et détecte les duplications,
le contenu toujours chargé qui pourrait être différé, et les références jamais utilisées — voir
`.claude/commands/context-audit.md`. Toute mesure produite est une **estimation structurelle**
(lignes/mots/caractères), jamais présentée comme une consommation réelle de tokens sauf mesure
réelle disponible.

### Règles d'or

1. Ne jamais charger un contexte uniquement parce qu'il existe.
2. Charger le minimum suffisant, pas le minimum absolu.
3. Préférer une référence à une duplication.
4. Préférer un chargement différé à un contenu toujours chargé.
5. Préférer un état concis à un récit historique complet.
6. Ne pas transporter inutilement le contexte d'une étape déjà terminée.
7. Ne pas charger un Skill non lié à la tâche.
8. Ne pas charger une référence non liée au problème détecté.
9. Ne jamais optimiser les tokens au détriment de la sécurité ou de la correction.
10. Le code actuel prime toujours sur le contexte historique.
11. Une information doit être invalidée quand sa source change (code, config, archi, dépendance,
    déploiement, API, décision remplacée).
12. L'efficacité de contexte signifie moins de contexte non pertinent — jamais moins de
    raisonnement.

## 11. Architecture du projet `[À REMPLIR]`

```
[À REMPLIR après analyse — stack, frontend/backend, dossiers principaux]
```

Voir `docs/PROJECT_CONTEXT.md` pour le détail complet (source de vérité).

## 12. Commandes techniques importantes `[À REMPLIR]`

```bash
# install
# dev
# lint
# typecheck
# test
# build
```

## 13. Conventions `[À REMPLIR]`

Voir `docs/PROJECT_CONTEXT.md` → sections "Coding conventions" / "Naming conventions".
Ne pas réinventer une convention : chercher un exemple existant dans le code avant de choisir un style.

## 14. Règles de sécurité — non négociables

- Toute donnée venant du client (body, query, params, headers, fichiers, cookies) est **non fiable**
  tant qu'elle n'est pas validée côté serveur, même si une validation existe côté frontend.
- Ne jamais committer de secret, clé, token ou mot de passe.
- Toute modification touchant auth, permissions, accès aux données ou upload de fichiers doit
  utiliser le Skill `security` avant d'être considérée terminée.
- Tout endpoint qui vérifie un secret (login, reset, OTP, API key) est limité en tentatives
  (par compte **et** par IP), répond sans révéler l'existence du compte et ne crée pas de
  verrouillage permanent exploitable. Ne jamais retirer ni affaiblir une telle protection.
- Sessions : cookie `HttpOnly` + `Secure` + `SameSite`, identifiant régénéré à l'authentification,
  invalidation côté serveur (logout, reset, changement de mot de passe), expiration idle + absolue.
- Transport : HTTPS/HSTS partout, jamais de vérification TLS désactivée, CORS en liste blanche,
  protection CSRF sur les requêtes modifiant l'état.
- Ces protections sont **re-vérifiées à chaque modification** touchant auth/session/réseau et à
  chaque audit (Skill `security` → `references/verification-checklist.md`), avec preuve (code lu,
  test, réponse réelle) — jamais sur déclaration.
- En cas de doute sérieux sur une implication de sécurité : **arrêter et signaler** (§4 Stop
  Conditions), ne pas deviner.
- Une amélioration de documentation, d'architecture ou de méthodologie ne doit jamais affaiblir la
  sécurité réelle du projet (auth, autorisation, validation des entrées, encodage des sorties,
  gestion des secrets, CORS, CSRF, XSS, injection, IDOR, rate limiting, sécurité des logs,
  sécurité des dépendances, protection des données).

Détail complet : `.claude/skills/security/SKILL.md`.

## 15. Source de vérité — hiérarchie

En cas de contradiction entre plusieurs sources d'information sur le projet, l'ordre de confiance
est le suivant, du plus fiable au moins fiable :

```
1. Code réellement exécuté
2. Configuration réellement utilisée
3. Contrats réellement exposés (API, schéma de base de données)
4. Documentation spécialisée (docs/features/, docs/security/, docs/operations/, docs/compliance/...)
5. docs/PROJECT_CONTEXT.md
6. CLAUDE.md
```

**La documentation ne peut jamais être considérée comme plus fiable que la réalité du code ou de
la configuration.** Si une documentation contredit le code observé : détecter la contradiction,
la signaler, identifier laquelle des deux sources reflète la réalité (généralement le code), puis
corriger la documentation dans le même changement — jamais après coup.

Chaque information importante a par ailleurs une source de vérité **unique** parmi les fichiers de
`docs/` (voir §16) — ne jamais dupliquer un même contenu dans plusieurs fichiers ; si une
information doit être référencée depuis un autre endroit, y mettre un lien vers sa source plutôt
qu'une copie.

## 16. Known / Inferred / Assumed / Unknown

Pour toute information sur le projet qui n'est pas directement lue dans le code ou confirmée
explicitement par l'utilisateur, qualifier son niveau de certitude :

```
KNOWN     — vérifié directement dans le code, la configuration, ou confirmé par l'utilisateur
INFERRED  — déduit avec un bon niveau de confiance à partir d'éléments concrets observés
ASSUMED   — hypothèse plausible mais non vérifiée, à confirmer si elle devient importante
UNKNOWN   — information non déterminable à partir de ce qui est disponible
```

Exemples : `KNOWN — Production = Vercel` (lu dans la config) ; `INFERRED — le backend semble
utiliser PostgreSQL` (déduit d'un `pg` dans les dépendances) ; `ASSUMED — la région de production
semble être EU` (à confirmer) ; `UNKNOWN — politique exacte de rétention des backups`.

**Une information `UNKNOWN` ne doit jamais être transformée silencieusement en `ASSUMED`.** Pour
toute information critique (sécurité, données personnelles, production, décision irréversible),
si elle est `UNKNOWN` ou `ASSUMED`, c'est une Stop Condition (§4) : poser la question à
l'utilisateur plutôt que de procéder sur cette base. Pour une information non critique, une
hypothèse `ASSUMED` explicitement signalée comme telle est acceptable pour avancer.

## 17. Documentation — emplacements

- `docs/INDEX.md` — recherche rapide sujet → document faisant autorité (voir §10)
- `docs/CONTEXT_MAP.md` — carte synthétique tâche → contexte → Skills → références
- `docs/.context/` — contexte de tâche court et réécrit (pas un log) pour les tâches complexes :
  `CURRENT_TASK.md`, `CURRENT_PLAN.md`, `CURRENT_DECISIONS.md`, `CURRENT_RISKS.md`,
  `ACTIVE_CONTEXT.md`
- `docs/PROJECT_CONTEXT.md` — vue d'ensemble du projet, y compris sa Production Topology (source
  de vérité globale)
- `docs/architecture/README.md` + `docs/architecture/decisions/ADR-*.md` — architecture et
  décisions structurantes (une ADR par décision architecturale importante)
- `docs/features/<feature>.md` — une fiche par feature importante
- `docs/development/workflow.md` — conventions Git, review, release
- `docs/development/testing.md` — stratégie et commandes de test du projet
- `docs/development/performance.md` — objectifs et constats de performance du projet
- `docs/development/accessibility.md` — niveau d'accessibilité visé et constats du projet
- `docs/development/risk-management.md` — exemples réels de classification de risque pour ce projet
- `docs/development/definition-of-done.md` — Definition of Done adaptée à ce projet
- `docs/development/todo-conventions.md` — convention des annotations `TODO`/`FIXME`/`XXX`/`HACK`/`NOTE`
  (non obligatoires, à utiliser seulement quand pertinent — jamais comme mesure de sécurité)
- `docs/security/README.md` — modèle d'authentification/autorisation, rôles, conformité (jamais de secret)
- `docs/security/pentest-log.md` — historique des tests de sécurité actifs (`/pentest-feature`),
  constats et suivi de remédiation (jamais de secret réel, même partiel)
- `docs/seo/README.md` — stratégie SEO/GEO du projet (intentions, pages, KPI, décisions crawlers IA) ;
  source de vérité pour le Skill `seo`, seulement si le projet a des pages publiques à indexer
- `docs/operations/environments.md`, `deployment.md`, `observability.md` — environnements, CI/CD,
  monitoring ; `deployment.md` est aussi la sortie principale du Skill `production-readiness`
- `frontend/docs/api/README.md` (ou équivalent) — contrat des endpoints consommés par le frontend, si applicable
- `frontend/docs/design-system/README.md` (ou emplacement équivalent) — Direction Artistique et
  règles UI/UX réelles du frontend ; source de vérité pour le Skill `ui-ux` et `/review-ui`
- `docs/compliance/` (`README.md`, `privacy.md`, `cookies.md`, `data-retention.md`,
  `third-parties.md`, `compliance-checklist.md`) — si le projet traite des données personnelles ;
  source de vérité pour le Skill `legal-compliance`. Ne produit jamais de certification juridique.

Cette structure est générée/maintenue via `/init-context` — voir `.claude/commands/init-context.md`.
**Adapter à la taille réelle du projet** : pour un petit projet, ne pas créer tous ces fichiers
séparément, regrouper dans `PROJECT_CONTEXT.md` (voir §18). Si deux documents en viennent à
décrire la même information, choisir une source de vérité unique et transformer l'autre en simple
renvoi — ne jamais laisser deux documents faire autorité sur le même sujet. Avant de créer un
fichier dans `docs/development/`, vérifier qu'aucun fichier existant ne couvre déjà la même
responsabilité — enrichir l'existant plutôt que dupliquer.

## 18. Non-régression et compatibilité ascendante

| Modification | Rechercher systématiquement |
|---|---|
| API / endpoint | tous les consommateurs (frontend, autres services, tests) |
| Modèle de données | toutes les utilisations (requêtes, sérialisation, validations) |
| Permission | tous les chemins d'accès à la ressource concernée |
| Composant frontend partagé | tous les endroits où il est utilisé |
| Schéma base de données | migrations, compatibilité descendante, données existantes |

Avant de modifier une API, un schéma de base de données, un type partagé, un événement ou une
interface publique : rechercher tous les usages existants. Quand c'est possible, privilégier une
évolution progressive plutôt qu'une rupture immédiate :

```
Changement rétrocompatible → migration → bascule des consommateurs → suppression de l'ancien comportement
```

## 19. Enterprise-grade, pas Enterprise-bloat

Appliquer les pratiques professionnelles (traçabilité, sécurité, tests, documentation, review,
observabilité, gestion des erreurs et des changements, maintenabilité, SOLID, DRY, KISS,
séparation des responsabilités, moindre privilège, défense en profondeur) au niveau réellement
nécessaire pour la taille et la criticité du projet — jamais uniquement parce qu'une pratique est
perçue comme "enterprise". Avant d'introduire une solution, toujours dérouler : besoin réel →
risque → coût → complexité → maintenance. Un petit projet n'a pas besoin de douze documents, huit
pipelines ou quatre niveaux d'approbation uniquement parce qu'une grande entreprise pourrait les
utiliser — les principes restent les mêmes, leur formalisme s'adapte à l'échelle du projet.

## 20. Principes généraux

Comprendre avant d'agir. Questionner plutôt que deviner une décision métier importante. Inspecter
avant de modifier. Réutiliser l'existant plutôt que créer une nouvelle abstraction redondante.
Minimiser les changements. Tester systématiquement (jamais prétendre qu'un test a été exécuté s'il
ne l'a pas été). Documenter. La sécurité et la fiabilité priment sur la vitesse.

La sécurité n'est pas limitée au Skill `security` : chaque Skill intègre ses propres vérifications
de sécurité dans son périmètre (permissions et données exposées pour une feature, validation et
exposition pour une API, protections non fiables côté frontend seul, injections et migrations pour
la base de données, type/taille/chemin pour un fichier uploadé, sessions/expiration pour l'auth,
absence de secret dans les logs et dans la configuration de déploiement).

**Claude est autonome dans son travail de développement — analyse, plan, code, tests, review,
documentation — mais jamais autonome dans les décisions qui appartiennent à l'humain : le contrôle
de Git (§5) et les Stop Conditions (§4).**
