const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/resultEmprunt', (req, res, next) => {
    //on regarde si un user est connecté
    if (req.session.isLogin) {
        res.render(path.join(__dirname, "..", "views", "resultEmprunt.ejs"), {
            tabResultCalculEmprunts: req.session.tabResultCalculEmprunts,
            pageTitle: "Resultat des emprunts",
            isUserLogin: req.session.isLogin
        });
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;