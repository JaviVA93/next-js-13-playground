import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

function sendContactForm(data: { name: string, email: string, message: string }): Promise<string> {
    return new Promise(resolve => {
        const email = process.env.GMAIL_NODEMAILER_USER;
        const pass = process.env.GMAIL_NODEMAILER_PASS;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: email,
                pass: pass,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: email,
            to: email,
            subject: 'New contact form submission',
            html:
                `<h1>Test</h1>
                <h2>New contact form submission:</h2>
                <span>Name: ${data.name}</span>
                <br>
                <span>Email: ${data.email}</span>
                <br>
                <span>Message: ${data.message}</span>
                `
        };

        transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                console.error(error);
                resolve('error');
            }
            else {
                console.dir(info);
                resolve('success');
            }
        });
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Get the contact form data from the request body
    let data = req.body;

    // Send the email
    const sendStatus = await sendContactForm(data);

    if (sendStatus === 'success')
        res.send({ status: 'success' });
    else
        res.send({ status: 'error' });
}