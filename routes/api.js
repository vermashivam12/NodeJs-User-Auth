const passport = require("passport");
const app = require("express").Router();

app.all("/*", (req, res, next) => {
  if (req.path === "/")
    return res.status(200).send({ msg: "Spack Backend Server." });
});

// app.use("/auth", require("./authRoute"));
// app.use("/users", require("./tagRoute"));

module.exports = app;
