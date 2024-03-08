const path = require('path');
const express = require('express');
const router = express.Router();

const tabResultCalculEmprunts = require('./formEmprunt').tabCalculEmprunts;

router.get('/resultEmprunt', (req, res, next) => {
    //console.log("stock : ", tabResultCalculEmprunts);

    //console.log("defaut : " + req.session)
    //console.log(req.session)

    //on regarde si un user est connecté
    if (req.session.isLogin) {
        res.render(path.join(__dirname, "..", "views", "resultEmprunt.ejs"), {
            tabResultCalculEmprunts: tabResultCalculEmprunts,
            pageTitle: "Resultat des emprunts",
            isUserLogin: req.session.isLogin
        });
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;