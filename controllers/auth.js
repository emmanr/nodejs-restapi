const User = require('../models/user');

// modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// helpers
const { errorCatcher, throwError } = require('../helpers/error-handler/error-catcher');
const validationError = require('../helpers/error-handler/validation-handler');

exports.signup = async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    validationError(req, "Validation failed! Entered data is incorrect.");
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await new User({
      email: email,
      name: name,
      password: hashedPassword
    });

    const result = await user.save();
    if (!result) throwError(422, "Register failed!");
    res.status(201).json({ message: "User created!", userId: result._id })
  } catch (err) {
    errorCatcher(err, next);
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email: email});
    if (!user) throwError(401, "Login failed!");

    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) throwError(401, "Login failed!"); // if user passed check, but password comparing fails

    const token = await jwt.sign({
      email: user.email,
      userId: user._id.toString()
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({token: token, userId: user._id.toString()});
  } catch (err) {
    errorCatcher(err, next);
  }
}
