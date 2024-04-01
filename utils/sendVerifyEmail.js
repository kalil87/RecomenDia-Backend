
import config from '../config.js';
import nodemailer from 'nodemailer'

export const sendVerifyEmail = async (email, id) => {

    const registroResponse = `
Hola! queriamos avisarte que tu registro esta pendiente \n

Para confirmar, deber ingresar al siguiente link: http://127.0.0.1:${config.PORT}/api/usuarios/confirm/${id}

Muchisimas Gracias \n\n
Recomendia \n
    `;
        
    // email message options
    const mailOptions = {
        from: 'pruebamoray2022@gmail.com',
        to: email,
        subject: `Confirmacion de Registro - Recomendia`,
        text: registroResponse
    }

    // email transport configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pruebamoray2022@gmail.com',
            pass: 'lbykuilsujxwbavd'
        },
        tls : { rejectUnauthorized: false }
    });

    // send email
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            throw 'Ocurrio un error enviando el mail'
        } else {
            console.log('Email send: ' + info.response);
        }
    });

}



export const sendRecoverPassMail = async (email, token) => {

    const registroResponse = `
Hola! te enviamos este mail para que recuperes tu contraseña \n

Por favor, debes ingresar al siguiente link: http://localhost:3000/auth/restore/${token}

Muchisimas Gracias \n\n
Recomendia \n

Si tu no haz solicitado recuperar la contraseña, por favor informanos de lo siguiente por seguridad
    `;
        
    // email message options
    const mailOptions = {
        from: 'pruebamoray2022@gmail.com',
        to: email,
        subject: `Recuperar contraseña - Recomendia`,
        text: registroResponse
    }

    // email transport configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pruebamoray2022@gmail.com',
            pass: 'lbykuilsujxwbavd'
        }
    });

    // send email
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            throw 'Ocurrio un error enviando el mail'
        } else {
            console.log('Email send: ' + info.response);
        }
    });

}