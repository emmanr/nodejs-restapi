const path = require('path');
// setting up express and create an instance of it
const express = require('express'), app = express();

// modules
const bodyParser = require('body-parser');

// middlewares
const cors = require('./middleware/cors');
const errorHandler = require('./middleware/error-handler');

// helpers
const multerHelper = require('./helpers/multer-helper');

// setting .env - https://www.npmjs.com/package/dotenv
require('dotenv').config();

// database connection
const connection = require('./connection');

// routes
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 8080;

// will not use urlEncoded => this parse data in format of x-www-for-urlencoded, this is the default data if submitted through a <form> post request - app.use(bodyParser.urlEncoded());
// instead will use bodyParser with json() method
app.use(bodyParser.json()); // will parse json data from incoming request or in format of application/json
app.use(multerHelper);
app.use('/images', express.static(path.join(__dirname, 'images'))); // the path in our root folder with /images(__dirname, 'images') will be serve staticly for request going to "/post-images"
app.use(cors);

// routes
app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

connection(process.env.DB_CONNECT);
app.listen(PORT)
