# Format d'erreur cohérent

Utiliser un format d'erreur unique et cohérent dans toute l'API — ne pas introduire un nouveau
format pour un seul endpoint. Rechercher le format déjà utilisé (Skill `project-analysis`) avant
d'en proposer un.

## Éléments attendus dans une réponse d'erreur

- statut HTTP précis (voir `rest.md`)
- code d'erreur stable et documenté (pas seulement un message texte qui peut changer)
- message compréhensible, sans détail d'implémentation sensible (pas de stack trace, de requête
  SQL, de chemin serveur — voir Skill `security`)
- détails structurés pour les erreurs de validation (champ concerné, raison)

Exemple de structure (à adapter au format réellement utilisé par le projet) :

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "email", "reason": "must be a valid email address" }
    ]
  }
}
```

## Cohérence avec le frontend

Le frontend doit pouvoir distinguer par le code d'erreur les cas nécessitant un traitement
spécifique (ex: `EMAIL_ALREADY_EXISTS` vs erreur générique) — documenter ces codes dans
`frontend/docs/api/README.md`.
