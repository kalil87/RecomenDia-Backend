import Joi from "joi"

export const validar = categoria => {

    const categoriaSchema = Joi.object({
        name: Joi.string().required(),
        subCategories: Joi.any().required()
    })
    
    const { error } = categoriaSchema.validate(categoria);
    if(error) {
        return { result: false, error }     // validación falló
    }

    return { result: true }     // validación ok
}