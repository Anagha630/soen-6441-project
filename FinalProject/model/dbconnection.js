import * as mysql from 'mysql2'

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '123456',
  database: 'music'
});

export function executeQuery(query){
    con.connect((err)=>{
        if(err) throw err;
    })
    return new Promise((resolve, reject) => {
        con.query(query, function(err, result, fields) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });

}