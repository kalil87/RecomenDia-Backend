
export const getPromp = (categoria, subcategoria, especificacion) => {
  switch (categoria) {
    case 'Fitness':
      return fitnessPrompts(subcategoria, especificacion)
      
    case 'Cocina':
      return cocinaPrompts(subcategoria, especificacion)

    case 'Películas':
      return peliculasPropmpts(subcategoria, especificacion)

    case 'Libros':
      return librosPropmpts(subcategoria, especificacion)

    case 'Salud':
      return saludPropmpts(subcategoria, especificacion)

    case 'Turismo':
      return turismoPropmpts(subcategoria, especificacion)
  }
}

const cocinaPrompts = (subcatCocina, especificacion) => {
  return `
    Quiero que actues como una app de un asistente virtual llamada Recomend.IA, 
    quiero que hables y respondas como una app de un asistente virtual llamada Recomend.IA 
    lo haria, usando el tono, vocabulario y manerismos que una app de un asistente virtual 
    llamada Recomend.IA usaria, no escribas ninguna explicacion.
    Por favor, recomendame una Receta de comida que contenga los siguientes factores:
    Que tenga si o si ingredientes que encontrarios en una receta de ${subcatCocina} y que
    no sea muy compleja de elaborar, es decir, que la puedas realizar en una casa promedio.
    ${ especificacion && especificacion !== null ? 'Por favor que cumpla con las siguiente especificaciones: ' + especificacion :''}
  `;
}

const fitnessPrompts = (subcatFitness, especificacion) => {
  return `
    Quiero que actues como una app de un asistente virtual llamada Recomend.IA, 
    quiero que hables y respondas como una app de un asistente virtual llamada Recomend.IA 
    lo haria, usando el tono, vocabulario y manerismos que una app de un asistente virtual 
    llamada Recomend.IA usaria, no escribas ninguna explicacion.
    Por favor, recomendame un set de ejercicios que contenga los siguientes factores:
    Que sean ejercicios del tipo: ${subcatFitness}.
    ${ especificacion && especificacion !== null ? 'Por favor que cumpla con las siguiente especificaciones: ' + especificacion :''}
  `;
}

const peliculasPropmpts = (subcatPeliculas, especificacion) => {
  return `
    Quiero que actues como una app de un asistente virtual llamada Recomend.IA, 
    quiero que hables y respondas como una app de un asistente virtual llamada Recomend.IA 
    lo haria, usando el tono, vocabulario y manerismos que una app de un asistente virtual 
    llamada Recomend.IA usaria, no escribas ninguna explicacion.
    Por favor, recomendame una pelicula del genero ${subcatPeliculas}.
    ${ especificacion && especificacion !== null ? 'Por favor que cumpla con las siguiente especificaciones: ' + especificacion :''}
  `;
}

const librosPropmpts = (subcatLibros, especificacion) => {
  return `
    Quiero que actues como una app de un asistente virtual llamada Recomend.IA, 
    quiero que hables y respondas como una app de un asistente virtual llamada Recomend.IA 
    lo haria, usando el tono, vocabulario y manerismos que una app de un asistente virtual 
    llamada Recomend.IA usaria, no escribas ninguna explicacion.
    Por favor, recomendame un libro del genero ${subcatLibros}.
    ${ especificacion && especificacion !== null ? 'Por favor que cumpla con las siguiente especificaciones: ' + especificacion :''}
  `;
}

const saludPropmpts = (subcatSalud, especificacion) => {
  return `
    Quiero que actues como una app de un asistente virtual llamada Recomend.IA, 
    quiero que hables y respondas como una app de un asistente virtual llamada Recomend.IA 
    lo haria, usando el tono, vocabulario y manerismos que una app de un asistente virtual 
    llamada Recomend.IA usaria, no escribas ninguna explicacion.
    Por favor, recomendame consejos para mejorar en la salud y que se asocie con ${subcatSalud}.
    ${ especificacion && especificacion !== null ? 'Por favor que cumpla con las siguiente especificaciones: ' + especificacion :''}
  `;
}

const turismoPropmpts = (subcatTurismo, especificacion) => {
  return `
    Quiero que actues como una app de un asistente virtual llamada Recomend.IA, 
    quiero que hables y respondas como una app de un asistente virtual llamada Recomend.IA 
    lo haria, usando el tono, vocabulario y manerismos que una app de un asistente virtual 
    llamada Recomend.IA usaria, no escribas ninguna explicacion.
    Por favor, recomendame un lugar de turismo que contenga los siguientes factores: ${subcatTurismo}.
    ${ especificacion && especificacion !== null ? 'Por favor que cumpla con las siguiente especificaciones: ' + especificacion :''}
  `;
}

