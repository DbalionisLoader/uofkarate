/* Serverless-Function to send the contact form data to a gmail as a email 

/* Library */
const nodemailer = require('nodemailer');
require('dotenv').config();
const { validateForm } = require('./emailValidator');
const { json } = require('express');
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
    //Create email message - Need to add a user from field
    let mailOptions = {
        from: {
            name: `${name} <${email}>`,  
            address: `<${email}>`
        },
        to: `${process.env.CAL_TEST_ID}`,
        replyTo: `${email}`, 
        subject: `${subject}`,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="format-detection" content="telephone=no">
          <meta name="x-apple-disable-message-reformatting">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title></title>
          <style type="text/css">
            @media screen {
              @font-face {
                font-family: 'Fira Sans';
                font-style: normal;
                font-weight: 400;
                src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
              @font-face {
                font-family: 'Fira Sans';
                font-style: normal;
                font-weight: 400;
                src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvk4jLazX3dGTP.woff2) format('woff2');
                unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
              }
              @font-face {
                font-family: 'Fira Sans';
                font-style: normal;
                font-weight: 500;
                src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnZKveRhf6Xl7Glw.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
              @font-face {
                font-family: 'Fira Sans';
                font-style: normal;
                font-weight: 500;
                src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnZKveQhf6Xl7Gl3LX.woff2) format('woff2');
                unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
              }
              @font-face {
                font-family: 'Fira Sans';
                font-style: normal;
                font-weight: 700;
                src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnLK3eRhf6Xl7Glw.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
              @font-face {
                font-family: 'Fira Sans';
                font-style: normal;
                font-weight: 700;
                src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnLK3eQhf6Xl7Gl3LX.woff2) format('woff2');
                unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
              }
              @font-face {
                font-family: 'Fira Sans';
                font-style: normal;
                font-weight: 800;
                src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnMK7eRhf6Xl7Glw.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
              @font-face {
                font-family: 'Fira Sans';
                font-style: normal;
                font-weight: 800;
                src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnMK7eQhf6Xl7Gl3LX.woff2) format('woff2');
                unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
              }
              .container {
                    width: 700px;
                    max-width: 700px;
                    margin: 0 auto;
                    padding: 20px;
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                    border: 1px solid rgb(207, 207, 207);
                    border-radius: 8px;
                }
        
                /* Styles for headers */
                .header {
                    font-weight: bold;
                }
        
                /* Styles for the rows */
                .row {
                    padding: 10px 0;
                }
        
                /* Media query for mobile responsiveness */
                @media screen and (max-width: 600px) {
                    .container {
                        width: 100% !important;
                    }
                }
            }
          </style>
            <body style="background-color: white; font-family: 'Fire Sans',Helvetica,Arial,sans-serif; font-size: 16px; width: 100% !important; margin: 0 !important; padding: 0; line-height: 1.5;">
                <table class="container" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td> <img src="cid:logo1" alt="Karate logo" style="width:100px;height:100px;"> </td>
                    </tr>
                    <tr>
                        <td class="row">
                            <h2 class="header">New message for the Karate Club!</h2>
                        </td>
                    </tr>
                    <tr>
                        <td class="row">
                            <p class="header">Message From:</p>
                            <p>${name} at ${email}</p> 
                        </td>
                    </tr>
                    <tr>
                        <td class="row">
                            <p class="header">Subject:</p>
                            <p>${subject}</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="row">
                            <p class="header">Message:</p>
                            <p>${message}</p>
                        </td>
                    </tr>
                </table>
            </body>
        </html>`,
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
