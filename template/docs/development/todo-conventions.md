# Convention TODO / FIXME / annotations de travail

> Ce fichier documente comment les agents (Claude Code) et les développeurs doivent utiliser les
> annotations de travail dans le code. Le projet peut utiliser l'extension VS Code **Todo Tree**
> pour les détecter et les afficher.

## Principe — non obligatoire

Ces annotations ne sont **pas obligatoires**. Elles doivent uniquement être ajoutées lorsqu'elles
apportent une information réellement utile pour : le développeur, Claude Code, les futurs
développeurs, le suivi d'un problème connu, une dette technique assumée, une amélioration
volontairement différée, ou une limitation connue.

**Ne jamais ajouter un TODO/FIXME artificiellement** simplement pour respecter cette convention.
Si une tâche est correctement terminée et qu'aucune action future pertinente n'est identifiée,
ne rien ajouter.

## Marqueurs utilisés

| Marqueur | Cas d'usage |
|---|---|
| `TODO` | Tâche pertinente volontairement laissée pour plus tard |
| `FIXME` | Problème connu, non corrigé dans le périmètre actuel |
| `XXX` | Point douteux ou risqué à revoir |
| `HACK` | Solution de contournement temporaire, à remplacer |
| `NOTE` | Information importante à ne pas oublier (contrainte, raison d'un choix) |

Priorité de lecture : `FIXME`/`XXX` (problème existant) avant `TODO` (travail futur planifié),
`HACK` signalant une dette explicite à surveiller, `NOTE` étant informatif sans action requise.

## Exigence de précision

Chaque annotation doit permettre de comprendre :
1. ce qui doit être fait ;
2. pourquoi cela doit être fait ;
3. éventuellement, dans quelles conditions cela pourra être fait.

**Éviter** :
```
// TODO: improve
// TODO: fix this
// FIXME: later
```

**Préférer** :
```typescript
// TODO: Ajouter la pagination lorsque l'API sera disponible.
// FIXME: Cette fonction ne gère pas encore le timeout réseau.
// HACK: Solution temporaire en attendant la migration du service.
// NOTE: Cette validation doit rester côté serveur.
```

## Comment éviter les annotations inutiles

- Ne pas transformer une checklist personnelle en TODO dans le code.
- Ne pas dupliquer un TODO déjà tracé dans `docs/features/<feature>.md` ou dans un outil de
  gestion de tickets externe — choisir un seul endroit de vérité et y renvoyer si besoin.
- Supprimer un TODO/FIXME dès qu'il devient obsolète ou est traité, plutôt que de le laisser
  s'accumuler.

## Utilisation par Claude Code

Claude Code peut :
- créer un `TODO` lorsqu'une tâche pertinente est volontairement laissée pour plus tard ;
- créer un `FIXME` lorsqu'un problème connu existe mais n'est pas corrigé dans le périmètre actuel ;
- supprimer un `TODO`/`FIXME` lorsqu'il est devenu obsolète ;
- mettre à jour une annotation lorsqu'elle n'est plus exacte ;
- signaler les `TODO`/`FIXME` rencontrés lors d'un `/audit-feature`.

Claude Code ne doit **jamais** :
- créer des TODO pour donner l'impression qu'une tâche reste à faire ;
- utiliser un TODO comme substitut à une implémentation nécessaire ;
- laisser volontairement une faille de sécurité sous forme de TODO ;
- utiliser un TODO pour justifier une fonctionnalité incomplète censée être terminée.

### Règle de sécurité — un TODO n'est jamais une mesure de sécurité

Une vulnérabilité identifiée ne doit jamais être simplement transformée en :
```
// TODO: fix security issue
```

- Si la sécurité est dans le périmètre de la tâche en cours : le problème doit être corrigé
  (voir Skill `security`), pas reporté.
- Si le problème est hors périmètre mais présente un risque réel : le signaler explicitement à
  l'utilisateur et, si pertinent, tracer le risque avec un `FIXME` précis ou dans la documentation
  dédiée (`docs/features/<feature>.md` → section Security considerations) — jamais un simple TODO
  silencieux.

## Où sont configurés les marqueurs (Todo Tree)

Avant de créer une configuration, vérifier si `.vscode/settings.json` existe déjà avec une
configuration Todo Tree (clé `todo-tree.general.tags` ou équivalent).

- Si une configuration existe déjà : ne pas l'écraser. La compléter uniquement si un marqueur
  utilisé par le projet n'y figure pas.
- Si aucune configuration n'existe et qu'elle est réellement nécessaire pour que les marqueurs
  `TODO`/`FIXME`/`XXX`/`HACK`/`NOTE` soient bien détectés et visibles dans VS Code via Todo Tree,
  proposer ou créer une configuration minimale dans `.vscode/settings.json`, par exemple :

```json
{
  "todo-tree.general.tags": ["TODO", "FIXME", "XXX", "HACK", "NOTE"],
  "todo-tree.highlights.customHighlight": {
    "FIXME": { "icon": "alert", "iconColour": "#e06c75" },
    "TODO": { "icon": "check", "iconColour": "#61afef" },
    "HACK": { "icon": "flame", "iconColour": "#e5c07b" },
    "XXX": { "icon": "issue-opened", "iconColour": "#c678dd" },
    "NOTE": { "icon": "note", "iconColour": "#98c379" }
  }
}
```

Adapter aux conventions déjà en place dans le projet plutôt que d'imposer ce template tel quel.
