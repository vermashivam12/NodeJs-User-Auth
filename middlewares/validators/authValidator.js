const { check, validationResult } = require("express-validator");

exports.validateSignIn = [
  check("email")
    .trim()
    .escape()
    .normalizeEmail({ remove_dots: true })
    .not()
    .isEmpty()
    .withMessage("Please enter email address.")
    .bail()
    .isEmail()
    .withMessage("Please enter valid email address.")
    .bail(),

  check("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Please enter password.")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be minimum 6 characters long.")
    .bail()
    .isLength({ max: 15 })
    .withMessage("Password must be maximum 15 characters long.")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).send({ errors: errors.array() });
    next();
  },
];

exports.validateSignUp = [
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Please enter your name.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Name must be minimum 2 characters long.")
    .bail()
    .isLength({ max: 25 })
    .withMessage("Name must be maximum 25 characters long.")
    .bail()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must be alphabetic (A-Z, a-z).")
    .bail(),

  check("contact")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Please enter your contact number.")
    .bail()
    .isLength({ min: 10, max: 10 })
    .withMessage("Number must be 10 digits long.")
    .bail()
    .isNumeric()
    .withMessage("Number must be numeric (0-9).")
    .bail(),

  check("gender")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Please select your gender.")
    .bail(),

  check("address")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Please enter your address.")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Address must be minimum 5 characters long.")
    .bail()
    .isLength({ max: 500 })
    .withMessage("Address must be maximum 500 characters long.")
    .bail(),

  check("country")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Please enter your country.")
    .bail()
    .isLength({ min: 4 })
    .withMessage("Address must be minimum 4 characters long.")
    .bail()
    .isLength({ max: 56 })
    .withMessage("Address must be maximum 56 characters long.")
    .bail(),

  check("email")
    .trim()
    .escape()
    .normalizeEmail({ remove_dots: true })
    .not()
    .isEmpty()
    .withMessage("Please enter email address.")
    .bail()
    .isEmail()
    .withMessage("Please enter valid email address.")
    .bail(),

  check("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Please enter password.")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be minimum 6 characters long.")
    .bail()
    .isLength({ max: 15 })
    .withMessage("Password must be maximum 15 characters long.")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).send({ errors: errors.array() });
    next();
  },
];
