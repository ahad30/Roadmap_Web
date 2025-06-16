const { body } = require('express-validator');

const signupValidation = [
   body('name')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('name must be between 3 and 30 characters'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid Email Format'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')

];

const signinValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

];

module.exports = {
  signupValidation,
  signinValidation
};