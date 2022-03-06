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

app.use((req, res, next) => {
  // middleware to disable CORS in browser, this is most commonly use for sharing API(data) to different server or host
  // res.setHeader('Access-Control-Allow-Origin', 'www.facebook.com'); we can lock on where site we will share our data, but if we want to share it to all will use *(wildcard)
  // if has multiple domains, we can separate it with commans ('Access-Cont...', 'mydomain.com, domain2.com, sparkledomain.com')
  res.setHeader('Access-Control-Allow-Origin', '*'); // note that this is only data, not the method we can allow like post or get
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // to allow methods or specific methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // to allow our clients to set their own headers, but we can also specify what kind of headers
  // Authorization - for authorizing user in our client to what to access, and for the client to set content-type (note client means browser or any server);
  next();
});

// using routes
app.use('/feed', feedRoutes);

app.listen(PORT)
