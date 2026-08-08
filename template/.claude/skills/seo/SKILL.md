---
name: seo
description: Vérifier et améliorer le référencement naturel des pages destinées à être indexées par les moteurs de recherche — technical SEO, metadata, structured data, rendu SSR, performance, contenu. Utiliser ce Skill uniquement pour les pages publiques destinées à l'indexation, jamais pour un dashboard, un espace authentifié ou une application privée qui n'a pas vocation à être indexée.
---

# SEO

## Périmètre — ne pas appliquer aveuglément

Ce Skill s'applique aux pages/sites dont certaines parties sont destinées à être indexées par les
moteurs de recherche (site vitrine, blog, pages produit publiques, landing pages). Il ne
s'applique **pas** à une application privée, un dashboard, ou un espace authentifié qui n'a pas
vocation à être indexé — vérifier le contexte réel avant de dérouler la checklist SEO sur une
page qui n'en a pas besoin.

## Technical SEO

Vérifier, lorsque pertinent : `robots.txt`, `sitemap.xml`, URLs canoniques, statuts HTTP corrects,
redirections (301 pour permanent, pas 302 par erreur), gestion des 404, HTTPS, structure d'URL
cohérente et lisible, absence de contenu dupliqué non maîtrisé, indexabilité (meta robots),
crawlabilité (liens suivables, pas uniquement du JS non rendu pour la navigation principale).

## Metadata

Vérifier : title (unique et pertinent par page), meta description, canonical, Open Graph,
metadata Twitter/X lorsque pertinent, langue déclarée, viewport. Les metadata doivent être
pertinentes et générées dynamiquement lorsqu'elles dépendent du contenu réel de la page — pas une
valeur statique identique sur toutes les pages.

## Structured data

Lorsque pertinent pour le type de contenu (produit, article, organisation, FAQ...), vérifier
l'utilisation correcte de données structurées adaptées. **Ne jamais ajouter de données
structurées mensongères** (ex: notes/avis fictifs) — c'est à la fois une pratique trompeuse et un
risque de pénalité.

## SSR / Rendering

Pour les frameworks concernés, vérifier que les pages devant être indexées sont correctement
rendues pour les moteurs de recherche. Identifier les problèmes potentiels liés au rendu
côté client, à l'hydratation, au contenu chargé dynamiquement après le premier rendu, aux états de
chargement qui pourraient être indexés à la place du contenu réel.

## Performance

Le SEO doit être considéré conjointement avec la performance, l'accessibilité, le responsive et
l'UX (Skills `ui-ux`, `responsive-design`) — pas isolément. Vérifier notamment : Core Web Vitals,
poids des pages, optimisation des images, chargement des polices, volume de JavaScript, temps de
chargement perçu.

## Contenu

Vérifier : hiérarchie de titres cohérente (un seul `h1` pertinent par page, `h2`/`h3` structurés),
contenu réellement unique par page, présence de liens internes pertinents, texte accessible aux
moteurs (pas uniquement dans une image ou une vidéo sans alternative), URLs cohérentes avec le
contenu. **Ne jamais générer artificiellement du contenu uniquement pour manipuler les moteurs de
recherche** (keyword stuffing, contenu dupliqué généré en masse).

## Références détaillées

- `references/technical-seo.md` — robots.txt, sitemap, redirections, indexabilité
- `references/metadata.md` — title, description, Open Graph
- `references/structured-data.md` — données structurées par type de contenu
- `references/accessibility.md` — collaboration avec `ui-ux`/`responsive-design`
- `references/performance.md` — Core Web Vitals et poids des pages

## Méthode

1. Vérifier que la page/le périmètre concerné est réellement destiné à l'indexation.
2. Dérouler les sections pertinentes de la checklist ci-dessus selon la nature de la tâche.
3. Croiser avec `ui-ux` et `responsive-design` pour l'accessibilité et la performance.
4. Ne jamais sacrifier l'expérience utilisateur réelle à une optimisation SEO artificielle.
