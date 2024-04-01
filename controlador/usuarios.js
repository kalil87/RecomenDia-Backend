import Servicio from '../servicio/usuarios.js'

class Controlador {

    constructor() {
        this.servicio = new Servicio()
    }

    olvideContrasena = async (req, res) => {
        const { email } = req.body
        const user = await this.servicio.olvideContrasena(email);
        res.json(user)
    }

    recuperarUsuario = async (req, res) => {
        try {
            const { token, pass } = req.body
            const usuarioGuardado = await this.servicio.recuperarUsuario(token, pass)
            res.json(usuarioGuardado)
        }
        catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    obtenerUsuarios = async (req, res) => {
        const { id } = req.params
        try {
            const usuarios = await this.servicio.obtenerUsuarios(id)    
            res.json(usuarios)
        } catch (error) {
            res.status(400).json({ error: "Ocurrio un error al obtener el usuario" })
        }
        
        
    }

    obtenerUsuariosPorEmail = async (req, res) => {
        const { email } = req.params
        const usuarios = await this.servicio.obtenerUsuariosPorEmail(email)
        res.json(usuarios)
    }

    guardarUsuario = async (req, res) => {
        try {
            const usuario = req.body
            const usuarioGuardado = await this.servicio.guardarUsuario(usuario)
            res.json(usuarioGuardado)
        }
        catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    actualizarUsuario = async (req, res) => {
        const id = req.params.id
        const usuario = req.body
        try {
            const usuarioActualizado = await this.servicio.actualizarUsuario(id, usuario)
            console.log(usuarioActualizado)
            res.json(usuarioActualizado)   
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
    }

    borrarUsuario = async (req, res) => {
        const id = req.params.id
        const usuarioBorrado = await this.servicio.borrarUsuario(id)
        res.json(usuarioBorrado)
    }

    verificarUsuario = async (req, res) => {
        const verifyCode = req.params.confirmationCode;
        const response = await this.servicio.verificarUsuario(verifyCode)
        res.json(response)
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body
            const response = await this.servicio.login(email, password)
            res.json(response)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

}

export default Controlador
