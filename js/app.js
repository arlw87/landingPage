/****************************************************************************************
 * When user scrolls the navbar will add a shadow to it to distinguish it from the rest of
 * the page
 ****************************************************************************************/

/*check the position of the page when it is scrolled*/
document.addEventListener('scroll', (event) =>{
    const navbar = document.querySelector('nav');
    const pageYposition = document.defaultView.scrollY;
    const shadowClass = 'nav-shadow';
    
    if(pageYposition === 0){
        navbar.classList.remove(shadowClass);
    } else {
        if (!navbar.classList.contains(shadowClass)){
            navbar.classList.add(shadowClass);
        }
    }
});

/****************************************************************************************** 
 ******************************************************************************************
 ****************************************************************************************** 
*/


/****************************************************************************************
 * Dynamically create the nav bar list
 ****************************************************************************************/

//returns a node list of all the elements that are section tag types
const sections = document.querySelectorAll('section');
const sectionDetails = [];

//loop through sections and get title and link information
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
for (detail of sectionDetails){
    //destructure object
    const {link, title} = detail;
    //create list item
    const navbarItem = document.createElement('li');
    navbarItem.innerHTML = `<a class="nav-item" data-scroll=${link}>${title}</a><div id="${link}-nav-underline" class="nav-item-underline"></div>`;
    navbarList.appendChild(navbarItem);
}

//add the dynmically create nav item list to the nav bar
document.querySelector('.nav-list').appendChild(navbarList);

/****************************************************************************************** 
 ******************************************************************************************
 ****************************************************************************************** 
*/



/******************************************************************************************
 * Implement the smooth scroll to section on nav bar item click event
 ******************************************************************************************/
document.querySelector('nav').addEventListener('click', (event) => {
    const target = event.target;
    if (target.nodeName === 'A'){
        event.preventDefault();
        //get the section, whos ID is the same as the data-scroll attribute, then scroll to it
        document.querySelector(`#${target.dataset.scroll}`).scrollIntoView({behavior: 'smooth', block: "center"});
    }
});

/********************************************************************************************
 ********************************************************************************************
 ********************************************************************************************
 */

/***
 * Determine the section currently viewed in the viewport usinf a IntersectionObsever 
 * Hightlight the nav bar item that corresponds to the section in the view port
 */

//set your options for the intersectionObserver 
//if 0.7 of an element is in the viewport the intersectionObserver fires
//root is not included as default is viewport
let options = {
    threshold: [0.8]
};

//create the IntersectionObserver add options and the callback function when it fires
let observer = new IntersectionObserver((entry) => {
    for (e of entry){
        //get the element that has more than 80% in the viewport
        const elem = document.querySelector(`#${e.target.id}-nav-underline`);
        //if the element is entering the viewport isIntersecting will be true
        if(e.isIntersecting){
            //highlight the nav item that corresponds to the section in viewport
            elem.classList.add('nav-item-underline-active');
            e.target.classList.add('visible');
        } else {
            //if the elem is leaving the viewport or is not on it then remove nav item highlight
            elem.classList.remove('nav-item-underline-active');
        }
    }
}, options);

//get all the sections
const list = document.querySelectorAll('section');
//loop through all the sections and add them to be observed
list.forEach((value) => {
    observer.observe(value);
});

/********************************************************************************************
 ********************************************************************************************
 ********************************************************************************************
 */


/****************************
 * Scroll to the top feature
 ****************************/

// add a listener on clicking the scroll to top button that scrolls to the window top
const scrollToTop = document.querySelector('.scroll-to-top');
scrollToTop.addEventListener('click', (event) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
});

// make scroll to the top button only appear after the user has scrolled down the page
// a certain amount

document.addEventListener('scroll', (event) => {
    if (document.defaultView.scrollY > 50){
        scrollToTop.classList.add('scroll-to-top-visible');
    } else {
        if (scrollToTop.classList.contains('scroll-to-top-visible')){
            scrollToTop.classList.remove('scroll-to-top-visible');
        }
    }
});

/********************************************************************************************
 ********************************************************************************************
 ********************************************************************************************
 */

 /**
  * Rotating Quotes on the header section of the webpage
  */

// HTML Quotes
const quoteOneHTML = `<blockquote>Helped me rediscover my passion for books</blockquote> <figcaption>
                        &mdash; Jeremy Keith
                        </figcaption>`;
const quoteTwoHTML = `<blockquote>I have meet friends for life in this great book club</blockquote> <figcaption>&mdash; Claire Page</figcaption>`;
const quoteThreeHTML = `<blockquote>Love the events and the book recommendations</blockquote> <figcaption> &mdash; Jo Waters</figcaption>`;

const quotes = [quoteOneHTML, quoteTwoHTML, quoteThreeHTML];
let quoteIndex = 0;

const elem = document.querySelector('.rotating-quotes');

//insert first quote, this runs once
elem.innerHTML = quotes[quoteIndex];
quoteIndex = quoteIndex + 1;

//look for animation end and then do things
elem.addEventListener('animationend', ()=>{
    if (quoteIndex > quotes.length - 1){
        quoteIndex = 0;
    }   
    console.log('animation has ended');
    //remove the rotating class from elem
    console.log(elem);
    elem.classList.remove('rotating-quotes');
    //quote the quote text

    void elem.offsetWidth;
    
    console.log(quotes[quoteIndex]);
    elem.innerHTML = quotes[quoteIndex];
    quoteIndex = quoteIndex + 1;
    elem.classList.add('rotating-quotes');
});