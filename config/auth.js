const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Model de usuário
    const Usuarios = require('../models/Usuarios');
    
    module.exports = (passport) => {

        passport.use('local', new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, senha, done) => {
            Usuarios.findOne({email: email}).then((usuario) => {
                if(!usuario) {
                    done(null, false, {message: 'Usuário não encontrado!'});
                } // O usuário será procurado no banco de dados através do email. Se o parâmetro for nulo, ele não existe, portanto, não foi encontrado.

                bcrypt.compare(senha, usuario.senha, (erro, sucesso) => {
                    if(sucesso) {
                        return done(null, usuario);
                    }; // o bcrypt vai comparar a senha digitada com a senha encontrada no banco de dados. Se baterem, vai retornar o usuário.

                    if(erro) {
                        return done(null, false, {message: 'Senha incorreta. Tente novamente!'});
                    } // Se as senhas não baterem, uma mensagem de inválido será retornada.
                });
            });
        }));

        passport.serialize((usuario, done) => {
            done(null, usuario.id);
        });

        passport.deserializeUser((id, done) => {
            usuario.findById(id, (err, usuario) => {
                done(err, usuario);
            })
        })
    }