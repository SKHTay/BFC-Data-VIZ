# Publication sur GitHub Pages

Le dossier livré est directement publiable : tous les chemins sont relatifs et fonctionnent sous `https://<compte>.github.io/<depot>/`. Aucun jeton, compte de service ni script serveur n’est requis.

1. Créer un dépôt ou ouvrir le dépôt destiné au tableau de bord.
2. Décompresser le ZIP et ajouter son contenu à la racine de la branche `main`. Vérifier que `index.html` est au premier niveau et que `assets/data.js`, `assets/app.js` et `assets/style.css` sont présents. Si le dépôt contient déjà un autre site, utiliser un dépôt dédié pour cette version.
3. Dans **Settings → Pages → Build and deployment**, sélectionner **Deploy from a branch**, **main**, **/(root)** puis **Save**.
4. Attendre la fin du déploiement, puis cliquer sur **Visit site**. GitHub indique que la publication peut prendre jusqu’à dix minutes.
5. Vérifier les cinq onglets, une recherche communale, un changement d’indicateur, un export CSV et l’affichage sur téléphone. Le fichier `.nojekyll` désactive le traitement Jekyll pour cette livraison statique.

Avec GitHub Free, GitHub Pages est disponible pour les dépôts publics. Les données livrées sont publiques et agrégées. Les données obtenues ultérieurement auprès de producteurs doivent avoir une autorisation de diffusion adaptée avant leur ajout au site.

## Structure

| Élément | Usage |
|---|---|
| `index.html` | Entrée du tableau de bord |
| `assets/style.css` | Mise en page responsive |
| `assets/app.js` | Graphiques, filtres, navigation et exports |
| `assets/data.js` | Données utilisées dans le navigateur |
| `data/` | CSV UTF-8 séparateur point-virgule, JSON et GeoJSON |
| `docs/` | Méthode, sources, demandes et publication |
| `tests/` | Contrôles reproductibles et résultats de livraison |

Pour mettre les données à jour, modifier les tables normalisées **JSON**, puis exécuter `python3 scripts/synchroniser_donnees.py` pour régénérer les CSV et `assets/data.js`. Ce script synchronise les fichiers livrés ; il ne collecte pas les sources. Les nouveaux millésimes, géographies ou indicateurs nécessitent aussi une revue de l’interface, des croisements, de la méthode et des contrôles. Les CSV seuls ne modifient pas les graphiques. Conserver les valeurs manquantes comme `null` en JSON et des cellules vides en CSV. Les identifiants INSEE et FINESS restent des chaînes de caractères.

Documentation GitHub consultée le 2 octobre 2026 : https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site et https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site.
