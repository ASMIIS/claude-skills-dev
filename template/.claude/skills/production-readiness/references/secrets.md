# Secrets

## Identifier le mécanisme de la plateforme

Identifier comment la plateforme réelle du projet gère les secrets : secrets de plateforme
(dashboard/CLI), variables d'environnement classiques, gestionnaire de secrets dédié, secrets
CI/CD. Utiliser ce mécanisme plutôt qu'une solution générique importée d'un autre contexte.

## Règle absolue

Ne jamais committer : fichier `.env` contenant des valeurs réelles, secrets de production, clés
API, clés privées, mots de passe de base de données, secrets JWT, secrets OAuth. Voir aussi Skill
`security` et Skill `production-logging` (ne jamais logger un secret non plus).

## `.env.example`

Documenter les variables nécessaires dans `.env.example` (ou équivalent), en indiquant leur nom
et leur caractère requis/optionnel, **jamais leur valeur réelle** — voir aussi
`docs/operations/environments.md` qui suit la même règle (nom uniquement, `<required>`).

## Vérification

Lors d'un audit ou d'une modification touchant la configuration : vérifier qu'aucun secret n'est
présent en dur dans le code, qu'aucun `.env` réel n'est suivi par le contrôle de version
(`.gitignore` correctement configuré), et que `.env.example` reste à jour avec les variables
réellement utilisées par le code (ni en retard ni en avance).
