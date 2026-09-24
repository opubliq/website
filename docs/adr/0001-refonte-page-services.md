# ADR 0001 — Refonte de la page Services

- **Statut** : ouvert (à exécuter par une session cloud)
- **Date** : 2026-09-24
- **Décideurs** : Hubert Cadieux
- **Concerne** : `src/views/Services.astro`, clés `services.*` de `src/content/copy/{fr,en}.json`, description SEO, liens depuis l'accueil

Ce document est **autonome** : une session cloud ne voit que ce repo, pas les autres
dépôts d'Opubliq. Tout le contexte utile est copié ici, filtré pour ce qui peut
apparaître sur un site public.

## Contexte

La page Services décrit l'offre d'avant 2026. Elle liste quatre blocs de services
(analyse de données existantes, sondages clé en main, accompagnement de campagnes
politiques, financement et levée de fonds). L'offre a changé :

- La **consultation** est recentrée sur trois services (voir plus bas). L'accompagnement
  de campagnes politiques et le financement/levée de fonds ne sont plus des piliers :
  ils deviennent des services complémentaires, à une ligne.
- Un **produit** existe maintenant : un moteur de recherche de sondages. Il est
  construit et en validation auprès de clients potentiels. Il remplace les deux
  « plateformes technologiques » annoncées dans les anciennes descriptions
  (plateforme de sondage en libre-service, estimation d'opinion par IA).

Le plan d'affaires en préparation pour un financement décrit déjà cette nouvelle
offre. La page Services doit dire la même chose que ce plan, sans son angle financier.

## Décision

Refaire la page Services en deux volets : **consultation** (3 services + complémentaires)
et **moteur de recherche de sondages** (produit). Garder le gabarit visuel existant
(cartes, section « Pourquoi Opubliq », bandeau CTA) et n'ajouter un composant que si
le contenu l'exige.

### Volet 1 — Consultation

Trois services principaux :

1. **Tableaux de bord d'opinion en continu.** Un sondage initial établit l'état de
   l'opinion, puis des données sont collectées en continu (envois postaux, codes QR
   déployés dans la ville, employés municipaux, etc.) pour alimenter un tableau de
   bord interactif à jour en temps réel. Permet à une ville de suivre la satisfaction
   des services, l'acceptabilité de projets ou les priorités citoyennes sans répéter
   des sondages coûteux. Vendu sous forme d'entente de suivi sur plusieurs mois.
2. **Analyse de données existantes.** Le client fournit ses données (sondages
   antérieurs, bases internes, publications sur les réseaux sociaux). Opubliq applique
   segmentation, modélisation statistique, analyse de sentiment et croisement avec des
   bases publiques, puis livre des recommandations actionnables. Pour les organisations
   qui ont déjà investi dans la collecte mais peinent à en tirer de la valeur.
3. **Sondages clé en main.** Conception du questionnaire, coordination avec le panel,
   analyse et recommandations stratégiques. Le client valide quelques étapes clés par
   courriel ou s'implique davantage, selon ses préférences.

Services complémentaires (une ligne chacun) : formation au pointage électoral pour
organisations politiques, veilles automatisées de sources pertinentes, identification
de profils de donateurs potentiels pour les OSBL.

Clientèle visée : municipalités, OSBL, syndicats, partis politiques, agences d'affaires
publiques. Surtout les petites et moyennes organisations avec peu de budget et peu
d'expertise interne en analyse de données.

### Volet 2 — Moteur de recherche de sondages

| Sujet | Contenu publiable |
|---|---|
| Ce que c'est | Un catalogue de questions de sondage, cherchable question par question à travers des dizaines d'études, même quand la formulation change. Recherche par mots-clés et par sens. |
| Fonctions | Agent d'analyse en langage naturel, croisements et export Excel, annotation des réponses ouvertes. |
| Problème résolu | Retrouver si une question a déjà été posée dans des études passées, et exporter/croiser plusieurs sondages sans travail manuel. Les outils existants sont chers, complexes, limités à la recherche par mots-clés et sans IA. |
| Pour qui | Firmes à panel, agences de communication et d'affaires publiques, ministères et organisations qui achètent de la recherche sur l'opinion publique. |
| État | Construit et fonctionnel. En validation auprès de clients potentiels. Pas de mise en marché générale. |
| Hébergement | Microsoft Azure, région Canada Est : les données restent au Canada. |
| Modèle d'affaires | Abonnement annuel selon la taille du corpus du client, plus des frais d'ingestion par sondage. Pas de prix par utilisateur. |

