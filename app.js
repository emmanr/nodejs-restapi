const path = require('path');
const express = require('express'), app = express();

// modules
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// custom middlewares
const cors = require('./middleware/cors');
const errorHandler = require('./middleware/error-handler');

// helpers
const multerHelper = require('./helpers/multer-helper');
const db_connect = require('./helpers/db_connect');

const server = require('./server/server');

// routes
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(multerHelper);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors);

// routes
app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

db_connect();
server(app);
