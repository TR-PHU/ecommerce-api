const nodemailer = require('nodemailer');
const ErrorHandler = require('../../api/errors/error-handler');
const User = require('../../api/models/User');

async function sendResetLink(recipient, token) {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAUTH2',
                user: 'me.phudev@gmail.com',
                clientId:
                    '428860965659-dmvhkk8ldfqgb6d6kl7lpvqgb0mthobh.apps.googleusercontent.com',
                clientSecret: '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',
                accessToken:
                    'ya29.A0ARrdaM_Dc521HdMY9MTUlLJ9xpQZPR8bfJXTW9FGZBBI4msbIol6qocEidLI2LuVv544BuWyMwvZJKHhMu6tEkNpuGjzUfA7olllk1-TRyQ7vJSevvmeEkfWo4IJib2dqj1EVghylX9_9BkOiAOyqN5atUxV',
                refreshToken:
                    '1//04epNKT-76s4UCgYIARAAGAQSNwF-L9IrxAVxpa76o5GimUOwGR-ZQnDwhxBx9YjEqGDJQK71Hc25TOx4NTIkAHCrCFRkwMGAsoA',
            },
        });

        const mailOptions = {
            from: '"Webdev training" <me.phudev@gmail.com>',
            to: recipient,
            subject: 'Reset password link',
            html: `<p>Your reset link: <b>http://localhost:3000/${token}</b></p>`, // html body
        };

        let info = await transporter.sendMail(mailOptions);
        await User.findOneAndUpdate({ email: recipient }, { resetToken: token });

        return info;
    } catch (error) {
        throw new ErrorHandler(error.message, 500);
    }
}

module.exports.sendResetLink = sendResetLink;
