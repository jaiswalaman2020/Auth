import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Passport from "passport";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { Google } from "../models/google.model.js";
export const Strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
  },

  async function verify(accessToken, refreshToken, profile, done) {
    try {
      let googleUser = await Google.findOne({ googleId: profile.id });
      if (!googleUser) {
        let newUser = new Google({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          profilePic: profile.photos[0].value,
          isVerified: profile.emails[0].verified,
        });
        await newUser.save();
        return done(null, newUser);
      } else {
        return done(null, googleUser);
      }
    } catch (err) {
      done(err, null);
    }
  }
);
