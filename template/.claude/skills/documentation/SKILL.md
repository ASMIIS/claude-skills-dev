---
name: documentation
description: Créer et maintenir à jour la documentation du projet — le fichier global docs/PROJECT_CONTEXT.md, les fiches par feature dans docs/features/, et la documentation des endpoints API consommés par le frontend. Utiliser ce Skill en fin de /add-feature et /modify-feature, et chaque fois qu'une modification change l'environnement du projet, ajoute/modifie un endpoint, ou fait évoluer une feature documentée.
---

# Documentation

## Objectif

Maintenir une documentation suffisamment précise pour qu'un nouvel agent (humain ou IA) puisse
comprendre le projet ou une feature sans avoir à reconstruire son historique à partir du code ou
du Git.

## 0. Structure complète et `/init-context`

La structure documentaire complète du projet (architecture, ADR, sécurité, opérations, workflow,
tests) est initialisée et maintenue via `/init-context` (`.claude/commands/init-context.md`), qui
combine analyse du repo et questions au développeur — elle ne doit jamais être inventée. Ce Skill
`documentation` gère la mise à jour au fil de l'eau (après chaque feature) ; `/init-context` gère
l'initialisation et les remises à niveau plus larges. Adapter le nombre de fichiers à la taille du
projet (CLAUDE.md §19) : pour un petit projet, regrouper dans `PROJECT_CONTEXT.md` plutôt que
créer toute l'arborescence `docs/architecture/`, `docs/security/`, `docs/operations/`.

## 1. `docs/PROJECT_CONTEXT.md` — vue d'ensemble du projet

Fichier unique, source de vérité globale (voir CLAUDE.md §15). La structure complète — y compris
la section Production Topology — est définie dans le fichier `docs/PROJECT_CONTEXT.md` lui-même
(s'il n'existe pas encore, le créer à partir du template livré avec ce kit, ne pas improviser une
structure différente).

Mettre à jour ce fichier lorsqu'une modification change l'environnement du projet : nouvelle
techno, changement d'architecture, nouvelle convention, nouvelle variable d'environnement
importante, changement de topologie de production, etc. Ne pas y dupliquer le détail d'une feature
— y renvoyer vers sa fiche dans `docs/features/`.

## 2. `docs/features/<feature>.md` — une fiche par feature importante

Chaque feature importante (au sens : elle a une logique métier propre, pas un simple utilitaire)
doit avoir son fichier, copié depuis `docs/features/_TEMPLATE.md` — c'est ce fichier qui définit
la structure complète (Purpose, Functional behavior, API, Data models, Security considerations,
Legal & Compliance, Notes for AI agents, etc.), ne pas en improviser une différente.

- **Files involved** — chemins réels, pas de description vague
- **API** — méthode/path des endpoints concernés, renvoyer vers la doc API détaillée si elle existe
- **Notes for AI agents** — pièges connus, décisions non évidentes, raisons de choix contre-intuitifs
- **TODO / FIX** — reporter ici les TODO/FIXME significatifs laissés dans le code
- **Legal & Compliance** — voir Skill `legal-compliance` ; écrire l'absence explicite de sujet
  plutôt que de remplir artificiellement si rien n'est identifié

Créer la fiche dès qu'une feature suffisamment importante est ajoutée. La mettre à jour à chaque
modification de la feature (`/modify-feature`, `/fix-feature`) — ne jamais laisser une fiche
devenir obsolète silencieusement.

## 3. Documentation API frontend (si frontend/backend séparés)

Voir aussi Skill `api-contract` pour la méthode de vérification de compatibilité avant toute
modification d'API.

Si le projet a un frontend et un backend séparés, documenter les endpoints consommés par le
frontend dans `frontend/docs/api/README.md` (ou équivalent) — ce fichier définit le format exact
à suivre par endpoint (méthode, path, auth, requête, réponse, erreurs, validation), ne pas en
improviser un différent. Mettre à jour dès qu'un endpoint est ajouté, modifié ou supprimé — le
frontend ne doit jamais avoir à deviner le format d'une API.

## 4. Décisions architecturales (ADR)

Pour toute décision architecturale importante (breaking change, choix structurant, migration
majeure — voir CLAUDE.md §3), créer une ADR dans `docs/architecture/decisions/` à partir de
`ADR-TEMPLATE.md` : contexte, décision, alternatives, conséquences, implications de sécurité.
Numéroter séquentiellement (`ADR-001-...`, `ADR-002-...`). Ne pas créer d'ADR pour une décision
mineure ou facilement réversible. Lister les ADR dans `docs/architecture/README.md`.

## 5. Documentation sécurité et opérations

`docs/security/README.md` (modèle d'auth/autorisation, rôles, conformité) et
`docs/operations/{environments,deployment,observability}.md` sont initialisés via
`/init-context` et mis à jour lorsqu'un changement modifie le modèle de sécurité, les
environnements, le pipeline CI/CD ou les pratiques d'observabilité. Ne jamais y faire figurer de
secret, mot de passe, token ou clé — uniquement le nom d'une variable et son caractère requis.
`docs/operations/deployment.md` est aussi la sortie principale du Skill `production-readiness`
(modèle d'hébergement réel, composants gérés par la plateforme vs par l'application).

## 6. Méthode

1. Après une modification, identifier ce qui a changé au niveau documentation : environnement
   global, feature spécifique, contrat API.
2. Mettre à jour uniquement ce qui a réellement changé — ne pas régénérer un fichier entier si
   une section suffit.
3. Vérifier que les références croisées entre fichiers restent cohérentes (un lien vers une fiche
   feature qui n'existe plus, une doc API qui référence un endpoint supprimé, etc.).
4. Si `docs/PROJECT_CONTEXT.md` ou une fiche feature n'existe pas encore alors qu'elle devrait,
   le signaler et proposer de la créer plutôt que de laisser un trou silencieux.
