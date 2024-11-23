import dotenv from "dotenv";

import { MailtrapClient } from "mailtrap";

dotenv.config({ path: "../.env" });
const TOKEN = process.env.MAIL_TRAP_TOKEN;

// const TOKEN = "858efad7bf99d49fa846781fe159deaf";
// console.log(TOKEN);

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
