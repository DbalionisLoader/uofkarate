/* var bootstrap = require('bootstrap'); */

console.log("Connected");

let  isMinimized = false;

window.addEventListener('scroll', function() {
    const headerContainer = document.querySelector('.header-container');
    const h4Element = document.querySelector('.logo h4');
    const logo = document.querySelector('.logo');

    /* A scroll bounce issue feedback loop  occurs then scroll wheel is position at the threshold the nav
    minize cause a flickering effect */
    const revertThresholdBuffer =  isMinimized ? 80 : 100;

    if (window.scrollY > revertThresholdBuffer) { // Change value based on when you want the minimization to occur
        headerContainer.classList.add('minimized');
        logo.classList.add('minimized');
        if (h4Element) h4Element.style.display = 'none'; // hide the h4
        isMinimized = true;
    } else {
        headerContainer.classList.remove('minimized');
        logo.classList.remove('minimized');
        if (h4Element) h4Element.style.display = 'block'; // show the h4
        isMinimized = false;    
    }
});