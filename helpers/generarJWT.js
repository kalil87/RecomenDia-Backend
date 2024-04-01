import jwt from "jsonwebtoken";

export const generarJWT = ( _id = '' ) => {

  return new Promise((resolve, reject) => {
    const payload = { _id };
    jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '365days'
    }, ( err, token ) => {
      if( err ){
        console.log( err );
        reject('No se pudo generar el token');
      } else {
        resolve( token );
      } 
    });
  });
}