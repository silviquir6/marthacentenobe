var express = require('express');
var app = express();
var mdAutenticacion = require('../middlewares/autenticacion');
const bcrypt = require('bcrypt');
var jwt_decode = require('jwt-decode');


//
var Usuario = require('../models/usuario');
//
//Rutas
app.put('/resetpass', (req, res) => {


    var body = req.body;
    var token = req.query.token;



    var decoded = jwt_decode(token);

    console.log("decoded", decoded);
    var email = decoded.to;

    console.log("email", email);

    var usuario = new Usuario({
        password: bcrypt.hashSync(body.password, 10)
    });


    Usuario.findOne({ email }, (err, usuarioDB) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales Incorrectas - email',
                errors: err

            });
        }
        usuarioDB.password = usuario.password;
        usuarioDB.save((err, usuarioGuardado) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        })

    });

})

module.exports = app;