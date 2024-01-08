const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Adjust the path

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

// Enable CORS with dynamic origin configuration
const corsOptions = {
  origin: isProduction ? 'https://wordclips.org' : true, // Set to true for development
};

// Use CORS middleware with dynamic options
app.use(cors(corsOptions));

app.use('/', routes); // Use the routes

// Expose Express app as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
