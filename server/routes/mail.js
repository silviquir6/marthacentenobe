var express = require('express');
var app = express();
'use strict';
const nodemailer = require('nodemailer');
//token
var jwt = require('jsonwebtoken');
// model
const Usuario = require('../models/usuario');
const path = require('path');

//Rutas
app.post('/cambiarPassword', (req, res) => {



    let body = req.body;
    let to = body.to;


    //Generar Token
    var token = jwt.sign({ to }, process.env.SEED, { expiresIn: 1800 }); //30 min


    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'doctoramarthacenteno@gmail.com', // generated ethereal user
            pass: 'carlos2724' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'doctoramarthacenteno@gmail.com', // sender address
        to: `${body.to}`, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: '', // plain text body:
        html: '<b><br>Para restablecer tu contraseña, <br><br> ingresa el siguiente código: <br><div class="danger">' + token + '</div> <br><br> y tu nueva contraseña en: http://localhost:4200/authentication/resetpassword <br><br>  Gracias!  <br>  </b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error correo no pudo ser enviado',
                errors: err
            });
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.status(200).json({
            ok: true,
            message: 'El correo fue enviado correctamente',
            token: token
        });


    });

})


//Rutas
app.post('/bienvenida', (req, res) => {
    let body = req.body;
    let nombre = body.nombre;
    console.log(nombre);
    let to = body.email;
    console.log(to);

    //Generar Token
    var token = jwt.sign({ to }, process.env.SEED, { expiresIn: 1800 }); //30 min


    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'doctoramarthacenteno@gmail.com', // generated ethereal user
            pass: 'carlos2724' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'doctoramarthacenteno@gmail.com', // sender address
        to: `${to}`, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: '', // plain text body:
        html: '<br> ' + nombre + '<br>Te damos la bienvenida, Gracias por tu registro! Aprovecha los descuentos para tí como usuario registrado. Doctora Martha C. Centeno R.  <br>  </b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error correo no pudo ser enviado',
                errors: err
            });
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.status(200).json({
            ok: true,
            message: 'El correo fue enviado correctamente',
            token: token
        });


    });

})



//Rutas
app.post('/correoCumpleaniosMes', (req, res) => {
    let body = req.body;
    let mes = body.mes;


    //q campos qremos mostrar
    Usuario.find({ mesNacimiento: mes }, 'nombre email')
        .exec((err, usuarios) => {

            if (err) {

                return res.status(400).json({
                    ok: false,
                    err
                });

            }


            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'doctoramarthacenteno@gmail.com', // generated ethereal user
                    pass: 'carlos2724' // generated ethereal password
                }
            });

            usuarios.forEach(function(element) {


                // setup email data with unicode symbols
                let mailOptions = {
                    from: 'doctoramarthacenteno@gmail.com', // sender address
                    to: `${element.email}`, // list of receivers
                    subject: 'Hello ✔', // Subject line
                    text: '', // plain text body:
                    html: '<div class="row" style="background: coral;"> <div class="col-lg-5 m-t-20"> <h1 style="color: white">' + element.nombre + '</h1> <h1 style="color: white"><span class="text-info">Feliz cumpleaños!</span> </div> </div> <div class="row"></h1> <br><h2 style="color: blue; text-align: center;" > Confia el cuidado de tus dientes y tu salud dental en nuestras manos.<br></h2> </p> </div><br> <h1 style="color:blue; text-align: center;" > Aprovecha los descuentos para tí en el més de tu cumpleaños.</h1> <div style="background: coral;"><h2 style="color: white">Doctora Martha C. Centeno R. </h2> <br>  </b></div></div>' // html body
                };



                // send mail with defined transport object
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'Error correo no pudo ser enviado',
                            errors: err
                        });
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                    res.status(200).json({
                        ok: true,
                        message: 'El correo fue enviado correctamente'

                    });


                });
            });

            Usuario.count({ mesNacimiento: mes, estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });

        });



})

