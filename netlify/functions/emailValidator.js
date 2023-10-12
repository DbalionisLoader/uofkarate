/* Function to server side validate the contact form, called by emailContact.js
If any validaiton fails returns a statuscode with error message */
module.exports = {
  validateForm: (formData) => {
    try{
    //Object destructuring - retrieve the form input as separate variables
    const { name, email, subject, message } = formData;

    //Input validation - check if empty
    if(!name || !email || !subject || !message ) {
      console.log("Empty fields found"); 
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({message: 'All fields required.'}),
      };
    }
  
     // Input validation - Limit input size
     if (name.length > 100 || email.length > 100 || subject.length > 100 || message.length > 600) {
      return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'Input size limit exceeded.' }),
      };
    }
    
      // Input validation - check for valid email address
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!emailRegex.test(email)){ //returns true if incorrect - default is false if incorrect
      console.log("Wrong email found");
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Incorrect email address' }),
      };
    }
    
  
} catch (error) {
  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Invalid form data' }),
  };
  }
  },
};    

