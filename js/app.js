//test performance
const t0 = performance.now();

/**
 * @description When the user scrolls down the webpage add a shadow to the nav bar element
 * Get the ScrollY position of the window and if not 0 then add shadow to nav bar element, 
 * if 0 then remove shadow from 
 * nav bar element
 */
document.addEventListener('scroll', (event) =>{
    const navbar = document.querySelector('nav'); 
    const pageYposition = document.defaultView.scrollY; //window Y position
    const shadowClass = 'nav-shadow';
    
    if(pageYposition === 0){
        navbar.classList.remove(shadowClass);
    } else {
        //add class if classList doesnt contain it
        if (!navbar.classList.contains(shadowClass)){
            navbar.classList.add(shadowClass);
        }
    }
});

/**************************************
 * Dynamically create the nav bar list
 **************************************/

const sections = document.querySelectorAll('section'); //set all section elements
const sectionDetails = [];

//loop through sections and get title and id
sections.forEach((section) => {
    const sectionObj = {
        link: section.id,
        title: section.querySelector('h2').innerText
    }
    //add object to the array
    sectionDetails.push(sectionObj);
});

//create a html fragment to add into the navbar
let navbarList = document.createDocumentFragment();

//loop through section Array and populate HTML fragmant with
//dynamically create nav links based on sections data 
for (detail of sectionDetails){
    //destructure object
    const {link, title} = detail;
    //create list item
    const navbarItem = document.createElement('li');
    //section id used to create a data-scroll attribute that will be used for navigating to the right section
    navbarItem.innerHTML = `<a class="nav-item" data-scroll=${link}>${title}</a><div id="${link}-nav-underline" class="nav-item-underline"></div>`;
    navbarList.appendChild(navbarItem);
}

//add the dynmically create nav item list to the nav bar element
document.querySelector('.nav-list').appendChild(navbarList);


/**
 * @description When a user clicks a nav bar link smoothly scroll to that section of the webpage
 * Listener is attached to the nav element and using event delegation the function determines what 
 * element in the nav element has been clicked. It checks if it is a anchor element and if it is it
 * uses the data-scroll attribute of the target element (which includes the section id in it) to select
 * the right section element and then smoothly scroll to it
 */

document.querySelector('nav').addEventListener('click', (event) => {
    const target = event.target;
    if (target.nodeName === 'A'){
        event.preventDefault();
        //get the section, whos ID is the same as the data-scroll attribute, then scroll to it
        document.querySelector(`#${target.dataset.scroll}`).scrollIntoView({behavior: 'smooth', block: "center"});
    }
});

/********************************************************
 * Calculate what elements are visible on the viewport 
 * use the IntersectionObserver API to achieve this
 * Determine what nav link element to highlight and what
 * style to apply to the visible section
 ********************************************************/

//set your options for the intersectionObserver 
//observer will fire if 80% of target is in viewport
//root not defined so use default of viewport
let options = {
    threshold: [0.8]
};

/**
 * @description The IntersectionObserver will run the anoynomous function everytime
 * a target element (added below) has 80% or more visible in the viewport. When this
 * occurs if the section is entering the viewport so isIntersecting is true then it
 * will highlight the nav item that corresponds to that section. It will also apply
 * a class to that section that will fade the section in using CSS animation the 
 * first time it enters the viewport. 
 * 
 * NOTE: when the page first loads all element the observer lets fired for all attaches 
 * element. This is standard behaviour. In this case isIntersecting is false so will not
 * case a problem.
 */
let observer = new IntersectionObserver((entry) => {
    for (e of entry){
        //get the nav item that corresponds to the element e
        const elem = document.querySelector(`#${e.target.id}-nav-underline`);
        //if the element is entering the viewport isIntersecting will be true
        if(e.isIntersecting){
            //highlight the nav item that corresponds to the section in viewport
            elem.classList.add('nav-item-underline-active');
            //apply visible class to section entering the viewport to make it fade in
            //only fades in the first time it enters the screen
            e.target.classList.add('visible');
        } else {
            //if the elem is leaving the viewport or is not on it then remove nav item highlight
            elem.classList.remove('nav-item-underline-active');
        }
    }
}, options);

//get all the sections from the page
const list = document.querySelectorAll('section');
//loop through all the sections and add them to be observed
list.forEach((value) => {
    observer.observe(value);
});

/*******************************
 * Click the floating button to
 * scroll to the top of the page  
 *******************************/

const scrollToTop = document.querySelector('.scroll-to-top'); //get scroll top
/**
 * @description When the scroll to top button is click smoothly
 * scroll to the top of the viewport
 */
scrollToTop.addEventListener('click', (event) => {
    window.scrollTo({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth'});
});

/**
 * @description Controls when the scroll to the top button is visible
 * When the user scrolls so the top of the viewport is more than 50px 
 * on the y axis then add the class to make the floating button visible
 */
document.addEventListener('scroll', (event) => {
    if (document.defaultView.scrollY > 50){
        scrollToTop.classList.add('scroll-to-top-visible');
    } else {
        if (scrollToTop.classList.contains('scroll-to-top-visible')){
            scrollToTop.classList.remove('scroll-to-top-visible');
        }
    }
});

/*******************************
 * Header rotating quotes  
 *******************************/

// HTML Quotes that will display in the header
const quoteOneHTML = 
    `<blockquote>Helped me rediscover my passion for books</blockquote> <figcaption> &mdash; Jeremy Keith</figcaption>`;
const quoteTwoHTML = 
    `<blockquote>I have meet friends for life in this great book club</blockquote> <figcaption>&mdash; Claire Page</figcaption>`;
const quoteThreeHTML = 
    `<blockquote>Love the events and the book recommendations</blockquote> <figcaption> &mdash; Jo Waters</figcaption>`;

const quotes = [quoteOneHTML, quoteTwoHTML, quoteThreeHTML];
let quoteIndex = 0;
const elem = document.querySelector('.rotating-quotes');

//insert first quote, this runs once
elem.innerHTML = quotes[quoteIndex];
quoteIndex = quoteIndex + 1;

/**
 * @description Event listener for when the animation on the quote element ends
 * When it does end then get the next quote remove the elements class and then
 * add it again so the new quote also animates. When this new quote finsihs
 * animation then repeat the progress
 */
elem.addEventListener('animationend', ()=>{
    //reset quote index if you get to the end
    if (quoteIndex > quotes.length - 1){
        quoteIndex = 0;
    }   
    //remove the rotating class from elem
    elem.classList.remove('rotating-quotes');
    //this forces the browser to update the DOM so the remove class is applied
    //before the add class is, so the new animation occurs
    void elem.offsetWidth;
    //get new quote add it to the element and add class to animate
    elem.innerHTML = quotes[quoteIndex];
    quoteIndex = quoteIndex + 1;
    elem.classList.add('rotating-quotes');
});

console.log(`performance: ${performance.now()-t0}`);