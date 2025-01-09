import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailtempletes.js";

export const sendVerifactionEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Verification Email",
    });
    // console.log("email sent", response);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

function replacePlaceholders(template, data) {
  return template.replace(/{{(.*?)}}/g, (match, key) => data[key.trim()] || "");
}

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  const data = {
    companyName: "Awesome Inc.",
    userName: name,
    ctaLink: "https://www.awesome-inc.com/get-started",
    year: new Date().getFullYear(),
    companyAddress: "123 Awesome Street, Awesome City",
    contactInfo: "contact@awesome-inc.com",
  };

  const renderedTemplate = replacePlaceholders(WELCOME_EMAIL_TEMPLATE, data);

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to our app",
      html: renderedTemplate,
    });
  } catch (error) {
    console.error(`Error sending welcome email`, error);

    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendResetPasswordEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.error(`Error sending reset password email`, error);

    throw new Error(`Error sending reset password email: ${error}`);
  }
};

export const sendResetSuccessfulEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
  } catch (error) {
    console.error(`Error sending reset password email`, error);

    throw new Error(`Error sending reset password email: ${error}`);
  }
};
