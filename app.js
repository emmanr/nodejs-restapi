const express = require('express'),
app = express();

// setting .env - https://www.npmjs.com/package/dotenv
require('dotenv').config();

const feedRoutes = require('./routes/feed');

const PORT = process.env.PORT || 3000;

app.use('/feed', feedRoutes);

app.listen(PORT)
