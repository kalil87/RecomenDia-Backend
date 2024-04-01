import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class RecomendacionesDAOMongoDB {

  constructor() {}

  obtenerRecomendacion = async id => {
    if (!CnxMongoDB.connectOk) return id ? [] : []
    if (id) {
      const recomendacion = await CnxMongoDB.db.collection('recomendaciones').findOne({ _id: new ObjectId(id) })
      return recomendacion || []
    }
    else {
      const recomendaciones = await CnxMongoDB.db.collection('recomendaciones').find({}).sort({ _id: -1 }).toArray()
      return recomendaciones
    }
  }

  actualizarRecomendacion = async (id, recomendacion) => {
    if (!CnxMongoDB.connectOk) return []

    const recomendacionParaActualizar = {
      subcategoriaId: recomendacion.subcategoriaId,
      message: recomendacion.message,
      idUser: recomendacion.idUser,
      id: recomendacion.id,
      categoriaId: recomendacion.categoriaId
    }

    await CnxMongoDB.db.collection('recomendaciones').updateOne(
      {_id: new ObjectId(id)},        // query
      { $set: recomendacionParaActualizar }
    )

    const recomendacionActualizada = await this.obtenerRecomendacion(recomendacion._id)
    return recomendacionActualizada
  }

  obtenerMisRecomendaciones = async idUser => {
    if (!CnxMongoDB.connectOk) return []
    const recomendacion = await CnxMongoDB.db.collection('recomendaciones').find({ idUser: idUser}).sort({ _id: -1 }).toArray()
    return recomendacion || []
  }

  guardarRecomendacion = async recomendacion => {
      if (!CnxMongoDB.connectOk) return []

      await CnxMongoDB.db.collection('recomendaciones').insertOne(recomendacion)
      return recomendacion
  }

  borrarRecomendacion = async id => {
    if (!CnxMongoDB.connectOk) return {}

    const recomendacionEliminada = await this.obtenerRecomendacion(id)

    if(recomendacionEliminada.length === 0){
      throw {message: 'La recomendación no existe'}
    }

    await CnxMongoDB.db.collection('recomendaciones').deleteOne({ _id: new ObjectId(id) })
    return recomendacionEliminada
  }

  obtenerMasBuscado = async () => {
    // obtengo las recomendaciones
    const recomendaciones = await CnxMongoDB.db.collection('recomendaciones').find({}).sort({ categoriaId: 1 }).toArray();
    // creo la variable que vamos a devolver que va a ser un array de los siguientes elementos
    // [{ "categoriaId": "Aca el id de la categoria", "recomendaciones": [ aca las remendaciones de esa categoria ] }]
    const resultadoFinal = [];
    recomendaciones.map(x => {
      // agarro el id de la categoria de la recomendacion
      const categoriaId = x.categoriaId;
      // busco si en resultado final ya dividimos y tenemos a esa categoria
      const categoriaExistente = resultadoFinal.find((item) => item.categoriaId == categoriaId);
      if (categoriaExistente) {
        // Si existe, agregamos la recomendación a esa categoría
        categoriaExistente.recomendaciones.push(x);
      } else {
        // Si no existe, creamos una nueva entrada para esa categoría
        resultadoFinal.push({
          categoriaId: categoriaId.toString(),
          recomendaciones: [x]
        });
      }
    })
    // aca las ordenamos para que primero esten las que mas recomendaciones tengan (osea lo mas buscado)
    // y va de forma descendente
    // SIEMPRE el primer elemento va a ser lo mas buscado
    resultadoFinal.sort((a, b) => b.recomendaciones.length - a.recomendaciones.length);
    return resultadoFinal;
  }
}

export default RecomendacionesDAOMongoDB