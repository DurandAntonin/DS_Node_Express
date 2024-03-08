const path = require('path');
const express = require('express');
const router = express.Router();

const listestock = require('./formEmprunt');

router.get('/resultEmprunt', (req, res, next) => {
    console.log("stock : ", listestock.tabCalculEmprunts);

    //console.log("defaut : " + req.session)
    //console.log(req.session)

    //on regarde si un user est connecté
    if (req.session.isLogin) {
        if (listestock.tabCalculEmprunts) {
            const liste = listestock.tabCalculEmprunts;

            if (liste.length > 0) {
                let value;
                for (const elt of liste) {
                    value = elt.message;
                    console.log("value : ", elt.message);
                }
            }

            res.render(path.join(__dirname, "..", "views", "resultEmprunt.ejs"), {
                message: liste,
                pageTitle: "Resultat des emprunts",
                isUserLogin: req.session.isLogin

            });
        }
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;