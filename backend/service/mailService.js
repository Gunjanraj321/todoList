const nodemailer = require("nodemailer");


// sending successful registration/login email on the user's email id
async function sendSuccessEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Your email service provider
    auth: {
      user: process.env.EMAIL_ID, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to,
    subject,
    text,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Success email sent");
  } catch (error) {
    console.error("Error sending success email:", error);
  }
}

module.exports = {sendSuccessEmail};
