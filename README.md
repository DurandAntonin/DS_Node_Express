<img src="img/logoUVSQ.png" width="500">

_Durand Antonin_ <br>
_Bui Brandon_ <br>
_Araujo Alexis_ <br>

<h1 style="color:#5d79e7; text-align: center"> Présentation de notre application</h1>

<h1 style="color:#5d79e7; text-align: center; margin-top: 100px"> Table des matières</h1>

<ol>
    <li> <a href="#introduction"> Introduction  </a> </li>
    <li> <a href="#installationApplication"> Installation de l'application </a> </li>
    <li> <a href="#explicationExtraitsCode"> Explication de deux extraits de code </a> </li>
    <ol>
        <li> <a href="#explication1"> Système de connexion dans l'application </a> </li>
        <li> <a href="#explication2"> Système de stockage des mensualités pour l'emprunt </a> </li>
    </ol>
</ol>

<h2 style="color:#5d79e7; page-break-before: always" id="introduction"> Introduction </h2>

Notre projet permet aux utilisateurs de calculer le montant de mensualité d'un emprunt selon trois caractéristiques qu'ils entreront, le capital, le taux et le temps de l'emprunt.

Pour ce faire, ils devront se connecter, donnant accès à la page de calcul. Chaque nouveau calcul sera stocké temporairement, afin de leur laisser la possibilité de visualité leurs anciens calculs.

Présentation des différente page de notre application web

<h3> Page d'accueil </h3>

Présente une barre de navigation, redirigeant vers la page de connection ou de calcul (si connecté).
Lorsqu'il est connecté, un message personnalisé est affiché.


<h3>Page de connection </h3>

Présente un formulaire avec deux input (login et mdp). 
Une fois l'envoie des données une fois la vérification des données s'impose pour empêcher les requêtes forcées.
Un seul login est présent et est écrit en durs.

<h3>Page de calcul </h3>

Présente un formalaire avec trois champs de nombres. L'utilisateur entre le capital, taux d'interets et le temps. Une fois les données envoyés, nous vérifions le format des données -> seul les nombres sont accepté.
Si elles sont conformes, l'utilisateur est renvoyé dans une page d'historique où sont affichés tout les résultats entré par l'utilisateur.
Dans le cas contraire, l'utilisateur reste sur la page de calcul avec un message d'erreur.

<h3>Page de déconnection </h3>

Détruit la session de l'utilisateur et le redirige vers la page d'acceuil.

<h2 style="color:#5d79e7; page-break-before: always" id="installationApplication"> Installation de l'application </h2>
<h3>Installation</h3>
Pour installer tout les packages, il suffit de faire :

````bash
npm install
````
Cette commande permettra d'installer tout les packages se trouvant dans le fichier package.json.


<h3>Package</h3>
<li style="font-size:15px">path</li>
Permet de manipuler les chemins de fichier et de répertoire :

````nodejs
path.join(__dirname,"views","404.ejs")
````
views : Un dossier <br>
404.ejs : Un fichier <br>
__dirname : Répertoire du fichier
<br><br>
Avantage :
<br> Simplifie les redirections et la portabilité.
<br> Manipuler les chemins d'accès en sécurité et évite les injections.

<li style="font-size:15px">express</li>
Est un framework web qui permet de simplifier la gestion des routes, des requêtes, ... :

````nodejs
const express = require('express'); // importe express
const app = express();  // variable d'utilisation
app.listen(port); // Port du lancement (localhost)
app.use(formEmpruntRoutes); //Ulilise les routes
````

Avantage : 
<br> Facilite l'utilisation.
<br> Offre une architecture simple.
<br> Il est flexible et peut être utilisé dans la plus part des applications web.
<br> Permet de haute performance.
<br> Peut être intégré avec d'autre technologies (ex : MongoDB).

<li style="font-size:15px">body-parser</li>
Permet d'analyser les requêtes pour qu'elles soient utilisé par l'application.
<br>Il extrait la requête HTTP et la transforme en Json.

````nodejs
const bodyParser = require('body-parser'); // importe bodyparser
app.use(bodyParser.urlencoded({ extended: false })); // On utilise le Middleware
````
Avantage :
<br> Facile d'utilisation et de configuration
<br> Facilite la manipulation des données des requêtes car elle transforme en json.
<br> Permet de limiter la taille des données.

<li style="font-size:15px">express-session</li>
Le package permet de gérer les sessions des utilisateurs.
<br> Cela permet de se souvenir des utilisateurs et ainsi stocker les données qu'il lui correspondent.


````nodejs
const session = require("express-session") // importe express-session
app.use(session({secret : "un secret", resave: false, saveUninitialized: false})); // On utilise express-session et on lui passe des options
````

Avantage : 
<br> Utilisation de clé secrète pour les sessions, ce qui empêche les attaques de requête.
<br> On peut avoir la main sur plein d'option comme la durée d'une session.

<li style="font-size:15px">ejs</li>
Ejs est associé à la vue dans une application NodeJS. Elle remplace le HTML

Avantage :
<br> Permet d'inclure des données de d'autres pages dans un template HTML (comme PHP). Ca a un coté back-end fait pour le front-end pour la gestion des données.
<br> Intègre du Javascript dans du HTML.


<h2 style="color:#5d79e7; page-break-before: always" id="explicationExtraitsCode"> Explication de deux extraits de code </h2>

<h3 id="explication1"> Système de connexion dans l'application </h3>

<h3 id="explication2"> Système de stockage des mensualités pour l'emprunt </h3>

Le fichier formEmprunt.js récupère les données entrée de l'utilisateur, après vérification des données appel le module emprunt.js pour effectuer le calcul des
mensualité pour emprunt.
Le résultat est stocké dans une variable "tabResultCalculEmprunts" qui sera exporté. L'utilisateur est redirigé vers resultEmprunt.ejs.
Le fichier resultEmprunt.js récupère la variable tabResultCalculEmprunts pour afficher toute les données qui y sont stocké.