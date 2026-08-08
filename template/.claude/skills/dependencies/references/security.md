# Sécurité des dépendances

## Vérifications

- Utiliser l'outil d'audit du gestionnaire de paquets du projet (`npm audit`, `pip-audit`,
  équivalent) lorsqu'il est disponible, pour détecter les vulnérabilités connues.
- Vérifier si une dépendance ajoutée ou mise à jour a un historique de vulnérabilités récentes
  significatives.
- Pour une dépendance nouvelle, être attentif à un package récemment créé imitant le nom d'un
  package populaire (typosquatting) — vérifier le nombre de téléchargements, le dépôt source, le
  mainteneur.
- Vérifier les scripts d'installation (`postinstall`, `preinstall`) d'un nouveau package avant de
  l'ajouter si le contexte le justifie (dépendance peu connue, comportement inhabituel) — un
  script d'installation peut exécuter du code arbitraire.

## En cas de vulnérabilité détectée

Évaluer la sévérité réelle dans le contexte du projet (la dépendance vulnérable est-elle utilisée
de façon exposée), pas uniquement le score générique. Mettre à jour vers une version corrigée
quand disponible ; si aucune version corrigée n'existe, évaluer une alternative ou un mitigant
(isolation, désactivation de la fonctionnalité concernée) et documenter la décision.
