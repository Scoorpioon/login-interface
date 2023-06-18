const express = require('express');
const app = express();
const handleBars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const Usuarios = require('./models/Usuarios');
const flash = require('connect-flash');
const session = require('express-session');
const Cadastro = require('./routes/Cadastro');
const Login = require('./routes/Login');
const localStrategy = require('passport-local').Strategy;

// Config
    // Session
        app.use(session({
            secret: 'CANIGETBACKTOTHEP4ST',
            resave: true,
            saveUninitialized: true,
            cookie: {secure: true}
        }));

        app.use(flash());

    // Midddleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
            next();
        });

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

// Routes
    app.get('/', (req, res) => {
        res.render('interface');
    });

    app.use('/login', Login);
    app.use('/cadastrar', Cadastro);

// Ending
    const PORT = 1337;
    app.listen(PORT, () => {
        console.log('Servidor iniciado!', PORT);
    });