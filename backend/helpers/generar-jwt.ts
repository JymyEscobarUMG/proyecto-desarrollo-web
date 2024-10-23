const jwt = require('jsonwebtoken');

export const generarJWT = ( idusuariosistema = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { idusuariosistema };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: `${process.env.EXPIRES}`
        }, ( err: Error | null, token: string | undefined ) => {
            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}
