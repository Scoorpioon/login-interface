const bcrypt = require('bcryptjs');
const Usuarios = require('../models/Usuarios');
const localStrategy = require('passport-local').Strategy;

async function buscarUsuario(prop, param) {
    try {
        const usuarioBuscado = await Usuarios.findOne({[prop]: param});
        /* console.log(usuarioBuscado) */
        return await usuarioBuscado;
    } catch(error) {
        console.log('Erro na busca: ' + error);
    };
};

/* const usuarioDeteste = [{
    _id: 1,
    nome: 'Usuario de teste',
    idade: '30',
    email: 'usuario@email.com',
    senha: '$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW'
}]; */

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser((id, done) => {
        try {
            const usuario = buscarUsuario('_id', id);
            done(null, usuario);

        } catch(error) {
            console.log('Erro no usuário: ' + error);
            return done(error, null);
        };
    });

    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'senha'
    }, (email, senha, done) => {
        try{
            console.log('Senha pesquisada no banco: ' + senha)
            const usuario = buscarUsuario('email', email);
            usuario.then((valor) => {
                const validado = bcrypt.compareSync(senha, valor.senha);
                if(!usuario) {
                    return done(null, false);
                }
    
                if(!validado) {
                    return done(null, false);
                } else {
                    return done(null, usuario)
                }
            });
        } catch(error) {
            console.log('Erro ocorrido na autenticação: ' + error);
            done(error, false);
        };
    }));

};