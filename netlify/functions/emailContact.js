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
    //Check if POST method is used
    if(event.httpMethod !== "POST") {
        return {statusCode: 405, body: "POST method not allowed"}
    }

    const formData = JSON.parse(event.body);
    const validationResponse = validateForm(formData);

    if (validationResponse) {
        // If validation fails, return the response object
        console.log("validation response is incorrect");
        return validationResponse;
      }
  
      /* pass: process.env.APP_PASS */ 
     /*  type: 'OAuth2', */
  /*  user: process.env.GMAIL_USER,
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
 /*    from: {
      name: `${name} <${email}>`,  
      address: `<${email}>`
  }, */
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
        attachments: [{
          filename: 'karatelogoemail.png',
          path: process.cwd() + '/images/karatelogoemail.png',
          cid: 'logo1' //same cid value as in the html img src
}]
    };

    console.log(mailOptions.from);
    
    //Send mail try - catch
    try{   
        await transporter.sendMail(mailOptions)
        return {statusCode: 200, body: JSON.stringify("Message sent")};
    } catch (error) {
        console.error('Error sending email: ', error);
        return {statusCode: 500, body: JSON.stringify("Error sending message")};
    }
};
