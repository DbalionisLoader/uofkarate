/* Serverless-Function to send the contact form data to a gmail as a email 

/* Library */
const nodemailer = require('nodemailer');
require('dotenv').config();
const { validateForm } = require('./emailValidator');
const { json } = require('express');
const { html_template }  = require('./mailTemplate');

//Netlify function
exports.handler = async function(event, context){
    //Test ZONE
    console.log("Function emailContact was called");
    //Check if POST method is NOT used in the event object
    if(event.httpMethod !== "POST") {
        return {statusCode: 405, body: "Only POST method allowed"}
    }

    //Convert event object body into plain js object for handling
    const formData = JSON.parse(event.body);
    //Call serverside emailValidator function
    const validationResponse = validateForm(formData);

    if (validationResponse) {
        // Validation PASS if function reaches end without triggering return statements - returning "undefined" = false is js
        // If validation fails, return the response "object" = true is js
        // Check "netlify dev" command to check logs in function runs server side
        console.log("validation response is incorrect");
        return validationResponse;
      }

    /* OAUTH2 TOKEN AUTHENTICATION - FOR REFERENCE -  */
    /*pass: process.env.APP_PASS 
      type: 'OAuth2', */
    /*user: process.env.GMAIL_USER,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,   */
   
    //Fetch contact form data
    const {name, email, subject, message} = JSON.parse(event.body);
    //Create nodemail trasporter object - Authenticate gmail using OAuth2
    //Refresh token might need to be changed to send email to correct imbox
    console.log("New email made");
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CAL_TEST_ID,
            pass: process.env.APP_PASS
        }
    });

    /* Use address object in this format to overwrite gmail sender name and email address */
    /*    from: {
      name: `${name} <${email}>`,  
      address: `<${email}>`}, */


    //Create email message - Need to add a user from field
    let mailOptions = {
      from: {
        name: `${name} <${email}>`,  
        address: `<${email}>`
      },
        to: `${process.env.CAL_TEST_ID}`,
        replyTo: `${email}`, 
        subject: `${subject}`,
        html: html_template(name,email,subject,message),
    };

    console.log(mailOptions.from);
    
    //try - catch to send nodemailer email and return a response message
    try{   
        await transporter.sendMail(mailOptions)
        return {statusCode: 200, body: JSON.stringify("Message sent")};
    } catch (error) {
        console.error('Error sending email: ', error);
        return {statusCode: 500, body: JSON.stringify("Error sending message")};
    }
};
