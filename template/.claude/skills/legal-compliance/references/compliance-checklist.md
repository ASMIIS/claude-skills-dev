# Checklist de conformité — support de /audit-compliance

Checklist complète pour un audit de conformité. Ne pas dérouler chaque point pour toute tâche
mineure — cette checklist est le support de `/audit-compliance` et de `/review-compliance-feature`
pour les tâches à portée juridique réelle.

## 1. Contexte produit
- [ ] Pays ciblés identifiés
- [ ] Type d'utilisateurs (B2B / B2C / mixte)
- [ ] Secteur d'activité et éventuelles obligations sectorielles
- [ ] Modèle économique (gratuit, payant, freemium, publicité...)

## 2. Données personnelles
- [ ] Catégories de données traitées identifiées
- [ ] Présence de données sensibles (santé, biométrie, opinions, origine, etc.)
- [ ] Distinction donnée personnelle / pseudonymisée / anonymisée faite correctement

## 3. Bases légales et consentement
- [ ] Base légale identifiée pour chaque traitement principal
- [ ] Consentement recueilli conformément (libre, spécifique, éclairé, univoque) là où requis
- [ ] Retrait du consentement techniquement effectif

## 4. Droits des personnes
- [ ] Accès, rectification, effacement, limitation, portabilité, opposition
- [ ] Export de données et suppression de compte fonctionnels et complets

## 5. Cookies et traceurs
- [ ] Traceurs non essentiels bloqués avant consentement (vérifié dans le code)
- [ ] CMP conforme (refus aussi accessible que l'acceptation, pas de dark pattern)

## 6. Politique de confidentialité
- [ ] Existe et est cohérente avec les traitements réels du code

## 7. Sous-traitants et transferts
- [ ] Services tiers traitant des données personnelles identifiés
- [ ] Transferts hors UE identifiés, mécanisme juridique et garanties vérifiés

## 8. Conservation des données
- [ ] Durée de conservation justifiée pour chaque donnée importante
- [ ] Suppression de compte n'omet pas de données résiduelles injustifiées

## 9. Sécurité (croisement avec Skill `security`)
- [ ] Chiffrement, contrôle d'accès, logs, sauvegardes cohérents avec la sensibilité des données

## 10. Consommation / e-commerce (si B2C)
- [ ] Informations précontractuelles, droit de rétractation, abonnement/résiliation

## 11. Prospection commerciale
- [ ] Consentement, opposition et désinscription effectifs si applicable

## 12. Accessibilité légale
- [ ] Obligation identifiée ou écartée selon le contexte réel du service

## 13. IA et réglementations européennes
- [ ] Si IA utilisée : implications identifiées au-delà du RGPD

## 14. AIPD / DPIA
- [ ] Signaux de risque élevé identifiés, besoin d'AIPD signalé si pertinent (jamais tranché seul)

Pour chaque point coché ou non : indiquer la classification (`COMPLIANT`, `PARTIELLEMENT
CONFORME`, `NON CONFORME`, `INCONNU`, `VALIDATION JURIDIQUE REQUISE`) plutôt qu'une simple case
à cocher binaire dans le rapport final.
