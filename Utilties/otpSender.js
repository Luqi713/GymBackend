require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports.sendEmail = (email, registrationCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.My_Email,
      pass: process.env.My_Pass,
    },
  });

  const mailOptions = {
    from: process.env.My_Email,
    to: email,
    subject: "Registration Code",
    text: `Your registration code is: ${registrationCode}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};