const passport = require("passport");
const app = require("express").Router();

require("../middlewares/passport/jwtStrategy");
require("../middlewares/passport/localStrategy");

app.all("/*", (req, res, next) => {
  if (req.path === "/")
    return res.status(200).send({ msg: "Spak Backend Server." });
  else if (req.path === "/auth/sign_up") next();
  else if (req.path === "/auth/sign_in") {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (!user || err || info != undefined)
        return res.status(401).send({ msg: "Invalid Credentials." });

      req.user = user;
      next();
    })(req, res, next);
  } else {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (!user || err || info != undefined)
        return res.status(401).send({ msg: "Invalid Credentials." });

      req.user = user;
      next();
    })(req, res, next);
  }
});

app.use("/auth", require("./auth/authRoute"));
app.use("/users", require("./users/userRoute"));

module.exports = app;
