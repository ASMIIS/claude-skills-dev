# Stockage persistant

## Bases de données

Une application déployée peut utiliser une base de données fournie par la plateforme (PaaS
database), une base de données managée séparée, une base de données externe, ou une base
self-hosted. Identifier laquelle est réellement utilisée, puis vérifier : connexion, SSL/TLS,
gestion des identifiants (voir `secrets.md`), migrations (Skill `database`), stratégie de
sauvegarde, procédure de restauration, limites de connexion, hypothèses faites sur les données de
production.

**Ne jamais supposer qu'une plateforme fournit automatiquement des sauvegardes applicatives
suffisantes ou une stratégie de restauration testée** — vérifier concrètement ce qui est
réellement couvert et à quelle fréquence, et signaler l'absence de vérification si le sujet n'a
jamais été testé.

## Fichiers persistants — filesystem éphémère

Vérifier si l'application écrit sur le système de fichiers local (uploads, fichiers générés,
fichiers temporaires, documents utilisateur, exports, cache, base de données locale). Sur de
nombreux environnements PaaS/serverless, le filesystem local peut être éphémère, non persistant,
partagé différemment entre instances, ou simplement indisponible en écriture.

Si des données doivent survivre à un redéploiement ou être partagées entre plusieurs instances :
ne pas les stocker sur le disque local sans vérification — utiliser un stockage objet, un service
de stockage managé, ou la base de données selon ce qui est adapté. **Ne jamais supposer que le
disque local est persistant** sans l'avoir vérifié pour la plateforme réelle du projet.
