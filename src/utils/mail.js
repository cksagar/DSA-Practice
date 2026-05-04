import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';


export const sendEmail = async (options) => {

  const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Task Manager',
            link: 'https://task-manager.com',
        },
    });

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
    const emailHTML = mailGenerator.generate(options.mailgenContent);

  const transport =  nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASSWORD,
        },
    })
    
    const mail = {
        from: process.env.SMTP_FROM,
        to: options.to,
        subject: options.subject,
        text: emailTextual,
        html: emailHTML,
    }

    try {
        await transport.sendMail(mail);
    } catch (error) {
        console.error('Error sending email', error);
        throw error;
    }
};

export const emailVerificationMailgenContent = (username, verificationLink) => {
    return {
        body: {
            name: username,
            intro: 'Welcome to our app! Please verify your email to continue.',
            action: {
                instructions: 'To verify your email, please click the button below:',
                button: {
                    color: '#22BC66',
                    text: 'Verify Email',
                    link: verificationLink,
                },
            },
            outro: 'If you did not request this email, no further action is required.',
        },
    };
};

export const forgotPasswordMailgenContent = (username, resetLink) => {
    return {
        body: {
            name: username,
            intro: 'You requested a password reset. Please click the button below to reset your password.',
            action: {
                instructions: 'To reset your password, please click the button below:', 
                button: {
                    color: '#22BC66',
                    text: 'Reset Password',
                    link: resetLink,
                },
            },
            outro: 'If you did not request this email, no further action is required.',
        },
    };
};