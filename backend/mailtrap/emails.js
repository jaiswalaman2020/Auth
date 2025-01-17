import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailtempletes.js";
import { transporter } from "./nodemailer.js";
export const sendVerifactionEmail = async (email, verificationToken) => {
  const mailOptions = {
    from: "jaiswalaman2020@gmail.com", // Sender address
    to: email, // List of receivers
    subject: "Hello from Nodemailer", // Subject line
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    ), // Plain text body
  };

  // Step 3: Send Email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error: ", error);
    }
    console.log("Email sent: " + info.response);
  });
};

function replacePlaceholders(template, data) {
  return template.replace(/{{(.*?)}}/g, (match, key) => data[key.trim()] || "");
}

export const sendWelcomeEmail = async (email, name) => {
  const data = {
    companyName: "Awesome Inc.",
    userName: name,
    ctaLink: "https://www.awesome-inc.com/get-started",
    year: new Date().getFullYear(),
    companyAddress: "123 Awesome Street, Awesome City",
    contactInfo: "contact@awesome-inc.com",
  };

  const renderedTemplate = replacePlaceholders(WELCOME_EMAIL_TEMPLATE, data);

  const mailOptions = {
    from: "jaiswalaman2020@gmail.com", // Sender address
    to: email, // List of receivers
    subject: "Hello from Nodemailer", // Subject line
    html: renderedTemplate, // Plain text body
  };

  // Step 3: Send Email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error: ", error);
    }
    console.log("Email sent: " + info.response);
  });
};

export const sendResetPasswordEmail = async (email, resetURL) => {
  const mailOptions = {
    from: "jaiswalaman2020@gmail.com", // Sender address
    to: email, // List of receivers
    subject: "Hello from Nodemailer", // Subject line
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL), // Plain text body
  };

  // Step 3: Send Email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error: ", error);
    }
    console.log("Email sent: " + info.response);
  });
};

export const sendResetSuccessfulEmail = async (email) => {
  const mailOptions = {
    from: "jaiswalaman2020@gmail.com", // Sender address
    to: email, // List of receivers
    subject: "Hello from Nodemailer", // Subject line
    html: PASSWORD_RESET_SUCCESS_TEMPLATE, // Plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error: ", error);
    }
    console.log("Email sent: " + info.response);
  });
};
