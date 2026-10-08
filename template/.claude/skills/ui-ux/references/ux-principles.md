# Principes UX — grille de revue

Utiliser comme grille d'audit d'un parcours ou d'un écran ; ne pas dérouler en entier pour un
simple changement de style.

## Heuristiques (Nielsen) appliquées

1. **Visibilité de l'état** — l'utilisateur sait où il est, ce qui se passe (chargement,
   enregistré, erreur), quelle étape sur combien.
2. **Langage du monde réel** — vocabulaire métier de l'utilisateur, icônes conventionnelles.
3. **Contrôle et liberté** — annuler, retour, fermer, « défaire » plutôt que confirmer partout.
4. **Cohérence** — mêmes actions, mêmes patterns, mêmes libellés (voir `usability.md`).
5. **Prévention des erreurs** — contraintes de saisie, valeurs par défaut sûres, confirmation
   ciblée des actions destructrices.
6. **Reconnaissance plutôt que rappel** — options visibles, historique, autocomplétion.
7. **Flexibilité** — raccourcis et valeurs mémorisées pour experts sans gêner les novices.
8. **Minimalisme** — chaque élément supplémentaire concurrence les éléments importants.
9. **Aide à récupérer des erreurs** — message clair, cause, action corrective.
10. **Aide et documentation** — contextuelle, courte, trouvable.

## Lois à garder en tête

- **Hick** : moins de choix simultanés → décisions plus rapides ; grouper et révéler
  progressivement (progressive disclosure).
- **Fitts** : cibles importantes grandes et proches ; zones tactiles ≥ 44×44 px (Skill
  `responsive-design`).
- **Miller / charge cognitive** : découper les longs formulaires en étapes, regrouper
  l'information en blocs.
- **Jakob** : respecter les conventions de la plateforme et des sites connus avant d'innover.
- **Proximité / similarité / région commune** : le groupement visuel exprime le groupement logique.
- **Effet de position** : début et fin de liste sont mieux retenus ; placer l'essentiel là.
- **Doherty** : réponse < 400 ms ressentie comme instantanée ; au-delà, feedback immédiat.

## Parcours et conversion

- Un écran = un objectif principal ; chemin le plus court vers la tâche clé, sans détour.
- Réduire la friction : champs minimaux, saisie semi-automatique, invité avant compte forcé,
  récapitulatif avant validation, pas de re-saisie.
- Réassurance au bon endroit (délais, prix complets, politique de retour, sécurité de paiement) —
  vraie et vérifiable, jamais de pression artificielle ni de **dark pattern** (faux compte à
  rebours, désabonnement caché, cases précochées, culpabilisation : interdits, et illégaux en
  consommation/RGPD — Skill `legal-compliance`).
- Onboarding : valeur en premier, personnalisation optionnelle, état vide utile.

## Navigation et architecture

Libellés explicites, profondeur ≤ 3 niveaux, position courante visible (état actif, fil d'Ariane),
recherche si > ~30 éléments, pas de menu qui disparaît sans alternative sur mobile.

## Retours utilisateur et accessibilité

Toast non bloquant pour succès éphémère (`role="status"`), erreur persistante près du champ
(`role="alert"` pour les erreurs critiques), focus géré après navigation, modales piégeant le focus
et fermables à la touche Échap (détail : Skill `accessibility`).

## Vérification

Tester un parcours principal de bout en bout au clavier et sur mobile ; si possible 5 utilisateurs
représentatifs (Nielsen : ~85 % des problèmes majeurs). Mesurer : taux de complétion, temps de
tâche, erreurs, abandons — jamais « ça paraît bien » comme seule preuve.
