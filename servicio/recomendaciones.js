import { ObjectId } from "mongodb";
import SingletonOpenAI from "../chatGPT/ChatGPT.js";
import RecomendacionesDAOMongoDB from "../model/DAO/recomendacionMongoDB.js";
import { validarRecomendacion } from "../validaciones/recomendaciones.js";


class Recomendaciones {

  constructor() {
    this.openAI = new SingletonOpenAI();
    this.model = new RecomendacionesDAOMongoDB();
  }

  generarConsulta = async consulta => {
    const response = await this.openAI.generarConsulta(consulta)
    if(response.error){
      return []
    }
    this.guardarRecomendacionBD(response, consulta.idUser)
    return response.choices.length > 0 
      ? {
        id: response.id,
        message: response.choices[0].message.content
      }
      : [];
  }

  guardarRecomendacionBD = async (recomendacion, idUser) => {
    const recomendacionToSave = {
      id: recomendacion.id, 
      idUser: idUser, 
      message: recomendacion.choices[0].message.content,
      categoriaId: recomendacion.categoriaId,
      subcategoriaId: recomendacion.subcategoriaId
    };
    const res = validarRecomendacion(recomendacionToSave)
    if(res.result){
      await this.model.guardarRecomendacion(recomendacionToSave)
    } else {
      console.log(recomendacionToSave)
      console.log(res.error)
    }
  }

  obtenerRecomndaciones = async (id) => {
    const recomendaciones = await this.model.obtenerRecomendacion(id)
    return recomendaciones
  }

  actualizarRecomendacion = async (id, recomendacion) => {
    const recomendacionActualizada = await this.model.actualizarRecomendacion(id, recomendacion);
    return recomendacionActualizada;
  }

  obtenerMisRecomendaciones = async (idUser) => {
    const recomendaciones = await this.model.obtenerMisRecomendaciones(idUser)
    return recomendaciones
  }

  obtenerMasBuscado = async () => {
    const masBucado = await this.model.obtenerMasBuscado();
    return masBucado
  }

  borrarRecomendacion = async (id) => {
    const recomendacion = await this.model.borrarRecomendacion(id)
    return recomendacion
  }

}

export default Recomendaciones