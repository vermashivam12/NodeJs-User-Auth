const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const userService = require("../../services/userService");

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await userService.getUser({ email: email });
        if (!user) return done(null, false, { msg: "Invalid Credentials." });

        const isValid = await user.validatePassword(password);
        if (!isValid)
          return done(null, false, { msg: "Invalid Credentials." });

        done(null, await user.getUser());
      } catch (error) {
        done(error, false);
      }
    }
  )
);
