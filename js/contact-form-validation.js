console.log("Form validation script connected");



function validateFormData(data){
    let isFormValid = true;

    //Name validation
    //If empty
    if(data.name.trim() === ''){
        document.getElementById('nameError').style.display = 'block';
        document.getElementById('name').classList.add("form-control-error-outline"); 
        document.getElementById('name').classList.remove("form-control-valid-outline"); 
        isFormValid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
        document.getElementById('name').classList.add("form-control-valid-outline"); 
    }

    //Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!emailRegex.test(data.email)){
        document.getElementById('emailError').style.display = 'block';
        isFormValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    //Subject validation
    if(data.subject.trim() === ''){
        document.getElementById('subjectError').style.display = 'block';
        isFormValid = false;
    } else {
        document.getElementById('subjectError').style.display = 'none';
    }

    //Message validaiton
      if(data.message.trim() === '') {
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('messageError').style.display = 'none';
    }

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