# Déploiement et rollback

## Déploiement

Vérifier : commande de build, commande de démarrage, commande d'installation, version du
runtime (Node/Python/Java/etc.), variables d'environnement de build vs runtime, health checks,
stratégie de migration au déploiement (Skill `database`), stratégie de déploiement. Identifier si
la plateforme effectue un déploiement automatique, manuel, basé sur Git, ou piloté par un
pipeline CI/CD (voir `docs/operations/deployment.md`).

## Rollback

Identifier les mécanismes réellement disponibles sur la plateforme : redéploiement d'une version
précédente, rollback instantané natif, revert Git suivi d'un redéploiement, stratégie
blue/green, canary, feature flag. Documenter le mécanisme réellement disponible plutôt que d'en
supposer un générique.

**Ne jamais supposer qu'un rollback applicatif résout une migration de base de données
incompatible** — un rollback du code vers une version antérieure peut échouer ou corrompre des
données si le schéma a déjà évolué de façon non rétrocompatible (voir Skill `database` →
`references/rollback.md`). Vérifier explicitement la compatibilité entre l'ancienne version du
code et le schéma actuel avant de considérer le rollback comme une solution suffisante.
