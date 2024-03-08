// Import package
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session")

const port=8000;
const app = express();

    // Importe les routes
const loginRoutes = require('./routes/formConnexion');
const defaultRoutes = require('./routes/defaut');
const deconnexionRoutes = require('./routes/deconnexion');
const formEmpruntRoutes = require('./routes/formCalculEmprunt');
const resultEmpruntRoutes = require('./routes/resultEmprunt');

// PARTIE APP
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({secret : "un secret", resave: false, saveUninitialized: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));

// Utilise les routes
app.use(defaultRoutes);
app.use(loginRoutes);
app.use(deconnexionRoutes);
app.use(formEmpruntRoutes);
app.use(resultEmpruntRoutes);

app.use((req,res,next)=>{
    let username = null;
    let userConnected = false;

    if (req.session.isLogin)
        username = req.session.username

    res.status(404).render(path.join(__dirname,"views","404.ejs"), {pageTitle: "404 not Found", user: {username: username}, isUserLogin: userConnected});
});

app.listen(port);
console.log("serveur http à l'écoute sur le port : "+port);
