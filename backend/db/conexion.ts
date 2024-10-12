import pg from 'pg'
const { Pool } = pg

const pool = new Pool(
    {
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        host: process.env.DBHOST,
        port: Number(process.env.DBPORT),
        database: process.env.DBDATABASE,
    }
);


export default pool;