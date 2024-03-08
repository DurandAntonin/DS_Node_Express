const path = require('path');
const express = require('express');
const router = express.Router();

const LOGIN = "user"
const PASSWORD = "user"

router.get('/login', (req, res, next) => {
    //on redirige le user vers la page d'accueil s'il est déjà connecté
    if (req.session.isLogin)
        res.redirect("/");
    else
        res.render(path.join(__dirname, "..", "views","formLogin.ejs"), {pageTitle: "Connexion", errorMessage: null, isUserLogin: false});
});

router.post('/formLogin', (req, res, next) => {
    //on récupère la valeur des 2 champs
    let errorMessage = null
    const resForm = Object.assign({},req.body);
    //console.log(resForm)
    const loginForm = resForm.login
    const loginPassword = resForm.password
    //console.log(loginPassword.length)

    //on vérifie la validité des champs
    if (loginForm.length > 0  && loginPassword.length > 0){
        if (loginForm.length < 10 && loginPassword.length < 10) {

            const blacklistChars = '"%\'*;<>?^`{|}~/\\#=&';

            const regex = new RegExp('[' + blacklistChars.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ']');
            if (!regex.test(loginForm) && !regex.test(loginPassword)) {

                //on vérifie que le login et le password sont corrects
                if (LOGIN === loginForm && PASSWORD === loginPassword) {
                    //l'utilisateur peut se connecter
                    req.session.isLogin = true
                    req.session.username = loginForm
                    console.log(req.session)
                    res.redirect("/");
                } else {
                    errorMessage = "Login/Mot de passe incorrect"
                    res.render(path.join(__dirname, "..", "views", "formLogin.ejs"), {
                        pageTitle: "Connexion",
                        errorMessage: errorMessage,
                        isUserLogin: false
                    });
                }
            }else{
                errorMessage = "L'id/mdp de doivent pas contenir de caractères spéciaux";
                res.render(path.join(__dirname, "..", "views", "formLogin.ejs"), {
                    pageTitle: "Connexion",
                    errorMessage: errorMessage,
                    isUserLogin: false
                });
                res.render(path.join(__dirname, "..", "views","formLogin.ejs"), {pageTitle: "Connexion", errorMessage : errorMessage, isUserLogin: false});
            }

        }
        else{
            errorMessage = "10 caractères au maximum!"
            res.render(path.join(__dirname, "..", "views","formLogin.ejs"), {pageTitle: "Connexion", errorMessage : errorMessage, isUserLogin: false});
        }
    }
    else{
        errorMessage = "Les champs doivent être remplis!"
        res.render(path.join(__dirname, "..", "views","formLogin.ejs"), {pageTitle: "Connexion", errorMessage : errorMessage, isUserLogin: false});
    }
});
function preg_quote(str,delimiter){
    return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
}
module.exports = router
