const { body } = require('express-validator');

exports.title = body('title', 'Title length should be min of 5 and max of 100.').trim().isLength({min: 5, max: 100});
exports.content = body('title', 'Content length should be min of 5 and max of 1000.').trim().isLength({min: 5, max: 1000});
