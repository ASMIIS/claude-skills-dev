# Règles UI — contraintes mesurables

Ces règles sont des **garde-fous structurels** (lisibilité, cohérence, cibles tactiles), pas une
esthétique imposée. L'identité visuelle (couleurs de marque, typo, ton) vient toujours de la DA
du projet (`frontend/docs/design-system/README.md`). Si la DA est `UNKNOWN` sur un point, appliquer
la valeur par défaut ci-dessous **et la documenter** dans le design system.

## 1. Tokens, pas de valeurs en dur

Couleurs, espacements, rayons, ombres, tailles de police, durées d'animation, z-index viennent de
tokens (variables CSS / thème). Interdit : `#3b82f6`, `margin: 17px`, `z-index: 9999` en dur dans
un composant. Un nouveau token n'est créé que s'il sert plusieurs endroits.

## 2. Espacement et grille

- Échelle de base 4/8 px (4, 8, 12, 16, 24, 32, 48, 64…) ; jamais de valeur arbitraire hors échelle.
- Proximité : l'espace *dans* un groupe est inférieur à l'espace *entre* groupes.
- Largeur de contenu texte : 60-75 caractères par ligne (`max-width: 65ch`).
- Alignement sur une grille cohérente ; bords gauches alignés ; pas de décalage de 1-2 px.

## 3. Typographie

- Corps ≥ 16 px (14 px minimum pour le texte secondaire/denses tableaux), `line-height` 1,4-1,6 pour
  le texte courant, 1,1-1,3 pour les titres.
- Échelle modulaire limitée (≈ 6 tailles) ; 1-2 familles ; 2-3 graisses.
- Hiérarchie par taille + graisse + contraste, pas par la couleur seule.
- Pas de texte tout en majuscules sur de longues phrases ; pas de justification qui crée des « rivières ».
- Texte réel (pas d'image de texte), police avec fallback système.

## 4. Couleur et contraste

- Contrastes WCAG AA : texte ≥ 4,5:1 (grand texte ≥ 3:1), composants UI et icônes porteuses de
  sens ≥ 3:1, focus visible ≥ 3:1 (détail : Skill `accessibility`).
- La couleur n'est **jamais** le seul vecteur d'information (erreur = couleur + icône + texte).
- Rôles sémantiques fixes : primaire, secondaire, succès, avertissement, erreur, info, neutres.
  Une seule couleur d'action primaire par vue.
- Thème sombre si le projet le propose : tokens dédiés (pas d'inversion automatique), contrastes
  revérifiés, `color-scheme`, images/ombres adaptées, pas de noir pur sur blanc pur agressif.
  Respecter `prefers-color-scheme` par défaut avec choix utilisateur persistant.

## 5. Composants et états

- Réutiliser avant de créer (voir SKILL). Un composant = un rôle ; variantes limitées et nommées.
- États à couvrir : default, hover, focus-visible, active, disabled, loading, success, error, empty
  (voir `interaction.md`). `:focus-visible` toujours visible, jamais `outline: none` sans remplaçant.
- Boutons : un seul bouton primaire par zone d'action ; libellé = verbe + objet (« Enregistrer le
  profil »), pas « OK » ; action destructive visuellement distincte et confirmée ou annulable.
- Liens vs boutons : lien = navigation, bouton = action. Un lien se distingue sans la couleur seule.
- Champs : voir `forms.md`. Icônes seules : `aria-label` + info-bulle ; une seule bibliothèque
  d'icônes, taille/trait homogènes.
- Surfaces : élévation/ombre à usage limité (3 niveaux max), rayons issus des tokens.

## 6. Hiérarchie et densité

- Un seul élément dominant par écran (titre/CTA principal) ; ordre visuel = ordre de lecture =
  ordre DOM.
- Densité adaptée au contexte (outil de travail dense vs page marketing aérée) mais constante dans
  une même vue ; ne pas réduire la taille cliquable pour gagner de la place.
- Contenu avant décoration : supprimer ce qui n'aide pas la tâche.

## 7. Mouvement

- Durées : micro-interactions 100-200 ms, transitions de panneaux 200-300 ms ; easing cohérent.
- Animer `transform` et `opacity` (pas `width/height/top/left`) ; pas d'animation bloquant l'action.
- `prefers-reduced-motion` respecté (remplacer par fondu ou supprimer) ; rien qui clignote > 3 fois/s ;
  pas d'auto-play avec son.

## 8. Contenu et micro-copie

- Langue et ton cohérents avec la marque ; vocabulaire de l'utilisateur, pas du système.
- Messages d'erreur : ce qui s'est passé + comment corriger, sans jargon ni code technique brut ;
  messages de succès brefs ; états vides avec explication et action.
- Dates, nombres, devises formatés selon la locale (`Intl`) ; textes extensibles (l'allemand ou le
  français sont ~30 % plus longs que l'anglais) — aucune largeur fixe sur un libellé.

## 9. Performance perçue

Skeleton pour contenu structuré, spinner pour action brève, optimistic UI quand l'échec est rare
et réversible, ne jamais bloquer toute la page pour un chargement partiel, images avec dimensions
réservées (pas de saut de mise en page — voir Skill `seo` → `performance.md`).

## 10. Sécurité dans l'UI

Pas d'information sensible dans l'URL, le DOM caché ou le `localStorage` ; champs mot de passe avec
`type="password"` + `autocomplete` adapté (`current-password`/`new-password`/`one-time-code`) et
bouton « afficher » ; messages d'authentification génériques ; double confirmation pour actions
destructrices ou sensibles (voir Skill `security` → `authentication-and-brute-force.md`).
