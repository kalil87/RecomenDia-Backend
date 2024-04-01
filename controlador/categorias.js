import Servicio from '../servicio/categorias.js'

class Controlador {

    constructor() {
        this.servicio = new Servicio()
    }

    obtenerCategorias = async (req, res) => {
        const { id } = req.params
        const categorias = await this.servicio.obtenerCategorias(id)
        res.json(categorias)
    }

    guardarCategoria = async (req, res) => {
        try {
            const categoria = req.body
            const categoriaGuardada = await this.servicio.guardarCategoria(categoria)
            res.json(categoriaGuardada)
        }
        catch (error) {
            res.json({ error: error.message })
        }
    }

    actualizarCategoria = async (req, res) => {
        const id = req.params.id
        const categoria = req.body

        const categoriaActualizada = await this.servicio.actualizarCategoria(id, categoria)

        res.json(categoriaActualizada)

    }

    borrarCategoria = async (req, res) => {
        const id = req.params.id
        const categoriaBorrada = await this.servicio.borrarCategoria(id)
        res.json(categoriaBorrada)
    }

    guardarSubCategoria = async (req, res) => {
        const id = req.params.id
        const subCategoria = req.body

        const categoriaActualizada = await this.servicio.guardarSubCategoria(id, subCategoria)

        res.json(categoriaActualizada)
    }

    borrarSubCategoria = async (req, res) => {
        const id = req.params.id
        const idsubcategoria = req.params.idsubcategoria
        const subCategoriaBorrada = await this.servicio.borrarSubCategoria(id, idsubcategoria)
        res.json(subCategoriaBorrada)
    }

    actualizarSubCategoria = async (req, res) => {
        const id = req.params.id
        const idsubcategoria = req.params.idsubcategoria
        const categoria = req.body

        const categoriaActualizada = await this.servicio.actualizarSubCategoria(id, idsubcategoria, categoria)

        res.json(categoriaActualizada)

    }

    crearCategoriaConSub = async (req, res) => {
        const categoria = req.body
        const categoriaCreada = await this.servicio.crearCategoriaConSub(categoria);
        res.json(categoriaCreada)
    }

}

export default Controlador
