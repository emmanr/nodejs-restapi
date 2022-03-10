const jwt = require('jsonwebtoken');
const { errorCatcher, throwError } = require('../helpers/error-handler/error-catcher');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    // if (!authHeader) throwError(401, 'Not authenticated!');
    if (!authHeader) {
      const error = new Error('Not authenticated!');
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1]; // getting the header value from the client "Bearer ${this.props.token}"
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }

    if (!decodedToken) throwError(401, 'Not authenticated!');
    req.userId = decodedToken.userId;
    next();
}

// TO ADD THE TOKEN IN THE CLIENT SIDE:
// before we added it in the query params (/feed/posts?token=sometokenhere) but now we will use headers
// fetch(`http://localhost:8080/feed/posts?page=${page}`, {
//   headers: {
//     Authorization: `Bearer ${this.props.token}`
//   } // Bearer is just a common convention for JWT token, not necessary but just for convention
// })
