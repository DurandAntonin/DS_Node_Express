const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    //on regarde si un user est connecté
    let username = null;
    let userConnected = false;

    //console.log("defaut : " + req.session)
    //console.log(req.session)
    if (req.session.isLogin){
        username = req.session.username
        userConnected = true
    }
    res.render(path.join(__dirname, "..", "views","accueil.ejs"), {pageTitle: "Accueil", user: {username: username}, isUserLogin: userConnected});
});

module.exports = router;