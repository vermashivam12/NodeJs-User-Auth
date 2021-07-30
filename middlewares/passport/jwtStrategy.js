const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const userService = require("../../services/userService");

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (jwtPayload, done) => {
      try {
        const user = await userService.getUser({ _id: jwtPayload.id });
        if (!user) return done(null, false, { msg: "Invalid Credentials." });

        done(null, await user.getUser());
      } catch (error) {
        done(error, false);
      }
    }
  )
);
