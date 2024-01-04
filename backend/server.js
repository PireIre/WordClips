const express = require('express');
const cors = require('cors');
const { admin } = require('./firebase'); // Import the new module
const routes = require('./routes'); // Import the routes

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

app.use('/', routes); // Use the routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
