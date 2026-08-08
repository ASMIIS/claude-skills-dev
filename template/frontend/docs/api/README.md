# API — contrat consommé par le frontend

> Documente les endpoints backend réellement consommés par ce frontend. Mis à jour dès qu'un
> endpoint est ajouté, modifié ou supprimé (voir Skill `documentation`). Le frontend ne doit
> jamais avoir à deviner le format d'une API.

Pour chaque endpoint, documenter :

```markdown
## METHOD /path

### Authentication
<!-- Requise ou non, mécanisme (Bearer token, session cookie...). -->

### Authorization
<!-- Permission/rôle requis si applicable. -->

### Request headers
<!-- Headers spécifiques requis. -->

### Path parameters
<!-- Paramètres dans l'URL. -->

### Query parameters
<!-- Paramètres de requête, optionnels/obligatoires. -->

### Request body
{
  "field": "type"
}

### Response
STATUS
{
  "field": "type"
}

### Errors
400  <!-- cas -->
401  <!-- cas -->
403  <!-- cas -->
404  <!-- cas -->
409  <!-- cas -->
422  <!-- cas -->
500  <!-- cas -->

### Validation rules
<!-- Règles de validation appliquées côté serveur sur les champs. -->
```

---

## Exemple

```markdown
## POST /api/users

### Authentication
Bearer token required.

### Request
{
  "email": "string",
  "name": "string"
}

### Response
201
{
  "id": "string",
  "email": "string",
  "name": "string"
}

### Errors
400  Validation error
401  Not authenticated
409  Email already exists
422  Unprocessable entity
500  Server error
```

<!-- Ajouter un bloc ## METHOD /path par endpoint réellement consommé par ce frontend. -->
