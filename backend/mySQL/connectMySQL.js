const mysql = require('mysql2');

const createDatabase = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
    });

    connection.query('CREATE DATABASE IF NOT EXISTS reviewMeSQL', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }

      connection.end();
    });
  });
};

const createTable = () => {
  return new Promise((resolve, reject) => {
    const dbConnection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'reviewMeSQL',
    });

    const query = `
      CREATE TABLE IF NOT EXISTS user_credentials (
        userId INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )`;

    dbConnection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }

      dbConnection.end();
    });
  });
};

const createUser = (userInfo) => {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'reviewMeSQL',
      });
  
      const query = `
        INSERT INTO user_credentials (email, firstName, lastName, password)
        VALUES (?, ?, ?, ?)`;
  
      const { email, firstName, lastName, password } = userInfo;
  
      dbConnection.query(
        query,
        [email, firstName, lastName, password], // Store the encrypted password
        (err, results) => {
          if (err) {
            reject({ error: 'Error creating a user in MySQL' });
          } else {
            resolve({ success: 'User created in MySQL' });
          }
  
          dbConnection.end();
        }
      );
    });
  };

module.exports = { createDatabase, createTable, createUser};