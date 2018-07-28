const promise = require('promise');
const mysql = require('mysql');
const config = require('../config');

exports.query = (query) => {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config.mysqlConnection);
        connection.connect();
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
        connection.end();
    });
};