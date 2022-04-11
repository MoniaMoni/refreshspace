let listItems = document.querySelectorAll('li');
let listItemsEmbedded = document.querySelectorAll('.embedded li');
const listImagePath = '<img class="list-img" src="pictures/icons/petit.png"/>   '

function addListImage() {

    // remove if after refactor 'embedded' will not be used
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
const viewportWidth = Number(window.visualViewport.width);

function getNumberOfPx(element, property) {
    let dimension = window.getComputedStyle(element).getPropertyValue(property).slice(0,-2);
    return Number(dimension);
}

function setHeaderMarginTop() {
    if(Number(viewportWidth) > 550) {
        let paddingHeight = navHeight + navPadding + 'px';

        document.querySelector('#header').style.paddingTop = paddingHeight;
        document.querySelector('h1').style.marginTop = paddingHeight;
    }
}

if (document.querySelector('#header') != null) {
    setHeaderMarginTop();
}

// ON/OFF navbar menu on mobile

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
// if statement for prevent display nav-icon on big screen

if(Number(viewportWidth) < 550) {

    for(let i = 0; i < navLinkMobile.length; i++) {
        navLinkMobile[i].addEventListener('click', () => {
            hideNavMenu();
        });
    }
}

function hideNavMenu() {
    
    for(let i = 0; i < navLinkMobile.length; i++) {
        navLinkMobile[i].classList.remove('nav-mobile');
    }

    navArrow.classList.remove('nav-arrow-mobile');
    navbarMobile.classList.remove('navbar-mobile');
    navIcon.style.display = 'inline-block';

}

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollPos = window.pageYOffset;

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top =  "-" + navHeight + "px";
  }
  prevScrollPos = currentScrollPos;
}

// add images placeholder

const galleryPhotos = document.querySelectorAll('.gallery-photo');
let photosContainer = document.querySelector('#gallery div.c-flex');
let photosModuloBy2 = galleryPhotos.length % 2;
let photosModuloBy4 = galleryPhotos.length % 4;

if((viewportWidth > 800) && (photosModuloBy4 != 0)) {
    for(let i = 0; i < (4 - photosModuloBy4); i++) {
        photosContainer.innerHTML += '<img class="gallery-photo" src="" alt="" style= "visibility: hidden;">';
    }

} if ((viewportWidth < 800) && (viewportWidth > 600) && photosModuloBy2 != 0) {
    photosContainer.innerHTML += '<img class="gallery-photo" src="" alt="" style= "visibility: hidden;">';
}


// zoom photo after click

let popUpContainer = document.querySelector('.pop-up');
let zoomImage = document.querySelector('.zoom');

document.getElementById('gallery-box').addEventListener('click', (e) => {

    if (e.target && e.target.matches('.gallery-photo')) {
        console.log(e.target.src)

        popUpContainer.style.display = 'inline-block';
        zoomImage.src = e.target.src.replace('file:///C:/js/refreshspace/', '');
        zoomImage.alt = e.target.alt;

        popUpContainer.addEventListener('click', () => {
            popUpContainer.style.display = 'none';
            zoomImage.innerHTML.src = '';
            zoomImage.innerHTML.alt = '';
        });
    }
})



