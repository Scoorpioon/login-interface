const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
require('../config/auth')(passport);

// Routes
    router.get('/', (req, res) => {
        if(req.query.fail) {
            console.log('Email e/ou senha incorretos');
            res.render('logar', {message: 'Email e/ou senha incorretos. Tente novamente!'});
        } else {
            res.render('logar', {message: 'Usuário conectado com sucesso!'});
        }
    });

    router.post('/logado', (req, res) => {
        res.send(`Logado com sucesso, ${req.body}!`);
    });

    router.post('/autenticar', passport.authenticate('local', {
        successRedirect: '/login/logado',
        failureRedirect: '/login?fail=true'
    }));

// Ending
module.exports = router;
