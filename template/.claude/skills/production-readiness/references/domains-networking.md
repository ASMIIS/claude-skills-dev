# Domaines et réseau

Vérifier : configuration du domaine personnalisé, DNS, HTTPS (généralement fourni automatiquement
par un PaaS moderne — ne pas le recréer manuellement sans besoin), redirections, CORS, cookies
(domaine, `SameSite`, `Secure`), callbacks OAuth, endpoints de webhooks.

## Cohérence entre environnements

Toutes les URLs (API, callbacks OAuth, webhooks, CORS autorisé) doivent être cohérentes et
correctement configurées pour chacun des environnements réels du projet — développement, staging,
production — voir `docs/operations/environments.md`. Une URL de callback ou une origine CORS
codée en dur pour la production casse silencieusement le développement/staging et inversement.

## Webhooks entrants

Pour les webhooks reçus par l'application (paiement, service tiers), vérifier que l'URL est
stable et accessible publiquement dans l'environnement concerné, que la vérification de signature
est en place (voir Skill `security`), et que le comportement en cas de duplication/retry du
fournisseur est géré (idempotence).
