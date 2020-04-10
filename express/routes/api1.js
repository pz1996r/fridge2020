const nodemailer = require("nodemailer");
const api = require('../routes.js');

const { router } = api;

router.get('/api1', async (req, res) => {
    async function main() {
        const transporter = nodemailer.createTransport({
            host: "serwer1949717.home.pl",
            port: 465,
            secure: true,
            auth: {
                user: 'piotr@fridge.develoopers.pl',
                pass: 'I_Om8dP_cVZEAy_pWH_qF79y2TEIcVV_c1lwHvPY'
            }
        });
        const info = await transporter.sendMail({
            from: '"piotr@fridge.develoopers.pl 👻" <piotr@fridge.develoopers.pl>', // sender address
            to: "pz1996r@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>" // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    main().catch(console.error);
    res.json({
        'hello': 'api'
    })
})

module.exports = router;