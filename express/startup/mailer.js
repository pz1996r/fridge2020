const dotenv = require('dotenv');
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

dotenv.config();

module.exports = async function sendEmail(email, name, emailToken, res) {
    const { SFTP, SFTPPassword, host } = process.env;
    const transporter = nodemailer.createTransport(smtpTransport({
        host,
        port: 465,
        secure: true,
        auth: {
            user: SFTP,
            pass: SFTPPassword
        }
    }));
    const info = await transporter.sendMail({
        from: `"Firdge APP 👻" <${SFTP}>`,
        to: email,
        subject: "Fridge APP - Potwierdź email",
        html: `<h1>Witaj ${name} !</h1>
               <p>Dziękujemy za zarejestrowanie konta. Zanim zaczniesz z niego korzystać musimy potwierdzić, że to Ty. Kliknij poniżej, aby zweryfikować swój adres e-mail: </p>
               <button href="https://fridge.develoopers.pl/.netlify/functions/routes/verify/${emailToken}">Potwierdź e-mail</button>
               <a href="https://fridge.develoopers.pl/.netlify/functions/routes/verify/${emailToken}>Potwierdź e-mail</a>`
    });

    res.status(200).send('work');
    return info;
}

