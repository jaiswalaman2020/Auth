import dotenv from "dotenv";

import nodemailer from "nodemailer";

dotenv.config({ path: "../../.env" });
// Step 1: Create Transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jaiswalaman2020@gmail.com", // Your email
    pass: process.env.GOOGLE_APP_PASSWORD, // Your password
  },
});
