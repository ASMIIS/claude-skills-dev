# Règles responsive — implémentation CSS/HTML

Valeurs par défaut à utiliser quand le projet n'a pas de convention (sinon suivre le design
system / framework en place — jamais de breakpoints inventés en plus).

## 1. Fondations

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
Jamais `user-scalable=no` / `maximum-scale=1`. `box-sizing: border-box` global. Mobile first :
styles de base = mobile, puis `@media (min-width: …)` pour élargir (pas de `max-width` en cascade
inverse, sauf exception justifiée).

## 2. Breakpoints par défaut (si non définis)

| Nom | min-width | Cible |
|---|---|---|
| base | 0 | téléphone (≥ 320 px) |
| sm | 640 px | grand téléphone / paysage |
| md | 768 px | tablette |
| lg | 1024 px | petit desktop / tablette paysage |
| xl | 1280 px | desktop |
| 2xl | 1536 px | large desktop (contenu plafonné via `max-width`) |

Choisir un breakpoint **quand le contenu casse**, pas par appareil. Préférer `rem`/`em` aux `px`
dans les media queries. Pour un composant autonome, préférer les **container queries**
(`container-type: inline-size`) aux media queries de page.

## 3. Layout

- Flux naturel d'abord ; Grid pour les structures 2D, Flexbox pour les alignements 1D.
- Grilles fluides : `grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr))`.
- Containers : `width: min(100% - 2rem, 72rem); margin-inline: auto;` (gouttière ≥ 16 px à chaque côté).
- Interdit : largeurs/hauteurs fixes en px sur des conteneurs de contenu ; `overflow-x: hidden`
  pour masquer un débordement (trouver la cause) ; `100vw` pour la largeur (inclut la barre de
  défilement) → `100%`.
- Flex enfants : `min-width: 0` pour permettre la réduction ; `flex-wrap: wrap` pour les rangées.
- Hauteur plein écran : `100dvh`/`svh` (pas `100vh`, qui ignore la barre d'adresse mobile).
- Propriétés logiques (`margin-inline`, `padding-block`, `inset-inline`) pour le support RTL.
- `position: fixed/sticky` : prévoir `env(safe-area-inset-*)` (notch, home indicator) et ne pas
  masquer le contenu ni le focus.

## 4. Typographie fluide

```css
html { font-size: 100%; }              /* respecte le réglage utilisateur */
h1 { font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem); }
p  { max-width: 65ch; }
```
Toujours en `rem` (jamais `px` pour le texte), `clamp()` avec borne en `rem` pour rester zoomable ;
`overflow-wrap: anywhere` / `hyphens: auto` pour les longs mots et URL ; le texte reste lisible à
200 % de zoom sans scroll horizontal (reflow WCAG 1.4.10 à 320 px de large).

## 5. Interactions tactiles et pointeur

- Cibles ≥ 44×44 px (WCAG 2.5.5 AAA recommandé ; 24×24 px minimum absolu AA 2.5.8), espacement
  ≥ 8 px entre cibles.
- Hover réservé à l'amélioration : `@media (hover: hover) and (pointer: fine) { … }` ; aucune
  fonction essentielle accessible uniquement au survol.
- `<input>` : `font-size ≥ 16px` (sinon zoom automatique iOS), `type`/`inputmode`/`autocomplete`
  adaptés (`email`, `tel`, `numeric`, `one-time-code`).
- `touch-action`, `overscroll-behavior` et `scroll-snap` pour des gestes maîtrisés ; ne jamais
  piéger le scroll ; alternative au drag & drop et au geste complexe.

## 6. Médias et images

- `max-width: 100%; height: auto;` et `width`/`height` (ou `aspect-ratio`) déclarés → pas de CLS.
- `srcset` + `sizes` + `<picture>` (AVIF/WebP) ; art direction par breakpoint si le cadrage change.
- `loading="lazy"` hors écran initial (jamais sur l'image LCP) ; `decoding="async"`.
- Vidéos/iframes : ratio réservé (`aspect-ratio: 16/9`), pas de lecture auto avec son.

## 7. Composants

- **Navigation** : mobile = menu repliable accessible (bouton, `aria-expanded`, focus piégé si
  superposé, fermeture Échap) ou barre inférieure ≤ 5 entrées ; desktop = barre horizontale.
- **Tableaux** : conteneur `overflow-x: auto` + en-têtes fixes, ou transformation en cartes ; jamais
  de donnée supprimée en silence.
- **Modales** : plein écran ou bottom sheet sur mobile, scroll interne, bouton fermer atteignable
  au pouce, clavier virtuel pris en compte (`visualViewport`/`dvh`).
- **Formulaires** : une colonne sur mobile, labels visibles, boutons pleine largeur si action
  principale, erreurs liées aux champs.
- **Cartes/listes** : grille auto-fit, contenu tronqué avec `line-clamp` seulement si l'info
  complète reste accessible.

## 8. Préférences utilisateur

`prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`, `forced-colors` ; mode
paysage ; zoom 200-400 % ; taille de police système augmentée.

## 9. Matrice de contrôle minimale

| Largeur | Cas |
|---|---|
| 320 | plus petit support : aucun scroll horizontal, tout atteignable |
| 375 / 390 / 414 | téléphones courants |
| 768 | tablette portrait |
| 1024 | tablette paysage / laptop |
| 1280 / 1440 | desktop |
| ≥ 1920 | contenu plafonné, pas d'étirement illisible |

En plus : paysage mobile (hauteur ≈ 360 px), zoom 200 %, police agrandie, clavier virtuel ouvert,
réseau lent / appareil modeste. Vérifier avec captures réelles, pas par supposition.

## 10. Lien SEO et performance

Mobile-first indexing : mêmes contenus, liens, métadonnées et données structurées que sur
desktop ; pas de contenu caché en mobile uniquement pour gagner de la place. Cibles Core Web
Vitals mesurées sur mobile (voir Skill `seo` → `performance.md`).
