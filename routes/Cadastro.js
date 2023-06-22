const express = require('express');
const router = express.Router();
const Usuarios = require('../models/Usuarios')

const capitalize = (palavra) => {
    const stringCapitalizada = palavra.charAt(0).toUpperCase() + palavra.slice(1);
    return stringCapitalizada;
};

// Routes
    router.get('/', (req, res) => {
        res.render('cadastro');
    });

    router.post('/sucesso', (req, res) => {
        console.log(req.body)

        res.render('logado');
        let nomeRecebido = capitalize(req.body.nome);
        let emailRecebido = capitalize(req.body.email);

        Usuarios.create({
            nome: nomeRecebido,
            idade: req.body.idade,
            email: emailRecebido,
            senha:req.body.senha
        }).then(() => {console.log('Deu certo!')}).catch((error) => {console.log('Erro: ') + error});
    });

// Ending
module.exports = router;
