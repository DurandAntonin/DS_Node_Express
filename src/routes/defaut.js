const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    //on regarde si un user est connecté
    let username = null;

    if (req.session.isLogin)
        username = req.session.username

    res.render(path.join(__dirname, "..", "views","accueil.ejs"), {pageTitle: "Accueil", user: {username: username}, isUserLogin: req.session.isLogin});
});

module.exports = router;