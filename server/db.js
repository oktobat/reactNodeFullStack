// 데이터베이스 연결하기
import mysql from 'mysql'
export const db = mysql.createPool({
    host:'localhost',        
    user:'root',               
    password:'1234',           
    database:'starship',       
    connectionLimit: 10, // 필요에 따라 조정하세요
});
// export const db = mysql.createConnection({
//     connectionLimit: 10, // 필요에 따라 조정하세요
//     host:'localhost',        
//     user:'root',               
//     password:'1234',           
//     database:'starship',       
// })
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection error:', err);
//         return;
//     }
//     console.log('Connected to the database.');
// });


