const nodemailer = require('nodemailer');
 // create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ptansang1997@gmail.com',
        pass: 'Minht@m612'
    }
});
module.exports = transporter;