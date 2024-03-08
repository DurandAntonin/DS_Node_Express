const path = require('path');
const express = require('express');
const router = express.Router();
const emprunt = require("./../modules/emprunt")
const e = require("express");

// Définit une route pour afficher le formulaire.
router.get('/formEmprunt', (req, res, next) => {
    let errorMessage = ""

    //on redirige le user sur la page d'accueil s'il n'est pas connecté, et on affiche les éventuels messages d'erreurs
    if (!req.session.isLogin){
        res.redirect("/")
    }
    else{
        if (req.session.lastErrorMessageFormCalculEmprunt != null){
            errorMessage = req.session.lastErrorMessageFormCalculEmprunt
            req.session.lastErrorMessageFormCalculEmprunt = null
        }

        res.render(path.join(__dirname,"..","views","formCalculEmprunt.ejs"),{pageTitle: "Formulaire calcul emprunt", isUserLogin: true, errorMessage: errorMessage});
    }
});

// Définit une route pour traiter les données du formulaire envoyé en POST.
router.post('/formEmprunt', (req, res, next) => {
    //console.log(Object.assign({},req.body));
    //on récupère les valeurs pour le calcul de l'emprunt
    let capital = req.body.capital
    let taux = req.body.taux
    let duree = req.body.duree

    if (!isNaN(capital) && !isNaN(taux) && !isNaN(duree)) {
        //on calcule les mensualités de l'emprunt
        let mensualite = emprunt(capital, taux, duree).toFixed(2)

        //on stocke les données de calcul et le résultat dans le tableau
        if (req.session.tabResultCalculEmprunts == null)
            req.session.tabResultCalculEmprunts = []
        req.session.tabResultCalculEmprunts.push({capital: capital, taux: taux, duree: duree, mensualite: mensualite})

        res.redirect('/resultEmprunt');
    }else{
        req.session.lastErrorMessageFormCalculEmprunt = "Seuls les nombres sont autorisés";
        res.redirect('/formEmprunt');
    }
});

module.exports = router;
