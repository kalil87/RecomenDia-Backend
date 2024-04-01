# RECOMENDIA

Recomendia: Tu Compañero de Recomendaciones Personales

Recomendia es una innovadora aplicación web y móvil que está diseñada para hacer que tu tiempo libre sea más valioso y emocionante. Con un registro de usuarios fácil de completar y un proceso de incorporación personalizado, esta aplicación te brinda recomendaciones de actividades únicas y atractivas, generadas con la potencia de la inteligencia artificial.



# DOCUMENTACIÓN RECOMENDIA

## ENDPOINTS USUARIOS

### GET: /api/usuarios/:id?
{
        <br />
        "_id": "649726b085e995d3af329623",
        <br />
        "email": "tuemail@gmail.com",
        <br />
        "name": "Nombre",
        <br />
        "lastname": "Apellido",
        <br />
        "phone": "1152323232",
        <br />
        "verificado": true,
        <br />
        "rol": "USER"
        <br />
    }	

Este recurso permite, a partir de un id, acceder a la informacion de un usuario, el cual sera retornado por el servidor 


### POST: /api/usuarios
{
        <br />
        "email": "tuemail@gmail.com",
        <br />
        "password": "tupassword123",
        <br />
        "name": "Nombre",
        <br />
        "lastname": "Apellido",
        <br />
        "phone": "11574123323",
        <br />
        "rol": "USER"
        <br />
 }

El “rol” es un campo opcional, y su validación da lugar a dos escenarios: si se envía “ADMIN” entonces se le asigna ese valor, en cambio si no se envía nada o se envía otro valor, se le asigna el valor por defecto “USER”.

El campo “verificado” va a ser por defecto FALSE y luego de crear un usuario se va a enviar un mail a su casilla con una URL que corresponde al recurso de confirmación para ese usuario. Si el usuario clickea el enlace se enviará al servidor una solicitud para cambiar ese valor booleano a TRUE en la base de datos.


### GET: /api/usuarios/confirm/:confirmationCode

Este servicio se ejecuta al acceder al enlace de confirmación, retornando el mensaje
“Usuario confirmado con éxito”


### PUT: /api/usuarios/:id
{
        <br />
        "email": "tuemail@gmail.com",
        <br />
        "password": "admin1234",
        <br />
        "name": "Nombre",
        <br />
        "lastname": "Apellido",
        <br />
        "phone": "11574123232",
        <br />
        "rol": "USER"
        <br />
  }


Se debe enviar alguno de estos campos para realizar la modificación del usuario, y va a ser retornado el usuario nuevo.


### DELETE: /api/usuarios/:id
{
        <br />
        "_id": "649726b085e995d3af329623",
        <br />
        "email": "tuemail@gmail.com",
        <br />
        "password": "tucontrasena123",
        <br />
        "name": "Nombre",
        <br />
        "lastname": "Apellido",
        <br />
        "phone": "115741232323",
        <br />
        "verificado": true,
        <br />
        "rol": "USER"
        <br />
    }

Se debe enviar por parámetro el id del usuario a eliminar, y luego se retornará el usuario eliminado.

Finalmente, estos son los tipos de los campos de este recurso:

{
        <br />
        "_id": ObjectId,
        <br />
        "email": String,
        <br />
        "password": String,
        <br />
        "name": String,
        <br />
        "lastname": String,
        <br />
        "phone": String,
        <br />
        "verificado": Boolean,
        <br />
        "rol": String
        <br />
 }
