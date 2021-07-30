const authService = require("../../services/authService");
const userService = require("../../services/userService");

/**
 *  @method  - POST
 *  @desc    - Register new user
 */
exports.signUp = async (req, res) => {
  try {
    let errors = [];

    const newUser = await authService.signUp(req.body);

    if (newUser && newUser.length)
      newUser.map((err) => {
        switch (err) {
          case "emailErr":
            errors.push({
              param: "email",
              msg: "Email address already exists.",
            });
            break;

          case "contactErr":
            errors.push({ param: "contact", msg: "Contact already exists." });
            break;
        }
      });

    if (errors.length) return res.status(409).send({ errors: errors });

    return res.status(201).send({ msg: "Successfully Registered." });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

/**
 *  @method  - POST
 *  @desc    - Signing in a user
 */
exports.signIn = async (req, res) => {
  try {
    let accessToken = await authService.signIn(req.user);
    if (!accessToken)
      return res.status(401).send({ msg: "Invalid Credentials." });

    return res.status(200).send({ accessToken });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};
