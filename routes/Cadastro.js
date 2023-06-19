const express = require('express');
const router = express.Router();

// Routes
    router.get('/', (req, res) => {
        res.render('cadastro');
    });

    router.post('/sucesso', (req, res) => {
        Usuarios.create({
            nome: req.body.nome,
            idade: req.body.idade,
            email: req.body.email,
            senha:req.body.senha
        }).then(() => {console.log('Deu certo!')}).catch((error) => {console.log('Erro: ') + error});

        res.render('logado');
    })

// Ending
    module.exports = router;