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

Notre projet permet aux utilisateurs de calculer le montant de mensualité d'un emprunt celon trois carractéristiques qu'ils entreront, le capital, le taux et le temps de l'emprunt.

Pour ce faire, ils devront se connecté, donnant accès à la page de calcul. Chaque nouveau calcul seront stocké temporairement, afin de leur laisser la possibilité de visualité leurs anciens calculs.

Présentation des différente page de notre application web

<h3> Page d'accueil </h3>

Présente une barre de navigation, redirigeant vers la page de connection ou de calcul (si connecté).
Lorsqu'il est connecté, un message personnalisé est affiché.

<h3>Page de connection </h3>

Présente un formulaire avec deux input (login et mdp). Une fois l'envoie des données une fois la vérification des données s'impose pour empêcher les requêtes forcées.
Un seul login est présent et est écrit en durs.

<h3>Page de calcul </h3>

Présente un formalaire avec trois champs de nombres. L'utilisateur entre le capital, taux d'interets et le temps. Une fois les données envoyés, nous vérifions le format des données -> seul les nombres sont accepté.
Si elles sont conformes, l'utilisateur est renvoyé dans une page d'historique où sont affichés tout les résultats entré par l'utilisateur.
Dans le cas contraire, l'utilisateur reste sur la page de calcul avec un message d'erreur.

<h3>Page de déconnection </h3>

Détruit la session de l'utilisateur et le redirige vers la page d'acceuil.

<h2 style="color:#5d79e7; page-break-before: always" id="installationApplication"> Installation de l'application </h2>

<h2 style="color:#5d79e7; page-break-before: always" id="explicationExtraitsCode"> Explication de deux extraits de code </h2>

<h3 id="explication1"> Système de connexion dans l'application </h3>

<h3 id="explication2"> Système de stockage des mensualités pour l'emprunt </h3>

Le fichier formEmprunt.js récupère les données entrée de l'utilisateur, après vérification des données appel le module emprunt.js pour effectuer le calcul des 
mensualité pour emprunt.
Le résultat est stocké dans une variable "tabResultCalculEmprunts" qui sera exporté. L'utilisateur est redirigé vers resultEmprunt.ejs.
Le fichier resultEmprunt.js récupère la variable tabResultCalculEmprunts pour afficher toute les données qui y sont stocké.
