//get the navbar
const navbar = document.querySelector('nav');

/*on a scroll event check the page position to determine whether to show the 
display the shadow of the navbar or not*/

document.addEventListener('scroll', (event) =>{
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

/* dynamically create a navigation bar*/
//returns a node list of all the elements that are section types
const sections = document.querySelectorAll('section');
const sectionDetails = [];

//get the h2 section title from the section html
sections.forEach((currentValue) => {
    const sectionObj = {
        link: currentValue.id,
        title: currentValue.querySelector('h2').innerText
    }
    sectionDetails.push(sectionObj);
    console.log(currentValue.id);
});

// console.log(sectionTitles);

//create a html fragment to add into the navbar
let navbarList = document.createDocumentFragment();
for (detail of sectionDetails){
    const navbarItem = document.createElement('li');
    navbarItem.innerHTML = `<a href=#${detail.link}>${detail.title}</a>`;
    navbarList.appendChild(navbarItem);
}

// console.log(navbarList);
// //add the dynmically create nav item list to the nav bar
document.querySelector('.nav-list').appendChild(navbarList);


