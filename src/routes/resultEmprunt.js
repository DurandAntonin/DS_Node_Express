const path = require('path');
const express = require('express');
const router = express.Router();

const listestock = require('./formEmprunt');

router.get('/result', (req, res, next) => {
    //on regarde si un user est connecté
    let username = null;
    let userConnected = false;

    //console.log("defaut : " + req.session)
    //console.log(req.session)
    if (req.session.isLogin) {
        username = req.session.username
        userConnected = true
        res.render(path.join(__dirname, "..", "views", "resultEmprunt.ejs"), {
            pageTitle: "Resultat des emprunts",
            isUserLogin: req.session.isLogin
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;