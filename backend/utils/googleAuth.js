import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { User } from "../models/user.model.js";
export const Strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
  },
  //after login you can access user data in req.user
  async function verify(accessToken, refreshToken, profile, done) {
    try {
      let googleUser = await User.findOne({ googleId: profile.id });
      if (!googleUser) {
        let newUser = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          profilePic: profile.photos[0].value,
          isVerified: profile.emails[0].verified,
          authType: "google",
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
