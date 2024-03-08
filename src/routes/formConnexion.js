const path = require('path');
const express = require('express');
const router = express.Router();

const FormConnexion = "user"
const PASSWORD = "user"

router.get('/connexion', (req, res, next) => {
    let errorMessage = ""

    //on redirige le user vers la page d'accueil s'il est déjà connecté et on affiche les éventuels messages d'erreur
    if (req.session.isLogin){
        res.redirect("/");
    }
    else{
        if (req.session.lastErrorMessageFormConnexion != null){
            errorMessage = req.session.lastErrorMessageFormConnexion
            req.session.lastErrorMessageFormConnexion = null
        }

        res.render(path.join(__dirname, "..", "views","formConnexion.ejs"), {pageTitle: "Connexion", errorMessage: errorMessage, isUserLogin: req.session.isLogin});
    }
});

router.post('/formConnexion', (req, res, next) => {
    //on récupère la valeur des 2 champs
    let errorMessage = null
    const resForm = Object.assign({},req.body);
    //console.log(resForm)
    const loginForm = resForm.login
    const loginPassword = resForm.password
    //console.log(loginPassword.length)

    //on initialise les variables session
    req.session.isLogin = false
    req.session.username = loginForm
    req.session.tabResultCalculEmprunts = []
    req.session.lastErrorMessageFormCalculEmprunt = null
    req.session.lastErrorMessageFormConnexion = null

    //on vérifie la validité des champs
    if (loginForm.length > 0  && loginPassword.length > 0){
        if (loginForm.length < 10 && loginPassword.length < 10) {

            const blacklistChars = '"%\'*;<>?^`{|}~/\\#=&';

            const regex = new RegExp('[' + blacklistChars.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ']');
            if (!regex.test(loginForm) && !regex.test(loginPassword)) {

                //on vérifie que le login et le password sont corrects
                if (FormConnexion === loginForm && PASSWORD === loginPassword) {
                    //l'utilisateur peut se connecter
                    req.session.isLogin = true

                } else
                    req.session.lastErrorMessageFormConnexion = "Login/Mot de passe incorrect"
            }else
                req.session.lastErrorMessageFormConnexion = "L'id/mdp de doivent pas contenir de caractères spéciaux";
        }
        else
            req.session.lastErrorMessageFormConnexion = "10 caractères au maximum!"
    }
    else
        req.session.lastErrorMessageFormConnexion = "Les champs doivent être remplis!"

    res.redirect("/connexion")
});
function preg_quote(str,delimiter){
    return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
}
module.exports = router
