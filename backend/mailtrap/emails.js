import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailtempletes.js";
import { transporter } from "./nodemailer.js";
export const sendVerifactionEmail = async (email, verificationToken) => {
  // const recipient = [{ email }];

  // try {
  //   const response = await mailtrapClient.send({
  //     from: sender,
  //     to: recipient,
  //     subject: "Verify your email",
  //     html: VERIFICATION_EMAIL_TEMPLATE.replace(
  //       "{verificationCode}",
  //       verificationToken
  //     ),
  //     category: "Verification Email",
  //   });
  //   // console.log("email sent", response);
  // } catch (error) {
  //   console.error(error);
  //   throw new Error(`Failed to send email: ${error.message}`);
  // }

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
  // const recipient = [{ email }];
  const data = {
    companyName: "Awesome Inc.",
    userName: name,
    ctaLink: "https://www.awesome-inc.com/get-started",
    year: new Date().getFullYear(),
    companyAddress: "123 Awesome Street, Awesome City",
    contactInfo: "contact@awesome-inc.com",
  };

  const renderedTemplate = replacePlaceholders(WELCOME_EMAIL_TEMPLATE, data);

  // try {
  //   const response = await mailtrapClient.send({
  //     from: sender,
  //     to: recipient,
  //     subject: "Welcome to our app",
  //     html: renderedTemplate,
  //   });
  // } catch (error) {
  //   console.error(`Error sending welcome email`, error);

  //   throw new Error(`Error sending welcome email: ${error}`);
  // }

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
  // const recipient = [{ email }];
  // try {
  //   const response = await mailtrapClient.send({
  //     from: sender,
  //     to: recipient,
  //     subject: "Reset your password",
  //     html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
  //     category: "Password Reset",
  //   });
  // } catch (error) {
  //   console.error(`Error sending reset password email`, error);

  //   throw new Error(`Error sending reset password email: ${error}`);
  // }
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
  // const recipient = [{ email }];
  // try {
  //   const response = await mailtrapClient.send({
  //     from: sender,
  //     to: recipient,
  //     subject: "Password reset successful",
  //     html: PASSWORD_RESET_SUCCESS_TEMPLATE,
  //     category: "Password Reset",
  //   });
  // } catch (error) {
  //   console.error(`Error sending reset password email`, error);

  //   throw new Error(`Error sending reset password email: ${error}`);
  // }

  const mailOptions = {
    from: "jaiswalaman2020@gmail.com", // Sender address
    to: email, // List of receivers
    subject: "Hello from Nodemailer", // Subject line
    html: PASSWORD_RESET_SUCCESS_TEMPLATE, // Plain text body
  };

  // Step 3: Send Email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error: ", error);
    }
    console.log("Email sent: " + info.response);
  });
};
