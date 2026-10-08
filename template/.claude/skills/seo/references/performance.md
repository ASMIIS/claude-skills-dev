# Performance et Core Web Vitals

Seuils « bon » à atteindre au **75e percentile des données terrain** (CrUX / Search Console), mobile
d'abord ; les mesures labo (Lighthouse) servent à diagnostiquer, pas à valider.

| Métrique | Seuil bon | Leviers principaux |
|---|---|---|
| **LCP** | ≤ 2,5 s | image/titre héros dans le HTML initial, `fetchpriority="high"` + preload sur l'image LCP, jamais `loading="lazy"` dessus, TTFB bas (CDN, cache, SSR/SSG), CSS critique, pas de ressource bloquante |
| **INP** | ≤ 200 ms | découper les tâches JS longues, différer le JS non critique, limiter l'hydratation, éviter les handlers lourds, `content-visibility`, délocaliser les scripts tiers |
| **CLS** | ≤ 0,1 | `width`/`height` ou `aspect-ratio` sur images/vidéos/embeds, réserver l'espace des bannières/publicités/cookies, `font-display` + fallback métrique-compatible, pas d'insertion de contenu au-dessus du contenu existant |

(L'ancien FID est remplacé par INP.) Compléments : TTFB ≤ ~800 ms, FCP.

## Points concrets

- Images : AVIF/WebP, `srcset`/`sizes`, dimensions déclarées, lazy-loading hors écran initial.
- Polices : sous-ensemble, `woff2`, auto-hébergées si possible, `preload` des 1-2 critiques,
  `font-display: swap|optional`.
- JS : budget par page, code splitting, pas de bundle global pour une page statique ; scripts
  tiers (analytics, chat, pub, consentement) chargés en `async`/`defer`, après interaction si possible.
- Cache : `Cache-Control` immutable + noms fichiers hachés pour les assets ; compression Brotli/gzip ;
  HTTP/2 ou 3.
- Bannière cookies : ne doit ni décaler la mise en page ni bloquer le LCP (voir `legal-compliance`).
- Mesurer avant/après chaque optimisation (Skill `performance` → `references/measurement.md`),
  ne jamais optimiser « à l'intuition ».

Voir Skill `responsive-design` → performance mobile.
