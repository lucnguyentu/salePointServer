import nodemailer from 'nodemailer';
const sendEmail = async (options) => {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "335843e2259483",
          pass: "67b42e5ffe7053"
        }
    });

    const mailOptions = {
        from: "onghoang@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transport.sendMail(mailOptions);
};

export default sendEmail;
// enable imap in gmail and do follow steps below
// follow it: https://help.warmupinbox.com/en/articles/4934806-configure-for-google-workplace-with-two-factor-authentication-2fa
