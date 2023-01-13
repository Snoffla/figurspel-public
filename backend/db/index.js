const mysql = require('mysql2');

const env = process.env;

const pool = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const query = (text, params, callback) => {
  return pool.query(text, params, callback)
};

const queryPromise = (queryString, values) =>{
  return new Promise((resolve, reject) => {
      query(queryString, values, (err, res) => {
          if (err) {
              reject(new Error("Database lookup error: " + err));
          }
          else{
              resolve(res);
          }
      });
  });
}
module.exports = {
  query: query,
  queryPromise: queryPromise
}