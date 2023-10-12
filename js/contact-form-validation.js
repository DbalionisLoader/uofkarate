console.log("Form validation script connected");

/* Global  Utility */

//Function to remove input and text field outlines after form submitted and reset
function removeOutline(){
        // Get all form input elements
        const formInputs = document.querySelectorAll('input');
        const messageArea = document.getElementById('message');
        // Remove the green and red outline classes from all input elements
        formInputs.forEach(input => {
            input.classList.remove('form-control-error-outline');
            input.classList.remove('form-control-valid-outline');
        });
        //Remove textarea outline textarea is not a input
        messageArea.classList.remove('form-control-error-outline');
        messageArea.classList.remove('form-control-valid-outline');
        
}

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

/* Modal open function  */
const showModal = (modalContent) =>{
 
    modalContainer = document.getElementById(modalContent);
    if(modalContainer){
            modalContainer.classList.add('show-modal');
    }
};


/* Modal close function */
/* Remove show-modal css class to hide the modal */

function closeModal(){
    let modalContainer = document.getElementById('modal-container');
    modalContainer.classList.remove('show-modal');
};

/* Show response message error to user utility class */
/* PARAMS:
message: The response data.body.message from emailValidator.js */
function showMessage(message) {
    const messageContainer = document.getElementById('submitted-message');
    messageContainer.innerHTML = `Something went wrong: ${message} Please try again`;
    messageContainer.style.display = 'block'
  }

/* Function to call emailcontact serverless function to create and send a nodemail email to gmail */
function submitFormData(data){
    
    fetch('/.netlify/functions/emailContact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    
    .then(response => {
        console.log('Full response:', response); // Log the entire response
      //  responseFromServer = response;  Store the response in the variable
        if (response.ok) {
            showModal('modal-container');
            return response.json();
        } else {
          return response.text();
        }
      })
      .then(data => {
        console.log('Data from server:', data);
        if (data.statusCode === 200) {
          showModal('modal-container');
          console.log("Server Side Validation Worked");
        } else {
          console.log("Server Side Validation is invalid");
          showMessage(data);
         
        } 
      })
      .catch(error => {
        console.error('Error:', error);
        console.log("Catch error message ", error.message);
      });
   
}
//Listener function attached to the submit buttom
document.getElementById('contactForm').addEventListener('submit', function(e) {
  
    
    console.log("clicked submit");   
    e.preventDefault(); 

    const submittedText = document.getElementById('submitted-message');
    const returnhomediv = document.getElementById('return-home');     
    console.log(submittedText);
    //Get form data from form object    
    const formData = new FormData(this);
    //Pass form data to data object
    const data = Object.fromEntries(formData);

    if(validateFormData(data)){
        console.log("Form is valid", data);  
        //Remove input outline
        //DISABLE SUBMIT FORM DATA FOR TESTING
        submitFormData(data); 
        returnhomediv.style.display = 'block'; 
        removeOutline();
        this.reset();
    } else {
        console.log("Form validation failed", data);
        submittedText.style.display = 'none'; 
    }
});  
     //Fetch all close buttons - one in this case, add x icon in future
     const closeBtn = document.querySelector('.close-modal');
     closeBtn.addEventListener("click", closeModal);
   