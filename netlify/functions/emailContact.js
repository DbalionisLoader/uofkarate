/* Serverless-Function to send the contact form data to a gmail as a email 

/* Library */
const nodemailer = require('nodemailer');
require('dotenv').config();

//Netlify function
exports.handler = async function(event, context){
    //Test ZONE
    console.log("Function emailContact was called");
    //Check if POST method is used
    if(event.httpMethod !== "POST") {
        return {statusCode: 405, body: "POST method not allowed"}
    }
    //Fetch contact form data
    const {name, email, subject, message} = JSON.parse(event.body);
    //Create nodemail trasporter object - Authenticate gmail using OAuth2
    //Refresh token might need to be changed to send email to correct imbox
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.GMAIL_USER,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        }
    });
    //Create email message - Need to add a user from field
    let mailOptions = {
        from: `${email}`,
        to: process.env.GMAIL_USER,
        subject: `${subject}`,
        text: `Name: ${name}\nMessage: ${message}`
    };

    console.log(mailOptions);
    
    //Send mail try - catch
    try{
        await transporter.sendMail(mailOptions)
        return {statusCode: 200, body: JSON.stringify("Message sent")};
    } catch (error) {
        console.error('Error sending email: ', error);
        return {statusCode: 500, body: JSON.stringify("Error sending message")};
    }
};