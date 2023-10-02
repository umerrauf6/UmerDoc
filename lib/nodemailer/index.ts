const nodemailer = require("nodemailer");
const fs = require("fs");

const emailTemplatePath = "./emailTemplate.html";
const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // SMTP server for Outlook
  port: 587, // Port for Outlook
  secure: false, // Use TLS for secure connection
  auth: {
    user: process.env.EMAIL_USERNAME, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your password or app-specific password
  },
  tls: {
    ciphers: "SSLv3",
  },
});

const sendNodeMail = async (appointDate, userName, userEmail) => {
  try {
    const emailContent = emailTemplate
      .replace("[Recipient Name]", userName)
      .replace("[Date and Time]", appointDate);
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: userEmail,
      subject: "Appointment Booking Confirmation",
      html: emailContent,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendNodeMail;

// export const mailOptions = {
//   from: "wowsubs890@outlook.com",
//   subject: "Appointment Booking Confirmation",
//   html: "<div><h1>Hello world!</h1> </div>",
// };
