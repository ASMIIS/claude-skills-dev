# Licences des dépendances

Vérifier que la licence d'une nouvelle dépendance est compatible avec le modèle du projet
(open-source publié, logiciel propriétaire interne, produit commercial distribué). Une licence
copyleft forte (ex: GPL) peut imposer des obligations sur le code qui l'utilise selon comment
elle est intégrée — signaler le doute plutôt que de trancher seul si le projet est un produit
commercial fermé et que la licence n'est manifestement pas permissive (MIT, Apache 2.0, BSD).

Ne pas bloquer systématiquement toute licence copyleft — cela dépend fortement du mode
d'intégration (lien dynamique vs statique, modification vs usage tel quel) et du contexte de
distribution du projet. En cas de doute réel sur l'impact juridique, recommander une vérification
plutôt que de deviner (voir Skill `legal-compliance` pour la posture générale de prudence
juridique).
