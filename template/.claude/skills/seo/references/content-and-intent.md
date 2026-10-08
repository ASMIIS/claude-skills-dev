# Contenu, intention et maillage

## Plan d'une page indexable

1. **Intention** unique et requête principale (+ variantes sémantiques naturelles).
2. **Réponse d'abord** : la réponse/valeur principale dans les premières lignes visibles, puis le
   détail (pyramide inversée). Bénéficie à l'utilisateur, aux featured snippets et au GEO.
3. **Structure** : un `h1` (promesse de la page) ; `h2` = sous-questions/sections ; `h3` = détails.
   Sections courtes, paragraphes de 2-4 phrases, listes et tableaux pour les comparaisons.
4. **Preuves** : données chiffrées sourcées, exemples, captures, témoignages réels, date de mise à
   jour visible, auteur identifié avec compétence démontrable (E-E-A-T : Expérience, Expertise,
   Autorité, Fiabilité).
5. **Action suivante** : un CTA clair cohérent avec l'intention (pas de CTA vente sur un guide
   purement informatif sans transition).
6. **Maillage interne** : liens contextuels vers pilier/cluster/conversion.

## Règles d'écriture

- Écrire pour un humain ; la sémantique (synonymes, entités associées) vient naturellement d'un
  sujet bien traité. Pas de densité de mots-clés cible.
- Contenu **unique et utile** : si la page n'ajoute rien par rapport aux 10 premiers résultats
  (information, angle, données, expérience), ne pas la publier.
- Pas de contenu généré en masse sans relecture et valeur ajoutée ; un contenu IA non relu et
  générique est un risque qualité (pénalité « contenu de faible valeur » / abus à grande échelle).
- Texte réel dans le DOM (pas dans une image/vidéo seule ; transcription pour la vidéo).
- Contenu daté : afficher date de publication et de mise à jour *réelle* — ne pas rafraîchir la
  date sans changement de fond.
- Pages fines, doublons, pages de tags/archives sans valeur : fusionner, rediriger (301) ou
  `noindex`.

## Maillage interne

- Ancres **descriptives** (« guide des tarifs ») — jamais « cliquez ici ».
- Liens dans le corps du texte, pas seulement en footer/menu.
- Pilier ↔ clusters en lien réciproque ; les pages à fort potentiel reçoivent plus de liens.
- Liens en `<a href>` crawlables ; pas de navigation uniquement via `onclick`/JS.
- Éviter les liens cassés, les chaînes de redirections et les liens vers des pages `noindex`.
- Liens sortants vers des sources fiables : bien ; `rel="nofollow"`/`ugc`/`sponsored` pour les
  contenus utilisateur, publicités et liens sponsorisés.

## Cannibalisation et mise à jour

- Détecter : plusieurs URLs positionnées sur la même requête dans la Search Console.
- Traiter : fusionner (301 vers la plus forte), différencier l'intention, ou canonicaliser.
- Optimiser en priorité les pages en positions ~5-20 : enrichir, clarifier la réponse, améliorer
  title/description, ajouter du maillage et des preuves.

## Images et médias

`alt` descriptif (voir Skill `accessibility`), noms de fichiers parlants, formats modernes
(AVIF/WebP), dimensions déclarées, `loading="lazy"` hors écran initial, jamais sur l'image LCP.
Vidéo : page dédiée ou section avec titre/description/transcription ; balisage `VideoObject` si
pertinent.

## SEO local (si le projet a un lieu physique/zone)

Page par établissement avec NAP (nom, adresse, téléphone) identique partout, horaires, plan,
avis réels, `LocalBusiness` en JSON-LD cohérent avec le contenu visible, fiche Google Business
Profile alignée. Jamais de pages « ville » dupliquées en masse avec seulement le nom de ville changé.
