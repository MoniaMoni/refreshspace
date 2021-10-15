let listItems = document.querySelectorAll('li');
let listItemsEmbedded = document.querySelectorAll('.embedded li');
const listImagePath = '<img class="list-img" src="pictures/pettit.png"/>   '

function addListImage() {
    for(let j = 0; j < listItemsEmbedded.length; j++) {
        listItemsEmbedded[j].innerHTML = listImagePath + listItemsEmbedded[j].innerHTML;
    }

    for(let i = 0; i < listItems.length; i++) {
        listItems[i].innerHTML =  listImagePath + listItems[i].innerHTML;
    }
}

addListImage();

let navbar = document.querySelector('#navbar');
let navHeight = getNumberOfPx(navbar, 'height');
let navPadding =  getNumberOfPx(navbar, 'padding-bottom');

function getNumberOfPx(element, property) {
    let dimension = window.getComputedStyle(element).getPropertyValue(property).slice(0,-2);
    return Number(dimension);
}

function setHeaderMarginTop() {
    let paddingHeight = navHeight + navPadding + 'px';
    document.querySelector('#header').style.paddingTop = paddingHeight;
    document.querySelector('h1').style.paddingTop = paddingHeight;
}

setHeaderMarginTop();


// ON/OFF navbar menue on mobile

const navIcon = document.querySelector('.nav-icon');
const navbarMobile = document.querySelector('#navbar');
const navLinkMobile = document.querySelectorAll('#navbar a');
const navArrow = document.querySelector('.nav-arrow');

// open menu
navIcon.addEventListener('click', () => {
    
    navIcon.style.display = 'none';
    navbarMobile.classList.add('navbar-mobile');
    navArrow.classList.add('nav-arrow-mobile');
    
    for(let i = 0; i < navLinkMobile.length; i++) {
        navLinkMobile[i].classList.add('nav-mobile');
    }
});

// close menu by arrow

navArrow.addEventListener('click', () => {
    hideNavMenu();
});

// close menu after click on a link
for(let i = 0; i < navLinkMobile.length; i++) {
    navLinkMobile[i].addEventListener('click', () => {
        hideNavMenu();
    });
}

function hideNavMenu() {
    
    for(let i = 0; i < navLinkMobile.length; i++) {
        navLinkMobile[i].classList.remove('nav-mobile');
    }

    navArrow.classList.remove('nav-arrow-mobile');
    navbarMobile.classList.remove('navbar-mobile');
    navIcon.style.display = 'inline-block';

}

const mainContainer = document.querySelector('.container');
const homeIcon = document.querySelector('.home-icon-container');
let containerMargin = getNumberOfPx(mainContainer, 'margin-right');
let homeIconWidth = getNumberOfPx(homeIcon, 'width');

function setHomeIconMargin() {

    let marginWidth = Math.floor(containerMargin - homeIconWidth);
    if(marginWidth > 0) {
        document.querySelector('.home-icon-container').style.marginRight = marginWidth + 'px';
    } else if(marginWidth <= 0 && containerMargin > 0) {
        document.querySelector('.home-icon-container').style.marginRight = containerMargin + 'px';
    }
    
}

setHomeIconMargin();