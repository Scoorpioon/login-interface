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

    router.post('/autenticar', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login?fail=true'
    }) ,(req, res) => {
        res.render('logado');
    })

// Ending
module.exports = router;