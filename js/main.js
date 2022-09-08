//Check If There's A local Storage Color Option 
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {

    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color_option"));

    //Remove Active Class From All Colors List Items
document.querySelectorAll(".colors-list li").forEach(element => {

    element.classList.remove("active"); 

    //Add active class on element with data-color === local storage item
    if (element.dataset.color === mainColors) {

        //Add active class
        element.classList.add("active");
    }
}); 
}

//Random background option 
let backgroundOption = true;

//Variable to control the background interval 
let backgroundInterval;

//Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function() {
    
    //Toggle Class fa-spin for Rotation On self
    this.classList.toggle("fa-spin");

    //Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");

};

//Switch Colors 
const colorsLi = document.querySelectorAll(".colors-list li");

//Loop On All List Items
colorsLi.forEach(li => {

    //Click On Every List Item
    li.addEventListener("click", (e) => {

        //Set Color On Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        //Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);

    });
});

//Switch Backgrounds 
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

//Loop On All spans
randomBackEl.forEach(span => {

    //Click On Every span
    span.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.background === 'yes') {

        backgroundOption = true;

        randomizeImgs();

        localStorage.setItem("background_option", true);

        } else {

        backgroundOption = false;

        clearInterval(backgroundInterval);

        localStorage.setItem("background_option", false);
        }
    });
});

//Selecting Landing Page Element
let landingPage = document.querySelector(".landing-page");

//Get Array Of Images 
let imgsArray = ["landing01.jpg", "landing02.jpg", "landing03.jpg", "landing04.jpg", "landing05.jpg"];

//Function to randomize images
function randomizeImgs() {

    if (backgroundOption === true) {

        backgroundInterval = setInterval(() => {

            //Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            //Change Background Image URL 
        landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';
        
        }, 8000);
        
    }
};

randomizeImgs();
//............................................................
//Select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    //Skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;

    //Skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //Window height
    let windowHeight = this.innerHeight;

    //window scrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        
        });
    }
};
//...............................................................

//Create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        //Create overlay element
        let overlay = document.createElement("div");

        //Add class to overlay
        overlay.className = 'popup-overlay';

        //Append overlay to the body
        document.body.appendChild(overlay);

        //Create the popup box 
        let popupBox = document.createElement("div");

        //Add class to the popup box
        popupBox.className = 'popup-box';

        if (img.alt !== null) {

            //Create heading
            let imgHeading = document.createElement("h3");

            //Create Text for heading
            let imgText = document.createTextNode(img.alt);

            //Append the text to the heading
            imgHeading.appendChild(imgText);

            //Append the heading to the popup box
            popupBox.appendChild(imgHeading);
        }

        //Create the image
        let popupImage = document.createElement("img");

        //Set image source
        popupImage.src = img.src;

        //Add image to popup box
        popupBox.appendChild(popupImage);

        //Append the popup box to body
        document.body.appendChild(popupBox);

        //Create the close span
        let closeButton = document.createElement("span");

        //Create the close button text
        let closeButtonText = document.createTextNode("X");

        //Append text to close button text
        closeButton.appendChild(closeButtonText);

        //Add class to close button
        closeButton.className = 'close-button';

        //Add close button to the popup box
        popupBox.appendChild(closeButton);
    
    });
});

//Close popup
document.addEventListener("click", (e) => {

    if (e.target.className === 'close-button') {

        //Remove the current popup
        e.target.parentNode.remove();

        //Remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});

//Select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach(bullet => {

    bullet.addEventListener("click", (e) => {

        document.querySelector(e.target.dataset.section).scrollIntoView({

            behavior: 'smooth'
        });

    });

});

//Handling active state
function handleActive(ev) {

    
    //Remove Active Class From All Children
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
            
        element.classList.remove("active");
    });

    //Add active class on self
    ev.target.classList.add("active");

}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

bulletsSpan.forEach(span => {
    
    span.addEventListener("click", (e) => {
    
        if (span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';

        } else {

            bulletsContainer.style.display = 'none';

        }

        handleActive(e);

    });

});

//Toggle menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function () {

    e.stopPropagation();

    this.classList.toggle("menu-active");

    tLinks.classList.toggle("open");

};

//Toggle anywhere outside menu and toggle button
document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {

        //Check if menu is open
        if (tLinks.classList.contains("open")) {

            toggleBtn.classList.toggle("menu-active");

            tLinks.classList.toggle("open");

        }
    }
});

//Stop Propagation on menu
tLinks.onclick = function (e) {

    e.stopPropagation();
}