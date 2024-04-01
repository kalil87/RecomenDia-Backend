import Joi from "joi"

export const validarRecomendacion = recomendacion => {

  const recomendacionSchema = Joi.object({
    idUser: Joi.required(),
    id: Joi.required(),
    message: Joi.string().required(),
    categoriaId: Joi.required(),
    subcategoriaId: Joi.required()
  })
  
  const { error } = recomendacionSchema.validate(recomendacion);
  if(error) {
    return { result: false, error }     // validación falló
  }

  return { result: true }     // validación ok
}