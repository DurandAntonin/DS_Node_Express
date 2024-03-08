const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/deconnexion', (req, res, next) => {
    //on détruie la session si le user est connecté
    if (req.session.isLogin)
        req.session.destroy()
    res.redirect("/");
});

module.exports = router
