# Tableau de bord régional BFC · prototype FHF

Prototype de data visualisation conçu par le CIUS pour le séminaire de la FHF Bourgogne-Franche-Comté. Il croise besoins de santé, offre de soins et flux de patients, sur les trois axes du séminaire : permanence des soins, filières, prévention.

> **Toutes les données affichées sont fictives.** Elles sont générées dans le navigateur pour la démonstration. Aucun chiffre n'est réel.

## Arborescence

```
fhf-bfc-dataviz/
├── index.html                 Page de l'outil
├── .nojekyll                  Désactive le traitement Jekyll de GitHub Pages
├── README.md
├── assets/
│   ├── css/style.css          Mise en forme et polices
│   ├── js/app.js              Logique des 5 écrans
│   ├── fonts/                 IBM Plex Sans, auto-hébergée (licence SIL OFL)
│   └── favicon.svg
└── data/
    └── referentiel.js         Territoires, filières, années, indicateurs, sources
```

Aucune dépendance, aucune compilation. L'outil n'appelle aucun service externe.

## Mise en ligne sur GitHub Pages

1. Créez un dépôt sur GitHub, par exemple `fhf-bfc-dataviz`.
2. Déposez **le contenu** du dossier `fhf-bfc-dataviz/` à la racine du dépôt. `index.html` doit être à la racine, pas dans un sous-dossier.
3. Vérifiez que le fichier `.nojekyll` est bien présent. L'interface web de GitHub masque parfois les fichiers commençant par un point : en cas de doute, créez-le avec « Add file », puis « Create new file », nommé `.nojekyll` et laissé vide.
4. Ouvrez **Settings**, puis **Pages**.
5. Dans **Source**, choisissez « Deploy from a branch », branche `main`, dossier `/ (root)`, puis **Save**.
6. L'adresse `https://<compte>.github.io/fhf-bfc-dataviz/` s'affiche en haut de la page Pages une fois le déploiement terminé. Suivez l'avancement dans l'onglet **Actions**.

Par la ligne de commande :

```bash
cd fhf-bfc-dataviz
git init
git add .
git commit -m "Prototype tableau de bord régional BFC"
git branch -M main
git remote add origin https://github.com/<compte>/fhf-bfc-dataviz.git
git push -u origin main
```

## Consultation en local

Double-cliquez sur `index.html`. L'outil fonctionne sans serveur.

## Modifier le référentiel

Tout se règle dans `data/referentiel.js` :

- `TERR` : territoires affichés et leur position sur la carte schématique. Pour passer à la maille GHT, remplacez les 8 départements par la liste validée.
- `FIL` : filières. Liste provisoire, à remplacer par le référentiel des 7 domaines.
- `ANS` : années du filtre.
- `IND`, `COOP` : indicateurs, unités, sens de lecture, source.
- `REF`, `STAT` : tableau des sources et de leur statut.

Les valeurs affichées sont produites par un générateur fictif dans `assets/js/app.js`. La V1 remplacera ce générateur par la lecture des exports open data.

## Limites de la version actuelle

- Maille provisoire : département.
- Carte schématique : positions respectées, contours non représentés.
- Écrans Coopérations et Maturité : propositions du CIUS, à valider par la FHF BFC.
- Échelle de maturité sans libellés de niveaux, faute du déroulé 2026.

## Visibilité et données

- Sur un dépôt public, l'outil est accessible à toute personne qui a le lien. La balise `noindex` limite son référencement, sans le rendre privé.
- GitHub Pages sur dépôt privé nécessite un abonnement GitHub payant, et le site publié reste public sauf offre Enterprise.
- N'ajoutez jamais dans le dépôt de données patient, de remontées GHT ou de données RUBFC non agrégées. Pour des données de santé à caractère personnel, GitHub Pages ne convient pas : un hébergement certifié HDS est requis.

## Crédits

Conception : CIUS, Centre d'Innovation et d'Usages en Santé.
Police : IBM Plex, © IBM Corp., licence SIL Open Font License 1.1 (`assets/fonts/LICENSE.txt`).
