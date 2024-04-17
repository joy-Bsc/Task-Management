const nodemailer = require('nodemailer');
//const smtpTransport = require('nodemailer-smtp-transport');

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'mail.teamrabbil.com',
            port: 25,
            secure: false,
            auth: {
                user: "info@teamrabbil.com",
                pass: '~sR4[bhaC[Qs'
            },tls: {
                rejectUnauthorized: false
            },
        });


        let mailOptions = {
            from: 'Task Manager <info@teamrabbil.com>',
            to: EmailTo,
            subject: EmailSubject,
            text: EmailText
        };

        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
}

module.exports = SendEmailUtility;
