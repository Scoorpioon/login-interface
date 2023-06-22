const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
const Usuarios = require('../models/Usuarios');

async function buscarUsuario(prop, param) {
    try {
        const usuarioBuscado = await Usuarios.findOne({[prop]: param});
        /* console.log(usuarioBuscado) */
        return usuarioBuscado;
    } catch(error) {
        console.log('Erro na busca: ' + error);
    };
};

module.exports = (passport) => { 
    passport.serializeUser((user, done) => {
        done(null, user.nome) // 1º Parâmetro: Erro, 2° Parâmetro: Informação do usuário que será salva
    }) // Gera um cookie no navegador e uma session no código com os dados do usuário

    passport.deserializeUser((name, done) => {
        try {
            buscarUsuario('nome', name).then((dado) => {
                done(null, dado);
            });

        } catch(erro) {
            console.log('Erro no deserialize: ', erro);
            done(null, erro);
        };
    });

    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
        try{
            buscarUsuario('email', email).then((usuario) => {
                console.log(usuario);

                if(!usuario) {
                    console.log('Usuário não encontrado no banco de dados;');
                    done(null, false);
                };
    
                if(senha != usuario.senha) {
                    console.log('As senhas não bateram;');
                    done(null, false);
                };
    
                done(null, usuario);
            });


        } catch(erro) {
            console.log('Erro na requisição de dados do formulário: ', erro);
            done(null, false);
        }
    })); // 1° Parâmetro: Quais campos do login serão utilizados para a autenticação. 2°: Campos que foram recebidos e o callback;
};
