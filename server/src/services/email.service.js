import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class EmailService {
  // Configure the smtp transporter
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // SMTP username
      pass: process.env.EMAIL_PASS, // SMTP password
    },
  });

  // Function to send email
  sendEmail = async (to, subject, text, html) => {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
      });
      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (exception) {
      throw {
        code: 500,
        detail: exception,
        message: "Failed to send email",
        status: "EMAIL_SEND_FAILED",
      };
    }
  };
}

const emailSvc = new EmailService();
export default emailSvc;
