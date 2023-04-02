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
            subject: 'New contact from "Next JS 13 Playground" project',
            html:
                `
                <div class="mailContainer">
                    <h2>Name: </h2>
                    <h3>${data.name}<h3>
                    <h2>Email:</h2>
                    <h3>${data.email}</h3>
                    <h2>Message:</h2>
                    <span>${data.message}</span>
                </div>`
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
    let rawBody = req.body;
    let bodyData = JSON.parse(rawBody)

    // Send the email
    const sendStatus = await sendContactForm(bodyData);

    if (sendStatus === 'success')
        res.send({ status: 'success' });
    else
        res.send({ status: 'error' });
}