//Rutas
app.post('/correoFelizNavidad', (req, res) => {
    let body = req.body;


    //q campos qremos mostrar
    Usuario.find({}, 'nombre email')
        .exec((err, usuarios) => {

            if (err) {

                return res.status(400).json({
                    ok: false,
                    err
                });

            }


            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'doctoramarthacenteno@gmail.com', // generated ethereal user
                    pass: 'carlos2724' // generated ethereal password
                }
            });

            usuarios.forEach(function(element) {

                let pathImagen = path.resolve(__dirname, `../assets/navidad.jpg`);
                // setup email data with unicode symbols
                let mailOptions = {
                    from: 'doctoramarthacenteno@gmail.com', // sender address
                    to: `${element.email}`, // list of receivers
                    subject: 'Feliz navidad', // Subject line
                    text: '', // plain text body:
                    html: '<h1>' + element.nombre + '</h1><br> <h2> Feliz Navidad! Que Dios te bendiga y que sonrias mucho.</h2> <img src="navidadimage"/> <h2> Doctora Martha C. Centeno R.</h2> https://www.freepik.es/vector-gratis/letras-feliz-navidad-brillantes-confeti-brillantes-adornos_3575657.htm#page=1&index=24&query=feliz%20navidad <br>', // html body
                    attachments: [{
                        filename: 'navidad.jpg',
                        path: pathImagen,
                        cid: 'navidadimage' //same cid value as in the html img src
                    }]


                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'Error correo no pudo ser enviado',
                            errors: err
                        });
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                    res.status(200).json({
                        ok: true,
                        message: 'El correo fue enviado correctamente',
                    });


                });
            });

            /*  Usuario.count({ estado: true }, (err, conteo) => {
                 res.json({
                     ok: true,
                     usuarios,
                     cuantos: conteo
                 });

             }); */

        });

})


//Rutas
app.post('/correoFelizAnioNuevo', (req, res) => {
    let body = req.body;


    //q campos qremos mostrar
    Usuario.find({}, 'nombre email')
        .exec((err, usuarios) => {

            if (err) {

                return res.status(400).json({
                    ok: false,
                    err
                });

            }


            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'doctoramarthacenteno@gmail.com', // generated ethereal user
                    pass: 'carlos2724' // generated ethereal password
                }
            });

            usuarios.forEach(function(element) {

                let pathImagen = path.resolve(__dirname, `../assets/2019.jpg`);
                // setup email data with unicode symbols
                let mailOptions = {
                    from: 'doctoramarthacenteno@gmail.com', // sender address
                    to: `${element.email}`, // list of receivers
                    subject: 'Feliz año nuevo', // Subject line
                    text: '', // plain text body:"
                    html: '<h1>' + element.nombre + '</h1><br> <h2> Feliz año 2019! Que Dios te bendiga, confia en nuestros tratamientos y llama a pedir tu cita de odontología.</h2> <img src="2019image"/> <h2> Doctora Martha C. Centeno R.</h2> <a href="https://www.freepik.com/free-vector/creative-2019-lettering-in-colorful-style_3414462.htm">Designed by Starline</a> ', // html body
                    attachments: [{
                        filename: '2019.jpg',
                        path: pathImagen,
                        cid: '2019image' //same cid value as in the html img src
                    }]


                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'Error correo no pudo ser enviado',
                            errors: err
                        });
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                    res.status(200).json({
                        ok: true,
                        message: 'El correo fue enviado correctamente',
                    });


                });
            });

            /*  Usuario.count({ estado: true }, (err, conteo) => {
                 res.json({
                     ok: true,
                     usuarios,
                     cuantos: conteo
                 });

             }); */

        });

})


//Rutas
app.post('/enviarCorreo', (req, res) => {
    let body = req.body;
    let nombre = body.nombre;
    let email = body.email;
    let textarea = body.textarea;
    let to = 'doctoramarthacenteno@gmail.com';

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'doctoramarthacenteno@gmail.com', // generated ethereal user
            pass: 'carlos2724' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'doctoramarthacenteno@gmail.com', // sender address
        to: `${to}`, // list of receivers
        subject: 'Contacto de ' + email + '', // Subject line
        text: '', // plain text body:
        html: '<br> ' + nombre + '<br>te ha escrito el siguiente mensaje: ' + textarea + '<br>' + email + '</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error correo no pudo ser enviado',
                errors: err
            });
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.status(200).json({
            ok: true,
            message: 'El correo fue enviado correctamente',
            token: token
        });


    });

})




module.exports = app;