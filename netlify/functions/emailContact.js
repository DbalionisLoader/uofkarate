/* Serverless-Function to send the contact form data to a gmail as a email */

const nodemailer = require('nodemailer');
require('dotenv').config();

//Event returns object with json data
exports.handler = async function(event, context){
    //Decline sending form if NOT POST 
    if(event.httpMethod !== "POST") {
        return {statusCode: 405, body: "POST method not allowed"}
    }
    //Event object container body object with json 
    const {name, message} = JSON.parse(event.body);

    //NodeMailer setup
    let tranporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS

        }
    });

    let mailOptions = {
        from: '"Your Name" <your@gmail.com>',
        to: 'aceintel6@googlemail.com',
        subject: 'New Contact Message',
        text: `Name: ${name}\nMessage: ${message}`
    };

    try{
        await tranporter.sentMail(mailOptions)
        return {stateCode: 200, body: "Message sent"};
    } catch (error) {
        return {stateCode: 500, body: "Error sending message"};
    }
};