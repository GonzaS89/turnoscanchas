import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
    host:'b7dytv4f6tpscr3avqdp-mysql.services.clever-cloud.com',
    user:'uhuznve5mzltadzd',
    password:'bfPKxGTF8W67LbHDPbpj',
    database:'b7dytv4f6tpscr3avqdp'
});

db.connect((error) => {
    if(error){
        console.error('error al conectar la DB')
    }else {
        console.log('Db conectada con éxito')
    }
});

export default db;