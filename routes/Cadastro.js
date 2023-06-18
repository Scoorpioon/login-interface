const express = require('express');
const Usuarios = require('../models/Usuarios');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('cadastro');
});

router.post('/enviado', (req, res) => {
    let erros = [];
    const infCadastro = req.body;
    const nome = req.body.nome;

    if(!infCadastro.nome || !infCadastro.idade || !infCadastro.email || !infCadastro.senha || !infCadastro.confsenha) {
        erros.push({texto: 'Preencha todas as informações necessárias!'});
        console.log(erros);
    } else if(infCadastro.senha != infCadastro.confsenha) {
        erros.push({texto: "As senhas não conferem!"});
    }

    if(erros.length > 0) {         
        res.render('cadastro', {erros});
    } else {
        Usuarios.create({
            nome: req.body.nome,
            idade: req.body.idade,
            email: req.body.email,
            senha: req.body.senha
        }).then(() => {
            req.flash('success_msg', 'Usuário cadastrado com sucesso...!')
            console.log('Deu certo!')
        }).catch((error) => {
            req.flash('error_msg', 'Ocorreu um erro ao cadastrar o usuário... Tente novamente.')
            console.log('Erro: ' + error);
        });

        res.render('logado', {nome}); /* (Na real é pra usar o redirect) */
    }
});

module.exports = router