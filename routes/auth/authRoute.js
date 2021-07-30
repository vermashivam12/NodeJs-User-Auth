const express = require("express");
const {
  validateSignIn,
  validateSignUp,
} = require("../../middlewares/validators/authValidator");
const { signUp, signIn } = require("../../controllers/auth/authController");

const route = express.Router();

route.route("/sign_in").post(validateSignIn, signIn);
route.route("/sign_up").post(validateSignUp, signUp);

module.exports = route;
