const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Adjust the path

const app = express();

// Enable CORS
app.use(cors());

app.use('/', routes); // Use the routes

// Expose Express app as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