Le CTA du volet 2 est « demander une démonstration » (le contact passe par la page
Contact existante), pas un accès en libre-service.

## Ce qui n'est pas décidé — ne pas inventer

Si un fait manque, laisser un `TODO[à confirmer avec Hubert : …]` dans le copy, ne
pas le combler par une formulation plausible.

- **Aucun prix sur la page.** La grille de tarification des services et celle du
  moteur ne sont pas arrêtées. Pas de « à partir de », pas de fourchette.
- **Nom du produit.** Aucun nom commercial n'est arrêté. Écrire « moteur de recherche
  de sondages » (FR) / « survey search engine » (EN) et l'isoler dans une clé de copy
  unique pour un renommage facile.
- **Clients nommés.** Ne citer un client que s'il figure déjà sur la page
  Réalisations (`src/views/Work.astro`, clés `work.*`). Pas d'Environics ni d'autre
  nom ajouté pour le moteur.
- **Chiffres du corpus** (nombre de sondages ou de questions ingérés) : inconnus,
  ne pas les écrire.
- **Section « Pourquoi travailler avec Opubliq ? »** : garder le principe, mais
  resserrer le texte. Les quatre blocs actuels se recoupent (long terme, relations
  durables). À proposer condensés, Hubert tranche.

## À ne jamais mettre sur le site

Ces informations existent dans les dossiers internes d'Opubliq ; elles ne sont pas
publiables :

- situation financière de l'entreprise ou des fondateurs, demandes de financement,
  refus de prêt, marges de crédit ;
- prix, fourchettes de prix et hypothèses de tarification ;
- noms des personnes rencontrées en entretien (une organisation peut être citée si
  elle est déjà sur le site, pas ses représentants) ;
- noms de concurrents et leurs prix ;
- toute mention de levée de fonds ou d'investisseurs externes.

## Exécution

1. Lire `CLAUDE.md` (structure du repo), `src/views/Services.astro`, la clé
   `services` de `fr.json` et `en.json`, et `src/views/Work.astro` pour la cohérence.
2. Réécrire d'abord le **copy FR** (`src/content/copy/fr.json`), puis l'EN avec les
   mêmes clés. Le FR est la langue source. Typographie française : espace insécable
   avant `:`, `;`, `?`, `!` et guillemets `« »`.
3. Adapter `Services.astro` : la structure `services.list` actuelle (quatre cartes
   d'icônes) ne convient probablement pas à un volet « produit ». Proposer une mise en
   page cohérente avec les autres vues plutôt qu'un nouveau design.
4. Mettre à jour `services.meta.title` et `services.meta.description` (elles
   mentionnent encore campagnes et levée de fonds). Vérifier que
   `home.help.items` et `home.hero` ne contredisent pas la nouvelle offre. Signaler
   l'écart plutôt que de refaire l'accueil sans demande.
5. Ne pas modifier `routes` ni les URLs : `/services/` et `/en/services/` restent.
6. Icônes : `src/components/icons` ; n'en ajouter que si une existante ne convient pas.
7. Vérifier : `npm run build && npm run check-links` doit passer (liens internes et
   parité des clés FR/EN). Regarder le rendu avec `npm run dev` ou `npm run preview`,
   en mobile et en bureau.
8. Ouvrir une PR vers `main`, sans fusionner. Résumer dans la PR ce qui a été retiré
   de l'ancienne page (campagnes et financement passent en complémentaires) et
   lister les `TODO` restants.

## Conséquences

- Le déploiement (GitHub Pages sur push vers `main`) reste inchangé.
- L'accueil peut devenir incohérent avec Services tant que `home.help` n'est pas
  révisé ; à traiter dans un second passage.
- Les prix et le nom du produit seront à ajouter quand ils seront arrêtés.
