const User = require('../models/user');

const bcrypt = require('bcryptjs');

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
