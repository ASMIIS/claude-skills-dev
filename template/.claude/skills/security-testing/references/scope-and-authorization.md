# Périmètre et autorisation

## Pourquoi cette étape passe avant tout le reste

Un test de sécurité actif envoie des requêtes anormales à un système. Sans autorisation claire,
c'est indiscernable d'une attaque réelle — juridiquement et techniquement. Cette étape n'est pas
une formalité : c'est la condition qui rend le reste du Skill légitime.

## Checklist de gate (toutes les cases doivent être cochées avant le scan/la revue active)

- [ ] **Propriété/mandat** — l'utilisateur confirme explicitement que la cible est son système, le
      système de son organisation, ou qu'il dispose d'une autorisation écrite (mandat, bug bounty
      dont le scope couvre précisément cette cible). Une affirmation vague ("c'est bon, vas-y") sur
      une cible dont le domaine ne correspond pas clairement au projet en cours = `UNKNOWN`, donc
      Stop Condition.
- [ ] **Environnement désigné précisément** — URL(s)/domaine(s)/IP exacts, pas "le site". Si
      plusieurs environnements existent (dev/staging/prod), demander lequel si ce n'est pas
      explicite.
- [ ] **Production exclue par défaut** — si la cible est la production, le confirmer comme une
      décision séparée et délibérée (impact possible sur de vrais utilisateurs, de vraies alertes,
      un vrai rate limiting qui peut déclencher un blocage réel). Documenter l'heure de début/fin
      si une fenêtre de maintenance existe.
- [ ] **Comptes de test** — des comptes/données dédiés au test existent ou sont créés pour
      l'occasion ; aucune manipulation de compte utilisateur réel, même en lecture, sauf si
      strictement impossible à éviter et explicitement accepté par l'utilisateur.
- [ ] **Tiers hors scope** — tout service tiers intégré (paiement, email, SSO, CDN, API externe)
      est explicitement exclu du test actif, sauf autorisation séparée de ce tiers. Un domaine qui
      redirige vers un tiers reste hors scope même atteint depuis la cible.
- [ ] **Fenêtre et contact** — si l'équipe infra/SRE doit être prévenue (pour ne pas déclencher une
      astreinte sur de fausses alertes), le signaler à l'utilisateur avant de lancer un scan bruyant.

## Ce qui reste strictement interdit, même avec autorisation

- Déni de service, flood, saturation volontaire des ressources.
- Suppression, modification ou exfiltration de données réelles.
- Social engineering, phishing réel, ingénierie sociale sur de vraies personnes.
- Pivot vers un système non explicitement inclus dans le périmètre, même découvert pendant le test.
- Conserver après le test des accès, comptes ou portes dérobées créés pour la démonstration.

## Si une de ces conditions manque

S'arrêter, résumer précisément ce qui bloque, et poser la question à l'utilisateur plutôt que de
procéder sur une hypothèse. Ne jamais transformer un `UNKNOWN` sur l'autorisation en `ASSUMED`.
