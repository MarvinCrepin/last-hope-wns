require('dotenv').config();
const mysql = require('mysql');

let config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

if (process.env.NODE_ENV === 'test') {
  config = {
    host: process.env.DB_TEST_HOST,
    port: process.env.DB_TEST_PORT,
    user: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASS,
    database: process.env.DB_TEST_NAME,
  };
}

const connection = mysql.createPool(config);

const query = (...args: any) =>
  new Promise((resolve, reject) => {
    connection.query(...args, (err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

const closeConnection = () =>
  new Promise((resolve, reject) => {
    if (connection) {
      connection.end((err: any, res: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    } else {
      resolve(true);
    }
  });
module.exports = {
  connection,
  closeConnection,
  query,
};
