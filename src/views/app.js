const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session")

const port=8000;
const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(session({secret : "un secret", resave: false, saveUninitialized: false}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{;
    res.status(404).render(path.join(__dirname,"views","404.ejs"), {pageTitle: "404 not Found"});
});

app.listen(port);
console.log("serveur http à l'écoute sur le port : "+port);