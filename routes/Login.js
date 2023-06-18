const express = require('express');
const Usuarios = require('../models/Usuarios');
const router = express.Router();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

router.post('/', passport.authenticate("local", {
    successRedirect: '/paginaPrincipal',
    failureRedirect: '/login',
}), (req, res, next) => {

    console.log('Foi')
    /* const dadosUsuario = req.body;
    let erros = [];

    if(!dadosUsuario.email || !dadosUsuario.password) {
        console.log('Informações inválidas');
        erros.push({texto: 'Insira as informações nos campos!'})
    };

    if(erros.length > 0) {
        res.render('interface', {erros});
    } else {
        res.redirect('logado');
    } */
});

router.get('/editarlogin', (req, res) => {
    console.log(req.body)
    Usuarios.find().lean().then((dadosDeUsuario) => {
        res.render('editarlogin', {dadosDeUsuario})
    }).catch((error) => {
        req.flash('error_msg', 'Houve um erro ao disponibilizar as informações :(');
        res.redirect('/');
    });
})

module.exports = router;