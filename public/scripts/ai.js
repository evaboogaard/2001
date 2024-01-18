// Get all the switches
const switches = document.querySelectorAll('input[type="checkbox"]');
const halAudio = new Audio('public/audio/hal.mp3');
const carouselElement = document.querySelector('.carousel');
let timer;

// Function to check a random switch
function checkRandomSwitch() {
    const randomIndex = Math.floor(Math.random() * (switches.length - 1)); // Exclude the last switch
    switches[randomIndex].checked = true;
}

// Function to automatically check switches after a delay
function autoCheckSwitches() {
    setInterval(checkRandomSwitch, 1000); // Adjust the delay (1000 milliseconds = 1 second)
}

// Function to handle the change event of the first switch
function handleFirstSwitchChange() {
    if (!switches[3].checked) {
        // If the first switch is unchecked, remove the '.hide' class from the carouselElement
        carouselElement.classList.remove('hide');
        halAudio.play();
    }
}

// Add event listener to the first switch
switches[3].addEventListener('change', handleFirstSwitchChange);

// Call the autoCheckSwitches function after the document is loaded
document.addEventListener('DOMContentLoaded', autoCheckSwitches);
