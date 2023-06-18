const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuariosSchema = Schema({
    nome: {
        type: String,
        require: true
    },

    idade: {
        type: Number,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    senha: {
        type: String,
        require: true
    }
});

const Usuarios = mongoose.model('Usuarios', UsuariosSchema);

module.exports = Usuarios;