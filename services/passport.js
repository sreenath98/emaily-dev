const passport = require("passport");
const googleStrategy = require("passport-google-OAuth20").Strategy;
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const keys = require("../config/keys.js");

const user = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  user.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const existinguser = await user.findOne({ googleId: profile.id });
      
      if (existinguser) {
          // we already have record with given profile ID
          done(null, existinguser);
        } else {
          // Adds a new record with profile ID to mongodb atlas
        const user = await new user({ googleId: profile.id }).save();
        done(null,user);
        }
      }
     ) 
  );
  
