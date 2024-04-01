import Joi from "joi"

export const validar = usuario => {

    const usuarioSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string()
            .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&+=])(?=\S+$).{6,12}$/)
            .error(new Error('La contraseña no cumple con los requisitos')),
        nationality: Joi.string().required(),
    })
    
    const { error } = usuarioSchema.validate(usuario);
    if(error) {
        return { result: false, error }     // validación falló
    }

    return { result: true }     // validación ok
}

export const valoresDefecto = usuario => {
    console.log("usuario antes de verificar", usuario.verificado);
    usuario.verificado = false;
    console.log("usuario despues de verificar", usuario.verificado);
    return usuario;
}

export const validarUpdate = usuario => {

    const usuarioSchema = Joi.object({
        _id: Joi.required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.required(),
        nationality: Joi.string().required(),
        verificado: Joi.boolean().required()
    })
    
    const { error } = usuarioSchema.validate(usuario);
    if(error) {
        return { result: false, error }     // validación falló
    }

    return { result: true }     // validación ok
}


export const validarPass = pass => {
    const passScheme = Joi.object({
        password: Joi.string()
            .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&+=])(?=\S+$).{6,12}$/)
            .error(new Error('La contraseña no cumple con los requisitos')),
    })

    const { error } = passScheme.validate({password: pass});
    if(error) {
        console.log(error)
        return { result: false, error }     // validación falló
    }

    return { result: true }     // validación ok
}