console.log("Form validation script connected");



function validateFormData(data){
    let isFormValid = true;

    /* UTILITY FUNCTIONS */


   /* Utility function to help reduce multiple style.display calls to hide and show error messages */
   /* PARAMS:
   elementID = class name of error message below input field 
   condition = boolean to determine to show or hide error message
   RETURN:
   !condition = if error message is show, form is invalid, thus false, 
   opposite if no error message shown*/
    function toggleError(elementId,condition){
        document.getElementById(elementId).style.display = condition ? 'block' : 'none';
        return !condition;
    }

    /* Utility function to check for empty input field and display valid/invalid outline for input field */
    /* PARAMS:
    inputIdName = the id of an input field = must be same same string as error message class name
    value = user input value from the input field*/
    /* RETURN:
    toggleError(errorElementId, isEmpty) = return the boolean value from toggleError class to validate the form */

    function validateNonEmpty(inputIdName, value) {
       const isEmpty = value.trim() === '';
       const errorElementId = `${inputIdName}Error`;
       const inputElement = document.getElementById(inputIdName);
       
       //if field empty, toggle on the red outline
       inputElement.classList.toggle("form-control-error-outline", isEmpty);
       //if field is not empty, toggle on the greed outline
       inputElement.classList.toggle("form-control-valid-outline", !isEmpty);
       
       return toggleError(errorElementId, isEmpty)
    }

    /* Validate Email */
    /* Utility function to check for valid email and correctly display error outline */
    /* PARAMS:
    inputIdName = the id of an input field = must be same same string as error message class name
    value = user input value from the input field*/
    /* RETURN:
    toggleError(errorElementId, !isValidEmail) = return the boolean value from toggleError class to validate the form */
    function validateEmail(inputIdName, value) {
        const errorElementId = `${inputIdName}Error`;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        //emailRegex.test(data.email) RETURN FALSE if no or incorrect email
        const isValidEmail = emailRegex.test(value);
        const inputElement = document.getElementById(inputIdName);
        
       //isValidEmail have to be TRUE to toggle error outline
       inputElement.classList.toggle("form-control-error-outline", !isValidEmail);
        // if isValidEmail have to be FALSE to 
       inputElement.classList.toggle("form-control-valid-outline", isValidEmail);
        
        //!isValidEmail is FALSE 
        return toggleError(errorElementId, !isValidEmail)
    }


    //Name validation
    isFormValid = validateNonEmpty('name', data.name) && isFormValid; //if form invalid from any other field = false

    //Email validation
    isFormValid = validateEmail('email', data.email) && isFormValid;

    //Subject validation
    isFormValid = validateNonEmpty('subject', data.subject) && isFormValid; 

    //Message validaiton
    isFormValid = validateNonEmpty('message', data.message) && isFormValid; 

    return isFormValid;
}

function submitFormData(data){
    
    fetch('/.netlify/functions/emailContact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    
    .then(response => {
        console.log(response);
        return response.json();
    })
    .catch((error) => {
        console.error('Error:', error);
        console.log('Error during post');
        }); 
}
document.getElementById('contactForm').addEventListener('submit', function(e) {
        
      console.log("clicked submit");   
      e.preventDefault(); 

     //Get form data from form object    
     const formData = new FormData(this);
     //Pass form data to data object
     const data = Object.fromEntries(formData);

     if(validateFormData(data)){
        console.log("Form is valid", data);  
        submitFormData(data); 
     } else {
        console.log("Form validation failed", data); 
     }
});