const nodemailer = require("nodemailer");
// const Transport = require("nodemailer-brevo-transport");
require("dotenv").config();

// const transporter = nodemailer.createTransport(
//     new Transport({ apiKey: process.env.BREVO_KEY })
// );

const transporter = nodemailer.createTransport({
    // host: 'gmail',
    // // host: 'smtp-relay.sendinblue.com',
    // port: 587,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.ETH_EMAIL,
        pass: process.env.APPPASSWORD
    }
});

function resetPassword(email, link) {
    console.log("email", email, "link", link);
    const mailOptions = {
        from: "padhuamara1212@gmail.com",
        to: email,
        subject: "Welcome",
        text: `${link}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("error", error);
        }
        else {
            console.log("sent success", info);
        }
    })

}

module.exports = resetPassword;