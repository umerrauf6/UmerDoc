import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
const smtpTransport = require("nodemailer-smtp-transport");

const transport = nodemailer.createTransport(
  smtpTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "su0000676@gmail.com", // Your email
      pass: "ktva pjst uksi ucbe", // Your password or app-specific password
    },
  })
);

const sendNodeMail = async (appointDate, userName, userEmail) =>
  new Promise<string>((resolve, reject) => {
    transport.sendMail(
      {
        from: process.env.EMAIL_USERNAME,
        to: userEmail,
        subject: "Appointment Booking Confirmation",
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Appointment Booking Confirmation</title>
          </head>
          <body>
            <h1>Appointment Booking Confirmation</h1>
        
            <p>Dear ${userName},</p>
        
            <p>Your appointment has been successfully booked. Below are the details:</p>
        
            <p><strong>Appointment Date and Time:</strong> ${appointDate}</p>
        
            <p>
              If you have any questions or need to make changes to your appointment,
              please feel free to contact us.
            </p>
        
            <p>Thank you for choosing our service. We look forward to seeing you!</p>
        
            <p>Best regards,<br />@UmerDoc</p>
          </body>
        </html>
        `,
      },
      function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      }
    );
  });

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { appointDate, userName, userEmail } = await req.json();

    await sendNodeMail(appointDate, userName, userEmail);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
