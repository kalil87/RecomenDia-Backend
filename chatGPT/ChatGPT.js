import OpenAI from 'openai';
import dotenv from 'dotenv';
import CategoriasDAOMongoDB from '../model/DAO/categoriasMongoDB.js';
import { ObjectId } from 'mongodb';
import { getPromp } from '../utils/getPrompts.js';

class SingletonOpenAI {
  constructor() {
    if (!SingletonOpenAI.instance) {
      SingletonOpenAI.instance = this;
      dotenv.config();
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    }

    return SingletonOpenAI.instance;
  }

  generarConsulta = async (body) => {
    const { categoria, subcategoria, especificaciones } = body;
    if(categoria === undefined || subcategoria === undefined){
      return {error: true};
    }
    const categoriasModel = new CategoriasDAOMongoDB();
    const categoriaDB = await categoriasModel.obtenerCategorias(categoria)
    const subcategoriaDB = categoriaDB.subCategories.filter(x => x._id == subcategoria)
    const promp = getPromp( categoriaDB.name, subcategoriaDB[0].name, especificaciones )
    const chatCompletion = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: promp }],
      model: 'gpt-3.5-turbo',
    });
    return {...chatCompletion, categoriaId: categoriaDB._id, subcategoriaId: subcategoriaDB[0]._id }
  }
}

export default SingletonOpenAI;