import express from 'express'
import Controlador from '../controlador/usuarios.js'


class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    start() {
        this.router.get('/:id?', this.controlador.obtenerUsuarios)
        this.router.get('/email/:email?', this.controlador.obtenerUsuariosPorEmail)
        this.router.put('/recuperar', this.controlador.recuperarUsuario)
        this.router.post('/', this.controlador.guardarUsuario)
        this.router.put('/:id', this.controlador.actualizarUsuario)
        this.router.delete('/:id', this.controlador.borrarUsuario)
        this.router.get('/confirm/:confirmationCode', this.controlador.verificarUsuario)
        this.router.post('/login', this.controlador.login)
        this.router.post('/olvide-contrasena', this.controlador.olvideContrasena)
        return this.router
    }    
}

export default Router