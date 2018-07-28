const functions = require('firebase-functions');
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.disable("x-powered-by");
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const auth = require('./custom_modules/auth');

app.use('/vendor', auth.ValidateAdminToken);
app.use('/vendor/categories', require('./src/categories').router);
app.use('/vendor/providers', require('./src/providers').router);

app.use('/customer', auth.ValidateToken);

app.get('*', (req, res) => res.status(404).json({ success: false, error: 'Not Found' }));

// Expose Express API as a single Cloud Function:
exports.API = functions.https.onRequest(app);
