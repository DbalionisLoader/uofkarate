/* var bootstrap = require('bootstrap'); */

console.log("Connected");

window.addEventListener('scroll', function() {
    const headerContainer = document.querySelector('.header-container');
    const h4Element = document.querySelector('.logo h4');
    const logo = document.querySelector('.logo');

    if (window.scrollY > 50) { // Change value based on when you want the minimization to occur
        headerContainer.classList.add('minimized');
        logo.classList.add('minimized');
        if (h4Element) h4Element.style.display = 'none'; // hide the h4
    } else {
        headerContainer.classList.remove('minimized');
        logo.classList.remove('minimized');
        if (h4Element) h4Element.style.display = 'block'; // show the h4    
    }
});