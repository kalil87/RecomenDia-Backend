import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"
import { generarJWT } from "../../helpers/generarJWT.js"
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendRecoverPassMail } from "../../utils/sendVerifyEmail.js";
import { validarPass } from "../../validaciones/usuarios.js";

class UsuariosDAOMongoDB {

    constructor() {

    }

    olvideContrasena = async email => {
        if (!CnxMongoDB.connectOk) return [];
        const usuario = await this.obtenerUsuariosPorEmail(email);
        if(usuario) {
            const token = await generarJWT( usuario._id );
            await sendRecoverPassMail(usuario.email, token)
            return {...usuario, token};
        }
        throw {message: "Error al buscar al usuario"}
    }

    recuperarUsuario = async (token, pass) => {
        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await this.obtenerUsuarios(decoded._id);
        if(user) {
            const res = validarPass(pass)
            if (res.result) {
                const salt = bcryptjs.genSaltSync();
                const newPass = bcryptjs.hashSync( pass, salt );
                await CnxMongoDB.db.collection('usuarios').updateOne(
                    {_id: user._id},        // query
                    { $set: { password: newPass }}
                )
                const token = await generarJWT( user._id );
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    nationality: user.nationality,
                    token: token,
                    verificado: true,
                    _id: user._id
                }   
            }
            else {
                throw res.error
            }
        }
        throw {message: "Ocurrio un error al recuperar el usuario"}
    }

    obtenerUsuarios = async id => {
        if (!CnxMongoDB.connectOk) return []
        if (id) {
            const usuarios = await CnxMongoDB.db.collection('usuarios').findOne({ _id: new ObjectId(id) })
            return usuarios || []
        }
        else {
            const usuarios = await CnxMongoDB.db.collection('usuarios').find({}).toArray()
            return usuarios
        }
    }

    obtenerUsuariosPorEmail = async email => {
        
        if (!CnxMongoDB.connectOk) return []
        if (email) {
            const usuarios = await CnxMongoDB.db.collection('usuarios').findOne({ email })
            return usuarios || {}
        }
        else {
            const usuarios = await CnxMongoDB.db.collection('usuarios').find({}).toArray()
            return usuarios
        }
    }

    guardarUsuario = async usuario => {
        if(!CnxMongoDB.connectOk) return {}

        const user = await CnxMongoDB.db.collection('usuarios').findOne({ email: usuario.email })
        if(user === null){

            // Encriptar la contrasenia
            const salt = bcryptjs.genSaltSync();
            usuario.password = bcryptjs.hashSync( usuario.password, salt );

            await CnxMongoDB.db.collection('usuarios').insertOne(usuario)
            return {
                name: usuario.name,
                email: usuario.email,
                nationality: usuario.nationality,
                verificado: false,
                _id: usuario._id
            }
        }

        throw {message: "El mail ya se encuentra registrado"}
        
    }

    actualizarUsuario = async (id, usuario) => {
        if(!CnxMongoDB.connectOk) return {}

        const user = {
            name: usuario.name,
            email: usuario.email,
            nationality: usuario.nationality,
            verificado: usuario.verificado
        }

        await CnxMongoDB.db.collection('usuarios').updateOne(
            {_id: new ObjectId(id)},        // query
            { $set: user }
        )

        const usuarioActualizado = await this.obtenerUsuarios(usuario._id)
        return usuarioActualizado
    }

    borrarUsuario = async id => {
        if(!CnxMongoDB.connectOk) return {}

        const usuarioEliminado = await this.obtenerUsuarios(id)
        await CnxMongoDB.db.collection('usuarios').deleteOne({_id: new ObjectId(id)})

        return usuarioEliminado
    }

    login = async (email = '', password = '') => {

        // Verificar si el email existe
        const usuario = await CnxMongoDB.db.collection('usuarios').findOne({ email: email })
        if( !usuario ) {
            throw {message: "Mail o contraseña no son correctos"}
        }

        // Verificar la contrasenia
        const validPass = bcryptjs.compareSync( password, usuario.password );
        if( !validPass ){
            throw {message: "Mail o contraseña no son correctos"}
        }

        // verifico si el usuario esta verificado
        if( !usuario.verificado ) {
            throw {message: "El usuario no esta validado"}
        }

        // Generar el JWT
        const token = await generarJWT( usuario._id );

        // Crear un objeto de retorno sin la contraseña
        const usuarioSinContraseña = {
            id: usuario._id,
            name: usuario.name,
            email: usuario.email,
            nationality: usuario.nationality,
            token: token,
        };

        return usuarioSinContraseña;
    }

    logout = async (token = '') => {
        jwt.verify(token, process.env.SECRETORPRIVATEKEY, function(err, decoded) {
            if (err) {
                throw {message: "Error al autenticar el token"}
            }
            // Elimina el token JWT actual
            return true;
        });
    }


}

export default UsuariosDAOMongoDB