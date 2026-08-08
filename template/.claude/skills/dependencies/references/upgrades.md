# Mises à jour de dépendances

## Méthode

1. Distinguer mise à jour de patch/mineure (généralement sûre) de mise à jour majeure
   (potentiellement breaking).
2. Pour une mise à jour majeure : lire le changelog/migration guide officiel avant de lancer la
   mise à jour, pas après avoir constaté des erreurs.
3. Mettre à jour une dépendance à la fois pour les changements majeurs, afin d'isoler la cause en
   cas de régression — grouper uniquement les mises à jour mineures/patch de routine.
4. Après mise à jour : exécuter la suite de tests complète, le lint, le typecheck, le build (Skill
   `testing`).
5. Vérifier les avertissements de dépréciation introduits par la nouvelle version — même si le
   build passe, une dépréciation ignorée devient souvent un breaking change à la version suivante.

## Dépendances de sécurité critique

Pour les dépendances liées à l'authentification, la cryptographie, ou la validation d'entrée :
traiter les mises à jour de sécurité comme prioritaires, même mineures — ne pas attendre un cycle
de mise à jour groupée.
