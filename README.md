# FHF Bourgogne-Franche-Comté — Tableau de bord V5

Version du 2 octobre 2026, prête pour GitHub Pages. Site statique sans compilation, serveur de données ni bibliothèque externe. Les données sont intégrées dans `assets/data.js` ; les fichiers CSV/JSON sont disponibles dans `data/`.

## Publier

1. Décompresser l’archive.
2. Déposer **son contenu** à la racine du dépôt : `index.html`, `assets/`, `data/`, `docs/`, `tests/`, `scripts/`, `README.md` et `.nojekyll`. Ne pas déposer uniquement le ZIP.
3. Dans **Settings → Pages**, choisir **Deploy from a branch**, branche **main**, dossier **/(root)**, puis **Save**.
4. Ouvrir le lien affiché par GitHub Pages après le déploiement.

Voir [le guide de publication](docs/PUBLICATION_GITHUB.md).

## Explorer

- **Territoires & offre** : six indicateurs départementaux, croisements APL/pauvreté sur 3 685 communes, seuils modifiables, cartes, sélection et exports, offre SAE 2025 des 11 GHT sur 24 mesures.
- **Flux** : structure et extraction à obtenir ; aucune matrice simulée.
- **Coopérations & prévention** : passages aux urgences et dépistage du sein, en distinguant activité et coopération effective.
- **Maturité** : grille des trois axes, 33 cellules non renseignées et modèle de collecte.
- **Sources & qualité** : provenance, millésimes, contrôles, anomalies et besoins restant à couvrir.

La pauvreté est diffusée pour **198 communes**, couvrant **51,23 %** de la population 2022 utilisée dans le croisement. Les valeurs non diffusées restent vides. Les seuils APL 3 et pauvreté 15 % sont exploratoires et ne constituent pas un zonage ZIP/ZAC.

## Limites à lire avant interprétation

Aucun rattachement communal de résidence aux GHT n’est validé. Le GeoJSON GHT reste donc vide et les besoins ne sont pas agrégés par GHT. Les compositions FINESS 2026 et statistiques SAE 2025 restent deux périmètres datés distincts. Le GHT 21–52 inclut un périmètre hors BFC : les capacités ne sont pas divisées par une population départementale BFC.

[Méthodologie](docs/METHODOLOGIE.md) · [Recherche et sources vérifiées](docs/SOURCES_VERIFIEES.md) · [Demandes aux producteurs](docs/DEMANDES_PRODUCTEURS.md) · [Changements V5](docs/CHANGEMENTS_V5.md) · [Licences](docs/LICENCES_ET_SOURCES.md).

## Vérifier localement

```sh
python3 tests/check_data.py
node --check assets/app.js
node tests/check_interactions.mjs
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`. `index.html` peut également être ouvert directement ; conserver les dossiers voisins. Les contrôles JavaScript utilisent un DOM simulé. La vérification visuelle effectuée porte sur les SVG produits ; le rendu complet dans un navigateur réel reste à vérifier.
