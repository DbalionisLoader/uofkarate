/* var bootstrap = require('bootstrap'); */

console.log("Connected");

/* Function to randomly image to each event card on page load */
document.addEventListener("DOMContentLoaded", function(){
    //Array of carefully curated event images
    const imageUrlArr = [
    'karate-group-1.png',
    'sitting-karate-1920.jpg',
    'karate-hero.png',
    ];


const cards = document.querySelectorAll('.card');
console.log(cards);
cards.forEach((card, index) => {
    const cardImage = card.querySelector('.card-image img');
    if (imageUrlArr[index]){
        cardImage.setAttribute('src', `./images/${imageUrlArr[index]}`);
    }
});

});



/* Navbar minimize on scroll function - check for scroll distance and add/remove minized css class */
//CHECK SPELLING 
let  isMinimized = false;

window.addEventListener('scroll', function() {
    const headerContainer = document.querySelector('.header-container');
    const h4Element = document.querySelector('.logo h4');
    const logo = document.querySelector('.logo');

    /* A scroll bounce issue feedback loop  occurs then scroll wheel is position at the threshold the nav
    minize cause a flickering effect */
    /* Adding a BUFFER ONLY fixed the issue only if  using scroll wheel */
    /* Need to add a lock to cause the transition to only happen after the threshold is crossed */
 /*    const revertThresholdBuffer =  isMinimized ? 100 : 140; */
    const minimizedThreshold = 140;
    const revertOriginalNavBar = 60;

    if (!isMinimized && window.scrollY > minimizedThreshold) { // Change value based on when you want the minimization to occur
        headerContainer.classList.add('minimized');
        logo.classList.add('minimized');
        if (h4Element) h4Element.style.display = 'none'; // hide the h4
        isMinimized = true;
    } else if (isMinimized && window.scrollY < revertOriginalNavBar) {
        headerContainer.classList.remove('minimized');
        logo.classList.remove('minimized');
        if (h4Element) h4Element.style.display = 'block'; // show the h4
        isMinimized = false;  
        
    }
});


