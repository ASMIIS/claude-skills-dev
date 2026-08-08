# Intégrité des données

## Contraintes

Vérifier que les contraintes nécessaires existent réellement en base — pas seulement en
validation applicative. Une validation frontend ou applicative n'empêche pas une insertion directe
ou un bug ailleurs dans le code de violer une règle métier si elle n'est pas aussi garantie par la
base : clés étrangères, contraintes d'unicité, contraintes `NOT NULL`, contraintes `CHECK` quand
le SGBD les supporte et que c'est cohérent avec les conventions du projet.

## Intégrité référentielle

Vérifier le comportement des suppressions en cascade (`ON DELETE CASCADE`/`SET NULL`/`RESTRICT`)
— une suppression en cascade non voulue peut effacer silencieusement des données liées
importantes ; une absence de cascade peut laisser des références orphelines.

## Validations

Distinguer ce qui doit être validé côté applicatif (règles métier complexes, messages d'erreur
utilisateur) de ce qui doit être garanti au niveau base (intégrité structurelle) — les deux sont
complémentaires, la validation applicative seule n'est pas suffisante pour garantir l'intégrité
en cas de bug ou d'accès concurrent.

## Données orphelines / incohérentes existantes

Avant de renforcer une contrainte sur une table déjà peuplée, vérifier qu'aucune donnée existante
ne la viole déjà — sinon la migration échouera ou, pire, une contrainte partiellement appliquée
laissera un état incohérent.
