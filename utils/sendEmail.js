const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const MailGun = require('mailgun-js');
// dotenv config
dotenv.config({ path: `${__dirname}/../config/config.env` });

// send email function
const sendEmail = async options => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, MAILGUN_API_KEY, MAILGUN_DOMAIN} = process.env;

  try {
    // create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD
      }
    });

    const mailgun = new MailGun({apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN});
    
    mailgun.messages().send(options, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            console.log("Error: ", err);
        }
        //Else we can greet    and leave
        else {
            console.log('Message Sent', body);
        }
    });

    // email information spread
    const info = await transporter.sendMail(options);

    console.log(`Message sent. Id: ${info.messageId}`);

    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
