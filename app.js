// setting up express and create an instance of it
const express = require('express'), app = express();

const bodyParser = require('body-parser');

// setting .env - https://www.npmjs.com/package/dotenv
require('dotenv').config();

// routes
const feedRoutes = require('./routes/feed');

const PORT = process.env.PORT || 3000;

// we will note using urlEncoded => will parse data in format of x-www-for-urlencoded, this is the default data has if submitted through a <form> post request
// app.use(bodyParser.urlEncoded());
// instead we use bodyParser with the json() method
app.use(bodyParser.json()); // will parse json data from incoming request or in format of application/json

// using routes
app.use('/feed', feedRoutes);

app.listen(PORT)
