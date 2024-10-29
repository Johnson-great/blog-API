const express = require("express");
const dotenv = require("dotenv");

require("./api/models/modelsSync");

// Loads the env variables
dotenv.config();

// Create an instance of the express server
const app = express();

// enable the parsing of JSON in the request body
app.use(express.json());


// setup a port for the app from env file or 5000
const PORT = process.env.PORT || 5000;

// listen for requests
app.listen(PORT, () => {
    console.log(`App listening op http://127.0.0.1:${PORT}`);
});
