import CategoriasDAOMongoDB from '../model/DAO/categoriasMongoDB.js';
import { validar } from '../validaciones/categorias.js';

class Servicio {

    constructor() {
        this.model = new CategoriasDAOMongoDB();
    }

    obtenerCategorias = async id => {
        const categorias = await this.model.obtenerCategorias(id)
        return categorias
    }

    guardarCategoria = async categoria => {
        const res = validar(categoria)
        if (res.result) {
            const categoriaGuardada = await this.model.guardarCategoria(categoria);
            return categoriaGuardada
        }
        else {
            throw res.error
        }
    }

    actualizarCategoria = async (id, categoria) => {
        const categoriaActualizada = await this.model.actualizarCategoria(id, categoria)
        return categoriaActualizada
    }

    borrarCategoria = async id => {
        const categoriaBorrada = await this.model.borrarCategoria(id)
        
        if(Object.keys(categoriaBorrada).length === 0){
            return 'La categoría no existe'
        } 
        
        return categoriaBorrada
    }

    guardarSubCategoria = async (id, subCategoria) => {
        const categoriaActualizada = await this.model.guardarSubCategoria(id, subCategoria)
        return categoriaActualizada
    }

    borrarSubCategoria = async (id, idSubCategoria) => {
        const subCategoriaBorrada = await this.model.borrarSubCategoria(id, idSubCategoria)
        
        if(Object.keys(subCategoriaBorrada).length === 0){
            return 'La sub categoría no existe'
        } 
        
        return subCategoriaBorrada
    }

    actualizarSubCategoria = async (id, idSubCategoria, categoria) => {
        const categoriaActualizada = await this.model.actualizarSubCategoria(id, idSubCategoria, categoria)
        return categoriaActualizada
    }

    crearCategoriaConSub = async (categoria) => {
        const categoriaCreada = await this.model.crearCategoriaConSub(categoria);
        return categoriaCreada;
    }

}


export default Servicio