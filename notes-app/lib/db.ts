import mysql from 'mysql2/promise';

// This file will contain the helper functions used to interact with the MySQL database

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});




