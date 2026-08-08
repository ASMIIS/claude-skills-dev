# RGPD

## Principes fondamentaux à vérifier

Licéité, loyauté, transparence, limitation des finalités, minimisation, exactitude, limitation de
conservation, intégrité, confidentialité, accountability, privacy by design, privacy by default.

## Bases légales

Lorsque le contexte le permet, identifier la base légale du traitement parmi : consentement,
contrat, obligation légale, intérêts vitaux, mission d'intérêt public, intérêt légitime. **Ne
jamais choisir automatiquement une base légale** sans analyser la finalité et le contexte réel du
traitement — c'est une décision qui engage l'entreprise, pas une valeur par défaut.

## Données personnelles

Identifier les données personnelles traitées : nom, email, téléphone, adresse, IP, identifiants,
cookies, IDs publicitaires, données de localisation, données comportementales, logs, données de
compte, données de paiement, données professionnelles, données de connexion.

Ne pas considérer qu'une donnée est "anonyme" simplement parce que le nom a été supprimé.
Distinguer, lorsque pertinent : donnée personnelle, donnée pseudonymisée, donnée anonymisée — ces
trois catégories ont des régimes juridiques différents.

## Minimisation

Pour chaque donnée collectée, questionner : pourquoi est-elle collectée, est-elle réellement
nécessaire, peut-on fournir le service avec moins de données, combien de temps doit-elle être
conservée, qui y a accès et pourquoi. Éviter tout raisonnement du type "on collecte au cas où".

## Droits des personnes

Vérifier, lorsque pertinent, la capacité du produit à gérer : droit d'accès, rectification,
effacement, limitation, portabilité, opposition, droits liés aux décisions automatisées, retrait
du consentement. Identifier les fonctionnalités nécessaires : export des données, suppression de
compte, modification des informations, gestion du consentement/préférences, historique des
consentements. Si le traitement repose sur le consentement, vérifier que son retrait est
réellement pris en compte techniquement (pas seulement déclaré).

## Consentement

Lorsqu'un traitement repose sur le consentement, vérifier qu'il est : libre, spécifique, éclairé,
univoque, recueilli par une action positive, avec possibilité de retrait, et traçabilité lorsque
nécessaire. Ne pas considérer comme un consentement valide : simple navigation, silence, case
précochée, acceptation générale des CGU — lorsque la réglementation exige un consentement
spécifique pour ce traitement.

## Données sensibles

Détecter les traitements pouvant concerner des catégories particulières de données : santé,
biométrie, opinions politiques, religion, orientation sexuelle, origine raciale ou ethnique,
données génétiques. Si une fonctionnalité implique potentiellement ce type de données : **STOP**
→ analyse approfondie → validation juridique nécessaire. Ne jamais implémenter silencieusement
une fonctionnalité présentant un risque juridique important sur ce point.

## AIPD / DPIA

Signaux pouvant justifier une analyse d'impact : traitement à grande échelle, données sensibles,
surveillance, profilage, décisions automatisées, nouvelles technologies, suivi systématique,
traitements à risque élevé. Ne jamais décider seul qu'une AIPD est obligatoire — identifier le
risque, expliquer pourquoi une AIPD pourrait être nécessaire, signaler la nécessité d'une
validation humaine.

## Conservation des données

Pour chaque donnée personnelle importante : pourquoi la conserver, combien de temps, quand
commence la durée, que se passe-t-il ensuite. Vérifier notamment : comptes supprimés, logs,
backups, fichiers, analytics, données inactives, tokens, sessions, données temporaires. Une
suppression de compte n'est pas complète si des données personnelles restent conservées sans
justification.

## Registre des traitements

Lorsque le contexte le justifie, documenter pour chaque traitement : finalité, catégories de
personnes concernées, catégories de données, destinataires, base légale, durée de conservation,
transferts, mesures de sécurité — dans `docs/compliance/` (ex: `processing-register.md`). Ne
jamais inventer les informations manquantes.
