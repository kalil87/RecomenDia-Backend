import express from 'express'
import RouterUsuarios from './router/usuarios.js'
import config from './config.js'
import cors from 'cors'
import CnxMongoDB from './model/DBMongo.js'
import RouterRecomendaciones from './router/recomendaciones.js'
import RouterCategorias from './router/categorias.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors());

// ------------------------------------------
//          API REST Ful : RECOMENDIA
// ------------------------------------------
app.use('/api/usuarios', new RouterUsuarios().start())
app.use('/api/recomendacion', new RouterRecomendaciones().start())
app.use('/api/categorias', new RouterCategorias().start())

//-------------------------------------------
//      Listen del servidor express
//-------------------------------------------

// HACER LA CONEXION A LA BASE DE DATOS ACA
await CnxMongoDB.conectar()


const PORT = config.PORT
const server = app.listen(PORT, () => console.log(`Servidor http express escuchando en http://127.0.0.1:${PORT}`))
server.on('error', error => console.log(`Error en servidor: ${error.message}`))


