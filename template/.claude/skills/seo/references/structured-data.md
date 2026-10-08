# Structured Data

JSON-LD (schema.org) dans le HTML initial, généré depuis les mêmes données que le contenu affiché.

## Règle absolue

Le balisage doit refléter le contenu **réellement visible** : jamais de note, nombre d'avis, prix,
disponibilité, FAQ ou auteur fictif ou absent de la page. Pratique trompeuse = action manuelle
possible et, selon le cas, infraction (voir Skill `legal-compliance` → `consumer-law.md`).

## Types utiles par contenu

| Contenu | Type | Notes |
|---|---|---|
| Site / marque | `Organization` (+ `logo`, `sameAs`), `WebSite` | Base de l'entité (GEO) |
| Navigation | `BreadcrumbList` | Reflète le fil d'Ariane visible |
| Article / blog | `Article`/`BlogPosting` | `author` (`Person`/`Organization`), `datePublished`, `dateModified`, `image` |
| Produit | `Product` + `Offer` (+ `AggregateRating` réel) | Prix/devise/disponibilité = ceux affichés |
| Logiciel / app | `SoftwareApplication` | Seulement si critères d'éligibilité respectés |
| Établissement local | `LocalBusiness` | NAP identique à la page et à Google Business Profile |
| Événement | `Event` | Dates/lieu réels |
| Vidéo | `VideoObject` | Miniature, durée, description |
| Emploi | `JobPosting` | Retirer l'offre expirée |
| FAQ | `FAQPage` | Les rich results FAQ sont limités par Google à quelques sites d'autorité ; garder la FAQ **visible** pour l'utilisateur et le GEO, balisage optionnel |

Types dépréciés ou sans rich result (ex. `HowTo`) : ne pas ajouter dans l'espoir d'un affichage.

## Entités reliées

Utiliser `@id` stables pour relier `Organization`, `WebSite`, `Article` (publisher/author) et
`Person` (`sameAs` vers profils officiels). Cohérence du nom de marque entre balisage, page À propos
et profils externes.

## Validation

Syntaxe JSON valide, propriétés requises du type présentes, aucune erreur dans le Rich Results
Test / Schema Markup Validator / rapport Search Console. Ne pas échapper incorrectement le JSON
(injecter du contenu utilisateur dans le JSON-LD = risque XSS : sérialiser via `JSON.stringify` et
neutraliser `</script>` — voir Skill `security`).
