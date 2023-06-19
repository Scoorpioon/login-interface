const express = require('express');
const app = express();
const handleBars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const Usuarios = require('./models/Usuarios');
const Login = require('./routes/Login');
const Cadastro = require('./routes/Cadastro');
const passport = require('passport');
const session = require('express-session');
require('./config/auth')(passport);

// Config
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    app.engine('handlebars', handleBars.engine({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // Public
        app.use(express.static(path.join(__dirname, 'public')));

    // Database
        mongoose.connect('mongodb://127.0.0.1/userlogin', {useNewUrlParser: true}).then(() => {
            console.log('Conectado ao banco de dados!');
        }).catch((error) => {
            console.log('Ocorreu um erro ao se conectar ao BD: ', error);
        });

    // Session
    app.use(session({
        secret: 'CANIGETBACKTOTHEP4ST',
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 2 * 60 * 1000}
    }));
    app.use(passport.session());
    app.use(passport.initialize());

// Routes
    app.get('/', (req, res) => {
        res.render('interface');
    });

    app.use('/login', Login);
    app.use('/cadastro', Cadastro);

// Ending
    const PORT = 8080;
    app.listen(PORT, () => {
        console.log('Servidor iniciado!', PORT)
    });