
# 📦 Construction d'un site e-commerce en JavaScript

![logo kanap](https://github.com/cheikh-mbacke/Construisez-un-site-e-commerce-en-JavaScript/front/images/overview.png)

## 📋 PRÉREQUIS TECHNIQUES

* Node.js et npm doivent être installés sur votre machine.

---

### 🚀 INSTALLATION DU BACK END

1. Clonez ce dépôt.
2. Depuis le dossier **back** du projet, exécutez `npm install` pour installer les dépendances.
3. Lancez le serveur avec `node server.js` ou `npm start`.
4. Le serveur écoute par défaut sur **`localhost:3001`**. Si un autre port est utilisé, l'information sera affichée dans le terminal.

---

### 🌐 CONTEXTE

La société **KANAP**, spécialisée dans la vente de canapés, souhaite développer une présence en ligne via un site e-commerce pour élargir sa clientèle. Le projet inclut :

* L'intégration dynamique des éléments de l'API.
* Le développement du parcours client, depuis la page d'accueil jusqu'à la confirmation de commande.

Les pages HTML et CSS ainsi que l'API sont déjà fournies.

---

### 🗂️ ARCHITECTURE GÉNÉRALE

Le site se compose de **4 pages** principales :

* **Page d'accueil** : Présentation de l'ensemble des produits disponibles.
* **Page produit** : Détails d'un produit avec choix de couleur et quantité.
* **Page panier** : Gestion des produits sélectionnés, modification des quantités et validation du panier.
* **Page de confirmation** : Affichage du numéro de commande une fois l'achat validé.

---

### 📐 CONTRAINTES TECHNIQUES

* Pas de frameworks JS autorisés.
* Code proprement indenté et commenté pour faciliter la maintenance.
* Les prix des articles ne doivent pas être stockés dans le **Local Storage**.
* Les données du formulaire de contact doivent être validées avant l'envoi.

---

### 📁 PRESENTATION DES FICHIERS

#### **Backend (/back)**

* **server.js** : Point d'entrée du serveur Node.js.
* **app.js** : Configuration des routes et middlewares.
* **controllers/** : Logique métier des différentes routes.
* **models/** : Modèles de données pour les produits.
* **routes/** : Définition des routes API.

#### **Frontend (/front)**

* **css/** : Feuilles de style pour les pages du site.
* **html/** : Fichiers HTML statiques.
* **js/** :

  * **app.js** : Affichage des détails du panier.
  * **cart.js** : Gestion du panier (stockage, ajout, suppression, modification des quantités).
  * **confirmation.js** : Affichage de la confirmation de commande.
  * **product.js** : Affichage des détails des produits.
  * **script.js** : Affichage des produits sur la page d'accueil.

---

### 💡 CONCEPTS ET TECHNIQUES JS UTILISÉS

* Récupération des données via **fetch()**.
* Manipulation du DOM pour créer dynamiquement les éléments.
* Utilisation de **URLSearchParams** pour récupérer l'ID des produits.
* Gestion du panier avec le **Local Storage**.
* Validation des formulaires avec **regex**.
* Envoi des données avec **fetch()** (méthode POST).

---

### 🚀 LANCEMENT DU SITE

Assurez-vous que le serveur backend est démarré, puis ouvrez les fichiers HTML dans votre navigateur pour tester les différentes pages.
