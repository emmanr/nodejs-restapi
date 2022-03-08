const { body } = require('express-validator');
const User = require('../../models/user');

exports.email = body('email', 'Email is invalid!').isEmail().normalizeEmail().custom(async (val, { req }) => {
  const userExist = await User.findOne(({email: val}));
  if (userExist) return Promise.reject('Email already exists.');
});

exports.password = body('password', 'Password length should be min of 6 characters, with one number, special character and letters.').trim().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "i");

exports.name = body('name', 'Name is invalid').trim().notEmpty();
