const admin = require('firebase-admin');
admin.initializeApp();
const config = require('../config');

exports.ValidateToken = (request, response, next) => {
    let token = request.headers.authorization || '';
    if (!token) {
        response.status(401).send({
            success: false,
            error: 'Authorization Not Found!'
        }).end();
    } else {
        admin.auth().verifyIdToken(token).then(decodedToken => {
            // console.log('decodedToken', decodedToken);
            response.locals.user = decodedToken;
            next();
            return true;
        }).catch(error => {
            response.status(403).send({
                success: false,
                error: 'Authentication Failed / Unauthorized'
            }).end();
        });
    }
};

exports.ValidateAdminToken = (request, response, next) => {
    let token = request.headers.authorization || '';
    if (!token) {
        response.status(401).send({
            success: false,
            error: 'ADMIN Authorization Not Found!'
        }).end();
    } else {
        admin.auth().verifyIdToken(token).then(decodedToken => {
            // console.log('decodedToken', decodedToken);
            response.locals.user = decodedToken;
            if ((config.authorizedAdministrators.map(admin => { return admin.uid })).indexOf(decodedToken.uid) >= 0) {
                next();
                return true;
            } else {
                response.status(403).send({
                    success: false,
                    error: 'Unauthorized, this Endpoint is only for ADMIN!'
                }).end();
                return false;
            }
        }).catch(error => {
            response.status(403).send({
                success: false,
                error: 'ADMIN Authentication Failed / Unauthorized'
            }).end();
        });
    }
};