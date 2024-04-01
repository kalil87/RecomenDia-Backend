import express from 'express'
import Controlador from '../controlador/categorias.js'


class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    start() {
        this.router.get('/:id?', this.controlador.obtenerCategorias)
        this.router.post('/', this.controlador.guardarCategoria)
        this.router.post('/categoriaConSub', this.controlador.crearCategoriaConSub)
        this.router.put('/:id', this.controlador.actualizarCategoria)
        this.router.delete('/:id', this.controlador.borrarCategoria)
        this.router.post('/subcategorias/:id', this.controlador.guardarSubCategoria)
        this.router.delete('/subcategorias/:id/:idsubcategoria', this.controlador.borrarSubCategoria)
        this.router.put('/subcategorias/:id/:idsubcategoria', this.controlador.actualizarSubCategoria)
        return this.router
    }    
}

export default Router