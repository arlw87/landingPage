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






//try and see what is on the screen
//using intersection observer


//This is working but i think i should look at transistions in and out of sections
//TODO:
//-Investigation how to know if you are entering or exiting the section
//-Dont toggle class add and remove it and check if the classList contains it
//-use the bottom border with the right colours to hightlight it
function onEntry(entry) {
    for (e of entry){
        console.log(e);
        console.log(e.intersectionRatio);
        console.log(e.target.id);
        if(e.intersectionRatio > 0.05){
            //get nav element
            const elem = document.querySelector(`#${e.target.id}-nav-underline`);
            console.log(`#${e.target.id}-nav-underline`);
            console.log(elem);
            elem.classList.toggle('nav-item-underline-active');
        }
    }
  }

let options = {
    threshold: [0.9]
};

let observer = new IntersectionObserver(onEntry, options);

//get all the sections
const list = document.querySelectorAll('section');

list.forEach((value) => {
    observer.observe(value);
});


/****************************
 * Scroll to the top feature
 ****************************/

// add a listener on clicking the scroll to top button that scrolls to the window top
const scrollToTop = document.querySelector('.scroll-to-top');
scrollToTop.addEventListener('click', (event) => {
    window.scrollTo(0,0);
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

