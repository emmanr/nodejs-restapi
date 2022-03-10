const expect = require('chai').expect;
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middleware/is-auth');

describe('Auth Middleware', function() {
  // describe('Header title', function() {}); you can have a nested describe function

  it('should throw an error if no authorization header is present', function() {
    const req = {
      get: function() {
        return null;
      }
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not authenticated!');
  });

  it('should throw an error if the authorization header is only one string', function() {
    const req = {
      get: function() {
        return 'xyz';
      }
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it('should yield a userId after decoding the token', function() {
    const req = {
      get: function() {
        return 'xyz';
      }
    };
    jwt.verify = function() {
      return { userId: 'abc' }
    }
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property('userId');
  });
});
