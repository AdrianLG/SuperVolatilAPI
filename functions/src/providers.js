const express = require("express");
var router = express.Router();
var mysql = require('../custom_modules/mysql');

router.post('/', (request, response) => {
    var payload = request.body || {};
    if (!payload.proveedor) return response.status(200).send({
        success: false,
        error: 'Por favor especifique un proveedor'
    }).end();
    mysql.query("INSERT INTO `supervolatil_proveedores` (`Proveedor`) VALUES ('" + payload.proveedor + "') ON DUPLICATE KEY UPDATE `Activo` = 1;").then(res => {
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
    mysql.query("SELECT Proveedor FROM `supervolatil_proveedores` WHERE Activo = 1;").then(res => {
        return response.status(200).send({
            success: true,
            data: res.map(row => { return row.Proveedor; })
        }).end();
    }).catch(err => {
        response.status(200).send({
            success: false,
            error: JSON.stringify(err)
        }).end();
    });
});

router.delete('/:proveedor', (request, response) => {
    var payload = request.params || {};
    if (!payload.proveedor) return response.status(200).send({
        success: false,
        error: 'Por favor especifique el proveedor a eliminar'
    }).end();
    mysql.query("UPDATE `supervolatil_proveedores` SET `Activo` = 0 WHERE Proveedor = '" + payload.proveedor + "';").then(res => {
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