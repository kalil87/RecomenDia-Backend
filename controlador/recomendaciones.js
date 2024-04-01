import Recomendaciones from "../servicio/recomendaciones.js";


class RecomendacionesController {

  constructor() {
    this.servicio = new Recomendaciones()
  }

  generarConsulta = async (req, res) => {
    const body = req.body
    const response = await this.servicio.generarConsulta(body)
    res.json(response)
  }

  obtenerRecomendaciones = async (req, res) => {
    const { id } = req.params
    const recomendaciones = await this.servicio.obtenerRecomndaciones(id)
    res.json(recomendaciones)
  }

  obtenerMisRecomendaciones = async (req, res) => {
    // const {idUser} = req.body
    const { id } = req.params;
    const recomendaciones = await this.servicio.obtenerMisRecomendaciones(id)
    res.json(recomendaciones)
  }

  obtenerMasBuscado = async (req, res) => {
    const masBuscado = await this.servicio.obtenerMasBuscado();
    res.json(masBuscado)
  }

  actualizarRecomendacion = async (req, res) => {
    const id = req.params.id;
    const recomendacion = req.body;
    try {
      const recomendacionActualizado = await this.servicio.actualizarRecomendacion(id, recomendacion)
      res.json(recomendacionActualizado)
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: error.message })
    }
  }


  borrarRecomendacion = async (req, res) => {
    const id = req.params.id
    try {
      const recomendacion = await this.servicio.borrarRecomendacion(id)
      res.json(recomendacion) 
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

}

export default RecomendacionesController