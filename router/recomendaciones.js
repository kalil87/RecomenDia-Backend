import express from 'express'
import RecomendacionesController from '../controlador/recomendaciones.js'



class RouterRecomendaciones {
  constructor() {
    this.router = express.Router()
    this.controlador = new RecomendacionesController()
  }

  start() {
    this.router.get('/masBuscado', this.controlador.obtenerMasBuscado)
    this.router.post('/', this.controlador.generarConsulta)
    this.router.get('/misRecomendaciones/:id?', this.controlador.obtenerMisRecomendaciones)
    this.router.get('/:id?', this.controlador.obtenerRecomendaciones)
    this.router.put('/:id', this.controlador.actualizarRecomendacion)
    this.router.delete('/:id', this.controlador.borrarRecomendacion)
    return this.router
  }    
}

export default RouterRecomendaciones