const jwt = require('jsonwebtoken');
const { errorCatcher, throwError } = require('../helpers/error-handler/error-catcher');

module.exports = async (req, res, next) => {

  try {
    const authHeader = await req.get('Authorization');
    if (!authHeader) throwError(401, 'Not authenticated!');
    const token = authHeader.split(" ")[1]; // getting the header value from the client "Bearer ${this.props.token}"
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) throwError(401, 'Not authenticated!');
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    errorCatcher(err, next);
  }
}

// TO ADD THE TOKEN IN THE CLIENT SIDE:
// before we added it in the query params (/feed/posts?token=sometokenhere) but now we will use headers
// fetch(`http://localhost:8080/feed/posts?page=${page}`, {
//   headers: {
//     Authorization: `Bearer ${this.props.token}`
//   } // Bearer is just a common convention for JWT token, not necessary but just for convention
// })
