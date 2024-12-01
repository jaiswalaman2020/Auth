import express from "express";

import dotenv from "dotenv";
import { connect } from "./db/connection.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connect();
  console.log("Server is running on port ", PORT);
});
