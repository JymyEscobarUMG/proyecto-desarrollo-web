import express from 'express';
import cors from 'cors';
import pool from '../db/conexion';
import userRoutes from '../routes/usuarios.routes';
import campaniasRoutes from '../routes/campanias.routes';
import candidatosRoutes from '../routes/candidatos.routes';
import votosRoutes from '../routes/votos.routes';

class Server{

    private app: express.Application;
    private port: string ;
    private apiPaths = {
        usuarios: '/api/usuarios',
        campanias: '/api/campanias',
        candidatos: '/api/candidatos',
        votos: '/api/votos',
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8080';


        this.middlewares();
        // Definir las rutas de la api
        this.rutas();

        this.dbConexion();
    }

    async dbConexion(){
        try {
            pool
            console.log('Conexion con base de datos');
            
        } catch (error) {
            console.log('Ha ocurrido un error en base de datos: ' + error);
        }
    }

    middlewares(){
        //CORS
        this.app.use( cors());

        //Lectura del body
        this.app.use( express.json() );

        //Carpeta publica
        this.app.use( express.static('public'));

    }


    rutas(){
        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.campanias, campaniasRoutes);
        this.app.use(this.apiPaths.candidatos, candidatosRoutes);
        this.app.use(this.apiPaths.votos, votosRoutes);
    }

    listen(){
        this.app.listen( this.port,() => {
            console.log('Servidor corriendo en http://localhost:' + this.port);
        })
    }

}

export default Server;
