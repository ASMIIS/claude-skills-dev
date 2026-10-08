# Metadata

## Title et description

- **Title** unique par page, ~50-60 caractères (tronqué au-delà d'environ 600 px), mot-clé/sujet
  principal en début, marque en fin (`Sujet — Marque`). Reflète l'intention et donne envie de cliquer.
- **Meta description** unique, ~120-160 caractères, résume la valeur réelle et incite au clic
  (verbe, bénéfice, preuve). Google peut la réécrire : ce n'est pas un facteur de classement,
  c'est un levier de CTR.
- Générés dynamiquement à partir du contenu réel pour les pages dynamiques (produit, article) ;
  jamais le même template pour toutes les pages ; pas de bourrage de mots-clés.
- `meta keywords` : inutile, ne pas ajouter.

## Directives robots (meta / X-Robots-Tag)

`noindex`, `nofollow`, `max-snippet`, `max-image-preview:large` (recommandé pour être éligible à
de grands aperçus d'image), `nosnippet`/`data-nosnippet` pour contrôler l'extraction (y compris
par les réponses IA de Google). Ne jamais laisser `noindex` par défaut dans un layout partagé.

## Open Graph / réseaux sociaux

`og:title`, `og:description`, `og:image` (≥ 1200×630, URL absolue, < ~5 Mo), `og:url`, `og:type`,
`og:site_name`, `og:locale` ; `twitter:card=summary_large_image` si pertinent. Valeurs fidèles au
contenu réel, pas une image par défaut trompeuse.

## Langue, viewport, icônes

`lang` sur `<html>` cohérent avec le contenu de chaque page ; viewport
`width=device-width, initial-scale=1` sans `user-scalable=no` (voir Skill `responsive-design`) ;
favicon (SVG/PNG ≥ 48 px) et `apple-touch-icon` ; `theme-color` optionnel.

## Contrôle

Aucun title/description dupliqué dans le site (vérifier par crawl), aucune valeur vide ou
placeholder (`Untitled`, `Lorem`), canonical présent (voir `technical-seo.md`).
