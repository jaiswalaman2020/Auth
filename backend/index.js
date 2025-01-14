import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connect } from "./db/connection.js";
import session from "express-session";
import Passport from "passport";
import { Strategy } from "./utils/googleAuth.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config({ path: "../.env" });
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }, // 10 minutes
  })
);
app.use(Passport.initialize());
app.use(Passport.session());

Passport.use(Strategy);

Passport.serializeUser((user, done) => done(null, user));
Passport.deserializeUser((user, done) => done(null, user));

app.use("/api/auth", authRoutes);
// app.get("/profile", (req, res) => {
//   res.status(200).json({ user: req.user, my: req.session });
// });

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
