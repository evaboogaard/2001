// Get all the switches
const switches = document.querySelectorAll('input[type="checkbox"]');

// Function to check a random switch
function checkRandomSwitch() {
    const randomIndex = Math.floor(Math.random() * (switches.length - 1)); // Exclude the last switch
    switches[randomIndex].checked = true;
}

// Function to automatically check switches after a delay
function autoCheckSwitches() {
    setInterval(checkRandomSwitch, 1000); // Adjust the delay (1000 milliseconds = 1 second)
}

// Call the autoCheckSwitches function after the document is loaded
document.addEventListener('DOMContentLoaded', autoCheckSwitches);
