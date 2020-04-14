const dotenv = require('dotenv');
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

dotenv.config();

module.exports = async function sendEmail(email, name, link) {
    console.log('work 1 ???')
    const { SFTP, SFTPPassword, host } = process.env;
    console.log('work 2 ???')
    const transporter = nodemailer.createTransport(smtpTransport({
        host,
        port: 465,
        secure: true,
        auth: {
            user: SFTP,
            pass: SFTPPassword
        }
    }));
    console.log('work 3 ???')
    const info = await transporter.sendMail({
        from: `"Firdge APP 👻" <${SFTP}>`,
        to: email,
        subject: "Fridge APP - Potwierdź email",
        html: `<html><h1>Witaj ${name} ...</h1>
               <p>Dziękujemy za zarejestrowanie konta. Zanim zaczniesz z niego korzystać musimy potwierdzić, że to Ty. Kliknij poniżej, aby zweryfikować swój adres e-mail: </p>
               <a href="${link}">Potwierdź e-mail</a>
               </html>`,
        text: "Dziękujemy za zarejestrowanie konta. Zanim zaczniesz z niego korzystać musimy potwierdzić, że to Ty. Kliknij poniżej, aby zweryfikować swój adres e-mail", // plain text body

    });
    console.log('work 4 ???')
}
