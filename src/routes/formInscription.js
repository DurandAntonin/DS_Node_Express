const path = require('path');
const express = require('express');
const router = express.Router();
const mysqlConnector = require('./../modules/mysqlConnector')

router.get('/inscription', (req, res, next) => {
    let errorMessage = ""

    //on redirige le user vers la page d'accueil s'il est déjà connecté et on affiche les éventuels messages d'erreur
    if (req.session.isLogin){
        res.redirect("/");
    }
    else{
        if (req.session.lastErrorMessageFormInscription != null){
            errorMessage = req.session.lastErrorMessageFormInscription
            req.session.lastErrorMessageFormInscription = null
        }


        res.render(path.join(__dirname, "..", "views","formInscription.ejs"), {pageTitle: "Inscription", errorMessage: errorMessage, isUserLogin: req.session.isLogin});
    }
});

router.post('/formInscription', async(req, res, next) => {
    //on récupère la valeur des 2 champs
    let errorMessage = null
    const resForm = Object.assign({},req.body);
    //console.log(resForm)
    const login = resForm.login
    const password = resForm.password
    const passwordConfirm = resForm.password_confirm
    //console.log(loginPassword.length)

    //on initialise les variables session
    req.session.isLogin = false
    req.session.username = null
    req.session.tabResultCalculEmprunts = []
    req.session.lastErrorMessageFormCalculEmprunt = null
    req.session.lastErrorMessageFormConnexion = null
    req.session.lastErrorMessageFormInscription = null

    //on vérifie la validité des champs
    if (login.length > 0  && password.length > 0 && passwordConfirm.length > 0){
        if (login.length < 10 && password.length < 10 && passwordConfirm.length < 10) {

            const blacklistChars = '"%\'*;<>?^`{|}~/\\#=&';

            const regex = new RegExp('[' + blacklistChars.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ']');
            if (!regex.test(login) && !regex.test(password) && !regex.test(passwordConfirm)) {

                if (password === passwordConfirm){
                    let resultRequestGetUser = null

                    //on exécute une requete sql pour vérifier si le login est déjà pris
                    await mysqlConnector.execute("select id from Users where login = ?",[login])
                        .then(result => {
                            resultRequestGetUser = result[0]
                        }).catch(err => {
                            req.session.lastErrorMessageFormInscription = err
                        });

                    if (req.session.lastErrorMessageFormInscription == null){
                        if (resultRequestGetUser.length === 0) {
                            //on exécute une requete sql pour enregistrer les informations de l'utilisateur
                            await mysqlConnector.execute("insert into Users(login, password) values(?, ?)",[login, password])
                                .then(result => {
                                    resultRequestGetUser = result[0]
                                }).catch(err => {
                                    req.session.lastErrorMessageFormInscription = err
                                });

                            if (req.session.lastErrorMessageFormInscription == null){
                                req.session.isLogin = true
                                req.session.username = login
                            }

                        } else
                            req.session.lastErrorMessageFormInscription = "Login déjà pris"
                    }
                }
                else
                    req.session.lastErrorMessageFormInscription = "Les deux mot de passe doivent être identiques";
            }
            else
                req.session.lastErrorMessageFormInscription = "L'id/mdp de doivent pas contenir de caractères spéciaux";
        }
        else
            req.session.lastErrorMessageFormInscription = "10 caractères au maximum!"
    }
    else
        req.session.lastErrorMessageFormInscription = "Les champs doivent être remplis!"

    res.redirect("/inscription")
});
function preg_quote(str,delimiter){
    return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
}
module.exports = router
