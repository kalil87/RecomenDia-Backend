
import UsuariosDAOMongoDB from "../model/DAO/usuariosMongoDB.js"
import { sendVerifyEmail } from '../utils/sendVerifyEmail.js'
import { validar, validarUpdate, valoresDefecto } from "../validaciones/usuarios.js" 

class Servicio {

    constructor() {
        this.model = new UsuariosDAOMongoDB();
    }

    olvideContrasena = async email => {
        const user = await this.model.olvideContrasena(email);
        return user;
    }

    recuperarUsuario = async (token, pass) => {
        try {
            const usuarioRecuperado = await this.model.recuperarUsuario(token, pass);
            return usuarioRecuperado
        }
        catch (error) {
            console.log(error)
            throw error;
        }
    }

    obtenerUsuarios = async id => {
        const usuarios = await this.model.obtenerUsuarios(id)
        return usuarios
    }

    obtenerUsuariosPorEmail = async email => {
        const usuarios = await this.model.obtenerUsuariosPorEmail(email)
        return usuarios
    }

    guardarUsuario = async usuario => {
        const res = validar(usuario)
        if (res.result) {
            const finalUser = valoresDefecto(usuario);
            const usuarioGuardado = await this.model.guardarUsuario(finalUser);
            sendVerifyEmail(usuarioGuardado.email, usuarioGuardado._id);
            return usuarioGuardado
        }
        else {
            throw res.error
        }
    }

    actualizarUsuario = async (id, usuario) => {
        const res = validarUpdate(usuario)
        if (res.result) {
            const usuarioActualizado = await this.model.actualizarUsuario(id, usuario)
            return usuarioActualizado
        }
        else {
            throw res.error
        }
        
    }

    borrarUsuario = async id => {
        const usuarioBorrado = await this.model.borrarUsuario(id)
        
        if(Object.keys(usuarioBorrado).length === 0){
            return 'El usuario no existe'
        }
        
        return usuarioBorrado
    }

    verificarUsuario = async code => {
        const usuario = await this.model.obtenerUsuarios(code)
        if(Object.keys(usuario).length > 0){
            const newUser = { ...usuario, verificado: true }
            await this.actualizarUsuario(usuario._id, newUser)
            return 'Usuario confirmado con exito';
        } else {
            return 'Ocurrio un error al verificar el usuario'
        }
    }

    login = async (email = '', password = '') => {
        const usuario = await this.model.login(email, password)
        return usuario
    }

    logout = async (token) => {
        const resp = await this.model.logout(token)
        return resp
    }

}


export default Servicio