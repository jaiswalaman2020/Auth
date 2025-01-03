import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connect } from "./db/connection.js";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Passport from "passport";

import authRoutes from "./routes/auth.route.js";

dotenv.config({ path: "../.env" });
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(Passport.initialize());
app.use(Passport.session());

Passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/auth/google/callback",
      scope: ["profile"],
    },

    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

Passport.serializeUser((user, done) => done(null, user));
Passport.deserializeUser((user, done) => done(null, user));

app.use("/api/auth", authRoutes);
app.get("/profile", (req, res) => {
  res.send(req.user);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  connect();
  console.log("Server is running on port ", PORT);
});
