const express = require("express");
var router = express.Router();
var mysql = require('../custom_modules/mysql');

router.post('/', (request, response) => {
    var payload = request.body || {};
    if (!payload.categoria) return response.status(200).send({
        success: false,
        error: 'Por favor especifique una categoria'
    }).end();
    mysql.query("INSERT INTO `supervolatil_categorias` (`Categoria`) VALUES ('" + payload.categoria + "') ON DUPLICATE KEY UPDATE `Activa` = 1;").then(res => {
        return response.status(200).send({
            success: true
        }).end();
    }).catch(err => {
        response.status(200).send({
            success: false,
            error: JSON.stringify(err)
        }).end();
    });
});

router.get('/', (request, response) => {
    var payload = request.query || {};
    mysql.query("SELECT Categoria FROM `supervolatil_categorias` WHERE `Activa` = 1;").then(res => {
        return response.status(200).send({
            success: true,
            data: res.map(row => { return row.Categoria; })
        }).end();
    }).catch(err => {
        response.status(200).send({
            success: false,
            error: JSON.stringify(err)
        }).end();
    });
});

router.delete('/:categoria', (request, response) => {
    var payload = request.params || {};
    if (!payload.categoria) return response.status(200).send({
        success: false,
        error: 'Por favor especifique la categoria a eliminar'
    }).end();
    mysql.query("UPDATE `supervolatil_categorias` SET `Activa` = 0 WHERE Categoria = '" + payload.categoria + "';").then(res => {
        return response.status(200).send({
            success: true
        }).end();
    }).catch(err => {
        response.status(200).send({
            success: false,
            error: JSON.stringify(err)
        }).end();
    });
});

exports.router = router;