import mysql from 'mysql2';

export const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise()

export async function getAllCodes(){
    const res2 = await pool.query(`select * from codes`);
    return res2;
} 

export async function insertNewCode(username , srcCode , stdinp , lang , stdout , status){
    try{
        await pool.query(`INSERT INTO codes (username , sourceCode , stdinput , language , stdoutput , status) VALUES (? , ? , ? , ? , ? , ?);`, [username , srcCode , stdinp , lang , stdout , status]);
    }catch{
        return -1;
    }
    return 1;
}

export async function getCodeById(k){
    const res1 = await pool.query(`select * from codes where id = ?` , [k]);
    return res1;
}

