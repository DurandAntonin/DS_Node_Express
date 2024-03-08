const path = require('path');
const express = require('express');
const router = express.Router();
const emprunt = require("./../modules/emprunt")
const e = require("express");

const tabResultCalculEmprunts = [];

// Définit une route pour afficher le formulaire.
router.get('/formEmprunt', (req, res, next) => {
    //on redirige le user s'il n'est pas connecté
    if (!req.session.isLogin)
        res.redirect("/")
    else
        res.render(path.join(__dirname,"..","views","formCalculEmprunt.ejs"),{pageTitle: "Formulaire calcul emprunt", isUserLogin: true, errorMessage: null});

});

// Définit une route pour traiter les données du formulaire envoyé en POST.
router.post('/formEmprunt', (req, res, next) => {
    //console.log(Object.assign({},req.body));
    //on récupère les valeurs pour le calcul de l'emprunt
    let capital = req.body.capital
    let taux = req.body.taux
    let duree = req.body.duree

    let erreur = "";
    if (!isNaN(capital) && !isNaN(taux) && !isNaN(duree)) {
        //on calcule les mensualités de l'emprunt
        let mensualite = emprunt(capital, taux, duree)
        mensualite = mensualite.toFixed(2);
        //on stocke les données de calcul et le résultat dans le tableau
        tabResultCalculEmprunts.push({capital: capital, taux: taux, duree: duree, mensualite: mensualite})
        //console.log(tabResultCalculEmprunts);
        res.redirect('/resultEmprunt');
    }else{
        erreur = "Veuillez entré que des nombres";
        res.render(path.join(__dirname,"..","views","formCalculEmprunt.ejs"),{pageTitle: "Formulaire calcul emprunt", isUserLogin: true, errorMessage: erreur});

    }
});

module.exports = router;
module.exports.tabCalculEmprunts = tabResultCalculEmprunts;