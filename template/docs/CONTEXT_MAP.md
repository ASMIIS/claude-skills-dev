# Context Map

> Carte synthétique tâche → contexte requis → Skills → références. Complète la matrice de routing
> de `CLAUDE.md` §9 avec des exemples concrets bout-en-bout. Reste volontairement synthétique —
> le détail vit dans les Skills eux-mêmes.

```
Composant frontend
→ PROJECT_CONTEXT.md (section Frontend)
→ ui-ux, accessibility, responsive-design
→ testing

Formulaire
→ ui-ux, accessibility (references/forms-and-errors.md)
→ testing

Modification d'API
→ PROJECT_CONTEXT.md (section APIs) + frontend/docs/api/README.md
→ api-contract, security
→ testing
→ contexte frontend si le contrat consommé change

Migration base de données
→ PROJECT_CONTEXT.md (section Database) + ADR liées au schéma concerné
→ database, security si données sensibles
→ testing

Nouvelle dépendance
→ dependencies, security
→ testing

Incident de sécurité
→ security + référence spécifique au problème détecté (pas toutes les références security)
→ incident-debugging si la cause n'est pas évidente
→ testing

Incident de production
→ incident-debugging, production-readiness, production-logging
→ security si une cause de sécurité est possible
→ contexte complet pertinent (Niveau 4 — voir CLAUDE.md §10)

Déploiement / configuration production
→ docs/PROJECT_CONTEXT.md (Production Topology) + docs/operations/deployment.md
→ production-readiness, production-logging, security

Sujet légal (données personnelles, cookies, IA, consommateurs)
→ docs/compliance/
→ legal-compliance, security
```

Ne pas charger le contexte d'une ligne non concernée par la tâche réelle — voir CLAUDE.md §10,
Context Tiers et Context Budget.
