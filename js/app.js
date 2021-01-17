//TODO:
//REFACTOR THIS CODE


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

    //check to see what section you are in




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
    navbarItem.innerHTML = `<a data-scroll=${detail.link}>${detail.title}</a>`;
    navbarList.appendChild(navbarItem);
}

// console.log(navbarList);
// //add the dynmically create nav item list to the nav bar
document.querySelector('.nav-list').appendChild(navbarList);

//implment the nav bar link smooth scroll
document.querySelector('nav').addEventListener('click', (event) => {
    const target = event.target;
    if (target.nodeName === 'A'){
        event.preventDefault();
        console.log(target.dataset.scroll);
        document.querySelector(`#${target.dataset.scroll}`).scrollIntoView({behavior: 'smooth', block: "center"});
    }
})

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
            const elem = document.querySelector(`a[data-scroll='${e.target.id}']`);
            console.log(elem);
            elem.classList.toggle('redClass');
        }
    }
  }

let options = {
    threshold: [0.9]
};

let observer = new IntersectionObserver(onEntry, options);

let target = document.querySelector('#section-one');
let target2 = document.querySelector('#section-two');
let target3 = document.querySelector('#section-three');
let target4 = document.querySelector('#section-four');

console.log(target);
observer.observe(target);
observer.observe(target2);
observer.observe(target3);
observer.observe(target4);
