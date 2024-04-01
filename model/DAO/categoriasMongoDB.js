import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class CategoriasDAOMongoDB {

    constructor() {

    }

    obtenerCategorias = async id => {
        if (!CnxMongoDB.connectOk) return id ? {} : []
        if (id) {
            const categorias = await CnxMongoDB.db.collection('categorias').findOne({ _id: new ObjectId(id) })
            return categorias || {}
        }
        else {
            const categorias = await CnxMongoDB.db.collection('categorias').find({}).toArray()
            return categorias
        }
    }

    guardarCategoria = async categoria => {
        if (!CnxMongoDB.connectOk) return {}

        await CnxMongoDB.db.collection('categorias').insertOne(categoria)
        return categoria
    }

    actualizarCategoria = async (id, categoria) => {
        if (!CnxMongoDB.connectOk) return {}

        const categoria2 = {
            name: categoria.name,
            subCategories: categoria.subCategories.map(x => {
                return {
                    ...x,
                    _id: new ObjectId(x._id)
                }
            })
        }

        await CnxMongoDB.db.collection('categorias').updateOne(
            { _id: new ObjectId(id) },        // query
            { $set: categoria2 }
        )

        const categoriaActualizada = await this.obtenerCategorias(id)
        return categoriaActualizada
    }

    borrarCategoria = async id => {
        if (!CnxMongoDB.connectOk) return {}

        const categoriaEliminada = await this.obtenerCategorias(id)
        await CnxMongoDB.db.collection('categorias').deleteOne({ _id: new ObjectId(id) })

        return categoriaEliminada
    }

    guardarSubCategoria = async (id, subCategoria) => {
        if (!CnxMongoDB.connectOk) return {}

        await CnxMongoDB.db.collection('categorias').updateOne(
            { _id: new ObjectId(id) },        // query
            { $push: { subCategories: { _id: new ObjectId(), name: subCategoria.name } } }
        )

        const categoriaActualizada = await this.obtenerCategorias(id)
        return categoriaActualizada
    }

    borrarSubCategoria = async (id, idSubCategoria) => {
        if (!CnxMongoDB.connectOk) return {}

        await CnxMongoDB.db.collection('categorias').updateOne(
            { _id: new ObjectId(id) },        // query
            { $pull: { subCategories: { _id: new ObjectId(idSubCategoria) } } }
        )

        const categoriaActualizada = await this.obtenerCategorias(id)
        return categoriaActualizada
    }

    actualizarSubCategoria = async (id, idSubCategoria, categoria) => {
        if (!CnxMongoDB.connectOk) return {}

        await CnxMongoDB.db.collection('categorias').updateOne(
            {
              _id: new ObjectId(id),
              subCategories: { $elemMatch: { _id: new ObjectId(idSubCategoria) } }
            },
            { $set: { "subCategories.$.name" : categoria.name } }
         )

        const categoriaActualizada = await this.obtenerCategorias(id)
        return categoriaActualizada
    }

    crearCategoriaConSub = async (categoria) => {
        if (!CnxMongoDB.connectOk) return {}
        const categoriaToSave = {
            name: categoria.name,
            subCategories: categoria.subCategories.map(x => {
                return {
                    _id: new ObjectId(),
                    name: x
                }
            })
        }
        const resp = await this.guardarCategoria(categoriaToSave);
        return resp;
    }

}

export default CategoriasDAOMongoDB